# Sistem kendali widget bersama

Tanggal: 5 September 2026. Pemilik keputusan: ARYA. Disetujui lewat tanya-jawab,
ARYA memilih "terima jadi", jadi berkas ini adalah catatan keputusan, bukan
bahan tinjauan.

## Masalah yang diselesaikan

Diukur 5 Sep 2026 pada 92 widget di 7 topik:

- **Nol** kolom ketik angka di seluruh situs. Tidak ada widget yang bisa diisi
  dengan mengetik.
- Hanya **17** widget bisa diseret di layar. Vektor hampir seluruhnya seret saja
  (1 penggeser untuk 15 widget), jadi siswa tidak pernah menulis vektor.
- Label kendali tidak menjelaskan. Penggeser parabola berlabel `a`, `h`, `k`
  saja.
- Angka sumbu tidak seragam: lima komponen bidang menghitung sendiri-sendiri,
  Transformasi melompat dari 0 ke 5 pada lebar 15,68 satuan.
- Gambar dan kendalinya dua kartu terpisah; pada widget berkendali banyak,
  gambarnya keluar layar saat penggeser digeser.
- Materi Trigonometri masih menyebut "tahap" (8+ kalimat), padahal istilahnya
  sudah "Materi".

## Keputusan

### 1. Batas minimum tiap widget (kontrak)

Tiap besaran yang bisa diubah siswa WAJIB punya:

1. **Nama dan arti** dalam satu baris: "h · geser puncak ke kiri-kanan".
2. **Angka yang tampil** dan berubah seketika.
3. **Kolom ketik.** Nilai di luar batas DIPOTONG ke batas terdekat, bukan ditolak.
4. **Penggeser** (besaran kontinu) atau **tombol segmen** (pilihan).
5. **Seret di layar** HANYA bila besarannya titik, sudut, atau panjang. Seretan
   dan penggeser mengubah keadaan yang sama.

Ditambah satu **kalimat petunjuk** per widget berbentuk "geser X, lalu
perhatikan Y".

### 2. Notasi vektor saat diketik

Dua kolom `x` dan `y`. Di sampingnya pratinjau hidup bentuk kolom
(x di atas y) dan bentuk `xi + yj`. Alasan: paling mudah diketik di HP, dan
bentuk kolom yang dipakai Buku Kurikulum Merdeka.

### 3. Tata letak: perubahan terlihat langsung

1. Gambar dan kendali jadi SATU kartu.
2. Gambar **menempel di atas** saat kendali digulir (`position: sticky`), jadi
   selalu terlihat berapa pun jumlah kendalinya. Tinggi gambar dibatasi dalam
   rem, bukan vh (aturan zoom proyek).
3. Bagian gambar yang **sedang diubah menyala**: keadaan bersama
   `sedangDiubah: string | null` diisi saat kendali dipegang (pointer down atau
   fokus) dan dikosongkan saat dilepas; widget yang menerimanya menebalkan
   elemen terkait dan menampilkan angkanya di gambar. Widget yang belum
   mendukungnya cukup mengabaikan prop itu.

### 4. Angka sumbu

Satu fungsi bersama `petakSumbu(min, max, lebarPiksel)` untuk kelima bidang.
Calon langkah 0,5 · 1 · 2 · 5 · 10 · 20; dipilih langkah TERKECIL yang menjaga
jarak antarlabel ≥ 34 piksel. Akibat yang dijamin: lebar ≤ 12 satuan selalu
berlabel tiap bilangan bulat; lompatan 0 ke 5 mustahil di bawah 20 satuan.
Garis kisi halus di setengah langkah.

### 5. Komponen bersama, di `web/components/kendali/`

| Komponen | Isi | Prop utama |
|---|---|---|
| `Angka` | label nama+arti, angka, kolom ketik, penggeser, sinkron dua arah | `nama, arti, nilai, onUbah, min, max, langkah, satuan, kunci` |
| `Koordinat` | dua `Angka` (x, y) + pratinjau notasi vektor | `nama, nilai:{x,y}, onUbah, batas, kunci` |
| `Pilihan` | tombol segmen | `nama, arti, pilihan[], nilai, onPilih` |
| `Petunjuk` | kalimat "geser X, perhatikan Y" | `children` |
| `KartuAlat` | pembungkus satu kartu: gambar lengket di atas, kendali di bawah | `gambar, children` |

`kunci` adalah nama besaran yang dilaporkan ke `sedangDiubah`.

Panggung tetap pemegang keadaan (arsitektur yang ada), supaya tabel angka hidup
di kolom Alat tetap bisa membaca keadaan yang sama.

### 6. Urutan penerapan

Komponen bersama + `petakSumbu` → Vektor (contoh) → Transformasi Geometri →
Grafik Fungsi → Limit → Ruang 3D → Statistika → Trigonometri (+ ganti kata
"tahap" jadi "Materi" di isinya).

Tiap topik satu setoran: panggung ditulis ulang, tiap widget diuji di 1280 dan
390 piksel DUA ARAH (ketik mengubah gambar, seret mengubah angka), commit,
deploy ke `mantra-rancangan-v2`.

## Yang sengaja TIDAK dilakukan

- Memindahkan kendali ke dalam widget (memutus tabel angka hidup).
- Memaksa seretan di layar pada besaran yang bukan benda di layar.
- Mengubah warna di dalam gambar widget (aturan proyek).

## Cara menguji tiap widget

1. Ketik angka di kolom, gambar berubah. Ketik di luar batas, angka terpotong.
2. Geser penggeser, angka dan gambar berubah bersamaan.
3. Bila bisa diseret: seret di layar, angka di kolom ikut berubah.
4. Pegang penggeser: bagian gambar terkait menyala; lepas: padam.
5. Di 390 piksel: label sumbu tidak bertabrakan, gambar tetap terlihat saat
   penggeser terbawah digeser.
