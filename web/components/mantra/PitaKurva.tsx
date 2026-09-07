'use client'

import { useEffect, useRef } from 'react'

/**
 * Kurva hero: lantai panggung navy.
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 99 sampai 120 dan
 * baris 682 sampai 702.
 *
 * Dua kurva menggambar dirinya sendiri di atas sumbu mendatar, lalu sebuah
 * titik jingga menyusuri kurva emas sampai puncak pertama, berdenyut sekali,
 * dan setelah itu berpatroli pelan bolak-balik sepanjang kurva. Tali
 * putus-putus mencatat tingginya, jadi titiknya terbaca sebagai nilai
 * fungsi, bukan sebagai hiasan yang kebetulan bergerak.
 *
 * TIGA hal dari v1 yang sengaja dibuang:
 *
 * 1. Lima glif mengambang (theta, sigma, akar, pi, tak hingga). Mereka
 *    bergerak terus tanpa alasan dan tidak berhubungan dengan apa pun yang
 *    sedang dijelaskan.
 * 2. `animateMotion` SMIL. Ia memang dijalankan peramban sendiri, tetapi
 *    tidak bisa dihentikan di puncak, tidak bisa memberi tali penunjuk, dan
 *    Safari menjalankannya dengan laju yang berbeda.
 * 3. Paralaks logo. Logo hero sekarang cukup memudar naik bersama isi lain.
 *
 * Kenapa `pathLength` dipaksa: panjang jalur yang sebenarnya berbeda-beda
 * menurut lebar layar, jadi kalau `stroke-dasharray` ditebak dari panjang
 * aslinya akan ada sisa garis yang tidak pernah tertutup.
 *
 * BOLA HIJAU di kurva biru (ARYA, 5 Sep 2026): berjalan bolak-balik dengan
 * kecepatan, arah, dan titik mulai yang diundi saat halaman dibuka, jadi
 * tidak pernah seirama dengan bola jingga. Sengaja tanpa tali dan tanpa
 * denyut: ia pendamping, bukan tokoh utama.
 *
 * Kenapa DUA svg, bukan satu yang menyesuaikan: geometri HP bukan versi
 * mengecil dari geometri lebar, melainkan kurva lain (satu gelombang, bukan
 * dua). Merendernya berdua lalu menyembunyikan satu lewat CSS membuat
 * pilihannya dilakukan peramban saat itu juga, tanpa kedip dan tanpa beda
 * antara hasil rakitan server dan hasil di peramban.
 */

type Geometri = {
  kelas: string
  viewBox: string
  panjang: number
  sumbu: number
  jariJari: number
  puncak: number
  emas: string
  biru: string
  lebarEmas: number
  lebarBiru: number
  taliX: number
  taliY: number
  tundaBiru: number
  durasi: number
}

const LEBAR: Geometri = {
  kelas: 'hero-kurva-lebar',
  viewBox: '0 0 1400 210',
  panjang: 2200,
  sumbu: 105,
  jariJari: 6,
  puncak: 0.1685,
  emas: 'M-20 105 C 160 20 340 20 520 105 C 700 190 880 190 1060 105 C 1240 20 1420 20 1600 105',
  biru: 'M-20 20 C 160 20 340 190 520 190 C 700 190 880 20 1060 20 C 1240 20 1420 190 1600 190',
  lebarEmas: 2.5,
  lebarBiru: 2,
  taliX: 250,
  taliY: 41,
  tundaBiru: 900,
  durasi: 3400,
}

const SEMPIT: Geometri = {
  kelas: 'hero-kurva-sempit',
  viewBox: '0 0 400 150',
  panjang: 900,
  sumbu: 75,
  jariJari: 5,
  puncak: 0.255,
  emas: 'M-10 75 C 60 10 140 10 200 75 C 260 140 340 140 410 75',
  biru: 'M-10 12 C 60 12 140 138 200 138 C 260 138 340 12 410 12',
  lebarEmas: 2.2,
  lebarBiru: 1.8,
  taliX: 95,
  taliY: 26,
  tundaBiru: 900,
  durasi: 3000,
}

