/**
 * Uji matematika Transformasi Geometri. Dijalankan langsung oleh Node 24:
 *   node alat/uji-matriks-transformasi.mts
 *
 * KENAPA BERKAS INI DI LUAR web/
 * Alasannya sama dengan `uji-geometri-vektor.mts`: Node baru mau mengimpor
 * TypeScript kalau akhiran `.ts` disebutkan di jalur impornya, sedangkan `tsc`
 * dengan setelan proyek ini menolak akhiran itu (galat TS5097). Ditaruh di
 * `alat/`, keduanya beres tanpa menyentuh `tsconfig.json`.
 *
 * KENAPA UJI INI PENTING DI TOPIK INI
 * Materi 08 mengajarkan sebuah tabel: apa yang tetap dan apa yang berubah pada
 * kelima transformasi. Tabel itu klaim, dan klaim bisa salah. Saat menulis
 * spesifikasi topik ini, satu barisnya memang salah: dilatasi dengan k negatif
 * dikira membalik arah putar. Bagian "watak kelima transformasi" di bawah
 * memeriksa seluruh tabel itu dengan angka, sehingga kesalahan sejenis tidak
 * bisa lolos ke halaman siswa lagi.
 */
import {
  BENTUK_L, CERMIN_SUMBU_X, CERMIN_SUMBU_Y, CERMIN_TITIK_ASAL,
  CERMIN_Y_SAMA_MIN_X, CERMIN_Y_SAMA_X, IDENTITAS, SUDUT_BERNAMA,
  arahPutar, arahPutarPoligon, cerminGarisDatar, cerminGarisTegak, cerminSumbuX,
  cerminSumbuY, cerminTitik, cerminYSamaMinX, cerminYSamaX, determinan,
  dilatasi, jarak, kaliMatriks, kenakan, kenakanTransformasi, luasPoligon,
  luasSegitiga, matriksDari, matriksDilatasi, matriksRotasi, namaTransformasi,
  rotasi, sudutDi, translasi,
  type Matriks, type Titik, type Transformasi,
} from '../web/components/widget/transformasi-geometri/matriks.ts'
import {
  angka, jendelaSeimbang, keLayar, keMatematika, labelSkala, petak, tahan,
} from '../web/components/widget/transformasi-geometri/papan.ts'

let gagal = 0

function cek(nama: string, dapat: unknown, harap: unknown) {
  if (JSON.stringify(dapat) !== JSON.stringify(harap)) {
    gagal++
    console.error(`GAGAL ${nama}\n  dapat  ${JSON.stringify(dapat)}\n  harap  ${JSON.stringify(harap)}`)
  }
}

function cekDekat(nama: string, dapat: number, harap: number, toleransi = 1e-9) {
  if (!Number.isFinite(dapat) || Math.abs(dapat - harap) > toleransi) {
    gagal++
    console.error(`GAGAL ${nama}\n  dapat  ${dapat}\n  harap  ${harap}`)
  }
}

function cekTitikDekat(nama: string, dapat: Titik, harap: Titik, toleransi = 1e-9) {
  if (Math.abs(dapat.x - harap.x) > toleransi || Math.abs(dapat.y - harap.y) > toleransi) {
    gagal++
    console.error(`GAGAL ${nama}\n  dapat  (${dapat.x}, ${dapat.y})\n  harap  (${harap.x}, ${harap.y})`)
  }
}

const O: Titik = { x: 0, y: 0 }

/* ================================================================== */
/* Operasi matriks dasar (Materi 09)                                   */
/* ================================================================== */

// Kesepakatan: Matriks {a, b, c, d} berarti baris pertama a b, baris kedua c d.
cek('kenakan mengalikan baris dengan koordinat',
  kenakan({ a: 0, b: -1, c: 1, d: 0 }, { x: 3, y: 2 }), { x: -2, y: 3 })

cek('kenakan pada matriks tidak simetris',
  kenakan({ a: 1, b: 2, c: 0, d: 1 }, { x: 3, y: 4 }), { x: 11, y: 4 })

