# Rancangan: MATRA rapi di HP dan di laptop

Sesi: MATRA-DESAIN-UI-UX (cabang `sesi/ui-ux`)
Tanggal: 1 September 2026
Status: menunggu persetujuan ARYA

## 1. Tujuan

Membuat gaya "Studio Teknis" yang sudah ada bekerja di layar sempit, tanpa
mengubah wataknya. Ini sesi kualitas tampilan, bukan sesi redesign. Warna,
font, urutan blok, dan keputusan perilaku yang sudah diambil ARYA tidak
disentuh.

## 2. Temuan terukur (bukan dugaan)

Semua angka di bawah diambil dari peramban sungguhan lewat `playwright-cli`
pada lebar layar 375 piksel, tanggal 1 September 2026. Potretnya sudah
dibuka dan dinilai dengan mata, bukan cuma dibuat.

| # | Temuan | Bukti angka | Halaman |
|---|---|---|---|
| T1 | Seluruh situs bisa digeser ke samping | `documentElement.scrollWidth` 428 lawan lebar layar 375 | semua |
| T2 | Penyebab T1: navigasi kelebaran | `.nav` butuh 428 piksel, tersedia 375 | semua |
| T3 | Logo Matra tidak kelihatan | `.merk-ikon` lebarnya jadi **0 piksel** (gambar aslinya 48 piksel dan berhasil dimuat) | semua |
| T4 | Lencana "Matematika SMA" terpotong | terlihat di potret, sudah tercatat di `PROGRESS.md` | semua |
| T5 | Halaman topik: kolom kiri hilang, kolom kanan meluber | `.kolom` kiri lebarnya **0 piksel**, `.kanan` 384 piksel mulai di x=48, jadi berakhir di 432 | `/topik/*` |
| T6 | Akibat T5: widget menimpa teks | terlihat di potret: tulisan "SELANG DETIK WAKTU", "angkanya merapat ke 20", dan lencana "01" menembus ke atas paragraf | `/topik/*` |
| T7 | Akibat T5: tiap paragraf kehilangan kata terakhirnya | terlihat di potret: "Angka", "memikirkannya", "Hitungan" terpenggal | `/topik/*` |

Akar masalahnya satu kalimat: **`app/globals.css:194` mengunci halaman topik
jadi dua kolom dengan kolom kanan minimal 384 piksel, dan di seluruh berkas
1061 baris itu tidak ada satu pun aturan khusus layar sempit untuk tata letak
utama.** Situs ini memang belum pernah dirancang untuk HP.

Kabar baiknya: `/` (beranda) dan `/latihan` di 375 piksel sebenarnya sudah
rapi. Kerusakan berat terpusat di halaman topik. Jadi pekerjaannya dalam,
bukan lebar.

### Penyebab T3 yang sering salah ditebak

Logo hilang bukan karena berkasnya tidak ada dan bukan karena layar sempit.
`.merk-ikon` diberi `width: auto`, dan karena nav memakai flex yang
kelebaran, peramban memerasnya sampai lebar nol. Perbaikannya satu baris,
dan berlaku di semua ukuran layar, bukan cuma HP.

## 3. Keputusan ARYA (1 September 2026)

1. **Halaman topik di HP: ditumpuk dan boleh digulir.** Visual di atas
   dengan tinggi tetap, penjelasan mengalir di bawahnya. Aturan "satu layar
   tanpa gulir" tetap berlaku penuh di laptop.
2. **Navigasi HP: tombol hamburger.** Menu disembunyikan di balik tombol
   tiga garis.
3. **Audit HP dulu**, desktop dan tingkat zoom diperiksa belakangan sebagai
   uji regresi.

## 4. Rancangan

### 4.1 Satu titik henti, bukan banyak

Satu batas saja: **860 piksel**. Angkanya bukan karangan, dihitung dari
kebutuhan tata letak lama: kolom kanan 384 + kolom kiri layak pakai 400 +
jarak 22 + tepi 52 = 858 piksel. Di bawah itu dua kolom memang tidak muat.

