import { petakSumbu } from '@/lib/petak-sumbu'
/**
 * Penskalaan dan tata letak bidang gambar untuk widget Statistika.
 *
 * KENAPA BUKAN MEMAKAI PUNYA LIMIT
 * NAMANYA `skala.ts`, BUKAN `papan.ts`. Nama Papan sudah dipakai komponen
 * bingkainya, dan Windows tidak membedakan huruf besar-kecil pada nama
 * berkas, sehingga `papan.ts` dan `Papan.tsx` dianggap berkas yang sama lalu
 * TypeScript menolak keduanya. Jebakan yang sama pernah kena di proyek ini
 * pada pasangan `bidang.ts` dan `Bidang.tsx`.
 *
 * `components/widget/limit/koordinat.ts` mengerjakan hal yang mirip, tetapi
 * berkas itu milik topik lain dan aturan sesi paralel melarang saya
 * mengubahnya. Mengimpornya juga bukan jalan keluar yang baik: itu membuat
 * topik Statistika ikut rusak kalau folder Limit dirapikan. Jadi bagian yang
 * dibutuhkan ditulis ulang di sini, dan sisanya memang berbeda, sebab widget
 * statistika butuh sumbu kategori dan garis bilangan satu arah yang tidak ada
 * di topik Limit.
 *
 * Saran untuk MASTER dicatat di laporan sesi: kalau nanti ada topik ketiga yang
 * butuh hal sama, naikkan bagian yang berulang ini menjadi alat bersama.
 *
 * ATURAN YANG DIJAGA BERKAS INI
 * Widget tidak boleh memotong gambarnya sendiri. Karena itu jendela tampilan
 * SELALU dihitung dari data yang sedang ditampilkan, bukan dipatok angka tetap,
 * dan selalu diberi ruang tepi. Aturan itu lahir dari bug yang ditemukan ARYA
 * pada 31 Agustus 2026.
 */

/** Ukuran bidang gambar. Sama dengan widget Limit supaya seragam sesitus. */
export const VW = 460
export const VH = 300

export type Tepi = { kiri: number; kanan: number; atas: number; bawah: number }

/** Ruang tepi baku. Kiri paling lebar sebab angka sumbu tegak ditulis di situ. */
export const TEPI: Tepi = { kiri: 46, kanan: 18, atas: 22, bawah: 34 }

/**
 * Ruang tepi untuk sumbu kategori yang namanya panjang.
 *
 * Nama seperti "Sepeda motor" dipecah jadi dua baris oleh bingkainya, dan baris
 * keduanya menabrak judul sumbu kalau ruang bawahnya cuma 34. Ini bukan dugaan:
 * tabrakannya terlihat di potret layar sebelum angka ini dinaikkan.
 */
export const TEPI_KATEGORI: Tepi = { kiri: 46, kanan: 18, atas: 22, bawah: 50 }

export type Kotak = { x0: number; y0: number; x1: number; y1: number }

export function kotak(tepi: Tepi = TEPI): Kotak {
  return { x0: tepi.kiri, y0: tepi.atas, x1: VW - tepi.kanan, y1: VH - tepi.bawah }
}

export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Ubah koordinat data menjadi koordinat layar SVG. */
export function keLayar(j: Jendela, tepi: Tepi = TEPI) {
  const k = kotak(tepi)
  const lebar = k.x1 - k.x0
  const tinggi = k.y1 - k.y0
  const rentangX = j.xMax - j.xMin || 1
  const rentangY = j.yMax - j.yMin || 1
  return {
    x: (x: number) => k.x0 + ((x - j.xMin) / rentangX) * lebar,
    /** sumbu tegak layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => k.y1 - ((y - j.yMin) / rentangY) * tinggi,
    /** panjang mendatar dalam satuan data, diubah jadi piksel */
    lebarX: (d: number) => (d / rentangX) * lebar,
    /** panjang tegak dalam satuan data, diubah jadi piksel */
    tinggiY: (d: number) => (d / rentangY) * tinggi,
    kotak: k,
  }
}