cek('identitas tidak mengubah apa pun',
  kenakan(IDENTITAS, { x: -7, y: 2.5 }), { x: -7, y: 2.5 })

// Kolom pertama matriks adalah tempat mendaratnya (1, 0), kolom kedua tempat
// mendaratnya (0, 1). Cara membaca ini yang diajarkan di Materi 09, jadi wajib
// benar-benar berlaku.
{
  const m: Matriks = { a: 2, b: -3, c: 5, d: 7 }
  cek('kolom pertama adalah peta dari (1, 0)', kenakan(m, { x: 1, y: 0 }), { x: m.a, y: m.c })
  cek('kolom kedua adalah peta dari (0, 1)', kenakan(m, { x: 0, y: 1 }), { x: m.b, y: m.d })
}

cek('kaliMatriks: cermin sumbu X lalu rotasi 90 memberi cermin y = x',
  kaliMatriks(matriksRotasi(90), CERMIN_SUMBU_X), CERMIN_Y_SAMA_X)

cek('kaliMatriks urutan terbalik memberi cermin y = -x',
  kaliMatriks(CERMIN_SUMBU_X, matriksRotasi(90)), CERMIN_Y_SAMA_MIN_X)

cekDekat('determinan cermin sumbu X adalah -1', determinan(CERMIN_SUMBU_X), -1)
cekDekat('determinan rotasi adalah 1', determinan(matriksRotasi(37)), 1)
cekDekat('determinan dilatasi 3 adalah 9', determinan(matriksDilatasi(3)), 9)
cekDekat('determinan dilatasi -3 juga 9, bukan -9', determinan(matriksDilatasi(-3)), 9)

/* ================================================================== */
/* Perkalian matriks apa pun memetakan titik asal ke titik asal        */
/* ================================================================== */

// Ini alasan yang dipakai Materi 10 untuk menjelaskan kenapa translasi TIDAK
// bisa ditulis sebagai perkalian matriks 2x2. Kalau klaim ini ternyata bisa
// dilanggar, penjelasan di halaman itu runtuh.
for (const m of [IDENTITAS, CERMIN_SUMBU_X, CERMIN_Y_SAMA_X, matriksRotasi(53),
  matriksDilatasi(-2), { a: 9, b: -4, c: 6, d: 1 }]) {
  cekTitikDekat('titik asal tetap di titik asal', kenakan(m, O), O)
}

/* ================================================================== */
/* Translasi (Materi 02)                                               */
/* ================================================================== */

cek('translasi menjumlahkan komponen',
  translasi({ x: 1, y: 2 }, { x: 4, y: -3 }), { x: 5, y: -1 })

cek('contoh coba Materi 02',
  translasi({ x: -2, y: 5 }, { x: 3, y: 1 }), { x: 1, y: 6 })

cek('translasi nol tidak memindahkan',
  translasi({ x: 3, y: 3 }, O), { x: 3, y: 3 })

/* ================================================================== */
/* Pencerminan (Materi 03, 04, 05)                                     */
/* ================================================================== */

cek('cermin sumbu X membalik tanda y', cerminSumbuX({ x: 3, y: 2 }), { x: 3, y: -2 })
cek('cermin sumbu Y membalik tanda x', cerminSumbuY({ x: 3, y: 2 }), { x: -3, y: 2 })

cek('contoh Materi 03: cermin garis x = 5',
  cerminGarisTegak({ x: 1, y: 2 }, 5), { x: 9, y: 2 })
cek('contoh coba Materi 03: cermin garis y = 2',
  cerminGarisDatar({ x: 3, y: -1 }, 2), { x: 3, y: 5 })

cek('sumbu Y adalah kasus k = 0 dari garis tegak',
  cerminGarisTegak({ x: 3, y: 2 }, 0), cerminSumbuY({ x: 3, y: 2 }))
