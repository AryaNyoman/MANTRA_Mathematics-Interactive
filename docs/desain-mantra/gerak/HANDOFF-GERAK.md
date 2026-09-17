# MANTRA · Sistem gerak "Panggung" · potongan JSX dan daftar periksa

Pasangan `gerak-mantra.css` (CSS siap tempel) dan `gerak-spek.json` (tabel spesifikasi A sampai K, satu baris per titik).
Tanpa pustaka animasi. Semua gerak CSS; JavaScript hanya untuk: arah rute, garis tab, penghitung angka, dan keadaan buka/tutup.

## 1. Rute (A) · jalur utama: Next 16 `experimental.viewTransition` + React canary

```ts
// next.config.ts
export default { experimental: { viewTransition: true } }
```

```tsx
// app/layout.tsx  (Nav dirakit SEKALI di sini; prop label per halaman dilepas)
import { unstable_ViewTransition as ViewTransition } from 'react'
import Nav from '@/components/Nav'
import ArahRute from '@/components/ArahRute'
export default function Layout({ children }) {
  return (
    <html lang="id">
      <body>
        <ArahRute />
        <Nav />
        <ViewTransition name="isi">{children}</ViewTransition>
      </body>
    </html>
  )
}
```

```tsx
// components/ArahRute.tsx  (±30 baris) menulis html[data-arah] sebelum potret diambil
'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
const TAB = ['/', '/peta-materi', '/latihan', '/tentang']
const dalam = (p: string) => p.split('/').filter(Boolean).length
const tab = (p: string) => TAB.findIndex((t) => (t === '/' ? p === '/' : p.startsWith(t)))
export default function ArahRute() {
  const path = usePathname()
  const lama = useRef(path)
  const mundur = useRef(false)
  useEffect(() => {
    const onPop = () => { mundur.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useEffect(() => {
    const a = lama.current, b = path
    let arah = 'maju'
    if (mundur.current) arah = 'kembali'
    else if (tab(a) === tab(b)) arah = dalam(b) >= dalam(a) ? 'maju' : 'kembali'
    else arah = tab(b) > tab(a) ? 'maju' : 'kembali'
    document.documentElement.dataset.arah = arah
    document.documentElement.dataset.transisi = 'true'
    const t = setTimeout(() => { delete document.documentElement.dataset.transisi }, 520)
    lama.current = b; mundur.current = false
    return () => clearTimeout(t)
  }, [path])
  return null
}
```

Cadangan kalau canary bermasalah (±40 baris, CSS identik):

```tsx
// components/Tautan.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
export default function Tautan({ href, children, ...p }) {
  const router = useRouter()
  return (
    <Link href={href} {...p} onClick={(e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      const doc = document as any
      if (!doc.startViewTransition) { router.push(href); return }
      doc.startViewTransition(() => new Promise<void>((selesai) => {
        startTransition(() => { router.push(href); selesai() })
      }))
    }}>{children}</Link>
  )
}
```
Ganti semua `<Link>` internal dengan `<Tautan>`. Tombol Kembali peramban tetap ditangani ArahRute lewat popstate.

Elemen bersama: beri `style={{ viewTransitionName: \`judul-bab-${slug}\` }}` pada `h3` kartu bab di PetaMateri dan `h1` di HalamanTopik (dan kartu topik di DaftarLatihan ↔ kepala ArenaLatihan). Hanya saat rutenya berpasangan; di halaman lain jangan dipasang supaya tidak ada nama ganda.

Kerangka: `app/topik/[slug]/page.tsx` sudah memakai Suspense + SedangMemuat. Tambahkan `data-isi-asli` pada pembungkus isi asli supaya memudar masuk 160 ms di tempat kerangka.

## 2. Nav (B)

```tsx
// Nav.tsx: JANGAN return null saat fokus. Tetap dirakit:
<nav className="nav" data-belajar={diBelajar} data-fokus={fokus} inert={fokus || undefined} aria-label="Navigasi utama">
// garis tab: ukur sekali per rute, tulis ke CSS variable
useEffect(() => {
  const aktif = akar.current?.querySelector<HTMLElement>('.nav-tab[aria-current="page"]')
  if (!aktif) return
  akar.current!.style.setProperty('--garis-x', `${aktif.offsetLeft + 14}px`)
  akar.current!.style.setProperty('--garis-w', `${aktif.offsetWidth - 28}`)
}, [pathname])
// label materi: key supaya animasi isi-ganti berjalan hanya saat teks berubah
<span className="nav-meta" key={judulTerakhir}>{judulTerakhir}</span>
```
`app/topik/layout.tsx`: rakit `<Nav />` dengan `data-belajar` dari sini; pil Mode fokus dan Materi 03 mendapat `naik-umpan` bersamaan dengan View Transition halaman.

