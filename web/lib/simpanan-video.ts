/**
 * Simpanan video di perangkat siswa (Cache Storage), pasangan dari
 * public/sw.js. Halaman (PemutarVideo) yang MENGISI simpanan lewat
 * `simpanVideo` saat video ditonton hampir habis: berkas diunduh utuh sekali
 * lagi lalu ditaruh di Cache Storage; petugasnya (service worker) hanya
 * melayani dari simpanan itu. Unduhan kedua ini disengaja: menyalin arus
 * pemutaran di dalam service worker berisiko memutus videonya bila petugas
 * dihentikan peramban (lihat catatan di public/sw.js). Di laptop, unduhan
 * kedua biasanya terlayani dari cache HTTP peramban.
 *
 * Semua fungsi aman dipanggil di peramban yang tidak mendukungnya: hasilnya
 * "tidak ada" dan tidak ada yang meledak. Di server tidak pernah dipanggil
 * (semua pemakainya komponen klien di dalam useEffect).
 */
export const NAMA_SIMPANAN = 'mantra-video-v1'

export function simpananTersedia(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'caches' in window &&
    window.isSecureContext
  )
}

export async function daftarkanPetugas(): Promise<void> {
  if (!simpananTersedia()) return
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch {
    // tanpa petugas, video tetap diputar dari jaringan seperti biasa
  }
}

/** Alamat video (sudah lewat alamatAnim) yang tersimpan utuh? */
export async function apakahTersimpan(alamat: string): Promise<boolean> {
  if (!simpananTersedia()) return false
  try {
    const cache = await caches.open(NAMA_SIMPANAN)
    const penuh = new URL(alamat, window.location.href).href
    return (await cache.match(penuh)) !== undefined
  } catch {
    return false
  }
}

export type RingkasanSimpanan = { jumlah: number; byte: number }

export async function ringkasanSimpanan(): Promise<RingkasanSimpanan> {
  const kosong = { jumlah: 0, byte: 0 }
  if (!simpananTersedia()) return kosong
  try {
    const cache = await caches.open(NAMA_SIMPANAN)
    let byte = 0
    const kunci = await cache.keys()
    for (const k of kunci) {
      const r = await cache.match(k)
      byte += Number(r?.headers.get('content-length')) || 0
    }
    return { jumlah: kunci.length, byte }
  } catch {
    return kosong
  }
}

/** Unduh video utuh lalu simpan di bawah kunci `alamat`; versi lama alamat
 *  yang sama dibuang. `alamatCadangan` (jalur lewat asal situs sendiri)
 *  dicoba bila alamat utamanya gagal, misalnya diblokir peramban; isinya
 *  tetap disimpan di bawah kunci alamat utama supaya pemutar (yang memakai
 *  alamat utama saat sumbernya 'simpanan') menemukannya. */
export async function simpanVideo(alamat: string, alamatCadangan = ''): Promise<boolean> {
  if (!simpananTersedia()) return false
  try {
    const penuh = new URL(alamat, window.location.href)
    const cache = await caches.open(NAMA_SIMPANAN)
    if (await cache.match(penuh.href)) return true
    // mode cors: Worker mengirim Access-Control-Allow-Origin *, jadi isinya
    // terbaca dan boleh disimpan (jawaban buram/opaque ditolak cache.put
    // untuk dipotong-potong nanti).
    let r: Response | null = null
    try {
      r = await fetch(penuh.href, { mode: 'cors', credentials: 'omit' })
    } catch {
      r = null
    }
    if ((!r || !r.ok) && alamatCadangan) {
      r = await fetch(new URL(alamatCadangan, window.location.href).href, { credentials: 'omit' })
    }
    if (!r || !r.ok || r.status !== 200 || !r.body) return false
    await cache.put(penuh.href, r)
    for (const k of await cache.keys()) {
      const ku = new URL(k.url)
      if (ku.origin === penuh.origin && ku.pathname === penuh.pathname && ku.search !== penuh.search) {
        await cache.delete(k)
      }
    }
    return true
  } catch {
    return false
  }
}

export async function hapusSemuaSimpanan(): Promise<void> {
  if (!simpananTersedia()) return
  try {
    await caches.delete(NAMA_SIMPANAN)
  } catch {
    // dibiarkan: paling buruk simpanannya tetap ada
  }
}

export function teksMB(byte: number): string {
  const mb = byte / 1048576
  return (mb >= 100 ? mb.toFixed(0) : mb.toFixed(1)).replace('.', ',') + ' MB'
}