cek('sumbu X adalah kasus h = 0 dari garis mendatar',
  cerminGarisDatar({ x: 3, y: 2 }, 0), cerminSumbuX({ x: 3, y: 2 }))

cek('contoh Materi 04: cermin y = x menukar koordinat',
  cerminYSamaX({ x: 2, y: 5 }), { x: 5, y: 2 })
cek('contoh coba Materi 04: cermin y = -x menukar lalu membalik tanda',
  cerminYSamaMinX({ x: -3, y: 4 }), { x: -4, y: 3 })

cek('contoh Materi 05: cermin pada titik M(3, 3)',
  cerminTitik({ x: 1, y: 2 }, { x: 3, y: 3 }), { x: 5, y: 4 })
cek('contoh coba Materi 05: cermin pada titik M(1, 2)',
  cerminTitik({ x: 4, y: -1 }, { x: 1, y: 2 }), { x: -2, y: 5 })

// Pusat cermin selalu tepat di tengah antara prapeta dan petanya. Itu definisi
// yang dipakai Materi 05, jadi diperiksa langsung dari definisinya.
{
  const p: Titik = { x: 7, y: -4 }
  const m: Titik = { x: -1, y: 2 }
  const q = cerminTitik(p, m)
  cekTitikDekat('pusat cermin adalah titik tengah prapeta dan peta',
    { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }, m)
}

/* ================================================================== */
/* Rotasi (Materi 06)                                                  */
/* ================================================================== */

// Sudut bulat WAJIB tepat, bukan mendekati. cos(90 derajat) di JavaScript
// bernilai 6,1e-17 dan bukan nol, dan debu sekecil itu membuat koordinat di
// tabel tampil sebagai 0,0000000000000001 di layar siswa.
cek('rotasi 90 derajat tepat, tanpa debu pembulatan',
  rotasi({ x: 1, y: 0 }, 90, O), { x: 0, y: 1 })
cek('rotasi 180 derajat tepat', rotasi({ x: 1, y: 0 }, 180, O), { x: -1, y: 0 })
cek('rotasi 270 derajat tepat', rotasi({ x: 1, y: 0 }, 270, O), { x: 0, y: -1 })
cek('rotasi 360 derajat kembali ke tempatnya', rotasi({ x: 3, y: -2 }, 360, O), { x: 3, y: -2 })

cek('jarum jam di (4, 0) diputar 90 derajat', rotasi({ x: 4, y: 0 }, 90, O), { x: 0, y: 4 })
cek('rotasi 90 memberi (-y, x)', rotasi({ x: 3, y: 1 }, 90, O), { x: -1, y: 3 })
cek('rotasi 270 memberi (y, -x)', rotasi({ x: 3, y: 1 }, 270, O), { x: 1, y: -3 })

// Janji yang dibuat Materi 05 dan ditagih Materi 06: rotasi 180 derajat
// terhadap titik asal sama dengan pencerminan pada titik asal.
for (const p of [{ x: 3, y: 1 }, { x: -5, y: 2.5 }, { x: 0, y: -4 }]) {
  cek('rotasi 180 sama dengan cermin titik asal', rotasi(p, 180, O), cerminTitik(p, O))
}

cek('rotasi 90 dengan pusat bukan titik asal',
  rotasi({ x: 2, y: 1 }, 90, { x: 1, y: 1 }), { x: 1, y: 2 })

cekTitikDekat('rotasi sudut sembarang mengikuti sin dan cos',
  rotasi({ x: 1, y: 0 }, 30, O), { x: Math.cos(Math.PI / 6), y: Math.sin(Math.PI / 6) })

cekDekat('rotasi tidak mengubah jarak ke pusatnya',
  jarak(rotasi({ x: 3, y: 4 }, 37, O), O), 5)

// Matriks rotasi dan fungsi rotasi harus sepakat, sebab Materi 10 menyuruh
// siswa memakai keduanya bergantian.
for (const derajat of [0, 30, 90, 137, 180, 250, 270, 359]) {
  const p: Titik = { x: 2, y: -3 }
  cekTitikDekat(`matriks rotasi ${derajat} sepakat dengan fungsi rotasi`,
    kenakan(matriksRotasi(derajat), p), rotasi(p, derajat, O))
}

