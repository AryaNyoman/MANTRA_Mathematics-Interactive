# Latihan MANTRA: 15 soal per tingkat, pembahasan bergambar, mode guru

Tanggal: 13 September 2026. Diminta ARYA, disetujui setelah tanya-jawab
(gambar hanya untuk soal yang punya situasi, kalibrasi ke UTBK dan olimpiade,
mode guru berkata kunci).

## 1. Tujuan

1. Tiap bab latihan punya **15 soal per tingkat** (mudah, sedang, sulit,
   sangat sulit), jadi 60 soal per bab, 540 untuk sembilan bab. Tingkat
   berikutnya terbuka setelah **10 soal** tingkat sebelumnya benar.
2. Pembahasan tiap soal **lebih panjang dan bergambar**: langkah bernomor,
   penjelasan kenapa pengecoh menggoda, dan gambar situasi soal untuk soal
   cerita, bangun, dan grafik.
3. **Mode guru**: satu kata kunci membuka semua tingkat latihan dan kuis
   materi, supaya guru bisa melihat soal dan pembahasannya saat siswa
   bertanya.
4. Perapian tampilan: logo penuh MANTRA, tombol Lanjutkan sejajar tab lain,
   kartu latihan berlatar matematis khas babnya.

## 2. Yang sudah ada (pijakan)

- `web/content/<bab>/kuis.ts`: `KUIS: SoalKuis[]`, 32 soal per bab
  (Transformasi 16). Tipe di `web/content/tipe.ts`: `id`, `pertanyaan`,
  `pilihan`, `benar`, `alasan`, `langkah?`, `tingkat`.
- `web/lib/latihan-kemajuan.ts`: `SYARAT_NAIK = 4`, `ringkasPerTingkat`
  menentukan tingkat terbuka, kemajuan disimpan di localStorage
  `matra:latihan:<bab>` sebagai daftar id soal yang pernah benar.
- `web/components/latihan/ArenaLatihan.tsx`: keping tingkat, soal, tombol
  Periksa, panel Pembahasan di samping (langkah bernomor atau `alasan`).
- `web/components/latihan/DaftarLatihan.tsx`: kartu per bab (`.kartu-bank`).
- `web/components/topik/Kuis.tsx`: kuis materi, 8 soal acak dari bank yang
  sama lewat `ambilSoal`; kuncinya `kuisTerbuka` di `lib/kemajuan.ts`.
- `web/components/Nav.tsx`: logo `mantra-simbol-gelap.png`, tab, laci
  `LaciLanjut` berkelas `nav-tab nav-laci-tombol`.

## 3. Rancangan

### 3.1 Data soal (`web/content/tipe.ts`)

```ts
export type GambarSoal =
  | { jenis: 'segitiga'; sudut?: number; siku?: 'kiri' | 'kanan'
      label: [string, string, string]  /* depan, samping, miring */ }
  | { jenis: 'lingkaran'; sudut: number; label?: string }
  | { jenis: 'grafik'; fungsi: string[]; jangkauan?: [number, number, number, number]
      titik?: { x: number; y: number; label?: string }[] }
  | { jenis: 'vektor'; panah: { dari?: [number, number]; ke: [number, number]; label?: string }[] }
  | { jenis: 'batang' | 'garis-data'; kategori: string[]; nilai: number[]; satuan?: string }
  | { jenis: 'balok'; ukuran: [number, number, number]; titik?: string[]; ruas?: [string, string][] }
  | { jenis: 'bidang'; bangun: [number, number][]; bayangan?: [number, number][]; cermin?: string }
  | { jenis: 'luas'; fungsi: string; dari: number; sampai: number; persegi?: number }
  | { jenis: 'svg'; viewBox: string; isi: string }   /* jalan keluar untuk kasus khusus */

export type SoalKuis = {
  id: string
  tingkat: TingkatKuis
  pertanyaan: string
  pilihan: string[]
  benar: number
  /** gambar situasi soal; tampil di bawah soal dan di panel pembahasan */
  gambar?: GambarSoal
  /** langkah penyelesaian bernomor, 3 sampai 6 butir, WAJIB untuk soal baru */
  langkah: string[]
  /** kenapa pengecoh terasa masuk akal, satu atau dua kalimat */
  jebakan?: string
  /** ringkasan satu paragraf (lama); dipertahankan untuk soal yang belum ditulis ulang */
  alasan: string
}
```

Aturan isi:
- `langkah` wajib untuk semua soal setelah bab itu ditulis ulang; sebelum
  itu `alasan` tetap dipakai (perender jatuh ke `alasan` bila `langkah`
  kosong, seperti sekarang).
- Gambar wajib untuk soal cerita, bangun, grafik, data; soal definisi dan
  hitungan murni boleh tanpa gambar.
- Id soal lama dipertahankan (kemajuan siswa tidak hilang); soal baru
  memakai id lanjutan (`k33` sampai `k60`). Soal lama boleh berpindah
  tingkat bila kalibrasi menuntut.
- Kalibrasi: mudah dan sedang mengikuti buku guru Kelas 10 sampai 12;
  sulit mengikuti pola UTBK (mathcyber1997, PDF koleksi ARYA); sangat
  sulit 5 soal bergaya olimpiade plus 10 soal sulit-biasa supaya ada yang
  bisa dijawab. Semua ditulis sendiri; sumber kalibrasi dicatat di kepala
  berkas, bukan disalin.
- Semua jawaban angka diperiksa mesin (`alat/cek_kuis.py`: memeriksa
  jumlah per tingkat, id unik, indeks `benar` sah, pilihan tidak kembar,
  `langkah` ada, dan menjalankan ekspresi pemeriksa opsional per soal).

