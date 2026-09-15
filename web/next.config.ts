import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lencana indikator dev Next.js menutupi teks "skala tampilan" di pojok
  // kiri bawah widget, sehingga mengganggu screenshot verifikasi.
  // Kesalahan kompilasi & runtime tetap ditampilkan.
  devIndicators: false,

  /**
   * Jalur cadangan video lewat asal situs sendiri. Biasanya video diambil
   * langsung dari Worker Cloudflare (NEXT_PUBLIC_ASAL_VIDEO). Pada jaringan
   * tertentu (15 Sep 2026: resolver Telkomsel memetakan host Cloudflare ke
   * IPv6 ULA fd00::, lalu Chrome memblokir permintaan lintas asal ke "alamat
   * lokal" itu), pemutar mencoba jalur ini sebagai cadangan. Vercel
   * meneruskannya sebagai proxy (Range ikut), dan lalu lintasnya dihitung
   * sebagai Fast Origin Transfer (Hobby 10 GB/bulan), jadi HANYA untuk
   * kegagalan, bukan jalur utama.
   */
  async rewrites() {
    const asal = (process.env.NEXT_PUBLIC_ASAL_VIDEO ?? '').replace(/\/+$/, '')
    if (!asal) return []
    return [{ source: '/video-cadangan/:nama', destination: `${asal}/:nama` }]
  },

  async headers() {
    return [
      {
        // Video, subtitle, poster, dan logo: berkas berat yang isinya tidak
        // pernah berubah tanpa ganti nama. Tanpa aturan ini Next melayaninya
        // dengan `max-age=0`, sehingga tiap pindah materi peramban menanyakan
        // ulang ke server. Dengan `immutable`, video yang sudah pernah dibuka
        // langsung diambil dari peramban: siswa berkuota terbatas tidak
        // mengunduh 4 MB dua kali, dan berpindah materi terasa seketika.
        //
        // KALAU VIDEO DIGANTI ISINYA: ganti juga nama berkasnya, atau
        // peramban siswa akan tetap memutar yang lama sampai setahun.
        source: '/:path(anim|merek|gambar)/:file*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Petugas simpanan video: peramban harus selalu menanyakan versi
        // terbarunya, supaya perbaikan petugas sampai ke siswa dalam sekali
        // kunjungan, bukan setelah salinannya kedaluwarsa.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, max-age=0' },
        ],
      },
    ]
  },
}

export default nextConfig