cek('matriks rotasi 90 tepat', matriksRotasi(90), { a: 0, b: -1, c: 1, d: 0 })
cek('matriks rotasi 180 sama dengan cermin titik asal', matriksRotasi(180), CERMIN_TITIK_ASAL)

/* ================================================================== */
/* Dilatasi (Materi 07)                                                */
/* ================================================================== */

cek('contoh Materi 07: dilatasi 3 berpusat di M(1, 1)',
  dilatasi({ x: 2, y: 1 }, 3, { x: 1, y: 1 }), { x: 4, y: 1 })

cek('dilatasi berpusat titik asal mengalikan kedua koordinat',
  dilatasi({ x: 2, y: -3 }, 4, O), { x: 8, y: -12 })
cek('faktor 1 tidak mengubah apa pun', dilatasi({ x: 2, y: -3 }, 1, O), { x: 2, y: -3 })
cek('faktor 0 meruntuhkan semuanya ke pusatnya',
  dilatasi({ x: 2, y: -3 }, 0, { x: 5, y: 5 }), { x: 5, y: 5 })
cek('faktor negatif menyeberang ke sisi lain pusatnya',
  dilatasi({ x: 2, y: 0 }, -2, O), { x: -4, y: 0 })

cek('matriks dilatasi 3', matriksDilatasi(3), { a: 3, b: 0, c: 0, d: 3 })

/* ================================================================== */
/* Watak kelima transformasi: tabel Materi 08, diperiksa mesin         */
/* ================================================================== */

// Bentuk L tidak simetris yang dipakai di semua widget topik ini. Tiga titik
// pertamanya yang diberi nama A, B, C.
const A: Titik = { x: 1, y: 1 }
const B: Titik = { x: 4, y: 1 }
const C: Titik = { x: 4, y: 3 }

cekDekat('jarak A ke B', jarak(A, B), 3)
cekDekat('luas segitiga ABC', luasSegitiga(A, B, C), 3)
cekDekat('sudut di B siku-siku', sudutDi(A, B, C), 90)
cek('arah putar A B C berlawanan jarum jam', arahPutar(A, B, C), 1)
cek('arah putar dibalik urutannya', arahPutar(A, C, B), -1)
cek('tiga titik segaris arah putarnya nol',
  arahPutar({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }), 0)

type Watak = { nama: string; t: Transformasi; skala: number; putarBerbalik: boolean }

const WATAK: Watak[] = [
  { nama: 'translasi', t: { jenis: 'translasi', geser: { x: 3, y: -5 } }, skala: 1, putarBerbalik: false },
  { nama: 'cermin sumbu X', t: { jenis: 'cermin-sumbu-x' }, skala: 1, putarBerbalik: true },
  { nama: 'cermin sumbu Y', t: { jenis: 'cermin-sumbu-y' }, skala: 1, putarBerbalik: true },
  { nama: 'cermin y = x', t: { jenis: 'cermin-y-sama-x' }, skala: 1, putarBerbalik: true },
  { nama: 'cermin y = -x', t: { jenis: 'cermin-y-sama-min-x' }, skala: 1, putarBerbalik: true },
  { nama: 'cermin garis x = 5', t: { jenis: 'cermin-garis-tegak', k: 5 }, skala: 1, putarBerbalik: true },
  { nama: 'cermin garis y = 2', t: { jenis: 'cermin-garis-datar', h: 2 }, skala: 1, putarBerbalik: true },
  { nama: 'cermin titik M', t: { jenis: 'cermin-titik', pusat: { x: 2, y: 2 } }, skala: 1, putarBerbalik: false },
  { nama: 'rotasi 37 derajat', t: { jenis: 'rotasi', derajat: 37, pusat: { x: 1, y: -2 } }, skala: 1, putarBerbalik: false },
  { nama: 'dilatasi 2', t: { jenis: 'dilatasi', k: 2, pusat: { x: 1, y: 1 } }, skala: 2, putarBerbalik: false },
  { nama: 'dilatasi setengah', t: { jenis: 'dilatasi', k: 0.5, pusat: O }, skala: 0.5, putarBerbalik: false },
  // Baris inilah yang sempat ditulis salah di spesifikasi. Dilatasi dengan k
  // negatif TIDAK membalik arah putar, sebab determinannya k kuadrat.
  { nama: 'dilatasi -2', t: { jenis: 'dilatasi', k: -2, pusat: { x: 3, y: 0 } }, skala: 2, putarBerbalik: false },
]