## 3. Laci dan panel (C)

```tsx
// HalamanTopik.tsx: laci HP dan tirai lewat portal supaya panggung boleh di-transform
{createPortal(<>
  <button className="tirai-laci" data-buka={laci} onClick={tutupLaci} aria-label="Tutup daftar materi" />
  <aside className="pohon" data-buka={laci}>…</aside>
</>, document.body)}
// pilih materi: satu handler, satu frame
const pilihMateri = (slug) => { setLaci(false); setArah(urut(slug) > urut(aktif) ? 'maju' : 'mundur'); router.replace(`?materi=${slug}`) }
// pembungkus halaman belajar
<div className="belajar" data-lipat={lipat} data-fokus={fokus} data-panggung>
// kuis terbuka
<span className="lencana-kunci" data-baru={baruTerbuka}>{terbuka ? 'Siap' : 'Terkunci'}</span>
// baruTerbuka: true hanya di render saat status berubah dari terkunci ke terbuka (useEffect + setTimeout 400 → false)
```

## 4. Jendela (D)

Usulan: satu komponen `Jendela` berbasis `<dialog>` untuk skor, lencana, keluar, dan guru (kunci fokus, Esc, dan fokus-kembali gratis dari peramban).

```tsx
// components/Jendela.tsx
'use client'
import { useEffect, useRef } from 'react'
export default function Jendela({ buka, onTutup, kecil, children, label }) {
  const d = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const el = d.current!
    if (buka && !el.open) { el.showModal(); document.body.dataset.jendela = 'true' }
    if (!buka && el.open) { el.close(); delete document.body.dataset.jendela }
  }, [buka])
  return (
    <dialog ref={d} className={`jendela dialog-mantra ${kecil ? 'jendela-kecil' : ''}`} aria-label={label}
      onClose={onTutup} onClick={(e) => { if (e.target === e.currentTarget) onTutup() }}>
      {children}
    </dialog>
  )
}
```
Pakai CSS blok 6 dengan selector `.dialog-mantra` disamakan dengan `.dialog-guru` (satu bentuk jendela). Penghitung skor:

```ts
export function useHitung(target: number, aktif: boolean, ms = 900, tunda = 120) {
  const [n, setN] = useState(aktif ? 0 : target)
  useEffect(() => {
    if (!aktif || matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
    let id = 0; const t0 = performance.now()
    const langkah = (t: number) => { const k = Math.min(1, (t - t0 - tunda) / ms)
      if (k >= 0) setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) id = requestAnimationFrame(langkah) }
    id = requestAnimationFrame(langkah); return () => cancelAnimationFrame(id)
  }, [target, aktif])
  return n
}
// aktif = pertama kali per sesi: !sessionStorage.getItem(`matra:hitung-${halaman}`), lalu set.
```
TombolPasang: rakit selalu `<button className="pil-garis tombol-pasang" data-siap={siap}>`, jangan `return null`.

## 5. Materi, lipatan (E) · umpan balik (F) · daftar (G)

```tsx
<div className="panggung-isi" key={materi.slug} data-arah={arah}>…</div>
<aside className="kartu-bahas" data-baru={baruSajaDiperiksa}>…</aside>   // false saat soal yang pernah benar dibuka lagi
<button className={`opsi-mantra`} role="radio" aria-checked={dipilih} data-benar={cek && n === benar} data-salah={cek && dipilih && n !== benar}>
  <span className="huruf">A</span>{teks}{(dataBenar || dataSalah) && <span className="tanda">{dataBenar ? '✓' : '✕'}</span>}
</button>
<div className="kartu-soal" key={no} data-arah={arah}>…</div>            // Berikutnya, Sebelumnya, lompat peta: sama
<button className="pil-emas" style={{ minWidth: 128 }}><span className="label" key={cek ? 'Berikutnya' : 'Periksa'}>{…}</span></button>
<div className="kisi-bab" data-bertahap>{bab.map((b, i) => <article style={{ '--n': i }} …/>)}</div>
```
Ketukan tidak diblokir: tidak ada `disabled` selama animasi. `key` yang berganti memotong animasi yang sedang berjalan.

