# Rencana Implementasi Topik Limit

> **Untuk pekerja agentik:** SUB-SKILL WAJIB: pakai `superpowers:executing-plans`
> (sesi ini dijalankan inline, bukan lewat subagen, karena ARYA sedang tidur dan
> aturan proyek melarang memanggil subagen tanpa diminta). Langkah memakai
> kotak centang `- [ ]`.

**Tujuan:** Menjadikan Limit topik kedua MATRA yang lengkap, materi sampai kuis,
tanpa merusak Trigonometri yang sudah jalan.

**Arsitektur:** Rangka halaman topik dipisah dari isi topik. Satu berkas rangka
dipakai semua topik, tiap topik hanya menyumbang isinya dan satu komponen
"panggung" yang menyetel widgetnya sendiri. Isi topik didaftarkan lewat satu
daftar pusat, sehingga menambah topik ketiga nanti tidak menyentuh rangka lagi.

**Tumpukan teknologi:** Next.js 16.3.3, React 19.2.8, TypeScript 5, Tailwind 4,
SVG buatan sendiri untuk widget, Manim 0.21 untuk video, sympy 1.14 untuk
memeriksa jawaban soal.

**Spec:** `docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`

---

## Catatan penting soal "tes"

Proyek ini **tidak punya kerangka tes otomatis** (`package.json` hanya berisi
dev, build, start, lint). Menambah Vitest bukan bagian permintaan ARYA dan akan
memakan waktu yang sekarang tidak ada. Jadi siklus pemeriksaan yang dipakai
adalah yang **sudah berlaku di proyek ini** dan sudah terbukti menangkap cacat
nyata pada sesi 4:

| Lapis | Perintah | Menangkap apa |
|---|---|---|
| Tipe | `npx tsc --noEmit` | Salah nama properti, tipe tidak cocok |
| Aturan | `npx eslint .` | Larangan React 19, impor mati |
| Bangun | `npm run build` | Kesalahan yang hanya muncul saat dirakit |
| Mata | Playwright, 2 tingkat zoom, 2 mode warna | Tata letak rusak, tombol hilang |
| Hitungan | `python alat/cek_soal.py` | Jawaban soal yang salah |

**Lapis "Mata" tidak boleh dilewati.** Pada sesi 4 perbaikan zoom dilaporkan
selesai padahal tombol Tonton hilang pada zoom 100 persen. ARYA yang menemukan,
bukan Claude.

---

## Batasan yang berlaku di SEMUA tugas

Disalin apa adanya dari `CLAUDE.md` dan spec:

- **Tanda pisah panjang DILARANG** di teks yang dilihat pengguna, di kode, dan
  di komentar. Pakai titik, koma, titik dua, tanda kurung, atau tanda hubung biasa.
- **Kata "miskonsepsi" tidak boleh muncul di halaman.** Pakai "Sering keliru",
  dan taruh di BAWAH setelah siswa paham.
- **Penjelasan dipecah jadi blok**, bukan tembok paragraf. Tapi isinya jangan dipangkas.
- **Widget tidak boleh memotong gambarnya sendiri.** Bingkai menyesuaikan
  otomatis dan wajib punya penunjuk skala.