for (const w of WATAK) {
  const p = (t: Titik) => kenakanTransformasi(w.t, t)
  const A2 = p(A)
  const B2 = p(B)
  const C2 = p(C)

  cekDekat(`${w.nama}: panjang AB menjadi ${w.skala} kali`,
    jarak(A2, B2), jarak(A, B) * w.skala, 1e-9)

  cekDekat(`${w.nama}: besar sudut di B tidak berubah`,
    sudutDi(A2, B2, C2), sudutDi(A, B, C), 1e-7)

  cekDekat(`${w.nama}: luas menjadi skala kuadrat kali`,
    luasSegitiga(A2, B2, C2), luasSegitiga(A, B, C) * w.skala * w.skala, 1e-9)

  const putarSemula = arahPutar(A, B, C)
  const putarSekarang = arahPutar(A2, B2, C2)
  cek(`${w.nama}: arah putar ${w.putarBerbalik ? 'berbalik' : 'tetap'}`,
    putarSekarang, w.putarBerbalik ? -putarSemula : putarSemula)

  if (!Number.isFinite(A2.x) || !Number.isFinite(A2.y)) {
    gagal++
    console.error(`GAGAL ${w.nama} menghasilkan angka yang bukan angka`)
  }
}

/* ================================================================== */
/* Matriks tiap transformasi, dan batas kejujurannya (Materi 10)       */
/* ================================================================== */

// Kalau sebuah transformasi punya matriks, matriks itu HARUS memberi hasil
// yang sama dengan fungsinya. Kalau tidak punya, `matriksDari` mengembalikan
// null, dan null itulah pelajaran Materi 10, bukan kekurangan program.
const BERMATRIKS: Transformasi[] = [
  { jenis: 'cermin-sumbu-x' },
  { jenis: 'cermin-sumbu-y' },
  { jenis: 'cermin-y-sama-x' },
  { jenis: 'cermin-y-sama-min-x' },
  { jenis: 'cermin-titik', pusat: O },
  { jenis: 'rotasi', derajat: 53, pusat: O },
  { jenis: 'dilatasi', k: -1.5, pusat: O },
  { jenis: 'cermin-garis-tegak', k: 0 },
  { jenis: 'cermin-garis-datar', h: 0 },
]

for (const t of BERMATRIKS) {
  const m = matriksDari(t)
  if (m === null) {
    gagal++
    console.error(`GAGAL ${namaTransformasi(t)} seharusnya punya matriks 2x2`)
    continue
  }
  for (const p of [A, B, C, { x: -3, y: 7 }]) {
    cekTitikDekat(`matriks ${namaTransformasi(t)} sepakat dengan fungsinya`,
      kenakan(m, p), kenakanTransformasi(t, p))
  }
}

// Translasi tidak punya matriks 2x2 pengali, apa pun geserannya. Dan yang
// pusatnya bukan titik asal juga tidak, sebab titik asal ikut berpindah.
const TANPA_MATRIKS: Transformasi[] = [
  { jenis: 'translasi', geser: { x: 3, y: 4 } },
  { jenis: 'translasi', geser: O },
  { jenis: 'cermin-garis-tegak', k: 5 },
  { jenis: 'cermin-garis-datar', h: 2 },
  { jenis: 'cermin-titik', pusat: { x: 1, y: 1 } },
  { jenis: 'rotasi', derajat: 90, pusat: { x: 2, y: 0 } },
  { jenis: 'dilatasi', k: 3, pusat: { x: 1, y: 1 } },
]