## 6. Korsel dan video (H) · memuat dan 404 (I) · gulir (K)

- Demo.tsx: `.demo-rel { transform: translateX(-${i*100}%) }`, jeda otomatis 7 s dihentikan saat hover, fokus, sentuh, dan saat `prefers-reduced-motion`. Semua slide `aspect-ratio` sama; slot video yang belum siap memakai balok `napas` seukuran slide.
- PemutarVideo.tsx: `data-putar` pada pembungkus saat play; `.lencana-geser[data-tampil]` dinyalakan 700 ms lalu dimatikan (transisi keluar 200 ms tersirat); `.video-galat` memudar masuk; subtitle tanpa transisi.
- not-found.tsx: dipertahankan; tambah `data-selesai` setelah 2,2 s (setTimeout) supaya re-render tidak mengulang.
- MunculSaatGulir.tsx: `threshold: 0.2, rootMargin: '0px 0px -40px'`, `unobserve` setelah tampil, kelas `.muncul-gulir[data-tampil]` menggantikan `style={{opacity:0}}`.
- PitaKurva.tsx: hapus animasi titik berjalan (11 s, 16 s) dan glyph mengapung (13, 17, 21 s). Kurva 3,4 s tetap. LogoParalaks: matikan di `(pointer: coarse)`.

## 7. Daftar periksa pemindahan, urut dari dampak terbesar

1. Token dan keyframes ke globals.css; hapus `main { animation: tab-masuk }`.
2. Nav ke layout.tsx + ArahRute + View Transition (`experimental.viewTransition`); Tautan sebagai cadangan.
3. Nav tidak return null saat fokus; `data-fokus` + `inert`; garis tab lewat `--garis-x/--garis-w`.
4. Jendela (skor, lencana, keluar, guru) ke satu komponen `<dialog>`; `body[data-jendela]` mengecilkan `[data-panggung]` di desktop.
5. Laci HP + tirai lewat portal; `pilihMateri` satu handler.
6. `.belajar[data-lipat|data-fokus]` grid-template-columns; label pohon memudar.
7. `key` + `data-arah` pada panggung-isi, kartu-soal, remah, label tombol, nav-meta.
8. `kartu-bahas[data-baru]`, `opsi-mantra .tanda`, tanpa goyang.
9. `useHitung` + sessionStorage `matra:hitung-*` untuk batang dan angka.
10. `.alat-sisip { min-height }`, TombolPasang selalu dirakit, `lencana-kunci[data-baru]`.
11. Demo, PemutarVideo, MunculSaatGulir, PitaKurva (hapus titik dan glyph), not-found `data-selesai`.
12. `[data-bertahap]` hanya di kisi-bab, kartu-latihan, kisi-soal; dimatikan saat `html[data-transisi]`.

## 8. Daftar periksa audit

- Reduced motion: nyalakan di OS; semua durasi 0, jendela tetap muncul, menu tetap terbuka, angka langsung, kurva 404 langsung tergambar, korsel tidak otomatis.
- Tanpa pergeseran tata letak: Coba sendiri, PWA, kerangka → isi, label tombol; ukur dengan Layout Shift di alat pengembang = 0.
- Fokus dan Esc: setiap jendela, Esc menutup; Tab tidak keluar dari jendela; fokus kembali ke pembuka; tombol utama mendapat fokus awal.
- 60 fps CPU 4×: pindah halaman, jendela di desktop (tiga lapisan), laci HP, mode fokus; periksa tidak ada layout per frame kecuali grid-template-columns yang disengaja.
- Ketukan tidak diblokir: tekan Berikutnya 5× cepat, Lihat skor 2× cepat, Lanjut materi 3× cepat: tidak menumpuk, tidak mati.
- Konsisten: satu jendela (`.dialog-mantra`), satu laci (`.pohon[data-buka]`), satu pindah halaman (`::view-transition-*(isi)`); grep tidak ada `tab-masuk`, `shake`, `goyang`, `infinite` selain `napas`, `putar`, dan korsel.
- Teks: tidak ada em-dash; istilah lama untuk "Sering keliru" tidak muncul.
