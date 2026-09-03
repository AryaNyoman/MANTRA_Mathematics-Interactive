/**
 * Pita hias di kaki hero: dua kurva sinus yang digambar sendiri, dua titik
 * yang berjalan menyusurinya, dan lima lambang matematika yang mengapung.
 *
 * Kenapa `pathLength="2200"` dan `stroke-dasharray="2200"`: panjang jalur yang
 * sebenarnya berbeda-beda menurut lebar layar, jadi kalau dasharray-nya ditebak
 * dari panjang aslinya akan ada sisa garis yang tidak pernah tertutup. Dengan
 * `pathLength` panjangnya dipaksa jadi 2200 satuan di mata SVG, dan animasinya
 * pasti menutup rapat.
 *
 * Titik berjalan memakai `animateMotion` + `mpath` bawaan SVG, bukan JavaScript:
 * peramban yang menjalankannya sendiri jauh lebih hemat daripada menggerakkan
 * lewat React, dan berhenti sendiri saat tab tidak terlihat.
 *
 * Seluruh pita ini `pointer-events:none` dan `aria-hidden`: ia hiasan, tidak
 * boleh menghalangi klik dan tidak perlu dibacakan pembaca layar.
 */
export default function PitaKurva() {
  return (
    <div className="hero-hias" aria-hidden="true">
      <svg
        viewBox="0 0 1400 200"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: 132 }}
      >
        <path
          id="kurvaEmas"
          className="kurva-emas"
          pathLength={2200}
          d="M-20 108 C 160 42 340 42 520 108 C 700 174 880 174 1060 108 C 1240 42 1420 42 1600 108"
          fill="none"
          stroke="#B08A3E"
          strokeOpacity={0.45}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={2200}
        />
        <path
          id="kurvaBiru"
          className="kurva-biru"
          pathLength={2200}
          d="M-20 142 C 180 90 360 90 540 142 C 720 194 900 194 1080 142 C 1260 90 1440 90 1620 142"
          fill="none"
          stroke="#2B4B8F"
          strokeOpacity={0.3}
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={2200}
        />
        <circle r={6} fill="#E8582C" opacity={0.8}>
          <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
            <mpath href="#kurvaEmas" />
          </animateMotion>
        </circle>
        <circle r={4.5} fill="#6E9C7A" opacity={0.85}>
          <animateMotion dur="16s" begin="1.4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#kurvaBiru" />
          </animateMotion>
        </circle>
      </svg>

      {/* Lima lambang, sengaja ditaruh di tepi supaya tidak pernah jatuh di
          belakang kolom teks yang harus terbaca. */}
      <span className="glif" style={{ left: '5%', top: '15%', fontSize: 78, color: '#B08A3E', opacity: 0.16, animationDuration: '13s' }}>θ</span>
      <span className="glif" style={{ right: '7%', top: '10%', fontSize: 60, color: '#2B4B8F', opacity: 0.14, animationDuration: '17s' }}>∑</span>
      <span className="glif" style={{ left: '7%', bottom: '11%', fontSize: 50, color: '#E8582C', opacity: 0.13, animationDuration: '21s' }}>√</span>
      <span className="glif" style={{ right: '15%', bottom: '13%', fontSize: 66, color: '#6E9C7A', opacity: 0.16, animationDuration: '17s' }}>π</span>
      <span className="glif" style={{ left: '2.5%', top: '46%', fontSize: 40, color: '#B08A3E', opacity: 0.14, animationDuration: '21s' }}>∞</span>
    </div>
  )
}
