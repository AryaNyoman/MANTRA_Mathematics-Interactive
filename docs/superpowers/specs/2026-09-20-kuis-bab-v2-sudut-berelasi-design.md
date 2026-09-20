# Kuis bab v2 (penilaian, satu paket, pembahasan di akhir) dan materi Sudut Berelasi

Tanggal: 20 September 2026. Diminta ARYA sesudah melihat tiga soal kuis
Trigonometri (k48, k50, k59, semuanya "sangat sulit" dan tidak diajarkan di
materi). Keputusan ARYA: 10 soal per paket; materi baru Sudut Berelasi
LENGKAP (bacaan, widget, video); soal k48, k50, k59 tetap di kuis bab
sesudah materinya ada; soal bergambar dibahas dengan gambar; kuis adalah
penilaian: jawab semua dulu, pembahasan di akhir; jawaban salah diberi tombol
"Baca materi" yang langsung membuka materinya; Asisten Tanya juga menautkan
materi dengan nama materinya.

## 1. Tujuan

1. Kuis bab hanya menguji yang diajarkan di bab itu. Tiap soal kuis bab
   ditandai materi asalnya (`materi: slug`); soal bank yang konsepnya di luar
   materi tetap hidup di menu Latihan, tidak di kuis bab.
2. Satu paket 10 soal per bab, urutan soal dan urutan pilihan diacak tiap
   kali kuis dibuka (pengacak berbenih yang sama dengan Latihan).
3. Alur penilaian: siswa menjawab 10 soal (boleh mundur dan mengganti
   jawaban lewat peta soal), menekan "Kumpulkan", lalu halaman hasil
   menampilkan skor dan SEMUA pembahasan: langkah demi langkah dengan gambar
   bantu tiap langkah (data `langkah` yang sudah ada), jebakan pengecoh, dan
   untuk jawaban salah tombol "Baca Materi 05 · Lingkaran satuan" yang
   membuka materinya.
4. Materi baru Trigonometri 11 "Sudut berelasi: berputar melewati kuadran"
   (sub-bab B, sesudah Sudut istimewa): sin dan cos untuk θ + 90°, 180° − θ,
   180° + θ, 360° − θ, dibaca dari lingkaran satuan, bukan dihafal; widget
   pemutar titik; video v3.1.
5. Asisten Tanya: tautan `[[bab:slug]]` ditampilkan sebagai "Materi 05 ·
   Lingkaran satuan", bukan "lihat materi".

## 2. Yang sudah ada (pijakan)

- `content/<bab>/kuis.ts` `KUIS: SoalKuis[]` 60 soal per bab (15 per
  tingkat) dengan `langkah` (teks atau `{teks, gambar}`), `gambar` soal,
  `jebakan`, `alasan`. Pembahasan bergambar sudah dipakai menu Latihan
  (`components/latihan/ArenaLatihan.tsx`, panel `.kartu-bahas`).
- `components/topik/Kuis.tsx`: 8 soal acak dari 60 (`lib/soal-acak.ts`,
  anti-ulang), pilihan TIDAK diacak, pembahasan hanya `alasan` satu kalimat
  per soal, skor terbaik di `matra:kuis:<bab>`.
- `lib/acak-pilihan.ts`: `bacaBenih`, `urutanPilihan(idSoal, benih, jumlah)`,
  `hurufTampil`, `petakanHuruf` (mengganti huruf jawaban di teks pembahasan
  mengikuti urutan acak).
- `lib/kemajuan.ts`: kuis terbuka sesudah semua materi dibuka
  (`kuisTerbuka(k, TAHAP.length)`); menambah materi berarti siswa lama harus
  membuka materi baru itu dulu (diterima).
- Trigonometri: sub-bab B `[5, 6, 7]`, widget `lingkaran-satuan`
  (`components/widget/LingkaranSatuan.tsx`, titik bisa diseret), video per
  materi `tahapN-slug.mp4` di R2. Standar video v3.1 di
  `docs/tugas/STANDAR-VIDEO-V3.md`.

## 3. Rancangan

### 3.1 Data kuis bab

Di tiap `content/<bab>/kuis.ts` ditambah:

```ts
/** Paket kuis bab: 10 soal yang konsepnya diajarkan materi bab ini, dengan materi asalnya. */
export const KUIS_BAB: { id: string; materi: string }[] = [ { id: 'k03', materi: 'lingkaran-satuan' }, ... ]
```

`components/topik/jenis.ts` `IsiTopik` bertambah `kuisBab`. Pemeriksa
`alat/cek_kuis_bab.mjs`: tiap bab tepat 10 butir, id ada di `KUIS`, `materi`
ada di `TAHAP` (dan `siap`), tidak ada id ganda, dan tiap sub-bab terwakili
minimal satu soal. Kurasi dilakukan dengan membaca soal dan bacaan materi;
patokannya: soal boleh masuk hanya kalau setiap konsep yang dibutuhkan
jawabannya tertulis di bacaan (kalimat kunci, contoh, atau poin) materi bab
itu. Trigonometri memuat k48, k50, k59 dengan `materi: 'sudut-berelasi'`.

### 3.2 Alur kuis (Kuis.tsx ditulis ulang)

- Soal: 10 butir `KUIS_BAB` dalam urutan acak (`kocok` dari soal-acak.ts,
  di peramban saja); pilihan tiap soal diacak `urutanPilihan(id, benih, 5)`.
- Layar jawab: soal ke-i, gambar soal, lima pilihan (huruf tampil A sampai
  E mengikuti urutan acak), peta soal 1 sampai 10 (terjawab atau belum),
  tombol Sebelumnya, Berikutnya, dan "Kumpulkan" (aktif sesudah semua
  terjawab; kalau ditekan saat belum lengkap, jendela konfirmasi "n soal
  belum dijawab, kumpulkan sekarang?"). Jawaban boleh diganti sebelum
  dikumpulkan. Tidak ada umpan balik benar-salah selama menjawab.
- Layar hasil: skor besar (angka menghitung lewat `useHitung`), kalimat
  penilaian, lalu daftar 10 soal: pertanyaan, gambar soal, pilihan siswa dan
  jawaban benar (huruf tampil), pembahasan langkah bergambar (komponen
  bersama `components/latihan/Pembahasan.tsx` yang diambil dari
  ArenaLatihan supaya satu perender untuk Latihan dan Kuis), jebakan, dan
  pada soal salah tombol `pil-garis` "Baca Materi 05 · Lingkaran satuan"
  (`pilihLayar` ke materi itu lewat `?materi=slug`, tanpa memuat ulang
  halaman). Tombol "Ulangi" mengocok ulang paket yang sama.
- Skor terbaik tetap `matra:kuis:<bab>` (angka benar dari 10). Skor sesi
  ini juga disimpan `matra:kuis:<bab>:terakhir` sebagai JSON `{ tanggal,
  benar, salah: string[] }` untuk keterangan kartu kuis dan (kelak) mode
  guru. `lib/soal-acak.ts` (`ambilSoal`, anti-ulang) tidak dipakai kuis lagi;
  dibiarkan untuk Latihan bila masih dirujuk, kalau tidak dihapus.

### 3.3 Materi Trigonometri 11: Sudut berelasi

- `content/trigonometri/tahap.ts`: entri baru `no: 11`, `slug:
  'sudut-berelasi'`, judul "Sudut berelasi: berputar melewati kuadran",
  pertanyaan pembuka "Kalau titiknya diputar 90°, ke mana sin dan cos-nya
  pergi?", `labelPendek` "Sudut berelasi", `widget: 'sudut-berelasi'`,
  `video: { berkas: 'tahap11-sudut-berelasi.mp4', poster: ... }`, `siap:
  true` sesudah bacaan dan widget selesai (video menyusul; sebelum ada,
  `video` tidak diisi).
- Bacaan (gaya MANTRA, pecah blok): dua titik sekutu pada lingkaran satuan;
  sesi "Diputar 90°" (P(cos θ, sin θ) menjadi (−sin θ, cos θ): tinggi lama
  jadi jarak mendatar baru dengan tanda minus, jarak mendatar lama jadi
  tinggi baru, contoh θ = 40°: (0,77; 0,64) menjadi (−0,64; 0,77)); sesi
  "Dicerminkan ke kiri: 180° − θ" (sin tetap, cos berbalik tanda); sesi
  "Dibalik ke seberang: 180° + θ" (keduanya berbalik); sesi "Dicerminkan ke
  bawah: 360° − θ atau −θ" (sin berbalik, cos tetap); kotak contoh tabel
  keempat relasi; poin "tanda mengikuti kuadran, besarnya mengikuti sudut
  acuan"; kotak coba (putar titik, baca koordinat, bandingkan dengan sudut
  acuan); sering keliru "Dikira −cos θ, padahal −sin θ: cerminan dan putaran
  itu berbeda"; ringkasan empat baris. Relasi untuk tan diturunkan dari
  sin/cos dalam satu kalimat.