- Di atas 860 piksel: **tidak ada yang berubah sama sekali.**
- Di bawah 860 piksel: aturan tumpuk berlaku. Ini juga berarti tablet 768
  piksel ikut mendapat tata letak tumpuk, dan itu memang lebih enak dibaca.

Semua aturan baru ditulis sebagai blok `@media (max-width: 860px)` **baru di
akhir `globals.css`**, sesedikit mungkin mengubah baris lama. Alasannya
bukan kerapian: empat sesi lain sedang menyunting berkas yang sama, dan
menambah di akhir jauh lebih jarang bentrok daripada mengubah di tengah.

### 4.2 Halaman topik di layar sempit

```
HP (di bawah 860px)              Laptop (860px ke atas, TIDAK BERUBAH)
+---------------------+          +-------------+-------------+
| [tab 01 02 03 04]   |          | tab         | Materi 12   |
| +-----------------+ |          | +---------+ | Judul       |
| |                 | |          | | widget  | | paragraf    |
| |     widget      | |          | |         | | paragraf    |
| |  tinggi tetap   | |          | +---------+ | ...         |
| +-----------------+ |          | [Tonton]    | RINGKASAN   |
| [Tonton] [Coba]     |          +-------------+-------------+
+---------------------+
| Materi 12           |
| Judul               |
| paragraf ...        |
| Sering keliru       |
| RINGKASAN           |
| YouTube             |
|      v digulir      |
```

Aturan teknisnya:

| Yang diubah | Dari | Jadi (hanya di bawah 860px) |
|---|---|---|
| `.panggung` | grid 2 kolom, tinggi dikunci 34-54rem | satu kolom, tinggi mengikuti isi |
| `.panggung` | `flex: 1 1 0` | `flex: none`, halaman boleh memanjang |
| `.kolom` kiri | mengisi tinggi panggung | tinggi tetap `min(58vh, 460px)`, minimal 320px |
| `.kanan` | `overflow-y: auto` (kotak bergulir sendiri) | `overflow: visible`, ikut gulir halaman |
| `.kanan > *` | `max-width: 46rem` | tanpa batas, ikut lebar layar |
| tepi `.panggung` | `padding: 20px 26px` | `padding: 14px 16px` |

**Perjanjian kotak widget TIDAK berubah.** `.layar` tetap berarti "isi ruang
yang diberikan kepadamu, jangan tentukan tinggimu sendiri". Yang berubah cuma
tinggi kotak induknya. Artinya widget buatan empat sesi lain ikut rapi tanpa
mereka menyentuh satu baris pun.

**Kotak visual sengaja TIDAK dibuat menempel** di atas saat teks digulir.
Menempel memang membuat gambar tetap terlihat sambil membaca, tapi memakan
setengah layar HP terus-menerus sehingga teksnya jadi sempit. Kalau setelah
melihat hasilnya ARYA ingin menempel, itu tambahan kecil di kemudian hari.

### 4.3 Navigasi

Tiga perbaikan, dua di antaranya berlaku di semua ukuran layar:

1. **Logo tidak lagi diperas** (semua ukuran): `.merk` diberi `flex: none`
   dan gambarnya diberi lebar tegas. Ini memperbaiki T3.
2. **Di bawah 860 piksel**: keempat tautan dan lencana pindah ke balik
   tombol hamburger. Yang tersisa di baris nav cuma logo di kiri dan tombol
   di kanan, jadi nav muat dengan lega.
3. **Panel menu** turun tepat di bawah nav: latar kartu, garis pemisah,
   tiap tautan setinggi minimal 44 piksel supaya nyaman ditekan jempol.
   Lencana nama topik ikut masuk ke dalam panel, jadi tidak hilang.

Perilaku panel: tertutup saat halaman dibuka, tertutup lagi setelah sebuah
tautan ditekan, dan tertutup saat tombol Esc ditekan. Tombolnya memakai
`aria-expanded` dan `aria-controls`, dan cincin fokusnya terlihat.

Konsekuensi yang perlu diketahui: `components/Nav.tsx` harus menjadi
komponen klien (`'use client'`) karena sekarang menyimpan keadaan buka atau
tutup. Dampaknya sedikit tambahan JavaScript di enam halaman. Tanpa pustaka
baru.

