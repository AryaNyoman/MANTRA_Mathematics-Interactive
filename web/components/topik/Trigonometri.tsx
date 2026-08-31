'use client'

import { useState } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import type { Topik } from '@/content/topik'

/**
 * Halaman topik Trigonometri — tata letak SATU LAYAR (permintaan ARYA 31 Agu):
 * kiri visual, kanan penjelasan. Siswa tidak perlu menggulir atas-bawah untuk
 * menghubungkan gambar dengan angkanya.
 *
 * Video dan widget berbagi satu panggung lewat tab, supaya keduanya muat di
 * layar yang sama tanpa memampatkan kolom penjelasan.
 */
export default function Trigonometri({ topik }: { topik: Topik }) {
  const [tab, setTab] = useState<'video' | 'alat'>('video')
  const [skala, setSkala] = useState(100)
  const [derajat, setDerajat] = useState(37)

  const g = hitungGeometri(skala, derajat)

  const catatan =
    tab === 'video'
      ? 'Buka tab “Coba sendiri” untuk menggeser segitiganya.'
      : derajat > 60
        ? 'Sudut curam — bingkai otomatis menjauh supaya segitiga tetap utuh. Petaknya ikut merapat.'
        : skala < 100
          ? 'Segitiga mengecil. Kedua sisi ikut mengecil, tapi tan θ tidak bergeser sedikit pun.'
          : 'Geser “Besar segitiga”. Sisi berubah, tan θ tetap.'

  return (
    <div className="panggung">
      {/* ---------------- KIRI: visual ---------------- */}
      <div className="kolom">
        <div className="tab" role="tablist" aria-label="Pilih tampilan">
          <button
            role="tab"
            aria-selected={tab === 'video'}
            onClick={() => setTab('video')}
          >
            01 · Tonton
          </button>
          <button
            role="tab"
            aria-selected={tab === 'alat'}
            onClick={() => setTab('alat')}
          >
            02 · Coba sendiri
          </button>
        </div>

        <div className="wadah">
          <div className="tanda">{tab === 'video' ? 'MANIM · 1280×720' : 'INTERAKTIF · SVG'}</div>

          {tab === 'video' ? (
            <div className="layar">
              <video controls preload="metadata" poster="/anim/segitiga-terang.png">
                <source src="/anim/trigonometri.webm" type="video/webm" />
                Peramban Anda belum bisa memutar video ini.
              </video>
            </div>
          ) : (
            <>
              <div className="layar">
                <SegitigaSebangun skala={skala} derajat={derajat} />
              </div>
              <div className="kendali">
                <div>
                  <label htmlFor="skala">
                    Besar segitiga <span className="mono">{skala}%</span>
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
                    <span>
                      Sudut <span style={{ textTransform: 'none' }}>θ</span>
                    </span>
                    <span className="mono">{derajat}°</span>
                  </label>
                  <input
                    id="sudut" type="range" min={10} max={80} value={derajat}
                    onChange={(e) => setDerajat(+e.target.value)}
                  />
                </div>
                <div className="skala-info">
                  <span className="titik" />
                  <span>skala tampilan: 1 cm = {angka(g.ppc, 1)} px</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ---------------- KANAN: penjelasan ---------------- */}
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
          {/* Judul tabel ikut tab. Saat video yang tampil, angka ini berasal dari
              alat interaktif — bukan dari video — dan itu harus dikatakan, bukan
              dibiarkan menyesatkan. */}
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

        <div className="aksi">
          <button className="tombol">LATIHAN · 4 SOAL</button>
          <button className="tombol garis">KUIS · 8 SOAL</button>
        </div>
      </div>
    </div>
  )
}
