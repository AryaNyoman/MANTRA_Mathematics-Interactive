/**
 * Galeri "Dipakai di Dunia Nyata", Grafik Fungsi tahap 12. TIDAK interaktif.
 *
 * KENAPA FOTO, DAN KENAPA TANPA LAPISAN GAMBAR DI ATASNYA
 * Keputusan ARYA, 1 September 2026. Bentuk campur, yaitu foto dengan kurva
 * digambar menimpanya, sudah pernah dicoba di tahap 10 Trigonometri dan gagal
 * dua kali. Sebabnya ditelusuri ke kodenya, ada tiga:
 *
 *   1. Dari empat kartu, hanya satu yang punya bagian bergerak. Tiga sisanya
 *      diam saat disentuh, sehingga seluruh galeri terasa rusak.
 *   2. Fotonya harus dipotong dengan `cover` supaya muat ke bingkai bertinggi
 *      tetap. Itu melanggar aturan proyek yang melarang widget memotong
 *      gambarnya sendiri.
 *   3. Lapisan SVG di atas foto memakai `preserveAspectRatio="none"`, sehingga
 *      sudut dan lingkarannya ikut melar mengikuti bentuk kotak foto. Sudut
 *      yang ditulis 45 derajat tidak lagi tampil 45 derajat. Gambarnya bukan
 *      sekadar jelek, melainkan salah secara geometri.
 *
 * Jadi di sini: foto UTUH dengan `contain`, tanpa lapisan apa pun, dan tugas
 * menjelaskan bentuk kurvanya diserahkan kepada teks di bawah fotonya. Alat
 * yang bisa dicoba sudah tersedia di tahap 1 sampai 11.
 *
 * ATRIBUSI DITAMPILKAN DI HALAMAN, bukan cuma disimpan di sumber.json. Lima
 * dari enam foto berlisensi CC BY atau CC BY-SA, dan keduanya MEWAJIBKAN nama
 * pembuatnya disebut di tempat pemakaian. Catatan lengkapnya tetap ada di
 * `public/gambar/sumber.json`.
 */

import GaleriNyata from '@/components/widget/GaleriNyata'

export type ContohNyata = {
  id: string
  gambar: string
  nomor: string
  jenis: string
  judul: string
  inti: string
  bentuk: string
}

export const CONTOH: ContohNyata[] = [
  {
    id: 'basket', gambar: 'basket.jpg', nomor: '01', jenis: 'Kuadrat',
    judul: 'Lemparan bola basket',
    inti: 'Bola yang dilempar naik, melambat, berhenti sesaat di titik tertinggi, lalu turun makin cepat. Itu persis perilaku parabola terbuka ke bawah.',
    bentuk: 'puncaknya titik tertinggi lemparan',
  },
  {
    id: 'jembatan', gambar: 'jembatan.jpg', nomor: '02', jenis: 'Kuadrat',
    judul: 'Kabel jembatan gantung',
    inti: 'Kabel utama menggantung membentuk lengkung dengan titik terendah di tengah. Perancangnya memakai rumus kuadrat untuk menentukan panjang tiap kabel penggantung.',
    bentuk: 'puncaknya titik terendah kabel',
  },
  {
    id: 'antena', gambar: 'antena.jpg', nomor: '03', jenis: 'Kuadrat',
    judul: 'Piringan teleskop radio',
    inti: 'Piringan raksasa ini berbentuk parabola, dan itu bukan pilihan gaya. Semua gelombang yang datang sejajar dipantulkan berkumpul tepat ke satu titik, dan di titik itulah alat penerimanya dipasang. Antena parabola di rumah memakai bentuk yang sama.',
    bentuk: 'bukan lintasan, melainkan pemantul',
  },
  {
    id: 'bakteri', gambar: 'bakteri.jpg', nomor: '04', jenis: 'Eksponen tumbuh',
    judul: 'Koloni bakteri',
    inti: 'Tiap bakteri membelah menjadi dua pada selang waktu yang tetap. Jumlahnya dikalikan dua terus menerus, bukan ditambah, dan itulah pertumbuhan eksponen.',
    bentuk: 'pelan di awal, meledak kemudian',
  },
  {
    id: 'obat', gambar: 'obat.jpg', nomor: '05', jenis: 'Eksponen luruh',
    judul: 'Kadar obat dalam darah',
    inti: 'Tubuh membuang sebagian tetap dari obat yang tersisa tiap jam, misalnya seperempatnya. Kadarnya turun makin melandai dan mendekati nol tanpa pernah sampai.',
    bentuk: 'turun cepat, lalu melandai',
  },
  {
    id: 'seismograf', gambar: 'seismograf.jpg', nomor: '06', jenis: 'Logaritma',
    judul: 'Skala kekuatan gempa',
    inti: 'Gempa berkekuatan 7 melepaskan energi sekitar 32 kali lipat gempa berkekuatan 6. Skalanya memakai logaritma supaya angka yang jangkauannya jutaan kali muat di satu sampai sembilan.',
    bentuk: 'memampatkan angka raksasa',
  },
]

export default function DuniaNyataGrafik() {
  return (
    <GaleriNyata
      kartu={CONTOH.map((c) => ({
        id: c.id, gambar: c.gambar, nomor: `${c.nomor} · ${c.jenis}`, judul: c.judul, inti: c.inti, rumus: c.bentuk,
      }))}
    />
  )
}
