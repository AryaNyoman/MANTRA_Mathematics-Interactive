/**
 * Mengubah teks soal MANTRA (huruf Unicode: x², √(9 − x²), ∫₁³, ²log 32,
 * lim x→2, x̄, 5x/6) menjadi potongan prosa dan potongan LaTeX, supaya rumus
 * bisa ditata KaTeX seperti pembahasan mathcyber1997 (ARYA 17 Sep 2026:
 * "integralnya dengan batasnya tidak jelas; lihat tata cara penulisan rumus
 * yang benar; terapkan di semua bab").
 *
 * Bank soal TIDAK ditulis ulang: 540 soal tetap teks biasa. Pengubahnya ada di
 * sini dan diperiksa alat/cek_rumus.mjs terhadap seluruh bank (nol galat
 * KaTeX, daftar potongan yang mencurigakan).
 *
 * Dua tahap:
 * 1. `pisahkan(teks)`: memilah kata demi kata menjadi potongan PROSA dan
 *    potongan MATEMATIKA. Kata dianggap matematika bila berisi angka, lambang
 *    (= + − × √ ∫ ² ...), huruf tunggal (x, y, A, P), nama fungsi (sin, log,
 *    lim, dx), atau nama ruas dua tiga huruf kapital (AB, ACG). Tanda baca
 *    kalimat di ujung kata tetap prosa. Satuan sesudah angka (cm, km/jam)
 *    ikut ke matematika sebagai teks tegak.
 * 2. `keLatex(potongan)`: menjadikan potongan matematika LaTeX. Pecahan
 *    a/b mengikuti kebiasaan bank: pembilang = rangkaian tanpa spasi (atau
 *    kelompok berkurung) di kiri garis miring, penyebut di kanannya, dengan
 *    kurung seimbang (boleh bersarang). Pangkat dan indeks Unicode, ^(...),
 *    √, ∛, ∫ dengan batas, Σ, lim x→c, ²log, x̄, ŷ, °, ′ ditangani.
 */

export type Potongan = { jenis: 'prosa'; teks: string } | { jenis: 'mat'; teks: string; latex: string }

