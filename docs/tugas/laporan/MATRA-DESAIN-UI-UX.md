# Laporan MATRA-DESAIN-UI-UX

Terakhir: 2 September 2026 (audit HP selesai)

Cabang: `sesi/ui-ux`. Dev server port 3005. Semua bukti diambil dari
peramban sungguhan lewat `playwright-cli`, dan tiap potret dibuka lalu
dinilai dengan mata, bukan cuma dibuat.

## Selesai

### Gerbang rancangan (commit `dd4c401`)

Spec di `docs/superpowers/specs/2026-09-01-ui-ux-responsif-design.md`,
sudah disetujui ARYA. Keputusan yang diambil: halaman topik ditumpuk dan
boleh digulir di HP, navigasi jadi tombol tiga garis, audit HP dulu lalu
desktop sebagai regresi. Satu titik henti saja: 860 piksel.

### 1. Tindihan materi dan soal hilang (commit `4237621`)

Kerusakan terparah dan yang ARYA minta didahulukan.

| | Sebelum (375 piksel) | Sesudah |
|---|---|---|
| Lebar kolom kiri | **0 piksel**, widget terlempar keluar dan menimpa paragraf | 343 piksel |
| Lebar kolom kanan | 384 piksel mulai di x=48, berakhir di 432 | 343 piksel |
| Tombol tab "Latihan" | di **x=937**, di luar layar, strip tabnya lebar 0 sehingga tidak bisa digeser | terjangkau |
| Paragraf | tiap paragraf kehilangan kata terakhirnya | utuh |

Temuan yang paling perlu dicatat: di 375 piksel siswa **sama sekali tidak
bisa membuka Latihan maupun Kuis**. Itu bukan cacat kosmetik, itu fitur
yang mati dan tidak pernah ketahuan karena situs belum pernah dibuka
selebar HP.

### 2. Navigasi dan logo (commit `e1c40cb`)

- **Logo Matra hilang** bukan karena berkasnya tidak ada. `.merk-ikon`
  diberi `width: auto`, dan saat isi nav kelebaran peramban memerasnya
  sampai lebar **0 piksel**. `flex: none` menghentikannya, dan perbaikan
  ini berlaku di semua ukuran layar, bukan cuma HP.
- Di bawah 860 piksel keempat tautan dan lencana nama topik pindah ke
  balik tombol 44 piksel. Tiap tautan setinggi 48 piksel, panel menutup
  sendiri saat tautan ditekan dan saat Esc ditekan, memakai
  `aria-expanded` dan `aria-controls`.
- `components/Nav.tsx` kini komponen klien karena menyimpan keadaan buka
  atau tutup. Tanpa pustaka tambahan.

### 3. Halaman bank soal (commit `2a61cb9`)

`/latihan/limit` dan `/latihan/trigonometri` meluber sampai **926 piksel**
di layar 375. Sebabnya `main.beranda` adalah anak kolom flex yang menolak
menyusut di bawah lebar isinya, jadi kisi pilih tingkat menjajarkan empat
kartu sekaligus. Diperbaiki dengan `width: 100%` dan `min-width: 0`.

### Hasil uji: gulir mendatar hilang di seluruh situs

`document.documentElement.scrollWidth` dibanding lebar layar, pada 375 piksel:

| Halaman | Sebelum | Sesudah |
|---|---|---|
| `/` | 428 | **375** |
| `/latihan` | 428 | **375** |
| `/tentang` | 428 | **375** |
| `/latihan/limit` | 926 | **375** |
| `/latihan/trigonometri` | 926 | **375** |
| `/topik/trigonometri` | 432 | **375** |
| `/topik/limit` | 432 | **375** |

### Bukti tampilan laptop tidak berubah

Di 1366 piksel, halaman topik: tanpa gulir mendatar (1366 = 1366), tinggi
halaman tetap 768 alias pas satu layar, kolom 788 dan 504. Tautan nav
tetap di x 86, 166, 226, 298 dan lencana tetap berakhir di 1340, persis
seperti sebelum disentuh. Tombol tiga garis tersembunyi.

`rtk proxy "npx tsc --noEmit"` dan `rtk proxy "npm run build"` lolos.

### 4. Tab Latihan dan Kuis turun ke baris sendiri (commit `ca9e285`)

Keputusan ARYA, 2 Sep 2026. Di 375 piksel tombol Latihan duduk sekitar 550
piksel di sebelah kanan, jadi siswa harus menggeser melewati sepuluh tombol
MATERI sebelum tahu Latihan dan Kuis ada. Sekarang keduanya di baris bawah,
lebar dibagi rata, selalu terlihat. Semua tombol tab jadi 44 piksel di HP,
sebelumnya 32.

### 5. Target sentuh minimal 44 piksel (commit `64015dc`)

Diukur dulu, baru diperbaiki. Yang ditemukan kurang dari 44: panah korsel
32x32, titik korsel 8x8, penggeser widget setinggi 16, tautan kanal YouTube
setinggi 22, tombol WhatsApp 35, tombol utama 42, logo nav 36x40.

Titik korsel tetap TERLIHAT sebesar 8 piksel, yang dibesarkan hanya daerah
tangkapnya jadi 28x44. Melebarkannya sampai 44 penuh akan merenggangkan
titiknya sampai terlihat berjauhan. 28x44 sudah 19 kali lebih luas daripada
8x8 yang lama.

