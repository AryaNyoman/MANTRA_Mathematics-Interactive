import type { GambarSoal as Data } from '@/content/tipe'
import Segitiga from './Segitiga'
import Lingkaran from './Lingkaran'
import Grafik from './Grafik'
import Vektor from './Vektor'
import DiagramData from './DiagramData'
import Balok from './Balok'
import Bidang from './Bidang'
import Luas from './Luas'

/**
 * Pemilih perender gambar soal. Gambar soal adalah DATA (`GambarSoal` di
 * `content/tipe.ts`); komponen ini memetakan `jenis` ke perender SVG-nya.
 * Dibungkus `<figure class="gambar-soal">` yang lebarnya mengikuti wadah
 * dan tingginya dibatasi CSS, jadi gambar tidak pernah memotong dirinya.
 */
export default function GambarSoal({ gambar, keterangan }: { gambar: Data; keterangan?: string }) {
  return (
    <figure className="gambar-soal">
      {isi(gambar)}
      {keterangan && <figcaption>{keterangan}</figcaption>}
    </figure>
  )
}

function isi(g: Data) {
  switch (g.jenis) {
    case 'segitiga':
      return <Segitiga sudut={g.sudut} label={g.label} namaSudut={g.namaSudut} />
    case 'lingkaran':
      return <Lingkaran sudut={g.sudut} label={g.label} kaki={g.kaki} />
    case 'grafik':
      return <Grafik fungsi={g.fungsi} jangkauan={g.jangkauan} titik={g.titik} tegak={g.tegak} nama={g.nama} lubang={g.lubang} />
    case 'vektor':
      return <Vektor panah={g.panah} jangkauan={g.jangkauan} komponen={g.komponen} />
    case 'batang':
    case 'garis-data':
      return <DiagramData jenis={g.jenis} kategori={g.kategori} nilai={g.nilai} satuan={g.satuan} mulai={g.mulai} sorot={g.sorot} />
    case 'balok':
      return <Balok ukuran={g.ukuran} titik={g.titik} ruas={g.ruas} tambahan={g.tambahan} bidang={g.bidang} />
    case 'bidang':
      return (
        <Bidang bangun={g.bangun} bayangan={g.bayangan} cermin={g.cermin} pusat={g.pusat} jangkauan={g.jangkauan}
                labelBangun={g.labelBangun} labelBayangan={g.labelBayangan} />
      )
    case 'luas':
      return <Luas fungsi={g.fungsi} dari={g.dari} sampai={g.sampai} persegi={g.persegi} fungsi2={g.fungsi2} jangkauan={g.jangkauan} />
    case 'svg':
      // Jalan keluar untuk gambar khusus. Isinya ditulis di berkas konten
      // proyek sendiri, bukan masukan pengguna, jadi aman disisipkan.
      return (
        <svg viewBox={g.viewBox} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gambar soal"
             dangerouslySetInnerHTML={{ __html: g.isi }} />
      )
  }
}
