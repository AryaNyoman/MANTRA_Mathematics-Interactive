'use client'

import GaleriNyata, { type KartuNyata } from '@/components/widget/GaleriNyata'

/**
 * Galeri "Dipakai di Dunia Nyata", Ruang 3D tahap 10. TIDAK interaktif.
 *
 * Sejak 18 Sep 2026 berfoto asli (Wikimedia Commons, lisensi bebas, catatan
 * di public/gambar/sumber.json), menggantikan sketsa 3D buatan sendiri:
 * ARYA, "namanya juga penerapan di dunia nyata, ya pakai foto yang nyata".
 * Pilihan ARYA untuk bab ini: foto saja, tanpa sketsa. Bangun ruang yang
 * tersembunyi di balik bendanya diceritakan lewat kalimat dan baris
 * kesimpulannya; sketsanya bisa dikembalikan sebagai pita di bawah foto
 * kalau suatu saat diminta (lihat cara Limit dan Integral).
 */
export const KARTU: KartuNyata[] = [
  {
    id: 'balon', gambar: 'ruang-3d/jarak-titik-bidang.jpg', nomor: '01',
    judul: 'Jarak titik ke bidang',
    inti: 'Ketinggian balon udara diukur lurus ke bawah, tegak lurus ke tanah, bukan ke pohon atau jalan yang paling dekat. Itu persis jarak titik ke bidang: yang terpendek, dan selalu tegak lurus.',
    rumus: 'jarak titik ke bidang = panjang garis tegak lurus dari titik itu ke bidang',
  },
  {
    id: 'atap', gambar: 'ruang-3d/sudut-bidang-bidang.jpg', nomor: '02',
    judul: 'Sudut bidang dengan bidang',
    inti: 'Atap yang terlalu landai membuat air hujan menggenang, yang terlalu curam memboroskan bahan. Angka yang dipakai tukang adalah sudut bidang atap terhadap bidang datar, diukur pada garis yang tegak lurus garis tiris.',
    rumus: 'atap genteng lazimnya 30° sampai 40° dari mendatar',
  },
  {
    id: 'simpang', gambar: 'ruang-3d/garis-bersilangan.jpg', nomor: '03',
    judul: 'Dua garis bersilangan',
    inti: 'Dari udara, dua jalan di simpang susun terlihat berpotongan. Aslinya yang satu lewat di atas yang lain: tidak sejajar, tidak pula bersentuhan. Justru karena bersilangan, kendaraan di keduanya tidak pernah bertabrakan.',
    rumus: 'bersilangan: tidak sejajar, tidak berpotongan, tidak sebidang',
  },
  {
    id: 'tangga', gambar: 'ruang-3d/sudut-garis-bidang.jpg', nomor: '04',
    judul: 'Sudut garis dengan bidang',
    inti: 'Aturan tukang: tangga aman kalau sudutnya dengan lantai sekitar 75°. Terlalu tegak, tangganya bisa jatuh ke belakang. Terlalu landai, kakinya bisa tergelincir. Sudutnya diukur ke bayangan tangga di lantai.',
    rumus: 'tan 75° ≈ 3,7, jadi kaki tangga kira-kira seperempat tingginya dari dinding',
  },
]

export default function DuniaNyataRuang() {
  return <GaleriNyata kartu={KARTU} />
}