Hasil: di lima halaman yang diuji tidak ada lagi sasaran di bawah 44 piksel,
selain kelima titik korsel tadi.

### 6. Judul halaman mengecil di HP (commit `e84d29d`)

`.beranda h1` dikunci 48 piksel, sehingga judul halaman Tentang memakan
empat baris penuh sebelum satu kalimat isi pun terbaca. Kini 32 piksel di HP
dan tetap 48 di laptop. Hurufnya tidak diubah.

### 7. Empat temuan audit `/web-interface-guidelines` (commit `5484909`)

| Temuan | Akibat sebelum diperbaiki |
|---|---|
| `PemutarVideo` tanpa `playsInline` | Safari di iPhone merebut video ke layar penuh begitu ditekan, siswa kehilangan penjelasan di sebelahnya |
| Setelan sistem "kurangi gerak" tidak dipatuhi sama sekali | Korsel berputar sendiri terus bagi orang yang justru menyalakan setelan itu karena gerakan berulang membuat pusing |
| Tidak ada `touch-action: manipulation` | Peramban HP menunggu 300 milidetik tiap ketukan, seluruh situs terasa lambat menanggapi jempol |
| Tidak ada `meta theme-color` | Bilah atas peramban HP tidak menyambung dengan warna situs |

Perilaku "kurangi gerak" dibuktikan dengan emulasi peramban: `autoplay`
false, `loop` false, `controls` true (jadi tetap bisa ditonton manual), dan
durasi transisi 0,00001 detik.

Perbesaran cubit tetap TIDAK dimatikan.

### Yang LOLOS audit tanpa perbaikan

Berkas yang diperiksa punya: `aria-label` di semua tombol tanpa teks,
semua gambar sudah bertinggi dan berlebar tegas, urutan judul h1 lalu h2
lalu h3 sudah benar, video sudah bertakarir `<track kind="subtitles">`,
tidak ada `transition: all`, tidak ada `outline: none` tanpa pengganti,
tidak ada `user-scalable=no`, dan cincin fokus sudah ada di
`app/globals.css:126`.

### Uji regresi: tujuh ukuran layar dan lima tingkat zoom

Halaman topik di `/topik/limit`, semua tanpa gulir mendatar dan tab
Latihan tetap terlihat:

| Ukuran | Setara | Gulir mendatar | Gulir tegak |
|---|---|---|---|
| 1708x960 | zoom 80% | tidak | tidak |
| 1518x853 | zoom 90% | tidak | tidak |
| 1366x768 | zoom 100% | tidak | tidak |
| 1242x698 | zoom 110% | tidak | tidak |
| 1093x614 | zoom 125% | tidak | tidak |
| 1920x1080 | layar besar | tidak | tidak |
| 768x1024 | tablet tegak | tidak | ya, memang begitu rancangannya |

Bug zoom lama tidak kambuh. Ukuran font peramban dinaikkan ke 20 piksel
juga masih pas satu layar; di 24 piksel halaman mulai bisa digulir tegak,
dan itu memang jalan keluar yang benar, tidak ada yang terpotong.

Di 414 piksel ketujuh halaman bersih: tanpa gulir mendatar, tanpa sasaran
di bawah 44 piksel.

## Sedang dikerjakan

Tidak ada. Menunggu arahan berikutnya.

## Butuh MASTER

1. **`web/public/anim/trigonometri.webm` (0,54 MB) berkas yatim**, tidak
   dipakai kode mana pun. Sudah tercatat di `PROGRESS.md` sebagai aman
   dihapus, tapi `web/public/` bukan wilayah sesi ini.
2. **Teks di dalam widget Limit mengecil di HP.** SVG-nya diskalakan ke
   lebar sekitar 311 piksel sehingga label seperti "s(t) = 5t², jarak
   kelapa jatuh setelah t detik" jadi kecil sekali. Perbaikannya ada di
   `components/widget/limit/`, yang menurut tabel kepemilikan milik sesi
   topik, bukan sesi ini. **ARYA sudah memutuskan (2 Sep 2026): diserahkan
   ke MASTER.** Sesi ini tidak menyentuhnya.

## Butuh keputusan ARYA

Tidak ada yang menghalangi. Dua hal yang sengaja TIDAK dikerjakan dan
alasannya:

1. **Tautan lompat ke isi utama** (skip link) belum ada. Gunanya untuk
   pengguna papan ketik supaya tidak perlu melewati navigasi tiap pindah
   halaman. Di situs ini navigasinya cuma empat tautan, jadi untungnya
   kecil, sementara memasangnya berarti menyentuh enam berkas halaman.
   Ditunda, bukan dilupakan.
2. **Korsel halaman depan berputar sendiri tanpa tombol jeda.** Panduan
   menyarankan tombol jeda untuk gerakan berulang di atas 5 detik. Slide
   pertama sengaja dibuat berjalan sendiri oleh ARYA supaya terasa seperti
   gambar hidup, jadi keputusannya tidak diubah sepihak. Bagian yang benar
   benar penting sudah ditangani: yang menyalakan "kurangi gerak" di
   sistemnya kini mendapat video diam dengan tombol putar.
