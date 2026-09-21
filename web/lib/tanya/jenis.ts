/** Tipe bersama Asisten Tanya; impor relatif supaya Node (alat, uji) dan Next sama-sama bisa memuat. */

export type Istilah = { istilah: string; arti: string }

export type Kutipan = { sumber: string; label: string; teks: string; token: number }

export type BekalMateri = {
  bab: string
  namaBab: string
  sub: { huruf: string; nama: string } | null
  no: number
  slug: string
  judul: string
  pertanyaan: string
  sebelum: { no: number; slug: string; judul: string } | null
  sesudah: { no: number; slug: string; judul: string } | null
  /** seluruh materi bab ini; tautan [[bab:slug]] hanya boleh dari sini */
  daftar?: { no: number; slug: string; judul: string }[]
  bacaan: string
  istilah: Istilah[]
  kutipan: Kutipan[]
  token: { bacaan: number; istilah: number; kutipan: number; total: number }
}

export type Potongan = {
  id: string
  bab: string
  materi: string | null
  sumber: string
  judul: string
  teks: string
}

export type IndeksBekal = Record<
  string,
  { nama: string; materi: Record<string, { no: number; judul: string; sub: string | null }> }
>

/**
 * Satu giliran percakapan. `kutipan` (sejak 21 Sep 2026) = teks yang diblok
 * siswa, disimpan terpisah dari pertanyaannya supaya di panel dan PDF
 * keduanya bisa dibedakan warnanya dan susunan barisnya terjaga; ke server
 * keduanya digabung jadi satu `teks` (penapis hanya mengenal peran dan teks).
 */
export type PesanRiwayat = { peran: 'siswa' | 'asisten'; teks: string; kutipan?: string }

export type GambarTanya = { jenis: 'image/jpeg' | 'image/png' | 'image/webp'; data: string }

export type PermintaanTanya = {
  bab: string
  materi: string
  kutipan: string
  pertanyaan: string
  riwayat: PesanRiwayat[]
  gambar: GambarTanya | null
}