/** Kebalikannya: dari koordinat layar kembali ke satuan data. Untuk seretan. */
export function keData(j: Jendela, tepi: Tepi = TEPI) {
  const k = kotak(tepi)
  const lebar = k.x1 - k.x0
  const tinggi = k.y1 - k.y0
  return {
    x: (px: number) => j.xMin + ((px - k.x0) / lebar) * (j.xMax - j.xMin),
    y: (py: number) => j.yMin + ((k.y1 - py) / tinggi) * (j.yMax - j.yMin),
  }
}

/**
 * Jendela yang pasti memuat semua nilai, ditambah ruang tepi.
 *
 * Kalau semua nilainya sama, jendelanya tetap dibuat punya lebar. Jendela
 * berlebar nol membuat pembagian menjadi tak hingga dan gambarnya hilang sama
 * sekali, dan itu terlihat seperti widget rusak.
 */
export function rentangMuat(nilai: number[], tepi = 0.1): { min: number; maks: number } {
  const layak = nilai.filter((v) => Number.isFinite(v))
  if (layak.length === 0) return { min: 0, maks: 1 }
  const min = Math.min(...layak)
  const maks = Math.max(...layak)
  const lebar = maks - min || Math.max(Math.abs(min), 1)
  return { min: min - lebar * tepi, maks: maks + lebar * tepi }
}

/** Angka gaya Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return 'tidak ada'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return rapi.replace('.', ',')
}

/** Angka yang selalu menampilkan sekian desimal, untuk kolom yang harus rata. */
export function angkaTetap(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return 'tidak ada'
  return n.toFixed(desimal).replace('.', ',')
}

export type Petak = { nilai: number; label: string }

/**
 * Garis petak dengan angka yang enak dibaca: kelipatan 1, 2, atau 5 dikali
 * pangkat sepuluh, dan jumlahnya wajar.
 */
export function petak(min: number, maks: number, target = 6): Petak[] {
  // `target` tidak dipakai lagi. Sejak 5 Sep 2026 banyaknya label tidak
  // ditebak, melainkan dihitung dari ruang: lihat lib/petak-sumbu.ts. Angka
  // 400 adalah panjang kotak gambar yang lazim (viewBox 460 dikurangi tepi);
  // bidang yang tahu panjang sumbunya persis memanggil petakSumbu langsung.
  void target
  return petakSumbu(min, maks, 400)
}

/**
 * Pembagian mendatar untuk data kategori.
 *
 * Menyisakan sela di antara batang. `dataviz` meminta jarak antar isian
 * sedikitnya 2 piksel supaya dua batang bersebelahan tidak terbaca menyatu.
 */
export function pita(banyak: number, tepi: Tepi = TEPI, renggang = 0.28) {
  const k = kotak(tepi)
  const langkah = (k.x1 - k.x0) / Math.max(banyak, 1)
  const lebar = Math.max(langkah * (1 - renggang), 2)
  return {
    langkah,
    lebar,
    /** tengah pita ke-i */
    tengah: (i: number) => k.x0 + langkah * (i + 0.5),
    /** tepi kiri batang ke-i */
    kiri: (i: number) => k.x0 + langkah * (i + 0.5) - lebar / 2,
  }
}

/**
 * Penunjuk skala. Wajib pada widget yang tampilannya bisa berubah lebar, supaya
 * siswa tahu ia sedang melihat rentang selebar apa dan tidak mengira bentuk
 * datanya yang berubah.
 */
export function labelSkala(min: number, maks: number, satuan: string): string {
  const lebar = maks - min
  const desimal = lebar < 1 ? 2 : lebar < 10 ? 1 : 0
  return `tampilan selebar ${angka(lebar, desimal)} ${satuan}`
}
