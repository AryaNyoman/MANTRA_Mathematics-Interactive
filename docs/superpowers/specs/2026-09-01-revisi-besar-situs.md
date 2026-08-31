# Revisi Besar Situs MATRA — 22 Perubahan

**Tanggal:** 1 September 2026 · **Diminta:** ARYA · **Tenggat proyek:** 12 September 2026

Dokumen ini merangkum 22 permintaan revisi beserta keputusan yang sudah diambil,
supaya sesi berikutnya tidak perlu menebak apa pun.

---

## Keputusan yang sudah diambil

| Pertanyaan | Keputusan ARYA |
|---|---|
| Kunci kuis | **Petunjuk halus.** Tombol tetap terlihat tapi redup, dengan ajakan menyelesaikan materi. Syarat persisnya TIDAK disebut |
| Tombol install HP | **Siapkan sekarang, aktif setelah deploy.** Berkas PWA dibuat; tombol baru muncul saat situs online |
| Menulis ulang 10 materi | **Sepuluh sekaligus.** Mitigasi: Materi 01 dikirim ke ARYA begitu jadi, sementara sisanya terus ditulis — koreksi gaya masuk ke yang belum selesai |
| Urutan kerja | **A rapi-rapi + B bug**, lalu **C halaman depan**, lalu **D materi**, lalu **E latihan & kuis** |

---

## A. Rapi-rapi (2-3 jam)

1. **Em-dash dihapus dari seluruh proyek**, diganti tanda baca lain. Berlaku untuk
   proyek ini DAN proyek berikutnya — sudah dicatat sebagai aturan tetap.
   Hanya **satu** baris yang tampil di video (tahap 6), jadi cukup satu video
   dirender ulang, bukan tujuh.
2. Kode `TRIG-10-B4` di pojok kanan atas → tulis **Trigonometri**.
3. `TAHAP 01 · INTERAKTIF` → cukup **INTERAKTIF**.
4. Tab `01 Kenapa` → **MATERI 01**, `02 Perbandingan` → **MATERI 02**, dst.
5. Di atas judul materi: cukup **MATERI KELAS 10**. Bab dan "Kurikulum Merdeka" dibuang.
6. Kartu topik di beranda: hanya kelas (buang BAB), buang "Kurikulum Merdeka",
   buang label **UNGGULAN**, urutkan mulai dari **kelas 10**.
7. **Subtitle tanpa latar hitam** — hanya tulisannya, dan ukurannya bisa diatur siswa.
8. **Cache video.** Sekarang `Cache-Control: max-age=0`, artinya peramban
   memeriksa ulang ke server tiap kali. Diubah agar video dan subtitle disimpan
   lama di peramban, sehingga pindah materi tidak mengunduh ulang.

## B. Dua bug (1-2 jam)

9. **Zoom out terbalik.** Saat pengguna memperkecil zoom, penjelasan di kanan
   ikut mengecil sementara kotak interaktif dan video justru membesar. CSS sudah
   memakai `rem` untuk `.wadah` dan `.layar video`; yang belum diatur kemungkinan
   kolom kanan. Perlu diselidiki, bukan ditebak.
10. **Materi 10 tidak bekerja.** Galeri dunia nyata: menurut ARYA gambarnya tidak
    dimengerti dan interaksinya tidak jalan. Perlu diselidiki dari nol.

## C. Halaman depan (4-6 jam)

11. **Intro bergaya manim.community**: demo yang bisa digeser (screenshot/klip
    pendek), penjelasan isi situs, dan penanda **Powered by Claude · Manim**.
12. **Logo Matra** — sudah ada di `C:\Users\ASUS\Downloads\logo matra.png` (1,1 MB),
    dipindahkan ke proyek.
13. **Dibuat oleh Nyoman Arya Sejati** + **logo UNDIKSHA** (dicari di internet),
    ditempatkan tanpa menonjol.
14. **Nomor WhatsApp** 082247933752 dengan logo WA, bisa diklik langsung.
15. **Tombol install** (PWA) — pintasan ke situs di layar HP.

## D. Struktur materi (8-12 jam)

16. **Alur baru tiap materi:** satu paragraf pembuka berisi masalah/praktik kecil →
    pemecahan masalah kecil itu → baru masuk sub judul.
17. **Sub judul harus punya BATAS yang jelas.** Sekarang sub judul oker terbaca
    seperti paragraf baru tanpa pemisah. Perlu penanda sesi yang tegas.
18. **Sesi baru "YUK BEREKSPERIMEN! 🔬"** — disorot seperti kotak "Sering keliru",
    mengajak siswa mencoba widget dulu. Diletakkan di tengah atau sebelum RINGKASAN.
19. `BACA CEPAT · 4 POIN` → **RINGKASAN**. Angka "4 Poin" dibuang.
20. **"SERING KELIRU ❗"** di akhir materi, bahasanya ditulis ulang agar lebih pas.
21. **Bagian YouTube dipisah tegas** dari materi: logo YouTube, judul
    "PELAJARI LEBIH DALAM LEWAT YOUTUBE!", dan tautan **langsung ke hasil
    pencarian** kanal itu, contoh:
    `https://www.youtube.com/@m4thlab/search?query=perbandingan+trigonometri...`
22. **Materi 01 ditulis ulang** (menurut ARYA berantakan dan membingungkan);
    kebiasaan menulis yang sama diterapkan ke sembilan materi lain.

## E. Latihan & kuis (3-4 jam)

23. **Pilihan ganda A sampai E** (sekarang belum berlabel huruf).
24. **Kuis dikunci** sampai kesepuluh tab materi diklik DAN total waktu baca
    mencapai 10 menit. Syaratnya tidak diumumkan; yang tampil hanya ajakan halus
    menyelesaikan materi lebih dulu.

---

## Risiko yang disadari

- **Total 18-27 jam kerja.** Tenggat 12 September masih muat, tapi bagian D
  adalah menulis ulang isi pelajaran, bukan menata tampilan.
- **Kunci kuis bukan pengamanan.** Catatan waktu baca disimpan di peramban siswa
  (localStorage) dan bisa dihapus siapa pun yang mau. Tujuannya mendorong
  kebiasaan membaca, bukan mencegah kecurangan. Jangan diperlakukan sebagai
  penilaian yang sahih.
- **Tombol install belum bisa diuji** sampai situs online. Berkasnya disiapkan,
  tapi kebenarannya baru terbukti setelah deploy.
