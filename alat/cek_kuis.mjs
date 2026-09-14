#!/usr/bin/env node
/**
 * Pemeriksa bank soal latihan (`web/content/<bab>/kuis.ts`).
 *
 *   node alat/cek_kuis.mjs trigonometri          satu bab
 *   node alat/cek_kuis.mjs --semua               semua bab
 *   node alat/cek_kuis.mjs --semua --ketat       wajib 15 soal per tingkat, langkah terisi,
 *                                                dan gaya pembahasan mathcyber1997
 *
 * Memuat kuis.ts langsung lewat Node (tipe dibuang otomatis), lalu memeriksa:
 * id unik, `benar` sah, lima pilihan tanpa kembar, tanpa em-dash, tanpa kata
 * "miskonsepsi", gambar berbentuk sah (fungsi bisa dihitung, panjang data
 * cocok, segitiga umum memenuhi ketaksamaan segitiga dan siku-sikunya
 * Pythagoras), gambar bantu di dalam butir langkah, dan ekspresi `// cek: <js>`
 * yang ditulis tepat di atas `id:` di dalam objek soal: dievaluasi, harus
 * benar. Jawaban angka jadi diperiksa mesin, bukan dipercaya begitu saja
 * (pelajaran 12 Sep: soal buatan sendiri pernah keliru dan lolos karena tidak
 * ada yang menghitung ulang).
 *
 * Dengan --ketat, gaya pembahasan ikut diperiksa (ARYA 14 Sep 2026 menolak
 * pembahasan berbentuk potongan catatan): tiap butir langkah harus kalimat
 * utuh yang memuat kata penuntun (diperoleh, sehingga, maka, misalkan, ...),
 * tanpa "kamu"/"Anda", dan butir terakhir harus "Jadi, ... (Jawaban X)"
 * dengan X = huruf pilihan yang benar.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const AKAR = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const KONTEN = path.join(AKAR, 'web', 'content')
const TINGKAT = ['mudah', 'sedang', 'sulit', 'sangat sulit']
const JENIS_GAMBAR = new Set(['segitiga', 'lingkaran', 'kuadran', 'segitiga-umum', 'tabel', 'garis-bilangan', 'grafik', 'vektor', 'batang', 'garis-data', 'balok', 'bidang', 'luas', 'svg'])
// kata yang menandai kalimat penuntun ala mathcyber1997; butir tanpa satu pun
// kata ini hampir pasti potongan catatan "A: B"
const KATA_PENUNTUN = /\b(diperoleh|sehingga|maka|adalah|misalkan|perhatikan|jadi|substitusi\w*|dengan|karena|ingat|diketahui|berarti|akibatnya|selanjutnya|tinjau|berlaku|menjadi|yaitu|artinya|didapat|terletak|memenuhi|berada|bernilai|merupakan|ambil|tulis\w*|uji|periksa|hitung|lengkapi|urutkan|susun|kalikan|bagi\w*|samakan|nyatakan|ubah|coret|kurangkan|tambahkan|jumlahkan|gunakan|terapkan|bandingkan|tentukan|cari|pilih|gambar\w*|tarik|proyeksi\w*|hasilnya|nilainya|tampak|haruslah|kita|ini|itu|tersebut|didefinisikan|definisi|pemeriksaan|sebagai|dinyatakan|disebut|memberi\w*|menghasilkan|terbukti|secara umum|dikatakan|panjang\w*|luas\w*|besar\w*|bila|jika|selalu|sama dengan)\b/i

const argv = process.argv.slice(2)
const ketat = argv.includes('--ketat')
const semua = argv.includes('--semua')
const bab = semua
  ? readdirSync(KONTEN).filter((d) => existsSync(path.join(KONTEN, d, 'kuis.ts')))
  : argv.filter((a) => !a.startsWith('--'))
if (bab.length === 0) {
  console.error('sebut nama bab atau --semua')
  process.exit(2)
}

function evalFungsi(rumus, x) {
  return Function('x', 'Math', `"use strict"; return (${rumus});`)(x, Math)
}

function periksaGambar(g, cacat, id) {
  if (!JENIS_GAMBAR.has(g.jenis)) return cacat.push(`${id}: jenis gambar '${g.jenis}' tidak dikenal`)
  const tolak = (pesan) => cacat.push(`${id}: gambar ${g.jenis}: ${pesan}`)
  if (g.jenis === 'segitiga' && (!Array.isArray(g.label) || g.label.length !== 3)) tolak('label harus 3 (depan, samping, miring)')
  if (g.jenis === 'lingkaran' && typeof g.sudut !== 'number') tolak('sudut harus angka')
  if (g.jenis === 'kuadran' && g.sorot !== undefined && ![1, 2, 3, 4].includes(g.sorot)) tolak('sorot harus 1 sampai 4')
  if (g.jenis === 'segitiga-umum') {
    if (!Array.isArray(g.titik) || g.titik.length !== 3) tolak('titik harus 3 nama')
    if (!Array.isArray(g.panjang) || g.panjang.length !== 3 || g.panjang.some((p) => !(p > 0))) tolak('panjang harus 3 angka positif')
    else {
      const [a, b, c] = g.panjang
      if (!(a + b > c && b + c > a && c + a > b)) tolak(`panjang ${a}, ${b}, ${c} melanggar ketaksamaan segitiga`)
      if (g.siku !== undefined) {
        // sisi yang mengapit titik siku: indeks siku dan (siku + 2) % 3; hadapannya (siku + 1) % 3
        const apit1 = g.panjang[g.siku], apit2 = g.panjang[(g.siku + 2) % 3], hadap = g.panjang[(g.siku + 1) % 3]
        if (Math.abs(apit1 * apit1 + apit2 * apit2 - hadap * hadap) > 0.03 * hadap * hadap) tolak(`siku di titik ${g.titik?.[g.siku]} tidak cocok dengan panjang (${apit1}^2 + ${apit2}^2 != ${hadap}^2)`)
      }
    }
    if (g.sisi !== undefined && (!Array.isArray(g.sisi) || g.sisi.length !== 3)) tolak('sisi harus 3 label')
  }
  if (g.jenis === 'tabel') {
    if (!Array.isArray(g.kepala) || !Array.isArray(g.baris) || g.baris.length === 0) tolak('kepala dan baris wajib')
    else {
      for (const [i, br] of g.baris.entries()) if (br.length !== g.kepala.length) tolak(`baris ${i} punya ${br.length} sel, kepala ${g.kepala.length}`)
      if (g.jumlah && g.jumlah.length !== g.kepala.length) tolak('baris jumlah beda panjang dengan kepala')
      for (const i of g.sorot ?? []) if (!(i >= 0 && i < g.baris.length)) tolak(`sorot baris ${i} di luar tabel`)
    }
  }
  if (g.jenis === 'garis-bilangan' && (!Array.isArray(g.titik) || g.titik.length === 0)) tolak('titik kosong')
  if (g.jenis === 'grafik' || g.jenis === 'luas') {
    const daftar = g.jenis === 'grafik' ? g.fungsi : [g.fungsi, g.fungsi2].filter(Boolean)
    for (const f of daftar) {
      try {
        const y = evalFungsi(f, 1.37)
        if (typeof y !== 'number') tolak(`fungsi '${f}' tidak menghasilkan angka`)
      } catch (e) {
        tolak(`fungsi '${f}' tidak bisa dihitung: ${e.message}`)
      }
    }
    if (g.jenis === 'luas' && !(g.dari < g.sampai)) tolak('dari harus < sampai')
  }
  if ((g.jenis === 'batang' || g.jenis === 'garis-data') && g.kategori.length !== g.nilai.length) tolak('kategori dan nilai beda panjang')
  if (g.jenis === 'vektor' && (!Array.isArray(g.panah) || g.panah.length === 0)) tolak('panah kosong')
  if (g.jenis === 'balok' && g.ukuran.some((u) => !(u > 0))) tolak('ukuran harus positif')
  if (g.jenis === 'bidang' && (!Array.isArray(g.bangun) || g.bangun.length < 1)) tolak('bangun kosong')
  if (g.jenis === 'svg' && (!g.viewBox || !g.isi)) tolak('viewBox dan isi wajib')
}

let totalCacat = 0
for (const b of bab) {
  const berkas = path.join(KONTEN, b, 'kuis.ts')
  const sumber = readFileSync(berkas, 'utf8')
  const mod = await import(pathToFileURL(berkas).href)
  const KUIS = mod.KUIS
  const cacat = []
  const peringatan = []

  // ekspresi cek: komentar tepat di atas `id:` dalam objek soal
  const cek = new Map()
  for (const m of sumber.matchAll(/\/\/\s*cek:\s*(.+?)\r?\n\s*id:\s*'([^']+)'/g)) cek.set(m[2], m[1].trim())

  const ids = new Set()
  const perTingkat = Object.fromEntries(TINGKAT.map((t) => [t, 0]))
  for (const s of KUIS) {
    if (ids.has(s.id)) cacat.push(`${s.id}: id kembar`)
    ids.add(s.id)
    if (!TINGKAT.includes(s.tingkat)) cacat.push(`${s.id}: tingkat '${s.tingkat}' tidak dikenal`)
    else perTingkat[s.tingkat]++
    if (!Array.isArray(s.pilihan) || s.pilihan.length !== 5) cacat.push(`${s.id}: pilihan harus 5, ada ${s.pilihan?.length}`)
    if (new Set(s.pilihan).size !== s.pilihan.length) cacat.push(`${s.id}: pilihan kembar`)
    if (!(Number.isInteger(s.benar) && s.benar >= 0 && s.benar < s.pilihan.length)) cacat.push(`${s.id}: indeks benar ${s.benar} di luar pilihan`)
    const langkah = Array.isArray(s.langkah) ? s.langkah : []
    const teksLangkah = langkah.map((lg) => (typeof lg === 'string' ? lg : lg?.teks ?? ''))
    const teks = [s.pertanyaan, s.alasan, s.jebakan ?? '', ...(s.pilihan ?? []), ...teksLangkah].join('\n')
    if (teks.includes('—')) cacat.push(`${s.id}: ada em-dash`)
    if (/miskonsepsi/i.test(teks)) cacat.push(`${s.id}: kata "miskonsepsi" dilarang di halaman siswa`)
    for (const [i, lg] of langkah.entries()) {
      if (typeof lg === 'string') continue
      if (!lg || typeof lg.teks !== 'string' || !lg.gambar) cacat.push(`${s.id}: langkah ${i + 1} harus string atau { teks, gambar }`)
      else periksaGambar(lg.gambar, cacat, `${s.id} langkah ${i + 1}`)
    }
    if (ketat) {
      if (langkah.length < 3) cacat.push(`${s.id}: langkah pembahasan kurang dari 3 (pembuka, hitungan, penutup)`)
      if (langkah.length > 9) peringatan.push(`${s.id}: langkah ${langkah.length} butir, terlalu panjang?`)
      const huruf = String.fromCharCode(65 + s.benar)
      for (const [i, t] of teksLangkah.entries()) {
        if (!KATA_PENUNTUN.test(t)) cacat.push(`${s.id}: langkah ${i + 1} tanpa kata penuntun (potongan catatan?): "${t.slice(0, 60)}"`)
        if (!/[.)!?]\s*$/.test(t)) cacat.push(`${s.id}: langkah ${i + 1} tidak diakhiri tanda titik: "${t.slice(-40)}"`)
        const m = t.match(/\(Jawaban ([A-E])\)/)
        if (m && m[1] !== huruf) cacat.push(`${s.id}: langkah ${i + 1} menyebut (Jawaban ${m[1]}), padahal benar = ${huruf}`)
      }
      const akhir = teksLangkah[teksLangkah.length - 1] ?? ''
      if (langkah.length && !/^Jadi\b/.test(akhir.trim())) cacat.push(`${s.id}: langkah terakhir harus dimulai "Jadi, ...": "${akhir.slice(0, 50)}"`)
      if (langkah.length && !akhir.includes(`(Jawaban ${huruf})`)) cacat.push(`${s.id}: langkah terakhir harus memuat "(Jawaban ${huruf})"`)
      const santai = [...teksLangkah, s.jebakan ?? ''].join('\n').match(/\b(kamu|anda|kalian)\b/i)
      if (santai) cacat.push(`${s.id}: pembahasan memakai kata "${santai[1]}"; gaya formal tanpa sapaan`)
      if (!s.jebakan) peringatan.push(`${s.id}: tanpa jebakan`)
      else if (!/Pilihan [A-E]/.test(s.jebakan)) peringatan.push(`${s.id}: jebakan tidak menyebut "Pilihan X"`)
    }
    if (s.gambar) periksaGambar(s.gambar, cacat, s.id)
    const e = cek.get(s.id)
    if (e) {
      try {
        // D = derajat ke radian, supaya ekspresi cek boleh menulis Math.sin(30*D)
        const hasil = Function('Math', 's', 'D', `"use strict"; return (${e});`)(Math, s, Math.PI / 180)
        if (!hasil) cacat.push(`${s.id}: cek gagal: ${e}`)
      } catch (err) {
        cacat.push(`${s.id}: cek tidak bisa dihitung: ${e} (${err.message})`)
      }
    } else if (ketat) {
      // soal tanpa pemeriksa mesin: hanya peringatan, sebab soal definisi memang tidak punya angka
      if (/\d/.test(s.pilihan[s.benar] ?? '')) peringatan.push(`${s.id}: jawaban berangka tanpa // cek:`)
    }
  }
  const ringkas = TINGKAT.map((t) => `${t} ${perTingkat[t]}`).join(', ')
  if (ketat) for (const t of TINGKAT) if (perTingkat[t] !== 15) cacat.push(`tingkat ${t}: ${perTingkat[t]} soal, harus 15`)

  const gambarLangkah = KUIS.reduce((n, s) => n + (s.langkah ?? []).filter((lg) => typeof lg !== 'string').length, 0)
  console.log(`${cacat.length ? 'CACAT ' : 'ok    '} ${b.padEnd(22)} ${KUIS.length} soal (${ringkas}), gambar soal ${KUIS.filter((s) => s.gambar).length}, gambar langkah ${gambarLangkah}, cek mesin ${cek.size}`)
  for (const c of cacat) console.log(`         ${c}`)
  for (const p of peringatan) console.log(`         peringatan: ${p}`)
  totalCacat += cacat.length
}
console.log(totalCacat ? `\n${totalCacat} cacat` : '\nSEMUA LOLOS')
process.exit(totalCacat ? 1 : 0)