for (const t of TANPA_MATRIKS) {
  cek(`${namaTransformasi(t)} tidak punya matriks 2x2`, matriksDari(t), null)
}

for (const t of [...BERMATRIKS, ...TANPA_MATRIKS]) {
  const nama = namaTransformasi(t)
  if (typeof nama !== 'string' || nama.length === 0 || nama.includes('undefined')) {
    gagal++
    console.error(`GAGAL nama transformasi tidak layak dibaca: ${JSON.stringify(nama)}`)
  }
  if (nama.includes('—')) {
    gagal++
    console.error(`GAGAL nama transformasi memakai em-dash: ${nama}`)
  }
}

/* ================================================================== */
/* Komposisi (Materi 11 dan 12)                                        */
/* ================================================================== */

// Contoh yang ditulis di kedua materi, dikerjakan dua cara. Langkah demi
// langkah dan lewat perkalian matriks harus memberi jawaban yang sama, sebab
// halaman siswa mengklaim begitu.
{
  const P: Titik = { x: 3, y: 1 }

  const langkah = cerminSumbuX(P)
  cek('langkah pertama: cermin sumbu X', langkah, { x: 3, y: -1 })
  const akhir = rotasi(langkah, 90, O)
  cek('langkah kedua: rotasi 90', akhir, { x: 1, y: 3 })

  const gabung = kaliMatriks(matriksRotasi(90), CERMIN_SUMBU_X)
  cekTitikDekat('M2 dikali M1 memberi jawaban yang sama', kenakan(gabung, P), akhir)

  const salahUrutan = kaliMatriks(CERMIN_SUMBU_X, matriksRotasi(90))
  cekTitikDekat('urutan matriks dibalik memberi jawaban urutan yang sebaliknya',
    kenakan(salahUrutan, P), cerminSumbuX(rotasi(P, 90, O)))
  cek('dan jawaban itu memang berbeda', kenakan(salahUrutan, P), { x: -1, y: -3 })
}

// Kekecualian yang disebut Materi 11: dua translasi boleh dibalik urutannya.
{
  const P: Titik = { x: 2, y: 5 }
  const g1: Titik = { x: 3, y: -1 }
  const g2: Titik = { x: -4, y: 2 }
  cek('dua translasi boleh dibalik urutannya',
    translasi(translasi(P, g1), g2), translasi(translasi(P, g2), g1))
}

// Dua rotasi dengan pusat yang sama juga boleh dibalik.
{
  const P: Titik = { x: 2, y: 5 }
  const pusat: Titik = { x: 1, y: 1 }
  cekTitikDekat('dua rotasi sepusat boleh dibalik urutannya',
    rotasi(rotasi(P, 40, pusat), 70, pusat), rotasi(rotasi(P, 70, pusat), 40, pusat))
}

/* ================================================================== */
/* Bentuk L, benda yang ditransformasikan di semua widget              */
/* ================================================================== */

cek('bentuk L punya enam titik sudut', BENTUK_L.length, 6)

cek('tiga sudut pertama yang diberi nama',
  SUDUT_BERNAMA.map((s) => s.nama), ['A', 'B', 'C'])

for (const s of SUDUT_BERNAMA) {
  if (!BENTUK_L[s.indeks]) {
    gagal++
    console.error(`GAGAL sudut bernama ${s.nama} menunjuk titik yang tidak ada`)
  }
}

cek('semua titiknya bilangan bulat, supaya enak dibaca siswa',
  BENTUK_L.every((p) => Number.isInteger(p.x) && Number.isInteger(p.y)), true)

cekDekat('luas bentuk L', luasPoligon(BENTUK_L), 6)
cek('bentuk L digambar berlawanan arah jarum jam', arahPutarPoligon(BENTUK_L), 1)

