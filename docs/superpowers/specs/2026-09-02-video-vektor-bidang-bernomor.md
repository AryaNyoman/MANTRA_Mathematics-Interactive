# Arah baru video Vektor: bidang bernomor, 3D hanya pembuka

Sesi MATRA-VEKTOR, 2 September 2026. Disetujui ARYA setelah menolak video 1 dan
video 2 versi ManimGL penuh 3D.

## Kenapa dirombak

ARYA menonton `vektor1-perahu.mp4` dan `vektor6-sambung.mp4` lalu menolaknya:
gambar 3D-nya pecah, panahnya "sembarang tidak akurat", tidak ada koordinat
tertulis, dan perahunya tidak stabil. Penilaiannya: "mending 2D aja kalau gitu,
yang penting pesan ke siswanya tersampaikan".

### Akar masalahnya bukan 3D, melainkan kamera yang dimiringkan

Supaya panah yang segaris tidak saling menutupi, kamera pandangan peta
dimiringkan 14 sampai 26 derajat. Akibatnya perspektif memendekkan satu arah
lebih banyak daripada arah lain, sehingga **segitiga 3-4-5 tidak lagi terlihat
seperti 3-4-5**. Untuk pelajaran vektor itu fatal: gambarnya membantah
hitungannya.

Ironisnya widget web topik ini punya fungsi `jendelaSeimbang` yang khusus dibuat
untuk memaksa skala x dan y sama persis, dengan alasan yang sama persis. Aturan
itu dibuang begitu pindah ke video.

Cacat kedua yang memperparah: **tidak ada satu pun angka di sumbunya**, jadi
siswa tidak bisa memverifikasi "3 ke kanan, 1 ke atas".

## Prinsip pokok

> Matematika digambar di bidang datar bernomor, kamera tegak lurus dari atas,
> tidak pernah dimiringkan lagi. 3D hanya di babak pembuka, sekadar menjawab
> "kenapa ini penting", lalu ditinggalkan.

## Susunan tiap video

| Bagian | Isi | Kamera |
|---|---|---|
| Babak 1 (8 sampai 10 detik) | Benda nyata 3D: perahu di air, orang di lapangan. | Miring dan DEKAT (`phi` 68 sampai 72, tinggi 4,4 sampai 5,0). Air yang "longgar" hanya bermasalah dari jauh; dari dekat justru bagus (lihat REVISI-ARYA-VIDEO butir 1). |
| Babak 2 | Satu gerakan panjang turun ke pandangan tegak lurus. | `kamera.dunia_ke_peta` (`reorient(0, 0, 0)`). Setelah ini kamera TIDAK PERNAH miring lagi. |
| Babak 3 sampai akhir | Bidang koordinat bernomor, skala x dan y sama. Tiap ujung panah diberi koordinatnya. | Tetap tegak lurus. Hanya boleh mendekat atau menjauh, tidak boleh memutar. |

## Panah yang segaris, tanpa memiringkan kamera

Masalah aslinya: pada Materi 01, saat arah dayung diputar ke 180 derajat, panah
dayung dan panah arus berimpit dan saling menutupi.

Penggantinya: **panah kedua digeser tegak lurus 0,15 satuan**, tetap, di semua
sudut. Pada panah sepanjang 3 sampai 4 satuan itu di bawah 5 persen. Ia tidak
mengubah arah yang terbaca dan **tidak mengubah satu pun angka**, tetapi cukup
memisahkan keduanya saat segaris. Untuk perjalanan bolak-balik, menggambar
jalur pulang sedikit bergeser memang cara yang wajar di peta.

Yang DIBUANG: mengangkat panah pada sumbu z lalu memiringkan kamera supaya
lapisannya terlihat. Itu penyebab aslinya.

## Yang ditambahkan ke perkakas bersama

Satu fungsi baru di AKHIR `manim/gl/ilustrasi.py`, sesuai aturan 1
STANDAR-ILUSTRASI-VIDEO (benda baru ditaruh di situ dengan nama unik, MASTER
yang menggabungkan):

```
bidang_bernomor(x_min, x_maks, y_min, y_maks, langkah=1.0, warna=REDUP)
```

Bidang koordinat dengan angka pada kedua sumbu dan skala terkunci sama. Empat
sesi lain langsung bisa memakainya; ini bukan tambalan khusus vektor.

## Tiga pembaruan catatan yang belum dipenuhi kedua video

1. **Narasi pembuka wajib mengumumkan materinya** (STANDAR-MENGAJAR bagian 5
   aturan 8). Kedua naskah langsung masuk cerita tanpa menyebut materi apa ini.
2. **Penanda `*kata*` untuk penebalan** (aturan 9). Kedua naskah nol penanda.
   Ditambah satu sampai dua per segmen.
3. **Keterangan dan judul tanpa alas.** Sudah dibereskan MASTER di `gl`; yang
   perlu dilakukan sesi ini hanya membuang panggilan `sinema.alas_teks` di
   babak penutup.

Ditambah satu yang terlewat sama sekali: **`buat_subtitle.py` belum pernah
dijalankan**, jadi kedua video tidak punya berkas `.vtt` untuk pemutar situs.

## Yang TIDAK berubah

Naskah isi, angka, dan alur pengajarannya tetap. Semuanya sudah lolos
`alat/cek_vektor.py` dan sudah sejalan dengan halaman (arus 4, hasilnya 5).
Yang diganti hanya cara menggambarnya, plus tambahan pembuka dan penebalan.

## Urutan kerja

1. `bidang_bernomor()` ditambahkan ke `gl/ilustrasi.py`, diuji lewat satu
   adegan uji pendek, lembar kontaknya dibuka.
2. Naskah kedua video direvisi: pembuka pengumuman materi, penanda `*kata*`.
   Jalankan `buat_narasi.py` ulang.
3. Adegan Materi 01 ditulis ulang dengan prinsip pokok di atas.
4. Render, lembar kontak dibuka dan dinilai, perbaiki, ulang sampai bersih.
5. `gabung_audio.py --uji` dan `buat_subtitle.py`.
6. Ulangi langkah 3 sampai 5 untuk Materi 06.
7. Laporan diperbarui; usul perubahan STANDAR-ILUSTRASI-VIDEO dikirim ke MASTER.

## Usul perubahan standar bersama (keputusan ARYA: ubah untuk semua topik)

Aturan 1 STANDAR-ILUSTRASI-VIDEO sekarang mewajibkan semua benda nyata dibuat
3D. Usulnya diganti menjadi:

> 3D dipakai HANYA kalau memperlihatkan sesuatu yang tidak terlihat di 2D.
> Matematika yang butuh panjang atau sudut yang akurat WAJIB digambar dengan
> kamera tegak lurus, tanpa kemiringan: perspektif memendekkan satu arah lebih
> banyak daripada arah lain, dan gambar yang membantah hitungannya lebih
> merusak daripada gambar yang sederhana.

Alasannya bukan selera. Ini kesalahan yang sudah menghasilkan dua video ditolak,
dan topik Grafik Fungsi serta Statistika berisiko mengulanginya.
