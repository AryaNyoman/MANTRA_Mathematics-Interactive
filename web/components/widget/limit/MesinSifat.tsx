'use client'

/**
 * Widget "Mesin Sifat Limit", Limit tahap 5.
 *
 * Siswa memilih sifat mana yang dipakai di tiap langkah. Kalau tepat, langkahnya
 * terbuka dan soalnya menyusut. Kalau keliru, mesin menolak DAN menyebutkan
 * alasannya, karena penolakan tanpa alasan tidak mengajari apa-apa.
 *
 * Soal ketiga sengaja tidak bisa diselesaikan dengan sifat mana pun. Itu bukan
 * jebakan iseng: batas kemampuan sebuah cara justru lebih mudah diingat kalau
 * pernah ditabrak sendiri, dan itulah pintu masuk ke Materi 06.
 *
 * Bukan SVG melainkan HTML biasa, karena isinya susunan langkah dan tombol,
 * bukan gambar. Ditaruh di dalam `.isi-gulir`, seperti widget Dunia Nyata.
 */

export type Sifat = 'dasar' | 'kelipatan' | 'jumlah' | 'kali' | 'bagi' | 'pangkat' | 'akar'

export const NAMA_SIFAT: Record<Sifat, string> = {
  dasar: 'Sifat dasar',
  kelipatan: 'Kelipatan',
  jumlah: 'Jumlah dan selisih',
  kali: 'Hasil kali',
  bagi: 'Hasil bagi',
  pangkat: 'Pangkat',
  akar: 'Akar',
}

export const URUT_SIFAT: Sifat[] = ['dasar', 'kelipatan', 'jumlah', 'kali', 'bagi', 'pangkat', 'akar']

type Langkah = { sifat: Sifat; tampil: string; catatan: string }

export type SoalSifat = {
  judul: string
  langkah: Langkah[]
  /** kalau ada, soalnya memang tidak bisa diselesaikan dengan sifat limit */
  buntu?: string
  jawaban?: string
}

export const SOAL_SIFAT: SoalSifat[] = [
  {
    judul: 'lim (3x² - x + 4) : (x + 2)   saat x menuju 2',
    langkah: [
      {
        sifat: 'bagi',
        tampil: '[ lim (3x² - x + 4) ] : [ lim (x + 2) ]',
        catatan: 'Boleh, karena limit penyebutnya 2 + 2 = 4, bukan nol. Periksa syarat ini SEBELUM memisahkan.',
      },
      {
        sifat: 'jumlah',
        tampil: '[ lim 3x² - lim x + lim 4 ] : [ lim x + lim 2 ]',
        catatan: 'Limit dari penjumlahan sama dengan penjumlahan limitnya. Berlaku juga untuk pengurangan.',
      },
      {
        sifat: 'kelipatan',
        tampil: '[ 3 · lim x² - lim x + lim 4 ] : [ lim x + lim 2 ]',
        catatan: 'Angka pengali boleh dikeluarkan dari limit. Angka 3 tidak dipengaruhi oleh x.',
      },
      {
        sifat: 'pangkat',
        tampil: '[ 3 · (lim x)² - lim x + lim 4 ] : [ lim x + lim 2 ]',
        catatan: 'Limit boleh masuk ke dalam pangkat. Sekarang semuanya tinggal limit dari x dan limit dari angka.',
      },
      {
        sifat: 'dasar',
        tampil: '[ 3 · 2² - 2 + 4 ] : [ 2 + 2 ]  =  14 : 4',
        catatan: 'Limit dari x adalah 2, limit dari angka tetap adalah angka itu sendiri. Selesai.',
      },
    ],
    jawaban: '14 : 4  =  7/2  =  3,5',
  },
  {
    judul: 'lim √x : (x² + 3x)   saat x menuju 4',
    langkah: [
      {
        sifat: 'bagi',
        tampil: '[ lim √x ] : [ lim (x² + 3x) ]',
        catatan: 'Boleh, karena limit penyebutnya 16 + 12 = 28, bukan nol.',
      },
      {
        sifat: 'akar',
        tampil: '[ √(lim x) ] : [ lim (x² + 3x) ]',
        catatan: 'Limit boleh masuk ke dalam akar, asalkan isinya tidak negatif. Di sini isinya 4, aman.',
      },
      {
        sifat: 'jumlah',
        tampil: '[ √(lim x) ] : [ lim x² + lim 3x ]',
        catatan: 'Penyebutnya dipecah jadi dua suku.',
      },
      {
        sifat: 'dasar',
        tampil: '[ √4 ] : [ 16 + 12 ]  =  2 : 28',
        catatan: 'Masukkan limit x sama dengan 4 ke mana-mana. Selesai.',
      },
    ],
    jawaban: '2 : 28  =  1/14',
  },
  {
    judul: 'lim (x² - 4) : (x - 2)   saat x menuju 2',
    langkah: [],
    buntu:
      'Sifat hasil bagi TIDAK berlaku di sini, karena limit penyebutnya 2 - 2 = 0. Sifat yang lain pun tidak menolong, sebab masalahnya bukan pada susunan melainkan pada bentuknya: kalau angkanya dipaksa masuk, hasilnya 0 dibagi 0. Soal seperti ini dikerjakan dengan cara lain, dan caranya ada di Materi 06.',
  },
]

export default function MesinSifat({
  soal, langkah, pesan, onPilih,
}: {
  soal: number
  /** berapa langkah yang sudah terbuka */
  langkah: number
  /** keterangan penolakan, kalau pilihan terakhir keliru */
  pesan: string | null
  onPilih: (s: Sifat) => void
}) {
  const s = SOAL_SIFAT[Math.min(Math.max(soal, 0), SOAL_SIFAT.length - 1)]
  const selesai = !s.buntu && langkah >= s.langkah.length

  return (
    <div className="mesin">
      <div className="mesin-soal">{s.judul}</div>

      <ol className="mesin-langkah">
        {s.langkah.slice(0, langkah).map((l, i) => (
          <li key={i}>
            <div className="mesin-cap">{NAMA_SIFAT[l.sifat]}</div>
            <div className="mesin-bentuk">{l.tampil}</div>
            <div className="mesin-catatan">{l.catatan}</div>
          </li>
        ))}
      </ol>

      {s.buntu && (
        <div className="mesin-tolak" role="status">
          <b>Mesin berhenti.</b>
          <p>{s.buntu}</p>
        </div>
      )}

      {selesai && (
        <div className="mesin-selesai" role="status">
          <b>Selesai.</b> Limitnya {s.jawaban}
        </div>
      )}

      {pesan && !selesai && (
        <div className="mesin-tolak" role="status">
          <b>Belum tepat.</b>
          <p>{pesan}</p>
        </div>
      )}

      {!selesai && (
        <div className="mesin-pilihan">
          <div className="mesin-tanya">
            {s.buntu
              ? 'Silakan coba sifat mana pun. Tidak ada yang berhasil, dan itu memang yang mau ditunjukkan.'
              : `Sifat mana yang dipakai untuk langkah ke-${langkah + 1}?`}
          </div>
          <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
            {URUT_SIFAT.map((k) => (
              <button key={k} onClick={() => onPilih(k)} style={{ flex: '1 1 30%' }}>
                {NAMA_SIFAT[k]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