### 3.2 Perender gambar (`web/components/latihan/gambar/`)

Satu komponen `GambarSoal` yang memilih perender menurut `jenis`. Semua
SVG memakai `viewBox` tetap, huruf Space Grotesk/Newsreader lewat CSS,
warna dari `lib/warna.ts` (emas, navy, biru, merah, kertas), garis 1,5 px,
label angka `angka-rata`. Ukuran mengikuti lebar wadah, tinggi maksimal
260 px di desktop dan 200 px di HP. Perender tidak boleh memotong
gambarnya sendiri (aturan widget).

Perender per jenis: `Segitiga`, `Lingkaran`, `Grafik` (memakai
`petak-sumbu.ts`), `Vektor`, `DiagramData` (batang dan garis),
`Balok` (proyeksi miring), `Bidang` (bangun dan bayangan), `Luas`
(daerah di bawah kurva, persegi panjang Riemann bila `persegi`), `SvgBebas`.

### 3.3 Aturan kemajuan (`lib/latihan-kemajuan.ts`)

- `SYARAT_NAIK = 10`.
- `ringkasPerTingkat(bank, k, semuaTerbuka = false)`: bila `semuaTerbuka`,
  setiap tingkat `terbuka: true`.
- Teks syarat di `ArenaLatihan` dan `DaftarLatihan` membaca `SYARAT_NAIK`,
  tidak ada angka tertulis.

### 3.4 Mode guru (`lib/mode-guru.ts`, `components/TombolGuru.tsx`)

- Kunci localStorage `matra:guru` bernilai `'1'`; dibaca lewat
  `useSyncExternalStore` seperti simpanan lain.
- Kata kunci diperiksa di peramban: SHA-256 (Web Crypto) dari masukan
  dibandingkan dengan sidik yang disimpan di kode. Sidik yang disimpan
  adalah sidik dari kata kunci ARYA (13 Sep 2026); kata kuncinya sendiri
  tidak ditulis di repo, PROGRESS, atau commit.
- `TombolGuru` di Nav, di ujung kanan setelah `nav-meta`, disembunyikan
  di halaman belajar (`sesi.aktif`) sesuai permintaan. Menekannya membuka
  dialog kecil (`<dialog>`) berisi satu medan kata kunci dan tombol Masuk;
  salah kata kunci: pesan singkat, tidak ada batas percobaan. Saat aktif,
  tombol bertuliskan "Guru ✓" dan menekannya keluar dari mode guru.
- Dampak: `ArenaLatihan` dan `DaftarLatihan` memanggil
  `ringkasPerTingkat(..., guru)`; `HalamanTopik` memakai `terbuka || guru`
  untuk kuis; lencana kecil "Mode guru: semua tingkat terbuka" di kedua
  halaman latihan. Kemajuan siswa TIDAK ditulis saat mode guru aktif
  (`catatJawaban` dilewati), supaya guru yang mencoba soal tidak mengubah
  catatan siswa di peramban itu.

### 3.5 Perapian tampilan

- Logo: `mantra-penuh-gelap.png` (lambang plus tulisan MANTRA), tinggi
  sama dengan nav sekarang; `aria-label` tetap.
- Lanjutkan: `.nav-laci-tombol` mengikuti `.nav-tab` (font-size 13,5 px,
  padding 9 px 12 px, warna 62 persen kertas), panah 10 px; `font: inherit`
  dibuang. Diuji Playwright: tinggi dan garis dasar teks "Lanjutkan" sama
  dengan "Peta Materi".
- Latar kartu latihan: komponen `LatarBab` (SVG) per slug bab, dipasang
  absolut di dalam `.kartu-bank` di belakang isi, opasitas 0,07 sampai
  0,10, warna emas atau navy, tanpa animasi. Motif: trigonometri lingkaran
  satuan dan gelombang sinus; vektor kisi panah; grafik-fungsi parabola dan
  garis; statistika batang histogram dan garis tren; transformasi-geometri
  bangun dan bayangan cermin; limit kurva mendekati titik berlubang;
  ruang-3d kerangka kubus; turunan kurva dan garis singgung; integral
  persegi panjang Riemann di bawah kurva.

### 3.6 Halaman latihan

- Gambar situasi (bila `gambar` ada) tampil di bawah teks soal sebelum
  dijawab; panel Pembahasan menampilkan gambar yang sama plus langkah,
  lalu blok "Kenapa pengecoh menggoda" bila `jebakan` ada.
- Keping tingkat menampilkan `selesai / 15`; teks kunci "terbuka setelah
  10 soal tingkat sebelumnya benar".

## 4. Urutan kerja dan pemeriksaan

Tahap 1 (satu deploy): 3.1 tipe, 3.2 perender dengan contoh tiap jenis,
3.3, 3.4, 3.5, 3.6, `alat/cek_kuis.py`. Uji: `tsc`, `alat/cek_kuis.py`,
potret Playwright desktop dan HP untuk nav, kartu, arena (gambar, panel),
dialog guru (salah dan benar kata kunci), kuis materi terbuka dalam mode
guru.

Tahap 2 (per bab): Trigonometri dulu (60 soal, ditinjau ARYA), lalu bab
lain dua sampai tiga per deploy. Tiap bab: `cek_kuis.py` lolos, tiap
gambar dipotret dan dinilai, jawaban angka diperiksa mesin.

## 5. Di luar cakupan

Lencana, akun guru sungguhan, laporan kemajuan siswa ke guru, soal isian
(semua tetap pilihan ganda lima pilihan).