// Inilah syarat yang membuat bentuknya berguna. Kalau bentuknya simetris,
// pencerminan menghasilkan gambar yang sama persis dengan prapetanya, dan
// seluruh Materi 03 sampai 05 jadi tidak terlihat apa-apa di layar.
{
  const susun = (titikTitik: Titik[]) =>
    titikTitik.map((p) => `${p.x},${p.y}`).sort().join(' ')

  const tengahX = (Math.min(...BENTUK_L.map((p) => p.x)) + Math.max(...BENTUK_L.map((p) => p.x))) / 2
  const tengahY = (Math.min(...BENTUK_L.map((p) => p.y)) + Math.max(...BENTUK_L.map((p) => p.y))) / 2

  const cerminTegak = BENTUK_L.map((p) => cerminGarisTegak(p, tengahX))
  const cerminDatar = BENTUK_L.map((p) => cerminGarisDatar(p, tengahY))
  const setengahPutaran = BENTUK_L.map((p) => cerminTitik(p, { x: tengahX, y: tengahY }))

  if (susun(cerminTegak) === susun(BENTUK_L)) {
    gagal++
    console.error('GAGAL bentuk L simetris terhadap garis tegak, jadi pencerminan tak terlihat')
  }
  if (susun(cerminDatar) === susun(BENTUK_L)) {
    gagal++
    console.error('GAGAL bentuk L simetris terhadap garis mendatar')
  }
  if (susun(setengahPutaran) === susun(BENTUK_L)) {
    gagal++
    console.error('GAGAL bentuk L punya simetri putar, jadi rotasi 180 tak terlihat')
  }
}

// Pencerminan membalik arah putar seluruh bentuk, bukan cuma tiga titik yang
// dipilih. Ini yang membuat pernyataan Materi 08 berlaku untuk gambar utuh.
cek('cermin membalik arah putar seluruh bentuk',
  arahPutarPoligon(BENTUK_L.map(cerminSumbuX)), -arahPutarPoligon(BENTUK_L))
cek('rotasi tidak membalik arah putar seluruh bentuk',
  arahPutarPoligon(BENTUK_L.map((p) => rotasi(p, 37, O))), arahPutarPoligon(BENTUK_L))
cek('dilatasi k negatif tidak membalik arah putar seluruh bentuk',
  arahPutarPoligon(BENTUK_L.map((p) => dilatasi(p, -2, O))), arahPutarPoligon(BENTUK_L))

cekDekat('dilatasi 2 membuat luas bentuk jadi empat kali',
  luasPoligon(BENTUK_L.map((p) => dilatasi(p, 2, O))), luasPoligon(BENTUK_L) * 4)
cekDekat('translasi tidak mengubah luas bentuk',
  luasPoligon(BENTUK_L.map((p) => translasi(p, { x: 7, y: -3 }))), luasPoligon(BENTUK_L))
cekDekat('rotasi tidak mengubah luas bentuk',
  luasPoligon(BENTUK_L.map((p) => rotasi(p, 53, { x: 2, y: 2 }))), luasPoligon(BENTUK_L), 1e-9)

cekDekat('luas poligon kurang dari tiga titik adalah nol', luasPoligon([A, B]), 0)

/* ================================================================== */
/* Papan: penskalaan yang tidak memotong gambar                        */
/* ================================================================== */

const NISBAH = 16 / 10
const KOTAK = { x0: 0, y0: 0, x1: 640, y1: 400 }

{
  const j = jendelaSeimbang([A, B, C], NISBAH)
  cekDekat('jendela berskala sama di kedua sumbu',
    (j.xMax - j.xMin) / (j.yMax - j.yMin), NISBAH, 1e-9)
  if (!(j.xMin < A.x && j.xMax > B.x && j.yMin < A.y && j.yMax > C.y)) {
    gagal++
    console.error(`GAGAL jendela tidak memuat bentuknya: ${JSON.stringify(j)}`)
  }
}