### 4.4 Komponen sempit lain

Diperiksa dan dirapikan setelah kerangka beres: tabel kuis, arena latihan,
korsel beranda, deret tab materi, dan semua tombol yang lebih kecil dari 44
piksel. Rinciannya diisi dari hasil audit tahap 1, bukan ditebak sekarang.

## 5. Tahap kerja

| Tahap | Isi | Selesai artinya |
|---|---|---|
| 0 | Persiapan | ✅ sudah: `npm install`, dev server port 3005, playwright-cli terbukti jalan |
| 1 | **Audit HP** 375 dan 414 piksel, 5 halaman, semua tab halaman topik | Daftar temuan bernomor di laporan, tiap temuan punya potret atau angka |
| 2 | **Navigasi**: logo + hamburger | Tidak ada gulir mendatar di halaman mana pun |
| 3 | **Halaman topik menumpuk** di bawah 860 piksel | Tidak ada teks terpotong, tidak ada tindihan |
| 4 | **Komponen sempit** dari temuan tahap 1 | Semua target sentuh minimal 44 piksel |
| 5 | **Audit `/web-interface-guidelines`** dan aksesibilitas dasar | Temuan diperbaiki atau dicatat alasannya |
| 6 | **Regresi desktop**: 768, 1366, 1920 piksel dan zoom 80/90/100/110/125 persen | Tampilan laptop identik dengan sebelum disentuh; `tsc` dan `build` lolos |

Tiap perbaikan jadi satu commit sendiri, pesan bahasa Indonesia, supaya
MASTER bisa membatalkan satu perbaikan saja kalau ada yang salah.

## 6. Cara membuktikan, bukan mengaku

Tiap perbaikan diverifikasi dua lapis:

1. **Uji angka yang tidak bisa berbohong.** Di tiap halaman dan tiap lebar,
   `document.documentElement.scrollWidth` harus sama dengan `clientWidth`.
   Kalau lebih besar, berarti masih ada yang meluber, titik.
2. **Potret sebelum dan sesudah, DIBUKA dan dinilai mata.** Aturan proyek
   ini lahir karena tujuh cacat video pernah lolos gara-gara cuma log yang
   dibaca. Aturan yang sama berlaku untuk tampilan.

Sebelum lapor selesai: `rtk proxy "npx tsc --noEmit"` dan
`rtk proxy "npm run build"` di `web/`, keduanya harus lolos.

## 7. Risiko dan penangkalnya

| Risiko | Penangkal |
|---|---|
| Bentrok gabung dengan empat sesi lain di `globals.css` | Semua aturan baru ditulis sebagai blok `@media` baru di akhir berkas. Baris lama diubah seminimal mungkin |
| Tampilan laptop ikut rusak | Semua perubahan tata letak dikurung dalam `@media (max-width: 860px)`. Dibuktikan di tahap 6, bukan diasumsikan |
| Widget sesi lain jadi salah ukuran | Perjanjian `.layar` tidak diubah. Yang berubah cuma tinggi kotak induk di HP |
| Bug zoom lama kambuh | Zoom 80 sampai 125 persen masuk daftar uji tahap 6. `flex: 1 1 0` di laptop tidak disentuh |

## 8. Yang sengaja TIDAK dikerjakan

- Mengubah warna, font, atau gaya visual. Terkunci "Studio Teknis".
- Mengubah urutan blok materi, posisi RINGKASAN, atau perilaku tombol video
  yang hilang setelah 2 detik. Itu keputusan ARYA.
- Menyentuh widget milik sesi topik lain.
- Membuat kotak visual menempel saat digulir. Ditunda sampai ARYA melihat
  hasil tumpukan biasa.
- Menghapus `web/public/anim/trigonometri.webm` yang yatim. Itu wilayah
  MASTER, akan ditulis di bagian "Butuh MASTER".

## 9. Butuh keputusan ARYA nanti

Tidak ada yang menghalangi sekarang. Satu hal yang mungkin muncul setelah
tahap 3: kalau tumpukan di HP terasa terlalu panjang untuk digulir, pilihan
menempelkan kotak visual akan diajukan lagi dengan potret pembanding.