const SUP: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', 'ⁿ': 'n', 'ˣ': 'x', 'ʸ': 'y', 'ᵃ': 'a', 'ᵇ': 'b', 'ᶜ': 'c', 'ᵗ': 't', 'ᵘ': 'u', 'ᵏ': 'k',
  'ⁱ': 'i', 'ᵐ': 'm', 'ᵖ': 'p', 'ʳ': 'r', 'ˢ': 's',
}
const SUB: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '-', 'ₐ': 'a', 'ₙ': 'n', 'ₓ': 'x', 'ᵢ': 'i', 'ₖ': 'k', 'ₘ': 'm', 'ₜ': 't',
}
const OPERATOR: Record<string, string> = {
  '−': '-', '-': '-', '–': '-', '+': '+', '=': '=', '×': '\\times', '·': '\\cdot', '•': '\\cdot', '÷': '\\div',
  '±': '\\pm', '<': '<', '>': '>', '≤': '\\le', '≥': '\\ge', '≠': '\\ne', '≈': '\\approx',
  '→': '\\to', '⇒': '\\Rightarrow', '∘': '\\circ', ',': ',', ';': ';', ':': ':',
  '∈': '\\in', '∉': '\\notin', '∪': '\\cup', '∩': '\\cap', '⊂': '\\subset',
}
const LAMBANG: Record<string, string> = {
  'π': '\\pi', 'θ': '\\theta', 'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'Δ': '\\Delta',
  'δ': '\\delta', 'φ': '\\varphi', 'ω': '\\omega', 'λ': '\\lambda', 'μ': '\\mu', 'σ': '\\sigma',
  '∞': '\\infty', '∠': '\\angle', '⟂': '\\perp', '⊥': '\\perp', '∥': '\\parallel', '△': '\\triangle',
  '°': '^{\\circ}', '′': "'", '″': "''", '…': '\\ldots',
}
const FUNGSI = new Set(['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'lim', 'arcsin', 'arccos', 'arctan'])
// hasil kali dua tiga peubah yang ditulis rapat (uv pada aturan parsial, xy): bukan kata Indonesia
const PRODUK = new Set(['uv', 'xy', 'ab', 'mn', 'pq', 'rs', 'xyz', 'abc', 'uw', 'vw', 'yz', 'ax', 'by', 'cx', 'kx', 'ky', 'ad', 'bc'])
// bukan /^d./: "di", "de", "da" kata prosa Indonesia
const DIFERENSIAL = /^d[xyztuvrshθ]$/
const SATUAN = new Set(['cm', 'm', 'km', 'mm', 'dm', 'kg', 'g', 'ml', 'l', 'liter', 'detik', 'menit', 'jam',
  'rad', 'cm²', 'm²', 'cm³', 'm³', 'km/jam', 'm/s', 'm/s²', 'cm/menit', 'cm/detik', 'km²', 'ha'])
const KATA_UNIT = /^([a-z]+[²³]?)(\/[a-z]+[²³]?)?$/

/* ------------------------------------------------------------------ */
/* Tahap 1: pisah prosa dan matematika                                   */
/* ------------------------------------------------------------------ */

const PUNGTUASI_AKHIR = /[.,;:!?…]+$/
const HURUF_MAT = /[0-9=+−×·•÷±<>≤≥≠≈→⇒∘∞∫√∛Σ∑πθαβγΔδφωλμσ°′″⟂⊥∥∠△∈∉∪∩⊂∅^_\/|\[\]{}()]|[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿˣʸᵃᵇᶜᵗᵘᵏⁱᵐᵖʳˢ₀₁₂₃₄₅₆₇₈₉₊₋ₐₙₓᵢₖₘₜ]|̄|[ŷâ]/

function intiKata(kata: string): string {
  return kata.replace(/^[(\[|]+/, '').replace(/[)\]|]+$/, '').replace(PUNGTUASI_AKHIR, '')
}

function kataMatematika(kata: string, sebelumnya: string | null): boolean {
  // elipsis di tengah deretan: 1, 2, ..., n (hanya bila kata sebelumnya matematika)
  if (/^(\.\.\.|…)[,;:]?$/.test(kata)) return sebelumnya !== null && kataMatematika(sebelumnya, null)
  const inti = intiKata(kata)
  if (!inti) return false
  if (/^(Jawaban|Pilihan|pilihan|Opsi|opsi)$/.test(intiKata(sebelumnya ?? '')) && /^[A-E]$/.test(inti)) return false
  if (/^[IVX]+$/.test(inti)) return false // kuadran III, bukan matematika
  if (/^[A-Z]{4,}$/.test(inti)) return false // TURUNAN, SEBELUM: penekanan prosa
  if (/^(DAN|ATAU|INI|ITU|TAK|YA|KE|DI|DUA|ADA)$/.test(inti)) return false // penekanan prosa pendek
  // singkatan yang lazim di bacaan materi, bukan nama ruas: SMA, UN 2004, JAK
  if (/^(SMA|SMK|SMP|SD|UN|UAN|PDF|JAK|TV)$/.test(inti) && !/^[A-Z]{1,3}$/.test(intiKata(sebelumnya ?? ''))) return false
  // "layar HP", "di HP" prosa; "HP ⟂ AC" (ruas di kubus) matematika
  if (inti === 'HP' && /^(layar|di|ke|dari|lewat|pakai|punya|pada|memakai|lewat|buka|dibuka)$/i.test(intiKata(sebelumnya ?? ''))) return false
  if (inti === '-' || inti === '–') return true // tanda kurang ASCII berdiri sendiri (latihan.ts memakainya)
  if (/^ke-\d+$/i.test(inti)) return false // urutan: detik ke-2, suku ke-3
  if (HURUF_MAT.test(inti)) {
    // kata prosa yang kebetulan berisi angka di dalam kurung? tidak ada di bank
    return true
  }
  if (/^[a-zA-Z]$/.test(inti)) return true
  if (PRODUK.has(inti)) return true
  // tanda kurang ASCII di depan kata matematika: -sin θ, -x, -cos
  if (/^-./.test(inti) && kataMatematika(inti.slice(1), sebelumnya)) return true
  if (/^[A-Z]{2,3}$/.test(inti)) return true // ruas AB, segitiga ACG
  if (/^[a-zA-Z][0-9]$/.test(inti)) return true // x1, P2
  const rendah = inti.toLowerCase()
  if (FUNGSI.has(rendah)) return true
  if (DIFERENSIAL.test(inti)) return true
  return false
}

function kataSatuan(kata: string): boolean {
  const inti = intiKata(kata)
  return SATUAN.has(inti) || (KATA_UNIT.test(inti) && SATUAN.has(inti.replace(/[²³]/g, '')))
}

/** Pisah satu teks menjadi potongan prosa dan matematika. */
export function pisahkan(teks: string): Potongan[] {
  const kata = teks.split(/(\s+)/) // spasi dipertahankan sebagai elemen ganjil
  const hasil: Potongan[] = []
  let prosa = ''
  let mat = ''
  let kataSebelum: string | null = null
  let mataMatematika = false // potongan matematika sedang dibangun
  const tutupMat = () => {
    if (mat.trim()) hasil.push({ jenis: 'mat', teks: mat.trim(), latex: keLatex(mat.trim()) })
    mat = ''
    mataMatematika = false
  }
  const tutupProsa = () => {
    if (prosa) hasil.push({ jenis: 'prosa', teks: prosa })
    prosa = ''
  }
  for (let ki = 0; ki < kata.length; ki++) {
    const bagian = kata[ki]
    if (/^\s+$/.test(bagian)) {
      if (mataMatematika) mat += bagian
      else prosa += bagian
      continue
    }
    if (!bagian) continue
    let punct = bagian.match(PUNGTUASI_AKHIR)?.[0] ?? ''
    // koma desimal "1,28" atau "0,5" bukan tanda baca
    let inti = /^\d+,\d+$/.test(bagian) ? bagian : bagian.slice(0, bagian.length - punct.length)
    // elipsis "..." atau "…" (boleh berkoma) adalah kata sendiri, bukan tanda baca ekor
    const elipsis = bagian.match(/^(\.\.\.|…)([,;:]?)$/)
    if (elipsis) {
      inti = elipsis[1]
      punct = elipsis[2]
    }
    // koma pemisah daftar matematika ("(3, 4)", "{5, 7, x}", "1, 7, 5") ikut
    // matematika bila kata berikutnya juga matematika; koma kalimat ("x = 5,
    // maka") tetap prosa
    if (punct === ',' && inti) {
      const berikut = kata[ki + 2] ?? ''
      const berikutInti = /^(\.\.\.|…)/.test(berikut) ? berikut.replace(/[,;:]$/, '') : berikut.replace(PUNGTUASI_AKHIR, '')
      if (berikut && kataMatematika(berikutInti, inti) && kataMatematika(inti, kataSebelum)) {
        inti = bagian
        punct = ''
      }
    }
    const ekor = inti === bagian ? '' : punct
    const angkaSebelum = /^[(\[]*[0-9][0-9.,]*[)\]]*$/.test(intiKata(kataSebelum ?? '') ? kataSebelum ?? '' : '')
    const matematika = kataMatematika(inti, kataSebelum) || (mataMatematika && angkaSebelum && kataSatuan(inti))
    if (matematika) {
      if (!mataMatematika) {
        tutupProsa()
        mataMatematika = true
      }
      mat += inti
      if (ekor) {
        tutupMat()
        prosa += ekor
      }
    } else {
      if (mataMatematika) {
        // spasi terakhir milik prosa berikutnya
        const spasi = mat.match(/\s+$/)?.[0] ?? ''
        mat = mat.trimEnd()
        tutupMat()
        prosa += spasi
      }
      prosa += bagian
    }
    kataSebelum = inti
  }
  if (mataMatematika) tutupMat()
  tutupProsa()
  return hasil
}

/* ------------------------------------------------------------------ */
/* Tahap 2: matematika Unicode -> LaTeX                                 */
/* ------------------------------------------------------------------ */

type Token =
  | { t: 'num'; v: string }
  | { t: 'id'; v: string }
  | { t: 'sup'; v: string }
  | { t: 'sub'; v: string }
  | { t: 'op'; v: string }
  | { t: 'lambang'; v: string }
  | { t: 'kelompok'; buka: string; tutup: string; isi: Token[]; tertutup: boolean }
  | { t: 'garisbawah' }
  | { t: 'sqrt'; akar: 3 | 2 }
  | { t: 'int' }
  | { t: 'sum' }
  | { t: 'caret' }
  | { t: 'slash' }
  | { t: 'spasi' }
  | { t: 'mutlak' }
  | { t: 'teks'; v: string }

const PASANGAN: Record<string, string> = { '(': ')', '[': ']', '{': '}' }

function tokenisasi(s: string): Token[] {
  const keluar: Token[] = []
  const tumpuk: Token[][] = [keluar]
  const terbuka: Token[] = []
  const kini = () => tumpuk[tumpuk.length - 1]
  let i = 0
  while (i < s.length) {
    const c = s[i]
    if (/\s/.test(c)) {
      kini().push({ t: 'spasi' })
      i++
      continue
    }
    if (c in PASANGAN) {
      const k: Token = { t: 'kelompok', buka: c, tutup: PASANGAN[c], isi: [], tertutup: false }
      kini().push(k)
      tumpuk.push(k.isi)
      terbuka.push(k)
      i++
      continue
    }
    if (c === ')' || c === ']' || c === '}') {
      if (tumpuk.length > 1) {
        tumpuk.pop()
        const k = terbuka.pop()
        if (k && k.t === 'kelompok') k.tertutup = true
      } else {
        // kurung tutup tanpa pembuka (potongan terpotong): tulis apa adanya
        kini().push({ t: 'teks', v: c === '}' ? '\\}' : c })
      }
      i++
      continue
    }
    if (c === '_') { kini().push({ t: 'garisbawah' }); i++; continue }
    if (c === '|') { kini().push({ t: 'mutlak' }); i++; continue }
    if (c === '√') { kini().push({ t: 'sqrt', akar: 2 }); i++; continue }
    if (c === '∛') { kini().push({ t: 'sqrt', akar: 3 }); i++; continue }
    if (c === '∫') { kini().push({ t: 'int' }); i++; continue }
    if (c === 'Σ' || c === '∑') { kini().push({ t: 'sum' }); i++; continue }
    if (c === '^') { kini().push({ t: 'caret' }); i++; continue }
    if (c === '/') { kini().push({ t: 'slash' }); i++; continue }
    if (c in SUP) {
      let v = ''
      while (i < s.length && s[i] in SUP) v += SUP[s[i++]]
      kini().push({ t: 'sup', v })
      continue
    }
    if (c in SUB) {
      let v = ''
      while (i < s.length && s[i] in SUB) v += SUB[s[i++]]
      kini().push({ t: 'sub', v })
      continue
    }
    if (/[0-9]/.test(c)) {
      let v = ''
      while (i < s.length && /[0-9]/.test(s[i])) v += s[i++]
      // desimal koma atau titik ribuan: 1,28  6.400  0,5
      while (i + 1 < s.length && /[.,]/.test(s[i]) && /[0-9]/.test(s[i + 1])) {
        v += s[i] === ',' ? '{,}' : '.'
        i++
        while (i < s.length && /[0-9]/.test(s[i])) v += s[i++]
      }
      kini().push({ t: 'num', v })
      continue
    }
    if (c in OPERATOR) { kini().push({ t: 'op', v: OPERATOR[c] }); i++; continue }
    if (c in LAMBANG) { kini().push({ t: 'lambang', v: LAMBANG[c] }); i++; continue }
    if (/[A-Za-z]/.test(c)) {
      let v = ''
      while (i < s.length && /[A-Za-z]/.test(s[i])) v += s[i++]
      // garis atas (x̄) atau topi (ŷ, â) menempel pada huruf terakhir
      if (s[i] === '̄') { v = v.slice(0, -1) + `\\bar{${v.slice(-1)}}`; i++ }
      kini().push({ t: 'id', v })
      continue
    }
    if (c === 'ŷ') { kini().push({ t: 'id', v: '\\hat{y}' }); i++; continue }
    if (c === 'â') { kini().push({ t: 'id', v: '\\hat{a}' }); i++; continue }
    if (c === '̄') { i++; continue }
    // huruf lain (misalnya karakter yang belum dikenal): jadi teks tegak
    kini().push({ t: 'teks', v: c })
    i++
  }
  return keluar
}

function idKeLatex(v: string): string {
  // Perintah LaTeX (\bar{x}, \sin) diberi spasi di belakang supaya tidak
  // menempel ke huruf berikutnya (\sinx tidak dikenal KaTeX).
  if (v.startsWith('\\')) return v + ' '
  const rendah = v.toLowerCase()
  if (FUNGSI.has(rendah)) return `\\${rendah} `
  if (DIFERENSIAL.test(v)) return `\\,${v}`
  if (v.length === 1) return v
  if (PRODUK.has(v)) return v // uv, xy: hasil kali peubah, huruf miring
  if (/^[A-Z]+$/.test(v)) return v // ruas AB, segitiga ACG: huruf kapital miring berurutan
  if (SATUAN.has(rendah)) return `\\,\\text{${v}}`
  // kata lain (misalnya "luas", "de", "sa", "mi"): teks tegak
  return `\\text{${v}}`
}

/** Satu "rangkaian": deretan token tanpa spasi dan tanpa operator, pembilang atau penyebut pecahan. */
function rangkaian(tokens: Token[], dari: number, arah: 1 | -1): [number, number] {
  // kembalikan [awal, akhir) rangkaian yang bersebelahan dengan indeks `dari`
  let a = dari
  let b = dari + 1
  const pemutus = (t: Token) => t.t === 'spasi' || t.t === 'op' || t.t === 'slash'
  // garis bawah dan pangkat mengikat ke rangkaian (x_i, e^(3x))
  if (arah === -1) {
    // mundur: sertakan sup/sub dan sqrt yang menempel
    while (a - 1 >= 0 && !pemutus(tokens[a - 1])) a--
    return [a, b]
  }
  while (b < tokens.length && !pemutus(tokens[b])) b++
  return [a, b]
}

/** Pecahan di dalam pangkat atau indeks ditulis kecil (u^{3/2}), bukan bersusun besar. */
function kecil(latex: string): string {
  return latex.replace(/\\dfrac/g, '\\tfrac').replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
}

function susun(tokens: Token[]): string {
  // 1. pecahan: cari slash, ambil rangkaian kiri dan kanan
  const t = [...tokens]
  for (let i = 0; i < t.length; i++) {
    if (t[i].t !== 'slash') continue
    const berspasi = (i > 0 && t[i - 1].t === 'spasi') || (i + 1 < t.length && t[i + 1].t === 'spasi')
    let kiriAkhir = i
    while (kiriAkhir - 1 >= 0 && t[kiriAkhir - 1].t === 'spasi') kiriAkhir--
    if (kiriAkhir === 0) continue
    let kananAwal = i + 1
    while (kananAwal < t.length && t[kananAwal].t === 'spasi') kananAwal++
    if (kananAwal >= t.length) continue
    let ka: number
    let kb: number
    if (berspasi) {
      // "Σf_i x_i / Σf_i": garis miring berspasi = pecahan besar, pembilang
      // dan penyebutnya sampai tanda sama dengan terdekat (atau ujung)
      const batas = (x: Token) => x.t === 'op' && ['=', '\\approx', '\\ne', '\\le', '\\ge', ',', '<', '>'].includes(x.v)
      ka = kiriAkhir
      while (ka - 1 >= 0 && !batas(t[ka - 1])) ka--
      kb = kananAwal
      while (kb < t.length && !batas(t[kb])) kb++
      while (ka < kiriAkhir && t[ka].t === 'spasi') ka++
      while (kb > kananAwal && t[kb - 1].t === 'spasi') kb--
    } else {
      ;[ka] = rangkaian(t, kiriAkhir - 1, -1)
      ;[, kb] = rangkaian(t, kananAwal, 1)
      // Fungsi beserta argumennya adalah satu rangkaian: "sin x/x" adalah
      // (sin x)/x, "1/cos θ" adalah 1/(cos θ), "sin 3x/5x" adalah (sin 3x)/(5x).
      const fungsi = (x: Token | undefined) => !!x && x.t === 'id' && FUNGSI.has(x.v.toLowerCase())
      if (ka - 2 >= 0 && t[ka - 1].t === 'spasi') {
        const [fa] = rangkaian(t, ka - 2, -1) // rangkaian sebelum spasi: "sin" atau "cos²"
        if (fungsi(t[fa])) ka = fa
      }
      if (fungsi(t[kananAwal]) && kb < t.length && t[kb].t === 'spasi' && kb + 1 < t.length) {
        ;[, kb] = rangkaian(t, kb + 1, 1)
      }
    }
    const atas = t.slice(ka, kiriAkhir)
    const bawah = t.slice(kananAwal, kb)
    if (atas.length === 0 || bawah.length === 0) continue
    const bersih = (x: string) => x.replace(/^\\,/, '')
    const frac: Token = { t: 'teks', v: `\\dfrac{${bersih(susun(lepasKelompok(atas)))}}{${bersih(susun(lepasKelompok(bawah)))}}` }
    t.splice(ka, kb - ka, frac)
    i = ka
  }
  // 2. urutan biasa
  let keluar = ''
  for (let i = 0; i < t.length; i++) {
    const tok = t[i]
    switch (tok.t) {
      case 'spasi': {
        // Dua angka berdampingan hanya dipisah spasi, misalnya vektor baris
        // (4 3) di materi Vektor: LaTeX mengabaikan spasi, jadi tanpa jarak
        // tegas keduanya menyatu menjadi (43). Angka negatif (4 -3) ikut.
        if (i > 0 && t[i - 1].t === 'spasi') break // spasi beruntun cukup satu
        let j = i + 1
        while (j < t.length && t[j].t === 'spasi') j++
        const sebelum = t[i - 1]
        const sesudah = t[j]
        const angka = (x: Token | undefined) => !!x && (x.t === 'num' || (x.t === 'teks' && /^(\\dfrac|\d)/.test(x.v)))
        const minusAngka = !!sesudah && sesudah.t === 'op' && sesudah.v === '-' && angka(t[j + 1])
        keluar += angka(sebelum) && (angka(sesudah) || minusAngka) ? '\\; ' : ' '
        break
      }
      case 'num': keluar += tok.v; break
      case 'id': {
        // lim x→c  ->  \lim_{x \to c}
        if (tok.v.toLowerCase() === 'lim') {
          let j = i + 1
          while (j < t.length && t[j].t === 'spasi') j++
          // kumpulkan sampai spasi berikutnya, harus memuat →
          let k = j
          while (k < t.length && t[k].t !== 'spasi') k++
          const bawah = t.slice(j, k)
          if (bawah.some((x) => x.t === 'op' && x.v === '\\to')) {
            keluar += `\\lim_{${susun(bawah)}} `
            i = k
            break
          }
        }
        keluar += idKeLatex(tok.v)
        break
      }
      case 'sup': keluar = keluar.trimEnd() + `^{${tok.v}}`; break
      case 'sub': keluar = keluar.trimEnd() + `_{${tok.v}}`; break
      case 'op': keluar += tok.v.startsWith('\\') ? `${tok.v} ` : tok.v; break
      case 'lambang': keluar += tok.v + ' '; break
      case 'teks': keluar += tok.v; break
      case 'mutlak': keluar += '|'; break
      case 'int': keluar += '\\int '; break
      case 'sum': keluar += '\\sum '; break
      case 'caret': {
        const next = t[i + 1]
        if (!next) break
        if (next.t === 'kelompok') {
          keluar += `^{${kecil(susun(next.isi))}}`
          i++
        } else {
          // ^b_c: pangkat berhenti sebelum garis bawah berikutnya
          let [, kb] = rangkaian(t, i + 1, 1)
          const gb = t.slice(i + 1, kb).findIndex((x) => x.t === 'garisbawah')
          if (gb > 0) kb = i + 1 + gb
          keluar += `^{${kecil(susun(t.slice(i + 1, kb)))}}`
          i = kb - 1
        }
        break
      }
      case 'sqrt': {
        const next = t[i + 1]
        const awalan = tok.akar === 3 ? '\\sqrt[3]' : '\\sqrt'
        if (!next) { keluar += awalan + '{}'; break }
        if (next.t === 'kelompok') {
          keluar += `${awalan}{${susun(next.isi)}}`
          i++
        } else {
          const [, kb] = rangkaian(t, i + 1, 1)
          keluar += `${awalan}{${susun(t.slice(i + 1, kb))}}`
          i = kb - 1
        }
        break
      }
      case 'kelompok': {
        // Matriks: [[a, b], [c, d]] menjadi pmatrix (materi Transformasi
        // Geometri). Baris = kelompok siku di dalam kelompok siku, dipisah koma.
        if (tok.buka === '[' && tok.tertutup) {
          const anak = tok.isi.filter((x) => x.t !== 'spasi')
          const baris = anak.filter((x) => x.t === 'kelompok') as Extract<Token, { t: 'kelompok' }>[]
          const pemisah = anak.filter((x) => !(x.t === 'kelompok'))
          if (baris.length >= 2 && baris.every((b) => b.buka === '[' && b.tertutup) && pemisah.every((x) => x.t === 'op' && x.v === ',')) {
            const sel = (b: Extract<Token, { t: 'kelompok' }>) => {
              const kolom: Token[][] = [[]]
              for (const x of b.isi) {
                if (x.t === 'op' && x.v === ',') kolom.push([])
                else kolom[kolom.length - 1].push(x)
              }
              return kolom.map((k) => susun(k).trim()).join(' & ')
            }
            keluar += `\\begin{pmatrix} ${baris.map(sel).join(' \\\\ ')} \\end{pmatrix}`
            break
          }
        }
        const isi = susun(tok.isi)
        const buka = tok.buka === '{' ? '\\{' : tok.buka
        const tutup = tok.tutup === '}' ? '\\}' : tok.tutup
        if (!tok.tertutup) {
          keluar += `${buka}${isi}` // pembukanya ada di potongan ini, penutupnya di potongan lain
          break
        }
        const tinggi = /\\dfrac|\\sqrt|\\int|\\sum/.test(isi)
        keluar += tinggi ? `\\left${buka}${isi}\\right${tutup}` : `${buka}${isi}${tutup}`
        break
      }
      case 'garisbawah': {
        const next = t[i + 1]
        if (!next) break
        if (next.t === 'kelompok') {
          keluar += `_{${kecil(susun(next.isi))}}`
          i++
        } else {
          // _c^b: indeks berhenti sebelum pangkat berikutnya (batas integral)
          let [, kb] = rangkaian(t, i + 1, 1)
          const cr = t.slice(i + 1, kb).findIndex((x) => x.t === 'caret')
          if (cr > 0) kb = i + 1 + cr
          keluar += `_{${kecil(susun(t.slice(i + 1, kb)))}}`
          i = kb - 1
        }
        break
      }
      case 'slash': keluar += '/'; break
    }
  }
  // sup/sub di awal (²log): beri kotak kosong sebagai tumpuan
  return keluar.replace(/(^|\s)([_^]\{)/g, '$1{}$2').replace(/\s+/g, ' ').trim()
}

/** kelompok tunggal yang membungkus seluruh pembilang/penyebut: kurungnya dibuang */
function lepasKelompok(bagian: Token[]): Token[] {
  if (bagian.length === 1 && bagian[0].t === 'kelompok' && bagian[0].buka === '(') return bagian[0].isi
  return bagian
}

export function keLatex(teksMat: string): string {
  return susun(tokenisasi(teksMat.replace(/\.\.\./g, '…')))
}

/** LaTeX potongan ini "tinggi" (pecahan, integral, akar, jumlah)? Penentu tampilan blok. */
export function latexTinggi(latex: string): boolean {
  return /\\dfrac|\\int|\\sum|\\sqrt|\\lim/.test(latex)
}
