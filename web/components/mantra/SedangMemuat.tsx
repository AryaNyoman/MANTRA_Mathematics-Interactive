/**
 * Kerangka halaman materi selagi isinya belum siap.
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 578.
 *
 * Menggantikan kotak kosong setinggi 70vh yang dipakai sebagai cadangan
 * Suspense sebelumnya. Kotak kosong tidak berbohong, tetapi juga tidak
 * memberi tahu apa pun: siswa berjaringan lambat tidak tahu apakah halaman
 * sedang bekerja atau sudah menyerah.
 *
 * Balok BERNAPAS (memudar bolak-balik), bukan berkilau menyapu. Kilau
 * menyiratkan sesuatu sedang bergerak masuk, padahal yang terjadi cuma
 * menunggu. Ini satu dari dua gerak berulang yang diizinkan aturan gerak
 * v2, dan alasannya memang itu: penanda memuat.
 *
 * `aria-busy` beserta tulisan tersembunyi memberi tahu pembaca layar apa
 * yang sedang terjadi, sebab balok yang memudar tidak berarti apa-apa bagi
 * yang tidak melihatnya.
 */
export default function SedangMemuat() {
  return (
    <div className="mantra-lebar" style={{ paddingTop: 16 }}>
      <div className="memuat-panel" role="status" aria-busy="true">
        <div className="memuat-cap">Memuat materi</div>
        <div className="memuat-baris">
          <span style={{ height: 26, width: '70%' }} />
          <span style={{ height: 14, width: '95%', animationDelay: '150ms' }} />
          <span style={{ height: 14, width: '88%', animationDelay: '300ms' }} />
          <span
            style={{ aspectRatio: '16 / 9', marginTop: 6, animationDelay: '450ms' }}
          />
        </div>
        <p className="memuat-kabar">
          Jaringan lambat? Teksnya datang lebih dulu, video menyusul.
        </p>
        <span className="hanya-pembaca">Sedang memuat materi</span>
      </div>
    </div>
  )
}
