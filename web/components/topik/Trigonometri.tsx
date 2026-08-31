'use client'

import { useState } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import Latihan from '@/components/topik/Latihan'
import Kuis from '@/components/topik/Kuis'
import { LATIHAN, KUIS, KANAL } from '@/content/trigonometri'
import type { Topik } from '@/content/topik'

type Tab = 'video' | 'alat' | 'latihan' | 'kuis'

const JUDUL_TAB: Record<Tab, string> = {
  video: 'MANIM · 1280×720',
  alat: 'INTERAKTIF · SVG',
  latihan: 'LATIHAN · 4 SOAL',
  kuis: 'KUIS · 8 SOAL',
}

/**
 * Halaman topik Trigonometri — tata letak SATU LAYAR (permintaan ARYA 31 Agu):
 * kiri berganti-ganti isi lewat tab, kanan tetap berisi penjelasan.
 * Siswa tidak perlu menggulir atas-bawah untuk menghubungkan gambar dan angka.
 */
export default function Trigonometri({ topik }: { topik: Topik }) {
  const [tab, setTab] = useState<Tab>('video')
  const [skala, setSkala] = useState(100)
  const [derajat, setDerajat] = useState(37)

  const g = hitungGeometri(skala, derajat)

  const catatan =
    tab === 'alat'
      ? derajat > 60
        ? 'Sudut curam — bingkai otomatis menjauh supaya segitiga tetap utuh. Petaknya ikut merapat.'
        : skala < 100
          ? 'Segitiga mengecil. Kedua sisi ikut mengecil, tapi tan θ tidak bergeser sedikit pun.'
          : 'Geser “Besar segitiga”. Sisi berubah, tan θ tetap.'
      : 'Buka tab “Coba sendiri” untuk menggeser segitiganya.'

  return (
    <div className="panggung">
      {/* ---------------- KIRI ---------------- */}
      <div className="kolom">
        <div className="tab" role="tablist" aria-label="Pilih tampilan">
          {(['video', 'alat', 'latihan', 'kuis'] as Tab[]).map((t, n) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
            >
              {String(n + 1).padStart(2, '0')} ·{' '}
              {t === 'video' ? 'Tonton' : t === 'alat' ? 'Coba sendiri' : t === 'latihan' ? 'Latihan' : 'Kuis'}
            </button>
          ))}
        </div>

        <div className="wadah">
          <div className="tanda">{JUDUL_TAB[tab]}</div>

          {tab === 'video' && (
            <div className="layar">
              <video controls preload="metadata" poster="/anim/segitiga-terang.png">
                <source src="/anim/trigonometri.webm" type="video/webm" />
                Peramban Anda belum bisa memutar video ini.
              </video>
            </div>
          )}

          {tab === 'alat' && (
            <>
              <div className="layar">
                <SegitigaSebangun
                  skala={skala}
                  derajat={derajat}
                  onUbah={(sk, dj) => { setSkala(sk); setDerajat(dj) }}
                />
              </div>
              <div className="kendali">
                <div>
                  <label htmlFor="skala">
                    <span>Besar segitiga</span>
                    <span className="mono">{skala}%</span>
                  </label>
                  <input
                    id="skala" type="range" min={35} max={100} value={skala}
                    onChange={(e) => setSkala(+e.target.value)}
                  />
                </div>
                <div>
                  {/* θ dikecualikan dari huruf besar — kalau ikut, ia jadi Θ
                      dan tampil salah di font monospace */}
                  <label htmlFor="sudut">
                    <span>Sudut <span style={{ textTransform: 'none' }}>θ</span></span>
                    <span className="mono">{derajat}°</span>
                  </label>
                  <input
                    id="sudut" type="range" min={10} max={80} value={derajat}
                    onChange={(e) => setDerajat(+e.target.value)}
                  />
                </div>
                <div className="skala-info">
                  <span className="titik" />
                  <span>tarik titik puncaknya, atau geser kendali di atas ·
                    skala tampilan 1 cm = {angka(g.ppc, 1)} px</span>
                </div>
              </div>
            </>
          )}

          {tab === 'latihan' && (
            <div className="isi-gulir"><Latihan soal={LATIHAN} /></div>
          )}

          {tab === 'kuis' && (
            <div className="isi-gulir">
              <Kuis soal={KUIS} kunciSimpan="matra:kuis:trigonometri" />
            </div>
          )}
        </div>
      </div>

      {/* ---------------- KANAN ---------------- */}
      <div className="kolom kanan">
        <div className="jalur">{topik.kelas} / Kurikulum Merdeka</div>
        <h1>{topik.nama}</h1>
        <div className="sub">{topik.pertanyaan}</div>

        <div className="blok">
          <div className="cap merah">Miskonsepsi</div>
          <div className="miskon">
            Siswa mengira <b>tan 37° ≈ 0,75</b> adalah angka mati dari kalkulator. Padahal itu{' '}
            <b>perbandingan</b> — sisi depan dibagi sisi samping. Justru karena ia perbandingan,
            nilainya tidak peduli seberapa besar segitiganya.
            <div className="sumber">Buku Panduan Guru Matematika Kelas X, Bab 4</div>
          </div>
        </div>

        <div className="blok">
          {/* Judul tabel ikut tab. Saat bukan alat yang tampil, angka ini berasal
              dari alat interaktif — dan itu harus dikatakan, bukan dibiarkan
              menyesatkan. */}
          <div className="cap">
            {tab === 'alat'
              ? 'Angka dari segitiga di sebelah kiri'
              : 'Angka dari alat interaktif (tab 02)'}
          </div>
          <table className="tabel-angka">
            <tbody>
              <tr><td>sisi samping</td><td>{angka(g.sampingCm)} cm</td></tr>
              <tr><td>sisi depan</td><td>{angka(g.depanCm)} cm</td></tr>
              <tr><td>sisi miring</td><td>{angka(g.miringCm)} cm</td></tr>
              <tr className="tegas"><td>tan θ</td><td>{angka(g.tan, 3)}</td></tr>
            </tbody>
          </table>
          <div className="catatan">{catatan}</div>
        </div>

        <div className="blok">
          <div className="cap">Tiga perbandingan</div>
          <div className="rumus">
            <span>sin θ</span>
            <span><span style={{ color: 'var(--sisi-depan)' }}>depan</span> / miring</span>
          </div>
          <div className="rumus">
            <span>cos θ</span>
            <span><span style={{ color: 'var(--sisi-samping)' }}>samping</span> / miring</span>
          </div>
          <div className="rumus">
            <span>tan θ</span>
            <span>
              <span style={{ color: 'var(--sisi-depan)' }}>depan</span> /{' '}
              <span style={{ color: 'var(--sisi-samping)' }}>samping</span>
            </span>
          </div>
        </div>

        <div className="blok" style={{ borderBottom: 0 }}>
          <div className="cap">Belajar lebih lanjut</div>
          <ul className="tautan">
            {KANAL.map((k) => (
              <li key={k.handle}>
                <a href={k.url} target="_blank" rel="noopener noreferrer">
                  ▶ {k.nama} <span className="mono">{k.handle}</span>
                </a>
                <span className="cari">cari: “{k.cari}”</span>
              </li>
            ))}
          </ul>
          <div className="sumber">
            Tautan menuju kanal aslinya. Kami tidak mengunggah ulang video siapa pun.
          </div>
        </div>
      </div>
    </div>
  )
}
