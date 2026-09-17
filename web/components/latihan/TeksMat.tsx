import type { ReactNode } from 'react'

/**
 * Teks soal dan pembahasan dengan PECAHAN BERSUSUN (ARYA 17 Sep 2026:
 * "saya ingin pecahan benar-benar terlihat mana atas mana bawah").
 *
 * Bank soal ditulis sebagai teks biasa dengan pecahan mendatar: "x⁶/6",
 * "−b/(2a)", "(x + 5)/2", "3/2.". Komponen ini mengenali pola
 * `pembilang/penyebut` lalu menyusunnya: pembilang di atas garis, penyebut
 * di bawah, tanpa mengubah isi bank. Tanda kurung yang HANYA membungkus
 * pembilang atau penyebut dibuang, sebab garis pecahannya sudah mengelompokkan
 * ("(x + 5)/2" menjadi x + 5 di atas 2). Tanda baca kalimat sesudah penyebut
 * ("3/2.") tetap di luar pecahan.
 *
 * Pembilang atau penyebut = kelompok berkurung tanpa kurung bersarang, atau
 * satu rangkaian tanpa spasi (angka, huruf, pangkat, tanda minus). Ini
 * mencakup 2.485 pecahan di seluruh bank (dihitung 17 Sep 2026) termasuk
 * singkatan de/sa/mi (depan, samping, miring) dan turunan ds/dt; satuan
 * seperti km/jam ikut bersusun, dan itu masih lazim dibaca "km per jam".
 * Bukan LaTeX: tidak ada pustaka tambahan, dan teksnya tetap bisa disalin.
 */
const POLA = /(\([^()\n]*\)|[^\s/()'",`]+)\s*\/\s*(\([^()\n]*\)|[^\s/()'",`.;:!?]+)/g

function lepasKurung(t: string): string {
  return t.startsWith('(') && t.endsWith(')') ? t.slice(1, -1).trim() : t
}

export function pecahBaris(teks: string): ReactNode[] {
  const keluar: ReactNode[] = []
  let akhir = 0
  let n = 0
  for (const m of teks.matchAll(POLA)) {
    const awal = m.index ?? 0
    const [utuh, atas, bawah] = m
    // Tidak ada pengecualian kata: di seluruh bank tidak ada "dan/atau";
    // yang ada sin/cos, luas/lebar, km/jam, semuanya memang pembagian.
    if (awal > akhir) keluar.push(teks.slice(akhir, awal))
    keluar.push(
      <span className="pecahan" key={n++}>
        <span className="atas">{lepasKurung(atas)}</span>
        <span className="bawah">{lepasKurung(bawah)}</span>
      </span>,
    )
    akhir = awal + utuh.length
  }
  if (akhir < teks.length) keluar.push(teks.slice(akhir))
  return keluar
}

export default function TeksMat({ teks }: { teks: string }) {
  return <>{pecahBaris(teks)}</>
}
