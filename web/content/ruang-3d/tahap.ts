import type { Tahap } from '@/content/tipe'

/**
 * Isi topik Ruang Tiga Dimensi.
 *
 * KEADAAN SEKARANG: baru tahap 1, dan tahap itu pun baru berisi ajakan mencoba
 * alatnya, belum penjelasan materinya.
 *
 * Sebabnya keputusan ARYA 1 September 2026 di gerbang rancangan: buku sumber
 * untuk geometri ruang tidak ada di koleksinya, dan ARYA memilih menunggu
 * sampai ia mencarikan berkasnya. Jadi yang dikerjakan lebih dulu adalah alat
 * pemeriksa jawaban dan mesin gambar 3D, dua hal yang tidak bergantung pada
 * buku mana pun. Sembilan tahap sisanya menyusul begitu sumbernya ada.
 *
 * Rancangan lengkap kesepuluh tahapnya:
 * `docs/superpowers/specs/2026-09-01-ruang-3d-alur-belajar.md`
 */

export const TAHAP: Tahap[] = [
  {
    no: 1,
    slug: 'gambar-boleh-berbohong',
    judul: 'Gambar ruang boleh berbohong',
    pertanyaan:
      'Dua garis ini jelas berpotongan di gambar. Kenapa di benda aslinya tidak?',
    labelPendek: 'Gambar yang menipu',
    widget: 'kubus-putar',
    siap: true,
    penjelasan: [
      { jenis: 'sesi', judul: 'Coba dulu, baru dibahas' },
      {
        jenis: 'paragraf',
        teks:
          'Di sebelah kiri ada kubus ABCD.EFGH. Dua ruas garis diberi warna: BD di alas, dan EG di tutup. Pada tampilan awalnya, keduanya menyilang tepat di tengah gambar.',
      },
      {
        jenis: 'coba',
        teks: 'Tarik kubusnya, lalu perhatikan kedua ruas berwarna itu.',
        langkah: [
          'Tarik ke kiri atau ke kanan untuk memutari kubusnya.',
          'Tarik ke atas atau ke bawah untuk mengubah ketinggian mata.',
          'Perhatikan tulisan di bawah gambar: kapan ia berubah dari tampak berpotongan menjadi tampak terpisah.',
        ],
      },
      {
        jenis: 'sorot',
        teks:
          'Yang berubah cuma sudut pandangnya. Kubusnya sendiri sama sekali tidak berubah.',
      },
    ],
  },
]
