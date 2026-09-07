import Image from 'next/image'

/**
 * Kaki halaman MANTRA, dipakai SEMUA halaman.
 *
 * Sebelum 3 Sep 2026 baris ini hanya ada di beranda dan latarnya tembus ke
 * kertas berkisi, sehingga terbaca sebagai teks yang mengambang, bukan sebagai
 * penutup halaman. Sekarang latarnya putih dan komponennya satu, jadi kalau
 * isinya berubah ia berubah di semua halaman sekaligus.
 *
 * Ditulis dalam Bahasa Inggris atas permintaan ARYA.
 *
 * Harus dipasang sebagai SAUDARA `main`, bukan di dalamnya: `margin-top: auto`
 * di CSS hanya bekerja kalau ia anak langsung `body` yang berkolom flex, dan
 * itulah yang menempelkannya ke dasar layar pada halaman yang isinya pendek.
 */
export default function Kaki() {
  return (
    <footer className="kaki-mantra">
      <span>
        Built by <b>Nyoman Arya Sejati</b> · with Manim, Claude, ElevenLabs, and Next.js
      </span>
      <span className="lembaga">
        <Image
          src="/mantra/undiksha.png"
          alt=""
          width={28}
          height={28}
          style={{ height: 28, width: 'auto' }}
        />
        Universitas Pendidikan Ganesha
      </span>
    </footer>
  )
}
