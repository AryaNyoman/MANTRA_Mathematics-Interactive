/**
 * Pemuat bekal di server: membaca web/bekal/*.json sekali per proses.
 * Berkasnya dibuat alat/bekal_asisten.mjs dan ikut fungsi Vercel lewat
 * `outputFileTracingIncludes` di next.config.ts.
 */
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import type { BekalMateri, IndeksBekal, Potongan } from './jenis'
import { buatIndeks, cari, type Indeks } from './cari.ts'

const AKAR = path.join(process.cwd(), 'bekal')
const bekalCache = new Map<string, BekalMateri | null>()
const indeksCache = new Map<string, Indeks>()
let indeksBekal: IndeksBekal | null = null

export function muatBekal(bab: string, materi: string): BekalMateri | null {
  const kunci = `${bab}/${materi}`
  if (!bekalCache.has(kunci)) {
    const jalur = path.join(AKAR, bab, `${materi}.json`)
    bekalCache.set(kunci, existsSync(jalur) ? (JSON.parse(readFileSync(jalur, 'utf8')) as BekalMateri) : null)
  }
  return bekalCache.get(kunci) ?? null
}

export function muatIndeks(): IndeksBekal {
  if (!indeksBekal) indeksBekal = JSON.parse(readFileSync(path.join(AKAR, 'indeks.json'), 'utf8')) as IndeksBekal
  return indeksBekal
}

export function cariPotongan(bab: string, kueri: string): Potongan[] {
  let indeks = indeksCache.get(bab)
  if (!indeks) {
    const jalur = path.join(AKAR, 'potongan', `${bab}.json`)
    indeks = buatIndeks(existsSync(jalur) ? (JSON.parse(readFileSync(jalur, 'utf8')) as Potongan[]) : [])
    indeksCache.set(bab, indeks)
  }
  return cari(indeks, kueri, 5)
}
