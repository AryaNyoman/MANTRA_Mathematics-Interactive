'use client'

import GaleriNyata, { type KartuNyata } from '@/components/widget/GaleriNyata'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Galeri "Statistika di sekitar kita", Materi 14. Tidak interaktif.
 *
 * Permintaan ARYA 5 Sep 2026: Statistika belum punya materi contoh nyata
 * seperti topik lain. Sejak 18 Sep 2026 tiap kartu berfoto asli (Wikimedia
 * Commons, lisensi bebas, catatan di public/gambar/sumber.json), atas
 * permintaan ARYA ("namanya juga penerapan di dunia nyata"); grafik kecil
 * buatan sendiri yang dulu ada digantikan foto (pilihan ARYA: bab ini foto
 * saja). Grafik yang sesungguhnya sudah dipelajari siswa di widget Materi 01
 * sampai 13.
 *
 * ANGKANYA ANGKA CONTOH. Semua angka di kartu dan di bacaan Materi 14 dibuat
 * mirip kenyataan supaya cara membacanya terasa nyata, tetapi bukan data
 * resmi mana pun, dan bacaannya menyatakan itu. Yang dipelajari adalah cara
 * bertanya, bukan angkanya.
 *
 * Tiap kartu menyebut alat mana dari Materi 01 sampai 13 yang sedang bekerja,
 * supaya siswa melihat benang merahnya: tidak ada alat baru di sini.
 */
export const KARTU: KartuNyata[] = [
  {
    id: 'rapor', gambar: 'statistika/nilai-rapor.jpg', nomor: '01',
    judul: 'Nilai rapor satu kelas',
    inti: 'Rata-rata 7,35 terdengar bagus, tetapi histogramnya memperlihatkan sebelas siswa di angka 6. Median kelas ini 6, dan itulah yang lebih jujur tentang siswa "biasa".',
    rumus: 'histogram · median (Materi 02, 05)',
  },
  {
    id: 'hujan', gambar: 'statistika/curah-hujan.jpg', nomor: '02',
    judul: 'Curah hujan sepanjang tahun',
    inti: 'Petani dan pengelola waduk tidak butuh rata-rata setahun. Yang mereka baca dari alat ukur hujan adalah KAPAN hujan datang dan bulan mana yang paling basah, dan diagram garis menjawabnya.',
    rumus: 'diagram garis · modus (Materi 02, 05)',
  },
  {
    id: 'pemain', gambar: 'statistika/pemain-laga.jpg', nomor: '03',
    judul: 'Memilih pemain untuk laga penentuan',
    inti: 'Dua penendang penalti sama-sama rata-rata 15 poin per musim. Pemain A selalu 13 sampai 17, pemain B kadang 4 kadang 28. Simpangan bakunya yang membedakan, dan pelatih memilih yang bisa diandalkan.',
    rumus: 'simpangan baku (Materi 08)',
  },
  {
    id: 'kantin', gambar: 'statistika/jajanan-kantin.jpg', nomor: '04',
    judul: 'Survei jajanan kantin',
    inti: '"60% memilih gorengan." Sebelum menunya diubah, tanyakan dulu: 60% dari berapa orang, ditanya di mana, dan jam berapa?',
    rumus: 'frekuensi relatif (Materi 04)',
  },
  {
    id: 'iklan', gambar: 'statistika/grafik-iklan.jpg', nomor: '05',
    judul: 'Grafik di iklan dan berita',
    inti: 'Angka yang sama, dua kesan berbeda. Dari 486 ke 512 hanya naik sekitar 5 persen, tetapi sumbu yang dipotong membuatnya tampak berlipat. Papan harga saham dan grafik berita sering dibaca terburu-buru.',
    rumus: 'sumbu yang jujur (Materi 13)',
  },
  {
    id: 'belajar', gambar: 'statistika/jam-belajar.jpg', nomor: '06',
    judul: 'Jam belajar dan nilai ujian',
    inti: 'Titik-titiknya naik ke kanan, hubungannya nyata. Tetapi belajar lama bukan satu-satunya sebab: tidur, buku, dan pemahaman awal ikut bermain.',
    rumus: 'diagram pencar · korelasi (Materi 10, 12)',
  },
]

export default function DuniaNyataStatistika({ children }: PropWidget) {
  const kiri = (
    <div className="isi-gulir">
      <GaleriNyata kartu={KARTU} />
    </div>
  )
  return <>{children({ kiri, kanan: null })}</>
}
