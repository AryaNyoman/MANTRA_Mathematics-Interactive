# Laporan MATRA-DESAIN-UI-UX

Terakhir: 2 September 2026

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

## Sedang dikerjakan

- Audit HP lanjutan: lebar 414 piksel, tab Kuis, korsel beranda, halaman
  `/tentang`, dan semua target sentuh yang lebih kecil dari 44 piksel.
- Audit `/web-interface-guidelines`: fokus keyboard, kontras, aksesibilitas.
- Regresi desktop 768, 1920 dan zoom 80/90/100/110/125 persen.

## Butuh MASTER

1. **`web/public/anim/trigonometri.webm` (0,54 MB) berkas yatim**, tidak
   dipakai kode mana pun. Sudah tercatat di `PROGRESS.md` sebagai aman
   dihapus, tapi `web/public/` bukan wilayah sesi ini.
2. **Teks di dalam widget Limit mengecil di HP.** SVG-nya diskalakan ke
   lebar sekitar 311 piksel sehingga label seperti "s(t) = 5t², jarak
   kelapa jatuh setelah t detik" jadi kecil sekali. Perbaikannya ada di
   `components/widget/limit/`, yang menurut tabel kepemilikan milik sesi
   topik, bukan sesi ini. Butuh keputusan siapa yang mengerjakan.

## Butuh keputusan ARYA

**Tab "Latihan" dan "Kuis" ada di ujung kanan deretan tab.** Sekarang
sudah terjangkau, tapi siswa harus menggeser strip tab melewati sepuluh
tombol MATERI dulu (sekitar 550 piksel) sebelum melihatnya. Tiga pilihan:

1. Gulirkan otomatis tab yang sedang aktif ke dalam pandangan.
2. Pisahkan "Latihan" dan "Kuis" ke baris sendiri di bawah deretan materi,
   jadi keduanya selalu terlihat.
3. Biarkan, cukup digeser sendiri.

Belum dikerjakan, menunggu jawaban.