- `subbab.ts`: sub-bab B nomor `[5, 6, 7, 11]` (Bagian 4). `istilah.ts`
  Trigonometri sudah memuat "kuadran" dan "sudut berelasi"; bekal dibuat
  ulang (`node alat/bekal_asisten.mjs trigonometri`).
- Widget `components/widget/SudutBerelasi.tsx`: lingkaran satuan dengan titik
  P (sudut acuan θ, kendali `Angka` 0 sampai 89) dan titik Q hasil relasi
  yang dipilih (`Pilihan`: θ + 90°, 180° − θ, 180° + θ, 360° − θ), garis
  bantu dari kedua titik ke sumbu, panel angka: sin dan cos P dan Q dengan
  tanda, plus keterangan "Q = (−sin θ, cos θ)" sesuai pilihan; titik P bisa
  diseret. Dua papan tidak perlu; satu papan 460×300 seperti
  LingkaranSatuan. Di `PanggungTrigonometri.tsx` seperti widget lain;
  `KolomAlat` mengatur tinggi.
- Video `manim/scenes/trig11_sudut_berelasi.py`, naskah v3.1
  `manim/naskah/...` mengikuti pola video Trigonometri lain (pembuka "Sudut
  berelasi, Bagian 4" plus pertanyaan, contoh angka 40°, asal rumus dari
  putaran lingkaran, bentuk umum keempat relasi, penutup menunjuk Grafik
  sinus). Narasi ElevenLabs suara Bian (kuota tersisa kira-kira 30 ribu
  huruf sampai 14 Oktober; satu video kira-kira 4 ribu huruf), timing per
  kata, gerbang `cek_pemicu_urut.py`, render 480p uji lalu 1080p60,
  `gabung_audio.py`, `versi-anim.mjs`, `unggah_anim_r2.py`, gerbang
  `cek_video.py` lembar kontak.

### 3.4 Asisten Tanya

`PanelTanya.tsx` `Jawaban`: tautan `[[bab:slug]]` diberi label dari
`ISI_TOPIK[bab].tahap` ("Materi 05 · Lingkaran satuan"); kalau slug tidak
dikenal, tautannya tidak ditampilkan (tanda dibuang), supaya model yang
mengarang slug tidak menghasilkan tautan mati.

## 4. Urutan kerja dan pemeriksaan

1. Data: `KUIS_BAB` sembilan bab (kurasi), `alat/cek_kuis_bab.mjs`, `jenis.ts`.
2. Kuis v2: `Pembahasan.tsx` bersama, `Kuis.tsx` alur penilaian dan hasil,
   CSS peta soal dan hasil, tombol Baca materi; uji Playwright 1280 dan 390
   (jawab 10, kumpulkan, hasil, tombol materi berpindah layar).
3. Materi Sudut Berelasi: bacaan, widget, registrasi, `cek_rumus_materi`,
   survei alat, bekal ulang, kuis bab trigonometri memuat k48 k50 k59.
4. Asisten Tanya label tautan.
5. Deploy dan catatan. Video (3.3) dikerjakan sesudah deploy tahap 1 sampai
   4 supaya perbaikan kuis tidak menunggu render.

## 5. Di luar cakupan

Mode guru untuk kuis, penyimpanan hasil di server, mengubah bank Latihan.
