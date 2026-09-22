import type { MetadataRoute } from 'next'

/**
 * Berkas ini yang membuat tombol "Pasang di HP" bisa muncul.
 *
 * Peramban hanya menawarkan pemasangan kalau situs punya manifest yang sah,
 * ikon minimal 192 dan 512 piksel, DAN dilayani lewat HTTPS. Di localhost
 * syarat HTTPS-nya dilonggarkan untuk Chrome desktop, tetapi di HP tombolnya
 * baru benar-benar muncul setelah situs ini online.
 *
 * Jadi: berkasnya siap sekarang, tombolnya menyala sendiri begitu di-deploy.
 * Tidak ada pekerjaan tambahan yang tertinggal.
 *
 * `display: standalone` membuatnya terbuka tanpa bilah alamat, sehingga terasa
 * seperti aplikasi, bukan pintasan biasa.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MANTRA - Matematika Interaktif',
    short_name: 'MANTRA',
    description:
      'Belajar matematika SMA lewat animasi yang menjelaskan dan alat yang bisa dicoba sendiri.',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#FAF9F5',
    theme_color: '#101A2B',
    lang: 'id',
    categories: ['education'],
    /* IKON MASKABLE PUNYA BERKAS SENDIRI (ARYA 22 Sep 2026: lambang terpotong
       di layar pembuka aplikasi yang sudah dipasang).
       Android memotong ikon maskable ke "zona aman": lingkaran 80 persen di
       tengah. Sampai 21 Sep ikon yang sama dipakai untuk 'any' DAN
       'maskable', padahal gambarnya penuh sampai tepi, jadi huruf M-nya
       terpangkas kiri kanan. Sekarang:
         ikon-v2-*        latar navy bersudut bulat, lambang 74 persen
         ikon-maskable-*  latar navy penuh, lambang 54 persen (muat di
                          lingkaran 80 persen: 0,54 x akar2 = 0,76)
       NAMA BERKASNYA SENGAJA BARU. Aplikasi yang sudah dipasang (WebAPK)
       menyimpan salinan ikonnya sendiri dan hanya memperbaruinya kalau ISI
       manifest berubah; mengganti gambar di alamat yang sama tidak pernah
       sampai ke HP yang sudah memasang. */
    icons: [
      { src: '/merek/ikon-v2-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/merek/ikon-v2-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/merek/ikon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/merek/ikon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
