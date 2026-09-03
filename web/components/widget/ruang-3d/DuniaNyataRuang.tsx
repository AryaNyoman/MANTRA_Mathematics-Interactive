'use client'

import type { ReactNode } from 'react'
import Bingkai3D, { Bidang, BusurSudut, Ruas, TandaSiku, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  WARNA, balok, bulat, jarakTitik, kakiPadaBidang, kedudukanDuaGaris,
  kurang, limas, sepanjang, sudutDuaArah, sudutGarisBidang,
  type Bangun, type Sudut, type Titik3,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Galeri "Dipakai di Dunia Nyata", Ruang 3D tahap 10.
 *
 * KENAPA DIGAMBAR SENDIRI, BUKAN FOTO
 * Rancangan awalnya memakai foto, meniru Tahap 10 Trigonometri. Yang dipilih
 * akhirnya gambar sendiri, sebab foto atap rumah memperlihatkan gentengnya,
 * bukan segitiga di baliknya, sedangkan yang perlu dilihat siswa justru
 * bangun ruang yang tersembunyi di dalam benda itu. Gambar ini menyorot bangun
 * ruangnya langsung di tempat ia berada.
 *
 * Kalau ARYA lebih suka foto, keempat gambar ini bisa diganti tanpa mengubah
 * apa pun yang lain.
 *
 * Semua angka di sini dihitung oleh mesin gambar yang sama dengan widget
 * lainnya, dan sudah dicocokkan dengan `alat/cek_ruang.py`.
 */

const SUDUT_TETAP: Sudut = { mendatar: -34, menunduk: 24 }

/* ------------------------------------------------------------------ */
/* 1. Ruang kelas: jarak lampu ke lantai                               */
/* ------------------------------------------------------------------ */

const KELAS = balok(8, 6, 4)
const LAMPU: Titik3 = [4, 3, 4]
const KAKI_LAMPU = kakiPadaBidang(LAMPU, KELAS.titik.A, KELAS.titik.B, KELAS.titik.C)
const TINGGI_LAMPU = jarakTitik(LAMPU, KAKI_LAMPU)

/* ------------------------------------------------------------------ */
/* 2. Atap limas: sudut kemiringan                                     */
/* ------------------------------------------------------------------ */

const ATAP = limas(8, 3)
/** Titik tumpu di tengah garis tiris AB. */
const PUNCAK_TENGAH = sepanjang(ATAP.titik.A, ATAP.titik.B, 0.5)
/** Titik mendatar di dalam alas, tegak lurus garis tiris. Inilah acuan datarnya. */
const DATAR_ATAP: Titik3 = [4, 4, 0]
const SUDUT_ATAP = sudutDuaArah(
  kurang(ATAP.titik.T, PUNCAK_TENGAH),
  kurang(DATAR_ATAP, PUNCAK_TENGAH),
)

/* ------------------------------------------------------------------ */
/* 3. Rangka menara: dua batang bersilangan                            */
/* ------------------------------------------------------------------ */

const MENARA = balok(5, 5, 9)
const LETAK_BATANG = kedudukanDuaGaris(
  MENARA.titik.A, MENARA.titik.F, MENARA.titik.B, MENARA.titik.G,
)

/* ------------------------------------------------------------------ */
/* 4. Tangga bersandar: sudut garis dengan lantai                      */
/* ------------------------------------------------------------------ */

const RUANGAN = balok(6, 6, 6)
// Letaknya dipilih supaya sudutnya jatuh di 75 derajat, yaitu aturan tukang
// yang disebut di keterangannya. tan 75 derajat kira-kira 5,6 dibagi 1,5.
const KAKI_TANGGA: Titik3 = [1.5, 0, 0]
const PUNCAK_TANGGA: Titik3 = [0, 0, 5.6]
const SUDUT_TANGGA = sudutGarisBidang(
  KAKI_TANGGA, PUNCAK_TANGGA, RUANGAN.titik.A, RUANGAN.titik.B, RUANGAN.titik.C,
)

type Adegan = {
  kunci: string
  judul: string
  benda: string
  bangun: Bangun
  titikBantu?: Record<string, Titik3>
  hasil: string
  cerita: string
  gambar: (layar: Record<string, { x: number; y: number }>) => ReactNode
}

export const ADEGAN: Adegan[] = [
  {
    kunci: 'kelas',
    judul: 'Jarak titik ke bidang',
    benda: 'Lampu di tengah langit-langit kelas',
    bangun: KELAS,
    titikBantu: { L: LAMPU, K: KAKI_LAMPU },
    hasil: `tinggi lampu ${bulat(TINGGI_LAMPU)} meter di atas lantai`,
    cerita:
      'Tukang listrik tidak mengukur dari lampu ke pojok ruangan, melainkan lurus ke bawah. Itu persis jarak titik ke bidang: yang terpendek, dan tegak lurus.',
    gambar: (l) => (
      <>
        <Bidang titik={['A', 'B', 'C', 'D'].map((k) => l[k])} warna={WARNA.samping} opacity={0.16} />
        <Ruas a={l.L} b={l.K} warna={WARNA.sudut} tebal={3.6} />
        <TandaSiku sudut={l.K} ke1={l.B} ke2={l.L} warna={WARNA.sudut} ukuran={9} />
        <TitikBantu p={l.L} nama="lampu" warna={WARNA.depan} />
        <TitikBantu p={l.K} warna={WARNA.sudut} />
      </>
    ),
  },
  {
    kunci: 'atap',
    judul: 'Sudut bidang dengan bidang',
    benda: 'Kemiringan atap rumah',
    bangun: ATAP,
    titikBantu: { M: PUNCAK_TENGAH, R: DATAR_ATAP },
    hasil: `kemiringan ${bulat(SUDUT_ATAP, 1)}° dari mendatar`,
    cerita:
      'Atap yang terlalu landai membuat air hujan menggenang, yang terlalu curam memboroskan bahan. Angka yang dipakai tukang adalah sudut bidang miring terhadap bidang datar.',
    gambar: (l) => (
      <>
        <Bidang titik={['A', 'B', 'T'].map((k) => l[k])} warna={WARNA.depan} opacity={0.22} />
        <Ruas a={l.A} b={l.B} warna={WARNA.miring} tebal={3} />
        <Ruas a={l.M} b={l.T} warna={WARNA.depan} tebal={3.2} />
        <Ruas a={l.M} b={l.R} warna={WARNA.sudut} tebal={2.4} />
        <BusurSudut sudut={l.M} ke1={l.R} ke2={l.T} warna={WARNA.sudut}
                    teks={`${bulat(SUDUT_ATAP, 1)}°`} jari={24} />
      </>
    ),
  },
  {
    kunci: 'menara',
    judul: 'Dua garis bersilangan',
    benda: 'Batang silang pada menara rangka',
    bangun: MENARA,
    hasil: `AF dan BG ${LETAK_BATANG}, tidak pernah bersentuhan`,
    cerita:
      'Di foto menara, dua batang penguat itu terlihat menyilang di satu titik. Aslinya keduanya lewat di sisi yang berbeda, dan justru karena itu keduanya bisa dipasang tanpa saling menabrak.',
    gambar: (l) => (
      <>
        <Ruas a={l.A} b={l.F} warna={WARNA.samping} tebal={3.6} />
        <Ruas a={l.B} b={l.G} warna={WARNA.depan} tebal={3.6} />
      </>
    ),
  },
  {
    kunci: 'tangga',
    judul: 'Sudut garis dengan bidang',
    benda: 'Tangga bersandar ke dinding',
    bangun: RUANGAN,
    titikBantu: { K: KAKI_TANGGA, P: PUNCAK_TANGGA },
    hasil: `tangga membentuk ${bulat(SUDUT_TANGGA, 1)}° dengan lantai`,
    cerita:
      'Aturan tukang: tangga aman kalau sudutnya sekitar 75 derajat. Terlalu tegak, ia bisa jatuh ke belakang. Terlalu landai, kakinya bisa tergelincir.',
    gambar: (l) => (
      <>
        <Bidang titik={['A', 'B', 'C', 'D'].map((k) => l[k])} warna={WARNA.samping} opacity={0.16} />
        <Ruas a={l.K} b={l.P} warna={WARNA.depan} tebal={3.6} />
        <Ruas a={l.K} b={l.A} warna={WARNA.sudut} tebal={2.4} />
        <Ruas a={l.A} b={l.P} warna={WARNA.redup} tebal={1.6} putus />
        <TandaSiku sudut={l.A} ke1={l.K} ke2={l.P} warna={WARNA.redup} ukuran={9} />
        <BusurSudut sudut={l.K} ke1={l.A} ke2={l.P} warna={WARNA.sudut}
                    teks={`${bulat(SUDUT_TANGGA, 0)}°`} jari={26} />
      </>
    ),
  },
]

export default function DuniaNyataRuang() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
        gap: 18,
      }}
    >
      {ADEGAN.map((a) => (
        <figure
          key={a.kunci}
          style={{
            margin: 0,
            border: '1px solid var(--garis)',
            borderRadius: 12,
            background: 'var(--kartu)',
            overflow: 'hidden',
          }}
        >
          <Bingkai3D
            bangun={a.bangun}
            sudut={SUDUT_TETAP}
            titikBantu={a.titikBantu}
            /* Nama bendanya sengaja TIDAK ditaruh di dalam gambar. Rangka
               halaman menempelkan lencana "CONTOH NYATA" di pojok kiri atas
               panggung, dan lencana itu menutupi baris teratas kartu pertama.
               Namanya dipindah ke keterangan kartu di bawah gambar. */
            bawah={a.hasil}
            gaya={{ display: 'block', width: '100%', height: 'auto' }}
            aria={`${a.benda}. ${a.judul}. ${a.hasil}.`}
          >
            {(_kam, layar) => a.gambar(layar)}
          </Bingkai3D>
          <figcaption style={{ padding: '11px 14px 13px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), sans-serif',
                fontSize: 10,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'var(--redup)',
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              {a.benda}
            </div>
            <b style={{ fontSize: 14.5 }}>{a.judul}</b>
            <p style={{ margin: '5px 0 0', fontSize: 13, lineHeight: 1.55, color: '#3A3630' }}>
              {a.cerita}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