// Aturan proyek: widget tidak boleh memotong gambarnya sendiri. Dilatasi
// faktor 3 dan translasi besar adalah dua kasus yang paling mudah melanggarnya
// di topik ini, jadi keduanya diuji langsung.
for (const t of [
  { jenis: 'dilatasi', k: 3, pusat: O } as Transformasi,
  { jenis: 'dilatasi', k: -3, pusat: O } as Transformasi,
  { jenis: 'translasi', geser: { x: 12, y: -9 } } as Transformasi,
  { jenis: 'rotasi', derajat: 137, pusat: { x: 6, y: 6 } } as Transformasi,
]) {
  const prapeta = [A, B, C]
  const peta = prapeta.map((p) => kenakanTransformasi(t, p))
  const semua = [...prapeta, ...peta]
  const j = jendelaSeimbang(semua, NISBAH)
  const ke = keLayar(j, KOTAK)
  for (const p of semua) {
    const sx = ke.x(p.x)
    const sy = ke.y(p.y)
    if (sx < KOTAK.x0 || sx > KOTAK.x1 || sy < KOTAK.y0 || sy > KOTAK.y1) {
      gagal++
      console.error(`GAGAL ${namaTransformasi(t)} membuat titik keluar bingkai: (${sx}, ${sy})`)
    }
  }
}

{
  // Semua titik sama, misalnya saat dilatasi faktor nol meruntuhkan bentuknya.
  // Lebar jendela nol membuat pembagian jadi tak hingga dan gambarnya lenyap
  // tanpa satu pun pesan galat.
  const j = jendelaSeimbang([{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 2 }], NISBAH)
  if (!(j.xMax - j.xMin > 0) || !(j.yMax - j.yMin > 0)) {
    gagal++
    console.error(`GAGAL jendela selebar nol saat semua titik sama: ${JSON.stringify(j)}`)
  }
}

{
  const j = jendelaSeimbang([], NISBAH)
  if (!Number.isFinite(j.xMin) || !Number.isFinite(j.yMax)) {
    gagal++
    console.error(`GAGAL jendela kosong menghasilkan angka yang bukan angka`)
  }
}

{
  const j = jendelaSeimbang([A, B, C], NISBAH)
  const ke = keLayar(j, KOTAK)
  const balik = keMatematika(j, KOTAK)
  cekDekat('keMatematika membalikkan keLayar pada sumbu x', balik.x(ke.x(2.5)), 2.5)
  cekDekat('keMatematika membalikkan keLayar pada sumbu y', balik.y(ke.y(-1.25)), -1.25)
}

{
  const t = tahan({ x: 99, y: -99 }, 8, 6)
  if (t.x > 8 || t.x < -8 || t.y > 6 || t.y < -6) {
    gagal++
    console.error(`GAGAL tahan tidak menahan: ${JSON.stringify(t)}`)
  }
  cek('tahan membulatkan ke kelipatan setengah', tahan({ x: 2.3, y: -1.1 }, 8, 6), { x: 2.5, y: -1 })
}

/* ================================================================== */
/* Angka, petak, penunjuk skala                                        */
/* ================================================================== */

cek('angka memakai koma Indonesia', angka(3.5, 2), '3,5')
cek('nol di belakang dibuang', angka(2, 2), '2')
cek('angka negatif', angka(-0.25, 2), '-0,25')
cek('minus nol ditampilkan sebagai nol', angka(-0.0001, 2), '0')
cek('petak bulat', petak(0, 5).map((p) => p.nilai), [0, 1, 2, 3, 4, 5])

if (!labelSkala(jendelaSeimbang([A, B, C], NISBAH)).includes('satuan')) {
  gagal++
  console.error('GAGAL penunjuk skala tidak menyebut satuan')
}

console.log(gagal === 0 ? 'SEMUA LOLOS' : `${gagal} GAGAL`)
process.exit(gagal === 0 ? 0 : 1)