function Kurva({ g }: { g: Geometri }) {
  return (
    <svg className={g.kelas} viewBox={g.viewBox} aria-hidden="true">
      <line
        x1="0"
        y1={g.sumbu}
        x2={g.viewBox.split(' ')[2]}
        y2={g.sumbu}
        stroke="rgba(250,249,245,.22)"
        strokeWidth={1}
      />
      <path
        pathLength={g.panjang}
        strokeDasharray={g.panjang}
        strokeDashoffset={g.panjang}
        style={{ animation: `gambar ${g.durasi}ms var(--kurva) 500ms both` }}
        d={g.emas}
        fill="none"
        stroke="#C9A24E"
        strokeWidth={g.lebarEmas}
        strokeLinecap="round"
      />
      <path
        pathLength={g.panjang}
        strokeDasharray={g.panjang}
        strokeDashoffset={g.panjang}
        style={{ animation: `gambar ${g.durasi}ms var(--kurva) ${g.tundaBiru}ms both` }}
        d={g.biru}
        fill="none"
        stroke="#8FA9E0"
        strokeOpacity={0.55}
        strokeWidth={g.lebarBiru}
        strokeLinecap="round"
      />
      {/* Jalur tak terlihat yang dibaca `getPointAtLength`. Bentuknya persis
          kurva emas; ia terpisah supaya animasi garis putus-putus di kurva
          emas tidak ikut mengubah hasil pengukuran panjangnya. */}
      <path data-jalur="" data-puncak={g.puncak} d={g.emas} fill="none" stroke="none" />
      <path data-jalur-biru="" d={g.biru} fill="none" stroke="none" />
      <line
        data-tali=""
        x1={g.taliX}
        y1={g.taliY}
        x2={g.taliX}
        y2={g.sumbu}
        stroke="#F08A66"
        strokeOpacity={0.5}
        strokeWidth={1}
        strokeDasharray="3 4"
        style={{ opacity: 0 }}
      />
      <circle data-denyut="" r={g.jariJari} fill="none" stroke="#F08A66" strokeWidth={1.5} style={{ opacity: 0 }} />
      <circle
        data-titik=""
        r={g.jariJari}
        fill="#F08A66"
        style={{ opacity: 0, transition: 'opacity 300ms' }}
      />
      <circle
        data-titik-biru=""
        r={g.jariJari * 0.85}
        fill="#7FC29B"
        style={{ opacity: 0, transition: 'opacity 600ms' }}
      />
    </svg>
  )
}