- **Warna matematika satu sumber kebenaran**, dari `web/lib/warna.ts`. Aksen situs
  (hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`) tidak boleh dipakai untuk
  bagian matematika.
- **Gaya terkunci "Studio Teknis"**: krem `#F6F2EC`, kartu `#FFFDFA`, tinta
  `#211E1A`, garis `#E1D9CC`. Judul Fraunces, teks Inter, angka IBM Plex Mono.
- **React 19**: dilarang `setState` di dalam `useEffect`; nilai dari
  `localStorage` dibaca lewat `useSyncExternalStore` dari `lib/simpanan.ts`.
  Dilarang mengubah variabel biasa setelah render selesai.
- **Next 16**: `params` pada route dinamis adalah `Promise`, wajib `await`.
- **Soal salinan wajib bersumber.** Tanpa keterangan berarti tulisan sendiri.
- **Semua berkas di drive D.**
- Commit sesering mungkin, satu tugas satu commit. **Jangan push tanpa ARYA.**

---

## Peta berkas

### Dibuat

| Berkas | Tanggung jawab |
|---|---|
| `web/content/tipe.ts` | Tipe isi yang dipakai semua topik: `Blok`, `Tahap`, `SoalKuis`, `SoalLatihan`, `TingkatKuis` |
| `web/content/daftar-isi.ts` | Daftar pusat: slug topik ke isinya dan komponen panggungnya |
| `web/components/topik/HalamanTopik.tsx` | Rangka umum halaman topik, bebas topik |
| `web/components/topik/PanggungTrigonometri.tsx` | Penyetelan 10 widget trigonometri |
| `web/components/topik/PanggungLimit.tsx` | Penyetelan 9 widget limit |
| `web/components/widget/limit/SelangMenyusut.tsx` | Tahap 1 |
| `web/components/widget/limit/GarisMendekati.tsx` | Tahap 2 |
| `web/components/widget/limit/TarifMelompat.tsx` | Tahap 3 |
| `web/components/widget/limit/LubangGrafik.tsx` | Tahap 4 |
| `web/components/widget/limit/MesinSifat.tsx` | Tahap 5 |
| `web/components/widget/limit/BongkarBertahap.tsx` | Tahap 6 |
| `web/components/widget/limit/PerkecilTampilan.tsx` | Tahap 7 |
| `web/components/widget/limit/BusurLawanTali.tsx` | Tahap 8 |
| `web/components/widget/limit/PerusakFungsi.tsx` | Tahap 9 |
| `web/components/widget/limit/bidang.ts` | Alat bersama widget grafik: skala, sumbu, penunjuk skala |
| `web/content/limit/tahap.ts` | 10 tahap materi Limit |
| `web/content/limit/latihan.ts` | 4 latihan pilihan ganda A sampai E, dan daftar kanal YouTube |
| `web/content/limit/kuis.ts` | Bank 32 soal |
| `web/content/limit/index.ts` | Ekspor gabungan |
| `web/app/latihan/limit/page.tsx` | Halaman latihan Limit |
| `alat/cek_soal.py` | Pemeriksa jawaban dengan sympy |

### Diubah

| Berkas | Perubahan |
|---|---|
| `web/content/trigonometri/tahap.ts` | Tipe diambil dari `content/tipe.ts` |
| `web/components/topik/Trigonometri.tsx` | **Dihapus**, isinya pecah jadi `HalamanTopik` dan `PanggungTrigonometri` |
| `web/app/topik/[slug]/page.tsx` | Mengambil isi dari `daftar-isi.ts`, tidak menyebut Trigonometri |
| `web/components/latihan/ArenaLatihan.tsx` | Bank soal masuk lewat properti |
| `web/app/latihan/trigonometri/page.tsx` | Mengoper bank soal trigonometri |
| `web/components/latihan/DaftarLatihan.tsx` | Limit tidak lagi ditandai belum dibangun |
| `web/content/topik.ts` | Limit menjadi `siap: true` |
| `CLAUDE.md` | Folder `alat/` didaftarkan |
| `PROGRESS.md` | Status sesi 5 |

---

## Tugas 1: Tipe isi dipindah ke satu tempat

**Berkas:**
- Buat: `web/content/tipe.ts`
- Ubah: `web/content/trigonometri/tahap.ts` (bagian tipe di kepala berkas)
- Ubah: `web/content/trigonometri/kuis.ts`, `web/content/trigonometri/latihan.ts` (kalau tipenya ada di situ)

**Antarmuka:**
- Menghasilkan: `Blok`, `Tahap`, `SoalLatihan`, `SoalKuis`, `TingkatKuis`, `Kanal`
- Tipe `Tahap` memakai `widget?: string` supaya tiap topik bebas menamai
  widgetnya sendiri. Pengetatan namanya dilakukan di dalam berkas topik
  masing-masing lewat `satisfies`.

- [ ] **Langkah 1: Baca tipe yang ada sekarang**

Baca `content/trigonometri/tahap.ts` baris 1 sampai 62, `content/trigonometri/latihan.ts`,
dan `content/trigonometri/kuis.ts`. Catat setiap tipe yang diekspor.

- [ ] **Langkah 2: Buat `content/tipe.ts`**

Salin tipe apa adanya. Satu-satunya perubahan yang boleh: `widget` menjadi
`string` biasa, karena senarai `Widget` trigonometri tidak berlaku untuk Limit.

```ts
/** Satu potongan penjelasan. Bentuknya sengaja beragam supaya tidak monoton. */
export type Blok =
  | { jenis: 'paragraf'; teks: string }
  | { jenis: 'poin'; judul?: string; butir: string[] }
  | { jenis: 'sorot'; teks: string }
  | { jenis: 'contoh'; judul: string; baris: string[]; simpul?: string }
  | { jenis: 'sesi'; judul: string }
  | { jenis: 'coba'; teks: string; langkah?: string[] }

export type Tahap = {
  no: number
  slug: string
  judul: string
  pertanyaan: string
  labelPendek: string
  penjelasan: Blok[]
  seringKeliru?: { judul: string; isi: string; sumber?: string }
  intisari?: string[]
  /** nama widget, dimengerti oleh panggung topik yang bersangkutan */
  widget?: string
  video?: { berkas: string; poster: string }
  siap: boolean
}
```

- [ ] **Langkah 3: Sambungkan berkas trigonometri ke tipe baru**

Di `content/trigonometri/tahap.ts`, ganti definisi tipe dengan
`export type { Blok, Tahap } from '@/content/tipe'` supaya pemakai lama tidak
patah, lalu ketatkan senarai widgetnya di berkas itu sendiri.

- [ ] **Langkah 4: Periksa tiga lapis**

```bash
cd web && npx tsc --noEmit && npx eslint . && npm run build
```
Diharapkan: ketiganya bersih. Belum ada yang berubah di layar.

- [ ] **Langkah 5: Commit**

```bash
git add web/content/tipe.ts web/content/trigonometri/
git commit -m "Tipe isi topik dipindah ke satu tempat, siap dipakai bersama"
```

---

## Tugas 2: Rangka halaman topik dipisah dari isinya

Ini tugas paling berisiko dalam rencana ini, karena menyentuh halaman yang sudah
jalan dan sudah dipoles lewat 22 revisi. Dikerjakan sendirian, dibuktikan penuh,
baru lanjut.

**Berkas:**
- Buat: `web/components/topik/HalamanTopik.tsx`
- Buat: `web/components/topik/PanggungTrigonometri.tsx`
- Buat: `web/content/daftar-isi.ts`
- Hapus: `web/components/topik/Trigonometri.tsx`
- Ubah: `web/app/topik/[slug]/page.tsx`

**Antarmuka:**

```ts
// content/daftar-isi.ts
export type IsiTopik = {
  tahap: Tahap[]
  latihan: SoalLatihan[]
  kuis: SoalKuis[]
  kanal: Kanal[]
  /** komponen yang menggambar visual kiri untuk tahap yang sedang dibuka */
  Panggung: React.ComponentType<PropPanggung>
}
export const ISI_TOPIK: Record<string, IsiTopik | undefined>
```

```ts
// components/topik/HalamanTopik.tsx
export type PropPanggung = {
  tahap: Tahap
  /** true kalau siswa memilih Coba sendiri, false kalau memilih Tonton */
  tampilWidget: boolean
}
export default function HalamanTopik(props: { topik: Topik; isi: IsiTopik })
```

- [ ] **Langkah 1: Potret keadaan sekarang sebagai pembanding**

Jalankan situs, lalu simpan potret Trigonometri SEBELUM diubah, supaya ada
pembanding sesudahnya.

```bash
cd web && npm run dev
```
Lalu dengan playwright-cli: buka `http://localhost:3000/topik/trigonometri`,
potret tahap 1, tahap 5, dan tahap 8, pada zoom 100 persen.
Simpan potretnya, jangan dihapus sampai Tugas 2 selesai.

- [ ] **Langkah 2: Pindahkan penyetelan widget ke `PanggungTrigonometri.tsx`**

Ambil dari `Trigonometri.tsx` semua yang menyebut nama widget: blok
`tahap.widget === '...'` di kolom visual maupun di panel kendali bawah, beserta
`useState` yang hanya dipakai widget, dan pembantu `PilihSisi`, `HasilRasio`,
`AngkaSegitiga`. Komponen ini menerima `PropPanggung` dan tidak tahu apa-apa
soal tab, kunci kuis, atau penghitung waktu baca.

- [ ] **Langkah 3: Sisakan rangkanya di `HalamanTopik.tsx`**

Yang tinggal: keadaan `layar`, daftar tahap, tombol Tonton dan Coba sendiri,
`PemutarVideo`, `Penjelasan`, `Latihan`, `Kuis`, penghitung waktu baca, dan
kunci kuis. Semua isi datang dari properti `isi`, tidak ada satu pun impor
dari `@/content/trigonometri`.

- [ ] **Langkah 4: Buat daftar pusat dan sambungkan halaman route**

`app/topik/[slug]/page.tsx` mencari `ISI_TOPIK[slug]`. Kalau ada dan
`topik.siap`, gambar `<HalamanTopik topik={topik} isi={isi} />`. Kalau tidak,
tampilkan kartu "Belum dibangun" yang sudah ada, jangan diubah kalimatnya.

- [ ] **Langkah 5: Periksa tiga lapis**

```bash
cd web && npx tsc --noEmit && npx eslint . && npm run build
```
Diharapkan: bersih. Tidak boleh ada sisa impor ke berkas yang sudah dihapus.

- [ ] **Langkah 6: Lapis Mata, ini yang wajib**

Dengan playwright-cli pada `http://localhost:3000/topik/trigonometri`:

1. Buka **kesepuluh** tahap satu per satu. Tiap tahap: widgetnya tampil dan
   bergerak saat digeser.
2. Tahap bervideo (2, 4, 5, 6, 7, 8, 9): tombol **Tonton** dan **Coba sendiri**
   keduanya terlihat.
3. Ulangi pada **zoom 100 persen dan 150 persen**.
4. Ulangi pada **layar lebar dan layar sempit**.
5. Bandingkan dengan potret Langkah 1. Perbedaan tampilan apa pun berarti
   pemisahan ini gagal, bukan berarti "kelihatannya masih oke".

Kalau ada satu saja yang meleset: perbaiki, jangan lanjut ke tugas berikutnya.

- [ ] **Langkah 7: Commit**

```bash
git add -A web/
git commit -m "Rangka halaman topik dipisah dari isinya, Trigonometri utuh"
```

---

## Tugas 3: Arena latihan menerima bank soal lewat properti

**Berkas:**
- Ubah: `web/components/latihan/ArenaLatihan.tsx`
- Ubah: `web/app/latihan/trigonometri/page.tsx`

**Antarmuka:**
- Memakai: `SoalKuis`, `TingkatKuis` dari `content/tipe.ts`
- Menghasilkan: `ArenaLatihan(props: { topik: string; nama: string; bank: SoalKuis[] })`
  di mana `topik` adalah slug yang dipakai untuk menyimpan kemajuan.

- [ ] **Langkah 1: Ubah tanda tangan komponennya**

Buang `import { KUIS } from '@/content/trigonometri'`. Ganti setiap pemakaian
`KUIS` dengan `bank` dari properti. Pastikan kunci penyimpanan kemajuan memakai
`topik` dari properti, bukan tulisan `'trigonometri'` yang dipatri.

- [ ] **Langkah 2: Operkan dari halaman trigonometri**

```tsx
<ArenaLatihan topik="trigonometri" nama="Trigonometri" bank={KUIS} />
```

- [ ] **Langkah 3: Periksa tiga lapis dan lapis Mata**

```bash
cd web && npx tsc --noEmit && npx eslint . && npm run build
```
Lalu buka `http://localhost:3000/latihan/trigonometri`, kerjakan satu soal,
pastikan bar kemajuan dan lencana masih bergerak seperti sebelumnya.

- [ ] **Langkah 4: Commit**

```bash
git add web/components/latihan/ArenaLatihan.tsx web/app/latihan/trigonometri/page.tsx
git commit -m "Arena latihan bebas topik, bank soal masuk lewat properti"
```

---

## Tugas 4: Alat pemeriksa jawaban soal

Aturan ARYA: soal buatan Claude cenderung terlalu mudah, dan jawaban numerik
wajib diperiksa mesin. Untuk Limit, sympy bisa memeriksa **tepat**, bukan
kira-kira. Alat ini dibuat SEBELUM satu soal pun ditulis.

**Berkas:**
- Buat: `alat/cek_soal.py`
- Ubah: `CLAUDE.md` (daftarkan folder `alat/`)

**Antarmuka:**
- Masukan: berkas JSON berisi senarai `{ id, ekspresi, peubah, menuju, jawaban }`
- Keluaran: laporan per soal, dan **kode keluar bukan nol kalau ada yang salah**

- [ ] **Langkah 1: Tulis kasus uji yang harus GAGAL dulu**

Buat berkas contoh berisi satu soal benar dan satu soal sengaja salah:

```json
[
  { "id": "uji-benar", "ekspresi": "(x**2 - 1)/(x - 1)", "peubah": "x", "menuju": "1", "jawaban": "2" },
  { "id": "uji-salah", "ekspresi": "sin(x)/x", "peubah": "x", "menuju": "0", "jawaban": "0" }
]
```

- [ ] **Langkah 2: Jalankan sebelum alatnya ada, pastikan gagal**

```bash
python alat/cek_soal.py contoh.json
```
Diharapkan: gagal dengan "No such file or directory".

- [ ] **Langkah 3: Tulis alatnya**

Pakai `sympy.limit` dan `sympy.simplify(hasil - jawaban) == 0` untuk
membandingkan, bukan perbandingan teks. Dukung `oo` dan `-oo` untuk `menuju`,
serta `+` dan `-` untuk limit sepihak lewat argumen `dir`.

- [ ] **Langkah 4: Jalankan, pastikan yang benar lolos dan yang salah tertangkap**

```bash
python alat/cek_soal.py contoh.json
```
Diharapkan: `uji-benar` LOLOS, `uji-salah` DITOLAK dengan keterangan
"seharusnya 1", dan kode keluar 1.

- [ ] **Langkah 5: Commit**

```bash
git add alat/cek_soal.py CLAUDE.md
git commit -m "Alat pemeriksa jawaban limit dengan sympy, menolak jawaban salah"
```

---

## Tugas 5: Materi Limit tahap 1 sampai 5

**Berkas:**
- Buat: `web/content/limit/tahap.ts` (bagian pertama)

**Antarmuka:**
- Memakai: `Blok`, `Tahap` dari `content/tipe.ts`
- Menghasilkan: `export const TAHAP: Tahap[]`, dan senarai nama widget
  `export type WidgetLimit = 'selang-menyusut' | 'garis-mendekati' | ...`

Isi tiap tahap mengikuti spec bagian "Alur 10 tahap" apa adanya, termasuk
angka contohnya. Bentuk bloknya berselang-seling: `sesi`, `paragraf`, `poin`,
`sorot`, `contoh`, `coba`. Kotak `seringKeliru` selalu di bawah.

- [ ] **Langkah 1: Periksa dulu semua angka contoh dengan sympy**

```bash
python alat/cek_soal.py alat/contoh-materi-limit.json
```
Berisi keempat contoh spec: `(x**2-1)/(x-1)` di 1, `(sqrt(x+4)-2)/x` di 0,
`sin(x)/x` di 0, `(3*x**2+2*x)/(x**2-5)` di tak hingga.
Diharapkan: keempatnya LOLOS dengan jawaban 2, 1/4, 1, 3.

- [ ] **Langkah 2: Tulis tahap 1 sampai 5**

- [ ] **Langkah 3: Periksa larangan proyek**

```bash
grep -n "\u2014" web/content/limit/tahap.ts    # harus kosong
grep -ni "miskonsepsi" web/content/limit/tahap.ts   # harus kosong
```

- [ ] **Langkah 4: Periksa tipe**

```bash
cd web && npx tsc --noEmit
```

- [ ] **Langkah 5: Commit**

```bash
git add web/content/limit/tahap.ts
git commit -m "Materi Limit tahap 1 sampai 5, dari masalah menuju cara cepat"
```

---

## Tugas 6: Materi Limit tahap 6 sampai 10

**Berkas:**
- Ubah: `web/content/limit/tahap.ts`
- Buat: `web/content/limit/index.ts`

- [ ] **Langkah 1: Tulis tahap 6 sampai 10** mengikuti spec.

- [ ] **Langkah 2: Periksa larangan proyek** dengan dua perintah `grep` dari Tugas 5.

- [ ] **Langkah 3: Periksa tipe**

```bash
cd web && npx tsc --noEmit
```

- [ ] **Langkah 4: Commit**

```bash
git add web/content/limit/
git commit -m "Materi Limit tahap 6 sampai 10, kontinuitas menutup alurnya"
```

---

## Tugas 7: Alat bersama widget grafik

Sembilan widget Limit hampir semuanya menggambar grafik fungsi pada bidang
koordinat. Menulis ulang penskalaan di sembilan tempat adalah cara tercepat
melanggar aturan "widget tidak boleh memotong gambarnya sendiri".

**Berkas:**
- Buat: `web/components/widget/limit/bidang.ts`

**Antarmuka:**

```ts
export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }
/** ubah koordinat matematika jadi koordinat SVG */
export function keLayar(j: Jendela, lebar: number, tinggi: number): (x: number, y: number) => [number, number]
/** jendela yang PASTI memuat semua titik, ditambah ruang tepi */
export function jendelaMuat(titik: Array<[number, number]>, tepi?: number): Jendela
/** teks penunjuk skala, contoh "1 kotak = 0,5" */
export function labelSkala(j: Jendela): string
```

- [ ] **Langkah 1: Tulis `bidang.ts`**

- [ ] **Langkah 2: Periksa tipe**

```bash
cd web && npx tsc --noEmit
```

- [ ] **Langkah 3: Commit**

```bash
git add web/components/widget/limit/bidang.ts
git commit -m "Alat bersama widget Limit: bingkai yang tidak memotong gambarnya"
```

---

## Tugas 8: Widget Limit tahap 1 sampai 3

**Berkas:**
- Buat: `SelangMenyusut.tsx`, `GarisMendekati.tsx`, `TarifMelompat.tsx`
  di `web/components/widget/limit/`

Ketiganya SVG buatan sendiri, mengikuti pola widget Trigonometri yang sudah ada:
komponen menerima nilai dari luar, tidak menyimpan keadaan sendiri kalau nilainya
dikendalikan panel di bawah panggung.

- [ ] **Langkah 1: Tulis ketiga widget**
- [ ] **Langkah 2: Periksa tipe dan aturan**

```bash
cd web && npx tsc --noEmit && npx eslint .
```

- [ ] **Langkah 3: Commit**

```bash
git add web/components/widget/limit/
git commit -m "Tiga widget Limit pertama: selang menyusut, mendekati, melompat"
```

---

## Tugas 9: Widget Limit tahap 4 sampai 6

**Berkas:**
- Buat: `LubangGrafik.tsx`, `MesinSifat.tsx`, `BongkarBertahap.tsx`

- [ ] **Langkah 1: Tulis ketiga widget**
- [ ] **Langkah 2: Periksa tipe dan aturan**
- [ ] **Langkah 3: Commit**

```bash
git add web/components/widget/limit/
git commit -m "Tiga widget Limit berikutnya: lubang, mesin sifat, pembongkaran"
```

---

## Tugas 10: Widget Limit tahap 7 sampai 9

**Berkas:**
- Buat: `PerkecilTampilan.tsx`, `BusurLawanTali.tsx`, `PerusakFungsi.tsx`

`BusurLawanTali` wajib memakai warna dari `lib/warna.ts` yang sama dengan widget
lingkaran satuan Trigonometri, karena kaitannya justru yang mau ditunjukkan.

- [ ] **Langkah 1: Tulis ketiga widget**
- [ ] **Langkah 2: Periksa tipe dan aturan**
- [ ] **Langkah 3: Commit**

```bash
git add web/components/widget/limit/
git commit -m "Tiga widget Limit terakhir: tak hingga, busur lawan tali, perusak"
```

---

## Tugas 11: Panggung Limit dan topik dinyalakan

**Berkas:**
- Buat: `web/components/topik/PanggungLimit.tsx`
- Ubah: `web/content/daftar-isi.ts`
- Ubah: `web/content/topik.ts` (Limit `siap: true`)

- [ ] **Langkah 1: Tulis `PanggungLimit.tsx`** yang menyetel kesembilan widget
  beserta panel kendalinya, meniru bentuk `PanggungTrigonometri.tsx`.

- [ ] **Langkah 2: Daftarkan Limit di `daftar-isi.ts` dan nyalakan `siap: true`**

- [ ] **Langkah 3: Periksa tiga lapis**

```bash
cd web && npx tsc --noEmit && npx eslint . && npm run build
```

- [ ] **Langkah 4: Lapis Mata, wajib**

Buka `http://localhost:3000/topik/limit`. Kesepuluh tahap dibuka satu per satu,
tiap widget digeser sampai ujung kiri dan ujung kanan. Yang dicari:
gambar terpotong, teks bertindih, penunjuk skala hilang. Ulangi pada zoom
100 dan 150 persen. Potret tiap tahap dan **nilai satu per satu**, jangan
hanya melihat sekilas.

- [ ] **Langkah 5: Commit**

```bash
git add -A web/
git commit -m "Topik Limit menyala: sembilan widget hidup di sepuluh tahap"
```

---

## Tugas 12: Latihan dalam halaman Limit

**Berkas:**
- Buat: `web/content/limit/latihan.ts`

Empat soal pilihan ganda A sampai E dengan pembahasan bertahap, ditambah daftar
kanal YouTube berbahasa Indonesia untuk topik limit.

- [ ] **Langkah 1: Kalibrasi dulu ke sumber nyata**

Baca Contoh Soal 2.1 dan 2.2, Ayo Mencoba 2.2, dan Latihan akhir Bab 2 dari
`D:\BAHAN MATEMATIKA\LIMIT.pdf`. Catat tingkat kesulitannya. **Jangan menulis
soal sebelum langkah ini selesai**, itu aturan ARYA yang lahir dari temuan nyata.

- [ ] **Langkah 2: Tulis empat soal, lalu periksa jawabannya dengan mesin**

```bash
python alat/cek_soal.py alat/soal-latihan-limit.json
```
Diharapkan: keempatnya LOLOS. Satu saja ditolak berarti soalnya salah, bukan
alatnya.

- [ ] **Langkah 3: Periksa tipe dan larangan proyek**
- [ ] **Langkah 4: Commit**

```bash
git add web/content/limit/latihan.ts alat/soal-latihan-limit.json
git commit -m "Empat latihan Limit, jawabannya diperiksa sympy"
```

---

## Tugas 13: Bank 32 soal kuis Limit

**Berkas:**
- Buat: `web/content/limit/kuis.ts`
- Buat: `web/app/latihan/limit/page.tsx`
- Ubah: `web/components/latihan/DaftarLatihan.tsx`

Empat tingkat kesulitan, delapan soal tiap tingkat, mengikuti bentuk
`content/trigonometri/kuis.ts`.

- [ ] **Langkah 1: Tulis 32 soal**
- [ ] **Langkah 2: Periksa SELURUH jawaban dengan mesin**

```bash
python alat/cek_soal.py alat/soal-kuis-limit.json
```
Diharapkan: 32 dari 32 LOLOS. Kalau ada yang ditolak, soalnya diperbaiki,
bukan alatnya dilonggarkan.

- [ ] **Langkah 3: Buat halaman `/latihan/limit` dan hidupkan di daftar**
- [ ] **Langkah 4: Periksa tiga lapis dan lapis Mata**

Buka `/latihan/limit`, kerjakan beberapa soal, pastikan bar kemajuan bergerak
dan lencananya menyala. Pastikan juga kemajuan Trigonometri **tidak ikut
berubah**, karena kunci penyimpanannya harus terpisah.

- [ ] **Langkah 5: Commit**

```bash
git add -A web/ alat/
git commit -m "Bank 32 soal kuis Limit dan halaman latihannya"
```

---

## Tugas 14: Perbarui catatan proyek

**Berkas:**
- Ubah: `PROGRESS.md`, `CLAUDE.md`

- [ ] **Langkah 1: Tulis keadaan sesi 5** di `PROGRESS.md`: apa yang selesai,
  apa yang belum, dan daftar tujuh video Limit yang masih menunggu beserta
  urutan prioritasnya.
- [ ] **Langkah 2: Commit**

```bash
git add PROGRESS.md CLAUDE.md
git commit -m "Catatan sesi 5: topik Limit lengkap kecuali videonya"
```

---

## Tugas 15 sampai 21: Tujuh video Limit

Satu tugas per video, dikerjakan **urut prioritas** dari spec:
tahap 4, tahap 1, tahap 8, tahap 2, tahap 9, tahap 6, tahap 7.

Tiap tugas mengikuti **sepuluh langkah resep** di `PROGRESS.md` apa adanya,
termasuk gerbang mutu tiga lapis yang wajib:

1. `cek_kode.py --dalam` sebelum render
2. Render uji `-ql`, lalu **buka lembar kontaknya dan nilai tiap frame**
3. Render final `-qh`, lalu lembar kontak sekali lagi

**Jangan pernah menjalankan dua render Manim bersamaan.** Pada 31 Agustus hal itu
memutus render final secara diam-diam tanpa satu pun galat di log.

Ketujuhnya baru dimulai setelah Tugas 14, supaya situsnya sudah utuh dan bisa
ditunjukkan lebih dulu.
