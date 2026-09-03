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
    icons: [
      { src: '/merek/ikon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/merek/ikon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/merek/ikon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
