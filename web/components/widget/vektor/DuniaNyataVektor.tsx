'use client'

/**
 * Galeri Materi 10 Vektor: empat tempat vektor benar-benar dipakai.
 *
 * KENAPA FOTO, BUKAN GAMBAR SENDIRI
 * Keputusan ARYA 1 September 2026. Yang perlu ditunjukkan di sini adalah bahwa
 * keadaannya sungguh terjadi, bukan bentuk kurvanya, jadi foto menjawabnya
 * langsung. Berbeda dengan Materi 10 Limit yang justru perlu bentuk kurva
 * sehingga digambar sendiri.
 *
 * Keempat foto berlisensi terbuka dan sudah dikompres di bawah 150 KB sejak
 * awal. Sumber lengkapnya ada di `web/public/gambar/sumber.json`.
 *
 * Kelas CSS-nya sengaja meminjam galeri Materi 10 Trigonometri (`galeri-nyata`,
 * `kartu-nyata`, `foto-nyata`). Bentuk yang dibutuhkan sama persis, dan
 * `app/globals.css` bukan wilayah sesi ini untuk diubah.
 */

type Kartu = {
  id: string
  nomor: string
  judul: string
  gambar: string
  /** apa yang jadi vektornya di foto itu */
  vektor: string
  inti: string
  hitungan: string
}

const CONTOH: Kartu[] = [
  {
    id: 'perahu',
    nomor: '01',
    judul: 'Perahu di sungai berarus',
    gambar: 'vektor/perahu-sungai.jpg',
    vektor: 'kecepatan dayung dan kecepatan arus',
    inti: 'Ini cerita pembuka topik ini. Pendayung menentukan arah dayungnya, tetapi arus menambahkan geraknya sendiri. Yang benar-benar terjadi adalah jumlah keduanya, dan itulah sebabnya perahu mendarat lebih ke hilir daripada yang dibidik.',
    hitungan: 'dayung (0 3) + arus (2 0) = gerak (2 3), panjangnya akar 13 atau sekitar 3,61',
  },
  {
    id: 'pesawat',
    nomor: '02',
    judul: 'Pesawat mendarat dilawan angin samping',
    gambar: 'vektor/pesawat-angin.jpg',
    vektor: 'kecepatan pesawat dan kecepatan angin',
    inti: 'Persoalannya sama persis dengan perahu tadi, hanya medianya udara. Kalau angin bertiup menyamping, pesawat yang diarahkan lurus ke landasan akan melenceng. Pilot menyiasatinya dengan memiringkan hidung pesawat melawan angin, supaya jumlah kedua vektornya kembali menuju landasan.',
    hitungan: 'pesawat 200 km/jam ke utara, angin 30 km/jam ke timur, hasilnya melenceng ke timur laut',
  },
  {
    id: 'layar',
    nomor: '03',
    judul: 'Perahu layar melaju menyerong angin',
    gambar: 'vektor/perahu-layar.jpg',
    vektor: 'gaya angin dan gaya dorong ke depan',
    inti: 'Perahu layar bisa melaju bukan tepat ke arah angin bertiup. Layar memecah gaya angin menjadi dua komponen: satu mendorong perahu ke samping, satu lagi mendorongnya ke depan. Lunas di bawah perahu menahan yang menyamping, sehingga yang tersisa mendorong maju.',
    hitungan: 'gaya angin dipecah jadi komponen maju dan komponen menyamping, persis cara Materi 03',
  },
  {
    id: 'lempeng',
    nomor: '04',
    judul: 'Gerak lempeng bumi',
    gambar: 'vektor/lempeng-bumi.jpg',
    vektor: 'kecepatan gerak tiap lempeng',
    inti: 'Peta ini memakai vektor secara terang-terangan: tiap anak panah menunjukkan ke mana sebuah lempeng bergerak, dan angka di sebelahnya menunjukkan berapa cepat, dalam milimeter per tahun. Karena arah dan besarnya diketahui, ilmuwan bisa memperkirakan lempeng mana yang akan bertumbukan.',
    hitungan: 'panjang panah menyatakan besar kecepatan, arah panah menyatakan arah geraknya',
  },
]

export default function DuniaNyataVektor() {
  return (
    <div className="galeri-nyata">
      {CONTOH.map((c) => (
        <figure key={c.id} className="kartu-nyata">
          <div className="foto-nyata">
            {/* `next/image` sengaja tidak dipakai: keempat foto harus tampil
                UTUH, dan `contain` pada bingkai yang tingginya ikut layar lebih
                mudah dijamin dengan img biasa. Pola ini sudah dipakai galeri
                Materi 10 Trigonometri. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/gambar/${c.gambar}`} alt={c.judul} loading="lazy" />
          </div>
          <figcaption>
            <span className="nyata-no mono">{c.nomor}</span>
            <h3>{c.judul}</h3>
            <p>{c.inti}</p>
            <code className="nyata-rumus mono">{c.hitungan}</code>
          </figcaption>
        </figure>
      ))}
      {/* Keterangan lisensi ditaruh DI SINI, bukan di dalam penjelasan materi.
          Ini teks meta, bukan pelajaran: guru tidak membacakan catatan kaki di
          tengah kelas. Tetap wajib ada, sebab foto salinan harus bersumber. */}
      <p className="sumber">
        Keempat foto berlisensi terbuka. Sumber, nama pemotret, dan lisensinya
        dicatat di berkas sumber.json pada situs ini.
      </p>
    </div>
  )
}
