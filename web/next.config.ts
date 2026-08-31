import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lencana indikator dev Next.js menutupi teks "skala tampilan" di pojok
  // kiri bawah widget, sehingga mengganggu screenshot verifikasi.
  // Kesalahan kompilasi & runtime tetap ditampilkan.
  devIndicators: false,
}

export default nextConfig
