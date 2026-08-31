/**
 * Materi 10, galeri "di mana trigonometri dipakai".
 *
 * Empat contoh yang semuanya ada di dalam satu ponsel. Fotonya nyata (diambil
 * dari Wikimedia Commons, semua berlisensi terbuka, lihat
 * `public/gambar/sumber.json`).
 *
 * KEPUTUSAN 1 Sep 2026, ARYA: materi ini TIDAK lagi interaktif.
 *
 * Sebelumnya tiap contoh diberi penggeser dan lapisan gambar di atas foto.
 * Hasilnya justru memperburuk: tidak ada yang benar-benar layak digeser di
 * sini, garis yang ditumpuk di atas foto membuat fotonya sulit dibaca, dan
 * fotonya sendiri harus dipotong (`cover`) supaya muat ke bingkai tetap.
 *
 * Materi ini tugasnya cuma satu: menunjukkan DI MANA trigonometri itu berada.
 * Untuk itu foto yang utuh dan kalimat yang jelas sudah cukup, dan itu yang
 * dilakukan sekarang. Alat yang bisa dicoba sudah tersedia di materi 1 sampai 9.
 *
 * Fotonya dipasang dua per baris dengan `object-fit: contain`, jadi tidak ada
 * bagian gambar yang terpotong pada ukuran layar mana pun. (Aturan proyek:
 * widget tidak boleh memotong gambarnya sendiri.)
 */

export type Contoh = {
  id: string
  gambar: string
  nomor: string
  judul: string
  inti: string
  rumus: string
}

export const CONTOH: Contoh[] = [
  {
    id: 'kamera', gambar: 'kamera.jpg', nomor: '01',
    judul: 'Kamera, seberapa lebar yang muat',
    inti: 'Sudut pandang lensa tetap. Yang menentukan lebar hasil foto adalah sudut itu dan jarak Anda ke objek.',
    rumus: 'lebar = 2 x jarak x tan(setengah sudut pandang)',
  },
  {
    id: 'layar', gambar: 'miring.jpg', nomor: '02',
    judul: 'Layar yang berputar sendiri',
    inti: 'Sensor merasakan tarikan gravitasi pada dua arah. Perbandingan keduanya memberi sudut kemiringan ponsel.',
    rumus: 'kemiringan = sudut yang tangennya = mendatar : tegak',
  },
  {
    id: 'game', gambar: 'game.jpg', nomor: '03',
    judul: 'Game, memutar apa pun',
    inti: 'Setiap benda dan kamera yang berputar dihitung ulang puluhan ribu kali tiap detik memakai sin dan cos.',
    rumus: 'titik (1, 0) diputar sejauh sudut menjadi (cos, sin)',
  },
  {
    id: 'suara', gambar: 'suara.jpg', nomor: '04',
    judul: 'Suara, bentuknya kurva sinus',
    inti: 'Nada A bergetar 440 kali per detik. Alat seperti ini memperlihatkan bentuk getarannya, dan bentuk itu kurva dari materi 8.',
    rumus: 'simpangan = tinggi x sin(2 pi x frekuensi x waktu)',
  },
]

/** Sudut pandang lensa ponsel kebanyakan, dalam derajat. */
export const SUDUT_PANDANG = 78

/** Lebar pemandangan yang muat dalam bingkai, pada jarak tertentu (meter). */
export function lebarMuat(jarak: number, sudutPandang = SUDUT_PANDANG): number {
  return 2 * jarak * Math.tan((sudutPandang / 2) * (Math.PI / 180))
}

export const koma = (n: number, digit = 2) => n.toFixed(digit).replace('.', ',')

export default function DuniaNyata() {
  return (
    <div className="galeri-nyata">
      {CONTOH.map((c) => (
        <figure key={c.id} className="kartu-nyata">
          <div className="foto-nyata">
            {/* `next/image` sengaja tidak dipakai di sini: keempat foto harus
                tampil UTUH, dan `contain` pada bingkai yang tingginya ikut
                layar lebih mudah dijamin dengan img biasa. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/gambar/${c.gambar}`} alt={c.judul} loading="lazy" />
          </div>
          <figcaption>
            <span className="nyata-no mono">{c.nomor}</span>
            <h3>{c.judul}</h3>
            <p>{c.inti}</p>
            <code className="nyata-rumus mono">{c.rumus}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
