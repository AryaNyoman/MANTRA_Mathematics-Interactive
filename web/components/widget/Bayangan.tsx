'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Bayangan", Trigonometri tahap 1.
 *
 * Bukti pertama bahwa sudut yang sama memberi perbandingan yang sama, memakai
 * benda yang bisa dilihat siswa sendiri di halaman rumah: pohon dan dirinya,
 * disinari matahari yang sama.
 *
 * Geser sudut matahari. Kedua bayangan berubah panjang, tapi kedua hasil bagi
 * tinggi-per-bayangan tetap identik. Itu menyiapkan tahap 2 tanpa menyebut
 * satu pun kata "sinus".
 *
 * REVISI ARYA 14 Sep 2026:
 * - Mataharinya IKUT BERGERAK saat sudutnya digeser. Ia duduk pada garis sinar
 *   yang melewati puncak pohon, sejauh jarak tetap dari puncak itu, sehingga
 *   sudut sinar terbaca dari letaknya: rendah di dekat ufuk saat sudutnya
 *   kecil, tinggi di langit saat sudutnya besar. Bingkai dilebarkan ke kanan
 *   (VW 460 menjadi 530) supaya matahari punya tempat pada sudut kecil.
 * - Bayangan digambar sebagai bayangan sungguhan (bentuk gelap tembus pandang
 *   yang rebah di tanah, mengikuti bentuk bendanya), bukan garis biru.
 *   Panjangnya tetap dari kaki benda sampai ujung bayangan, dan angkanya
 *   tetap ditulis di bawah tanah.
 * - Sudut sinar ditandai busur kecil di ujung bayangan pohon, lengkap dengan
 *   angkanya, sebab itulah besaran yang digeser siswa.
 *
 * REVISI ARYA 15 Sep 2026 ("sinar mataharinya harusnya mengikuti garis manusia
 * juga, kenapa cuma pohon yang kena"):
 * - Sinar matahari SEJAJAR (mataharinya sangat jauh), dan justru itu sebabnya
 *   sudutnya sama di pohon dan di orang. Dua garis sejajar tidak mungkin
 *   bertemu di satu matahari: jaraknya 52 px pada 25 derajat dan 275 px pada
 *   70 derajat. Kalau dipaksa bertemu, sudut sinar orang melenceng sekitar
 *   7 derajat dan angka hasil baginya tidak cocok lagi dengan gambarnya.
 * - Maka matahari tidak duduk di garis pohon lagi, melainkan di langit DI
 *   ANTARA kedua sinar, di tepi bingkai pada arah datangnya cahaya (tetap
 *   ikut naik saat sudutnya membesar), dan kedua sinar diteruskan sejajar
 *   sampai tepi bingkai.
 * - Di sekeliling matahari digambar berkas garis cahaya tipis yang sejajar
 *   dengan kedua sinar, supaya terbaca: satu matahari, cahaya sejajar,
 *   menerpa pohon DAN orang.
 */

const VW = 530
const VH = 300
const TANAH_Y = 250
const M_KE_PX = 11.4              // 1 meter = 11,4 piksel
const X_ORANG = 96                // titik pijak orang
const X_POHON = 424               // titik pijak pohon
const TINGGI_ORANG = 1.6          // meter
const TINGGI_POHON = 10           // meter
const TEPI_MATAHARI = 30          // jarak pusat matahari dari tepi bingkai
const PANJANG_CAHAYA = 62         // panjang garis cahaya tipis dari tepi bingkai
const JARAK_CAHAYA = 40           // jarak antar garis cahaya (tegak lurus sinar)
const RADIUS_BERKAS = 250         // garis cahaya hanya di sekitar matahari (jarak titik masuknya)

// 15 sampai 90 penuh (ARYA 21 Sep 2026: slider sudut harus mentok di angka
// bulat). Di bawah 25° bayangan pohon lebih panjang daripada ruang di kirinya,
// jadi seluruh gambar diperkecil (SKALA) dan penunjuk skalanya ditulis; di 90°
// matahari tepat di atas kepala, bayangan nol, dan hasil baginya tidak ada.
export const BATAS_SUDUT = { min: 15, maks: 90 }
const RUANG_BAYANGAN = X_POHON - 24   // piksel yang tersedia untuk bayangan pohon

export function hitungBayangan(derajat: number) {
  const tegak = derajat >= 90
  const tan = tegak ? Infinity : Math.tan((derajat * Math.PI) / 180)
  const bayanganPohon = tegak ? 0 : TINGGI_POHON / tan
  // gambar diperkecil hanya bila bayangan pohon tidak muat di kiri pohon
  const skala = Math.min(1, RUANG_BAYANGAN / Math.max(1, bayanganPohon * M_KE_PX))
  return {
    tan,
    tegak,
    bayanganOrang: tegak ? 0 : TINGGI_ORANG / tan,
    bayanganPohon,
    tinggiOrang: TINGGI_ORANG,
    tinggiPohon: TINGGI_POHON,
    skala,
  }
}

/** Hasil bagi tinggi : bayangan sebagai teks; di 90° bayangannya nol. */
export const angkaBayangan = (tan: number) => (Number.isFinite(tan) ? tan.toFixed(2).replace('.', ',') : 'tidak terdefinisi')

const koma = (n: number, d = 2) => n.toFixed(d).replace('.', ',')

/** Titik tempat sinar dari (x, y) dengan arah ke kanan atas menabrak tepi
 *  bingkai (dikurangi `tepi`), supaya sinar bisa digambar sampai keluar
 *  gambar, atau supaya matahari duduk persis di tepi langit. */
function ujungSinar(x: number, y: number, cos: number, sin: number, tepi = 6) {
  const keKanan = (VW - tepi - x) / cos
  const keAtas = (y - tepi - 2) / sin
  const d = Math.max(0, Math.min(keKanan, keAtas))
  return { x: x + d * cos, y: y - d * sin }
}

/** Berkas garis cahaya tipis yang sejajar kedua sinar: dua di luar tiap sinar
 *  dan sisanya membagi rata ruang di antara keduanya. `geser` = jarak tegak
 *  lurus dari garis tengah (positif ke sisi pohon); garis di dekat garis tengah
 *  dilewati sebab tempat itu milik gambar matahari. Tiap garis mulai di tepi
 *  bingkai (arah datangnya cahaya) dan masuk sepanjang PANJANG_CAHAYA; yang
 *  masuk jauh dari matahari dilewati supaya berkasnya mengumpul di sekitarnya
 *  (pada 70 derajat garis di tepi kanan bawah terlihat seperti coretan nyasar). */
function garisCahaya(tengahX: number, setengahJarak: number, cos: number, sin: number,
                     mx: number, my: number) {
  const geseran: number[] = []
  for (const sisi of [-1, 1]) {
    geseran.push(sisi * (setengahJarak + JARAK_CAHAYA))
    geseran.push(sisi * (setengahJarak + 2 * JARAK_CAHAYA))
  }
  const diDalam = Math.floor((2 * setengahJarak) / JARAK_CAHAYA) - 1
  for (let i = 1; i <= diDalam; i++) {
    geseran.push(-setengahJarak + (i * 2 * setengahJarak) / (diDalam + 1))
  }
  const hasil: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (const g of geseran) {
    if (Math.abs(g) < TEPI_MATAHARI) continue
    // titik dasar garis: garis tengah digeser tegak lurus sejauh g
    const bx = tengahX + g * sin
    const by = TANAH_Y + g * cos
    const tMasuk = Math.min((VW - 8 - bx) / cos, (by - 8) / sin)
    const tKeluar = Math.max((8 - bx) / cos, (by - (TANAH_Y - 6)) / sin)
    if (tMasuk - tKeluar < PANJANG_CAHAYA) continue
    const x1 = bx + tMasuk * cos
    const y1 = by - tMasuk * sin
    if (Math.hypot(x1 - mx, y1 - my) > RADIUS_BERKAS) continue
    hasil.push({
      x1, y1,
      x2: bx + (tMasuk - PANJANG_CAHAYA) * cos, y2: by - (tMasuk - PANJANG_CAHAYA) * sin,
    })
  }
  return hasil
}

export default function Bayangan({ derajat }: { derajat: number }) {
  const b = hitungBayangan(derajat)
  const rad = (derajat * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  // satu skala untuk tinggi DAN bayangan, supaya sudutnya tetap benar di gambar
  const px = M_KE_PX * b.skala
  const yOrang = TANAH_Y - TINGGI_ORANG * px
  const yPohon = TANAH_Y - TINGGI_POHON * px
  const bxOrang = X_ORANG - b.bayanganOrang * px
  const bxPohon = X_POHON - b.bayanganPohon * px

  // kedua sinar sejajar, diteruskan sampai tepi bingkai (matahari sangat jauh)
  const sinarPohon = ujungSinar(X_POHON, yPohon, cos, sin)
  const sinarOrang = ujungSinar(X_ORANG, yOrang, cos, sin)
  // matahari di langit di antara kedua sinar: pada garis tengah yang sejajar
  // keduanya lewat titik tengah kedua ujung bayangan, tepat di tepi bingkai
  const tengahX = (bxOrang + bxPohon) / 2
  const matahari = ujungSinar(tengahX, TANAH_Y, cos, sin, TEPI_MATAHARI)
  const mx = matahari.x
  const my = matahari.y
  // jarak tegak lurus tiap sinar dari garis tengah
  const setengahJarak = ((bxPohon - bxOrang) / 2) * sin
  const cahaya = garisCahaya(tengahX, setengahJarak, cos, sin, mx, my)

  // busur sudut sinar di ujung bayangan pohon
  const rBusur = 26
  const busurX = bxPohon + rBusur * cos
  const busurY = TANAH_Y - rBusur * sin

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Pohon dan orang disinari matahari dengan sudut ${derajat} derajat`}>
      {/* tanah */}
      <line x1={0} y1={TANAH_Y} x2={VW} y2={TANAH_Y} stroke="#C9BFAE" strokeWidth={2} />

      {/* bayangan: bentuk gelap tembus pandang yang rebah di tanah, dari kaki
          benda sampai ujung bayangan; ujungnya mengikuti bentuk benda (rimbun
          pohon, kepala orang) */}
      <g fill="rgba(16, 26, 43, 0.30)">
        <polygon points={`${X_POHON},${TANAH_Y - 2} ${X_POHON},${TANAH_Y + 3} ${bxPohon + 22},${TANAH_Y + 3} ${bxPohon + 22},${TANAH_Y - 2}`} />
        <ellipse cx={bxPohon + 20} cy={TANAH_Y} rx={22} ry={6} />
        <polygon points={`${X_ORANG},${TANAH_Y - 1.5} ${X_ORANG},${TANAH_Y + 2} ${bxOrang + 5},${TANAH_Y + 2} ${bxOrang + 5},${TANAH_Y - 1.5}`} />
        <ellipse cx={bxOrang + 5} cy={TANAH_Y} rx={5.5} ry={2.6} />
      </g>

      {/* berkas cahaya sejajar dari arah matahari */}
      {cahaya.map((c, i) => (
        <line key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke={WARNA.sudut} strokeWidth={1.3} strokeLinecap="round" opacity={0.28} />
      ))}

      {/* sinar matahari: melewati puncak benda, berhenti di ujung bayangan */}
      <line x1={sinarPohon.x} y1={sinarPohon.y} x2={bxPohon} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />
      <line x1={sinarOrang.x} y1={sinarOrang.y} x2={bxOrang} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />

      {/* busur sudut sinar di ujung bayangan pohon */}
      <path d={`M ${bxPohon + rBusur} ${TANAH_Y} A ${rBusur} ${rBusur} 0 0 0 ${busurX} ${busurY}`}
            fill="none" stroke={WARNA.sudut} strokeWidth={2} />
      <text x={bxPohon - 6} y={TANAH_Y - 14} textAnchor="end" fontSize={13} fill={WARNA.sudut}
            fontFamily="var(--font-sans), sans-serif">{derajat}°</text>
      {b.skala < 1 && (
        <text x={8} y={16} fontSize={11} fill={WARNA.redup} fontFamily="var(--font-mono), sans-serif">
          gambar diperkecil {koma(b.skala * 100, 0)}% supaya bayangannya muat
        </text>
      )}

      {/* matahari di antara kedua sinar, ikut naik mengikuti sudut sinar */}
      <circle cx={mx} cy={my} r={13} fill={WARNA.sudut} opacity={0.9} />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line key={i}
            x1={mx + Math.cos(a) * 18} y1={my + Math.sin(a) * 18}
            x2={mx + Math.cos(a) * 24} y2={my + Math.sin(a) * 24}
            stroke={WARNA.sudut} strokeWidth={2} opacity={0.7} />
        )
      })}

      {/* pohon: batang + rimbun */}
      <line x1={X_POHON} y1={TANAH_Y} x2={X_POHON} y2={yPohon}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_POHON} cy={yPohon - 4} r={20} fill="#7FA07A" opacity={0.85} />
      <circle cx={X_POHON - 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />
      <circle cx={X_POHON + 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />

      {/* orang */}
      <line x1={X_ORANG} y1={TANAH_Y} x2={X_ORANG} y2={yOrang}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_ORANG} cy={yOrang - 4} r={5} fill={WARNA.depan} />

      {/* keterangan; tinggi pohon di KANAN batang, sebab sinar pohon lewat di
          kiri batang dan pada sudut besar menimpa tulisannya (15 Sep 2026) */}
      <text x={X_POHON + 9} y={(yPohon + TANAH_Y) / 2 + 5} fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{TINGGI_POHON} m</text>
      <text x={(bxPohon + X_POHON) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        bayangan {koma(b.bayanganPohon, 1)} m
      </text>
      <text x={X_ORANG + 10} y={yOrang + 4} fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{koma(TINGGI_ORANG, 1)} m</text>
      <text x={(bxOrang + X_ORANG) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        {koma(b.bayanganOrang, 2)} m
      </text>

      {/* dua hasil bagi, ditempel di masing-masing benda; di 90° keduanya
          "tidak terdefinisi" dan kalau ditulis dua kali saling menimpa di
          tengah, jadi cukup satu kalimat di tengah */}
      {b.tegak ? (
        <text x={VW / 2} y={TANAH_Y + 42} textAnchor="middle" fontSize={15} fill={WARNA.sudut}
              fontFamily="var(--font-mono), sans-serif">
          bayangan 0 m: {TINGGI_POHON} ÷ 0 dan {koma(TINGGI_ORANG, 1)} ÷ 0 tidak terdefinisi
        </text>
      ) : (
        <>
          <text x={X_POHON} y={TANAH_Y + 42} textAnchor="end" fontSize={15} fill={WARNA.sudut}
                fontFamily="var(--font-mono), sans-serif">
            {TINGGI_POHON} ÷ {koma(b.bayanganPohon, 1)} = {angkaBayangan(b.tan)}
          </text>
          <text x={X_ORANG - 40} y={TANAH_Y + 42} fontSize={15} fill={WARNA.sudut}
                fontFamily="var(--font-mono), sans-serif">
            {koma(TINGGI_ORANG, 1)} ÷ {koma(b.bayanganOrang, 2)} = {angkaBayangan(b.tan)}
          </text>
        </>
      )}
    </svg>
  )
}