export default function PitaKurva() {
  const acuan = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wadah = acuan.current
    if (!wadah) return

    let raf = 0
    let rafBiru = 0
    let lepas = false

    /** SVG mana yang sedang tampil. Yang tersembunyi lebarnya nol. */
    const svgTampil = () =>
      Array.from(wadah.querySelectorAll('svg')).find((s) => s.getBoundingClientRect().width > 0) ?? null

    /** Bola hijau: patroli bolak-balik di kurva biru dengan irama acak. */
    const jalankanBiru = (svg: SVGSVGElement) => {
      cancelAnimationFrame(rafBiru)
      const jalur = svg.querySelector<SVGPathElement>('[data-jalur-biru]')
      const titik = svg.querySelector<SVGCircleElement>('[data-titik-biru]')
      if (!jalur || !titik) return
      const total = jalur.getTotalLength()
      const taruh = (d: number) => {
        const p = jalur.getPointAtLength(Math.max(0, Math.min(total, d)))
        titik.setAttribute('cx', String(p.x))
        titik.setAttribute('cy', String(p.y))
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        taruh(total * 0.62)
        titik.style.opacity = '1'
        return
      }
      // Diundi sekali per kunjungan: satu lintasan 9 sampai 17 detik, mulai
      // di sembarang titik, ke arah sembarang. Muncul setelah kurva birunya
      // selesai tergambar (tunda + durasi gambar), ditambah jeda acak.
      const lintasan = 9000 + Math.random() * 8000
      const fase = Math.random() * 2
      const arah = Math.random() < 0.5 ? 1 : -1
      const mulai = performance.now() + 4600 + Math.random() * 1800
      const halus = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
      const langkah = (kini: number) => {
        if (lepas) return
        const t = kini - mulai
        if (t >= 0) {
          const u = ((((t / lintasan) * arah + fase) % 2) + 2) % 2
          taruh(total * halus(u < 1 ? u : 2 - u))
          titik.style.opacity = '1'
        }
        rafBiru = requestAnimationFrame(langkah)
      }
      rafBiru = requestAnimationFrame(langkah)
    }

    const jalankan = () => {
      cancelAnimationFrame(raf)
      const svg = svgTampil()
      if (!svg) return
      jalankanBiru(svg)
      const jalur = svg.querySelector<SVGPathElement>('[data-jalur]')
      const titik = svg.querySelector<SVGCircleElement>('[data-titik]')
      const denyut = svg.querySelector<SVGCircleElement>('[data-denyut]')
      const tali = svg.querySelector<SVGLineElement>('[data-tali]')
      if (!jalur || !titik) return

      const total = jalur.getTotalLength()
      const puncak = Number(jalur.dataset.puncak)
      const tujuan = total * puncak
      // Sumbu mendatar ada di tengah kotak pandang, dan kotak pandang HP
      // lebih pendek. Nilai puncak sekaligus jadi penanda mana yang sedang
      // dipakai, sama seperti di prototipe.
      const sumbu = puncak > 0.2 ? 75 : 105

      const taruh = (d: number) => {
        const p = jalur.getPointAtLength(Math.max(0, Math.min(total, d)))
        titik.setAttribute('cx', String(p.x))
        titik.setAttribute('cy', String(p.y))
        if (denyut) {
          denyut.setAttribute('cx', String(p.x))
          denyut.setAttribute('cy', String(p.y))
        }
        if (tali) {
          tali.setAttribute('x1', String(p.x))
          tali.setAttribute('x2', String(p.x))
          tali.setAttribute('y1', String(p.y))
          tali.setAttribute('y2', String(sumbu))
        }
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        taruh(tujuan)
        titik.style.opacity = '1'
        if (tali) tali.style.opacity = '1'
        return
      }

      // Patroli setelah tiba: dari puncak ke ujung kanan, lalu bolak-balik
      // ujung ke ujung. Satu lintasan penuh 16 detik, dilembutkan di kedua
      // ujung supaya tidak ada belokan mendadak.
      const jelajah = (mulai: number) => {
        const laju = total / 16000
        const halus = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
        const sisa = total - tujuan
        const T = sisa / laju
        const U = total / laju
        const langkah = (kini: number) => {
          if (lepas) return
          const t = Math.max(0, kini - mulai)
          let d: number
          if (t < T) {
            d = tujuan + sisa * halus(t / T)
          } else {
            const u = (t - T) % (2 * U)
            d = u < U ? total - total * halus(u / U) : total * halus((u - U) / U)
          }
          taruh(d)
          raf = requestAnimationFrame(langkah)
        }
        raf = requestAnimationFrame(langkah)
      }

      const durasi = 3400
      const tunda = 500
      const mulai = performance.now()
      const pelan = (t: number) => 1 - Math.pow(1 - t, 3)
      const langkah = (kini: number) => {
        if (lepas) return
        const t = Math.min(1, Math.max(0, (kini - mulai - tunda) / durasi))
        taruh(tujuan * pelan(t))
        titik.style.opacity = t > 0 ? '1' : '0'
        if (t < 1) {
          raf = requestAnimationFrame(langkah)
        } else {
          if (denyut) denyut.style.animation = 'denyut 900ms var(--kurva) both'
          if (tali) {
            tali.style.transition = 'opacity 600ms'
            tali.style.opacity = '1'
          }
          jelajah(kini + 1200)
        }
      }
      taruh(0)
      raf = requestAnimationFrame(langkah)
    }

    jalankan()
    // Saat layar melewati 860 piksel, SVG yang tampil berganti dan titiknya
    // harus pindah ke jalur yang baru. Tanpa ini titiknya tetap menempel di
    // svg yang sudah disembunyikan, jadi ia menghilang begitu saja.
    const media = window.matchMedia('(max-width: 860px)')
    const ganti = () => jalankan()
    media.addEventListener('change', ganti)
    return () => {
      lepas = true
      cancelAnimationFrame(raf)
      cancelAnimationFrame(rafBiru)
      media.removeEventListener('change', ganti)
    }
  }, [])

  return (
    <div className="hero-hias" ref={acuan} aria-hidden="true">
      <Kurva g={LEBAR} />
      <Kurva g={SEMPIT} />
    </div>
  )
}
