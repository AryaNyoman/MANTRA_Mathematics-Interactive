'use client'

import type { ReactNode } from 'react'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * "Lembar kerja": tata letak bersama untuk widget yang berupa susunan
 * langkah, bukan gambar (Limit 05 Mesin Sifat, Limit 06 Bongkar Bertahap,
 * Integral 03 Cocokkan Lapisan, 04 Pasangkan, 08 Hitung Bertahap).
 *
 * ARYA 18 Sep 2026: panel teks lama terlihat seperti gambar kosong (dua
 * kolom lebar tetap, sisa ruangnya melompong) dan hancur saat kolom alat
 * disempitkan ("dipasangk-an"). Di sini:
 * - semua rumus lewat TeksMat (KaTeX), sama dengan bank soal;
 * - tiap langkah satu baris bernomor: nomor, nama langkah, isinya; langkah
 *   yang belum dibuka tetap tergambar redup (nomor dan namanya saja), jadi
 *   panelnya terisi dan siswa melihat peta kerjanya tanpa jawabannya bocor;
 * - lebar kolom nama mengikuti LEBAR PANEL lewat container query, bukan
 *   lebar layar: di panel sempit nama langkah pindah ke atas isinya.
 * Gayanya di globals.css, blok `.lembar`.
 */

export type LangkahLembar = {
  /** nama langkah, kolom kiri; kosong = belum ditentukan (Mesin Sifat) */
  nama: string
  /** isinya; boleh rumus, ditata KaTeX */
  teks: string
  /** sifat atau syarat yang membuat langkah itu sah, ditulis di bawah isinya */
  syarat?: string
}

export default function Lembar({ children }: { children: ReactNode }) {
  return <div className="lembar">{children}</div>
}

/** Kotak soal di atas, dengan keterangan cara di bawahnya. */
export function LembarSoal({ soal, cara }: { soal: string; cara?: string }) {
  return (
    <div className="lembar-kepala">
      <div className="lembar-soal"><TeksMat teks={soal} blok={false} /></div>
      {cara && <div className="lembar-cara"><TeksMat teks={cara} blok={false} /></div>}
    </div>
  )
}

/** Sub judul kecil di antara dua kelompok langkah. */
export function LembarJudul({ children }: { children: ReactNode }) {
  return <div className="lembar-judul">{children}</div>
}

/**
 * Daftar langkah. `terbuka` = banyak langkah yang sudah dibuka; sisanya
 * digambar redup. `nomorAwal` supaya kelompok kedua melanjutkan nomornya.
 */
export function LembarLangkah({
  langkah, terbuka, nomorAwal = 1,
}: {
  langkah: LangkahLembar[]
  terbuka: number
  nomorAwal?: number
}) {
  return (
    <ol className="lembar-langkah">
      {langkah.map((l, i) => {
        const buka = i < terbuka
        return (
          <li key={i} data-buka={buka} data-terkini={buka && i === terbuka - 1}>
            <span className="lembar-no" aria-hidden="true">{nomorAwal + i}</span>
            <span className="lembar-nama">
              {l.nama ? <TeksMat teks={l.nama} blok={false} /> : <span className="lembar-nama-kosong">langkah {nomorAwal + i}</span>}
            </span>
            {buka ? (
              <span className="lembar-teks"><TeksMat teks={l.teks} blok={false} /></span>
            ) : (
              <span className="lembar-nanti" aria-label="belum dibuka">· · ·</span>
            )}
            {buka && l.syarat && (
              <span className="lembar-syarat"><TeksMat teks={l.syarat} blok={false} /></span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

/** Kemajuan: "langkah 2 dari 5" plus batang tipis. */
export function LembarSisa({ terbuka, total, teks }: { terbuka: number; total: number; teks?: string }) {
  const persen = total > 0 ? Math.round((Math.min(terbuka, total) / total) * 100) : 0
  return (
    <div className="lembar-sisa">
      <span className="lembar-sisa-bar" role="img" aria-label={`${persen} persen`}>
        <span style={{ width: `${persen}%` }} />
      </span>
      <span>{teks ?? `langkah ${Math.min(terbuka, total)} dari ${total}`}</span>
    </div>
  )
}

/** Kotak hijau saat selesai. */
export function LembarSelesai({ judul = 'Selesai.', teks }: { judul?: string; teks: string }) {
  return (
    <div className="lembar-selesai" role="status">
      <b>{judul}</b> <TeksMat teks={teks} blok={false} />
    </div>
  )
}

/** Kotak bata saat mesin menolak atau berhenti. */
export function LembarTolak({ judul, teks }: { judul: string; teks: string }) {
  return (
    <div className="lembar-tolak" role="status">
      <b>{judul}</b>
      <p><TeksMat teks={teks} blok={false} /></p>
    </div>
  )
}
