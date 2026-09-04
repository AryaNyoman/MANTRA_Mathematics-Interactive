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

export type ContohNyata = {
  id: string
  gambar: string
  nomor: string
  jenis: string
  judul: string
  inti: string
  bentuk: string
  kredit: string
}

export const CONTOH: ContohNyata[] = [
  {
    id: 'basket', gambar: 'basket.jpg', nomor: '01', jenis: 'Kuadrat',
    judul: 'Lemparan bola basket',
    inti: 'Bola yang dilempar naik, melambat, berhenti sesaat di titik tertinggi, lalu turun makin cepat. Itu persis perilaku parabola terbuka ke bawah.',
    bentuk: 'puncaknya titik tertinggi lemparan',
    kredit: 'Ildar Sagdejev, CC BY-SA 4.0',
  },
  {
    id: 'jembatan', gambar: 'jembatan.jpg', nomor: '02', jenis: 'Kuadrat',
    judul: 'Kabel jembatan gantung',
    inti: 'Kabel utama menggantung membentuk lengkung dengan titik terendah di tengah. Perancangnya memakai rumus kuadrat untuk menentukan panjang tiap kabel penggantung.',
    bentuk: 'puncaknya titik terendah kabel',
    kredit: 'David N Chai, CC BY 2.0',
  },
  {
    id: 'antena', gambar: 'antena.jpg', nomor: '03', jenis: 'Kuadrat',
    judul: 'Piringan teleskop radio',
    inti: 'Piringan raksasa ini berbentuk parabola, dan itu bukan pilihan gaya. Semua gelombang yang datang sejajar dipantulkan berkumpul tepat ke satu titik, dan di titik itulah alat penerimanya dipasang. Antena parabola di rumah memakai bentuk yang sama.',
    bentuk: 'bukan lintasan, melainkan pemantul',
    kredit: 'Amanda Slater, CC BY-SA 2.0',
  },
  {
    id: 'bakteri', gambar: 'bakteri.jpg', nomor: '04', jenis: 'Eksponen tumbuh',
    judul: 'Koloni bakteri',
    inti: 'Tiap bakteri membelah menjadi dua pada selang waktu yang tetap. Jumlahnya dikalikan dua terus menerus, bukan ditambah, dan itulah pertumbuhan eksponen.',
    bentuk: 'pelan di awal, meledak kemudian',
    kredit: 'Chiara Marraccini, CC BY-SA 4.0',
  },
  {
    id: 'obat', gambar: 'obat.jpg', nomor: '05', jenis: 'Eksponen luruh',
    judul: 'Kadar obat dalam darah',
    inti: 'Tubuh membuang sebagian tetap dari obat yang tersisa tiap jam, misalnya seperempatnya. Kadarnya turun makin melandai dan mendekati nol tanpa pernah sampai.',
    bentuk: 'turun cepat, lalu melandai',
    kredit: 'Ragesoss, CC BY-SA 4.0',
  },
  {
    id: 'seismograf', gambar: 'seismograf.jpg', nomor: '06', jenis: 'Logaritma',
    judul: 'Skala kekuatan gempa',
    inti: 'Gempa berkekuatan 7 melepaskan energi sekitar 32 kali lipat gempa berkekuatan 6. Skalanya memakai logaritma supaya angka yang jangkauannya jutaan kali muat di satu sampai sembilan.',
    bentuk: 'memampatkan angka raksasa',
    kredit: 'Atomicdragon136, CC BY 4.0',
  },
]

export default function DuniaNyataGrafik() {
  return (
    <div className="galeri-nyata">
      {CONTOH.map((c) => (
        <figure key={c.id} className="kartu-nyata">
          <div className="foto-nyata">
            {/* `next/image` sengaja tidak dipakai: keenam foto harus tampil
                UTUH, dan `contain` pada bingkai yang tingginya ikut layar lebih
                mudah dijamin dengan img biasa. Cara ini sudah dipakai galeri
                Trigonometri setelah perbaikan 1 September 2026. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/gambar/${c.gambar}`} alt={c.judul} loading="lazy" />
          </div>
          <figcaption>
            <span className="nyata-no mono">{c.nomor} · {c.jenis}</span>
            <h3>{c.judul}</h3>
            <p>{c.inti}</p>
            <code className="nyata-rumus mono">{c.bentuk}</code>
            {/* Gayanya ditulis di sini, bukan di globals.css, karena berkas
                itu milik sesi MANTRA-DESAIN-UI-UX dan aturan melarang menyunting
                wilayah sesi lain. Kalau kelas bersama untuk kredit foto sudah
                ada nanti, baris ini tinggal diganti. */}
            <span className="mono" style={{
              display: 'block', marginTop: '0.35rem',
              fontSize: '0.68rem', color: 'var(--redup, #8B8378)',
            }}>
              foto: {c.kredit}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
