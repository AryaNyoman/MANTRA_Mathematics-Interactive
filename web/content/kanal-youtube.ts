import type { Kanal } from './tipe.ts'

/**
 * Daftar kanal YouTube yang boleh dirujuk kotak "Pelajari lebih dalam lewat
 * YouTube". Tiap bab memilih kanal dan kata kunci PER SUB-BAB di
 * `content/<bab>/latihan.ts` (`KANAL`), mengikuti nama sub-babnya (ARYA 18
 * Sep 2026: Integral A "Membalik Turunan" jangan diberi "integral substitusi").
 *
 * Syarat masuk daftar ini: kanal berbahasa Indonesia untuk SMA, subscriber
 * paling sedikit 100 ribu ATAU videonya untuk topik itu ditonton paling
 * sedikit 200 ribu kali. Angkanya dibaca dari YouTube 18 Sep 2026 lewat
 * `node alat/cek_kanal_youtube.mjs kanal <@handle>`; pemeriksaan ulang seluruh
 * tautan: `node alat/cek_kanal_youtube.mjs periksa`.
 */
export type KanalDasar = Omit<Kanal, 'cari'>

const k = (nama: string, handle: string): KanalDasar => ({ nama, handle, url: `https://www.youtube.com/${handle}` })

export const K = {
  ruangguru: k('Ruangguru', '@ruangguru'),                    // 2,62 jt
  privatAlFaiz: k('Privat Al Faiz', '@PrivatAlFaiz'),         // 2,51 jt
  matematikaHebat: k('Matematika Hebat', '@Matematika_Hebat'), // 1,13 jt
  bigCourse: k('BIG Course', '@BIGCourse'),                   // 1 jt
  m4thlab: k('m4th-lab', '@m4thlab'),                         // 949 rb
  seekorLebah: k('Seekor Lebah', '@SeekorLebah'),             // 837 rb
  mantappu: k('Mantappu Academy', '@MantappuAcademy'),        // 772 rb
  leGuruLes: k('Le GuruLes', '@legurules'),                   // 771 rb
  quipper: k('Quipper Indonesia', '@QuipperVideoID'),         // 595 rb
  lianna: k('Lianna Nathania', '@LiannaNathania'),            // 590 rb
  rumahGemar: k('Rumah Gemar Matematika', '@RUMAHGEMARMATEMATIKA'), // 546 rb
  benni: k('Benni al azhri', '@Bennialazhri'),                // 387 rb
  zenius: k('Zenius', '@zeniuseducation'),                    // 346 rb
  smarrt: k('Bimbel SMARRT', '@BimbelSMARRT'),                // 315 rb
  matemaKita: k('Matema Kita', '@MatemaKita'),                // 289 rb
  pahamify: k('Pahamify', '@Pahamify'),                       // 286 rb
  sibejoo: k('Sibejoo Jadda', '@sibejoo'),                    // 184 rb
  billykur: k('Billykur', '@Billykur'),                       // 149 rb
  ajarPipolondo: k('Ajar Pipolondo', '@ajarpipolondo'),       // 139 rb
  jendelaSains: k('Jendela Sains', '@JendelaSains'),          // 110 rb
  marfiArio: k('Marfi Ario', '@BimbelMarfiArio'),             // 106 rb
  bomMatematika: k('BOM Matematika', '@Nurdhiyanto'),         // 48 rb, video grafik trigonometri 375 rb tonton
  zeroTutorial: k('Zero Tutorial Matematika', '@zero.tutorial'), // 62 rb, video integral 617 rb tonton
  galih: k('Galih P Saputra', '@GalihPSaputra'),              // 70 rb, video simpangan baku 585 rb tonton
  didiYuli: k('Didi Yuli Setiaji', '@didiyulisetiaji3313'),   // 63 rb, video mean median modus 1,47 jt tonton
  y2education: k('y2 education', '@y2education'),             // 20 rb, video transformasi fungsi 378 rb tonton
  pingLie: k('PING LIE', '@pinglie'),                         // 655 rb
  kakWahyu: k('Matematika Bersama Kak Wahyu', '@kakwahyu'),   // 211 rb
  bsMath: k('BSMath Channel', '@BSMathChannel'),              // 34 rb, video regresi linear 306 rb tonton
  mediaMatematika: k('Media Matematika', '@mediamatematika3641'), // 11 rb, video regresi linear 123 rb tonton
} as const

/**
 * Kanal beserta kata kunci pencariannya untuk satu sub-bab. `video` dan
 * `judul` (video teratas untuk kata kunci itu) ditulis oleh
 * `alat/cek_kanal_youtube.mjs periksa --tulis`, jangan diisi tangan.
 */
export const kanal = (dasar: KanalDasar, cari: string, video?: string, judul?: string): Kanal =>
  video ? { ...dasar, cari, video, judul } : { ...dasar, cari }
