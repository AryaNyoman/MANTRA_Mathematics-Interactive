# Latihan bergambar, 15 soal per tingkat, mode guru: rencana kerja

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, satu sesi; ARYA 13 Sep: "lakukan semuanya sekaligus sampai tahap akhir"). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sembilan bab latihan MANTRA berisi 60 soal (15 per tingkat) dengan pembahasan bernomor bergambar, syarat naik 10 benar, mode guru berkata kunci, nav dan kartu latihan dirapikan.

**Architecture:** Gambar soal adalah DATA (`GambarSoal` deklaratif) yang dirender satu komponen SVG per jenis; aturan kemajuan tetap di `lib/latihan-kemajuan.ts` dengan parameter `semuaTerbuka`; mode guru adalah satu kunci localStorage yang dibuka lewat sidik SHA-256 di peramban.

**Tech Stack:** Next.js 16, React 19, TypeScript, SVG tulis tangan (tanpa pustaka grafik), localStorage, Python untuk pemeriksa bank soal, playwright-cli untuk potret.

**Spec:** `docs/superpowers/specs/2026-09-13-latihan-bergambar-mode-guru-design.md`

## Global Constraints

- Bahasa Indonesia, gaya SMA; kata "miskonsepsi" dilarang; TANPA em-dash.
- Tanpa database, tanpa login; kata kunci guru tidak ditulis di repo, hanya sidiknya.
- Lebar wadah tidak dipatok piksel; widget/gambar tidak boleh memotong dirinya.
- Soal ditulis sendiri; sumber kalibrasi dicatat di kepala berkas.
- Verifikasi UI dengan playwright-cli (desktop dan HP 375 px).
- Deploy dari `web/`: `vercel deploy --prod --yes`, alias `mantra-matematika.vercel.app`, hapus deploy lama.

---

### Task 1: Tipe data dan pemeriksa bank soal

**Files:** Modify `web/content/tipe.ts` (SoalKuis, GambarSoal); Create `alat/cek_kuis.py`.
**Produces:** `GambarSoal` (union per spec 3.1), `SoalKuis.langkah: string[]` (wajib), `jebakan?: string`, `gambar?: GambarSoal`.

- [ ] Tambah tipe; buat `langkah` wajib (bank lama: isi `langkah: []` lewat skrip supaya `tsc` lolus, perender jatuh ke `alasan`).
- [ ] `alat/cek_kuis.py <bab|--semua>`: parse `kuis.ts` (regex per objek soal), periksa: 15 per tingkat (peringatan sebelum bab ditulis ulang), id unik, `benar` dalam rentang, 5 pilihan tanpa kembar, `langkah` terisi bila bab sudah ditulis ulang, tidak ada em-dash, kata "miskonsepsi" tidak ada, dan ekspresi `// cek: <python>` di atas soal dievaluasi harus True.
- [ ] `tsc` bersih, `cek_kuis.py --semua` jalan. Commit.

### Task 2: Perender gambar

**Files:** Create `web/components/latihan/gambar/GambarSoal.tsx` (pemilih), `Segitiga.tsx`, `Lingkaran.tsx`, `Grafik.tsx`, `Vektor.tsx`, `DiagramData.tsx`, `Balok.tsx`, `Bidang.tsx`, `Luas.tsx`, `SvgBebas.tsx`, `dasar.ts` (skala, warna, label). CSS `.gambar-soal` di `globals.css`.
**Produces:** `<GambarSoal gambar={GambarSoal} />` mengembalikan `<figure className="gambar-soal">` dengan SVG `viewBox` tetap, lebar 100 persen, `max-height` 260/200.

- [ ] Tulis `dasar.ts`: `WARNA`, `skalaKotak(viewBox)`, `Label` (teks dengan halo kertas).
- [ ] Tulis tiap perender dengan satu contoh statis di `web/app/latihan/contoh-gambar/page.tsx` (halaman uji, dihapus sebelum deploy atau dibiarkan tanpa tautan, keputusan: dibiarkan sebagai `/latihan/contoh-gambar` tidak tertaut, berguna untuk QC).
- [ ] Potret halaman contoh (desktop dan HP) dengan playwright-cli; nilai: tidak terpotong, label terbaca, siku benar.
- [ ] Commit.

### Task 3: Aturan kemajuan dan mode guru

**Files:** Modify `web/lib/latihan-kemajuan.ts` (SYARAT_NAIK 10, `ringkasPerTingkat(bank, k, semuaTerbuka=false)`); Create `web/lib/mode-guru.ts` (`useModeGuru()`, `masukGuru(kata): Promise<boolean>`, `keluarGuru()`, `SIDIK_GURU`), `web/components/TombolGuru.tsx` (dialog); Modify `web/components/Nav.tsx`, `ArenaLatihan.tsx`, `DaftarLatihan.tsx`, `HalamanTopik.tsx` (kuis terbuka bila guru), `lib/kemajuan.ts` bila perlu; CSS `.nav-guru`, `.dialog-guru`, `.lencana-guru`.
**Produces:** `useModeGuru(): boolean`; `catatJawaban` dilewati saat guru.

- [ ] Hitung sidik SHA-256 kata kunci ARYA (di luar repo, lewat Python), simpan hex di `mode-guru.ts`.
- [ ] Tombol di Nav setelah `nav-meta`, tidak di halaman belajar. Dialog `<dialog>` dengan medan `type=password`, pesan salah.
- [ ] Uji playwright-cli: salah kata kunci → pesan; benar → semua keping tingkat terbuka di `/latihan/trigonometri`, kuis materi terbuka di `/topik/trigonometri?materi=kuis`; keluar → terkunci lagi.
- [ ] Commit.

### Task 4: Nav dan kartu latihan

**Files:** Modify `Nav.tsx` (logo `mantra-penuh-gelap.png`), `globals.css` (`.merk-ikon` ukuran, `.nav-laci-tombol` tanpa `font: inherit`), `DaftarLatihan.tsx` (pasang `LatarBab`), Create `web/components/latihan/LatarBab.tsx` (9 motif SVG), CSS `.kartu-bank { position: relative; overflow: hidden }`, `.latar-bab { position:absolute; inset:0; opacity:.08; pointer-events:none }`.

- [ ] Ukur lewat playwright-cli: `getBoundingClientRect` "Lanjutkan" vs "Peta Materi" tinggi sama, font-size sama.
- [ ] Potret `/latihan` desktop dan HP; nilai motif tidak mengganggu keterbacaan.
- [ ] Commit.

### Task 5: Arena menampilkan gambar, langkah, jebakan

**Files:** Modify `ArenaLatihan.tsx`, `Kuis.tsx` (gambar di soal kuis materi juga), CSS `.bahas-jebakan`.

- [ ] Gambar di bawah soal (bila ada) dan di panel Pembahasan; blok "Kenapa pengecoh menggoda".
- [ ] Teks syarat memakai `SYARAT_NAIK`; keping `selesai / total`.
- [ ] Potret arena dengan satu soal bergambar sementara (Trigonometri k05 diberi gambar) desktop dan HP. Commit, deploy tahap 1 (situs), alias, hapus deploy lama.

### Task 6 sampai 14: Bank soal per bab (urutan: trigonometri, vektor, grafik-fungsi, statistika, transformasi-geometri, limit, ruang-3d, turunan, integral)

Tiap bab:
- [ ] Baca materi bab (`content/<bab>/tahap.ts` judul dan poin) supaya cakupan soal tidak melampaui yang diajarkan.
- [ ] Kalibrasi: buka 3 sampai 5 soal sulit/olimpiade dari mathcyber1997 atau PDF koleksi ARYA untuk pola, catat di kepala berkas.
- [ ] Tulis ulang 32 soal lama (langkah 3 sampai 6, jebakan, gambar bila situasi), pindahkan tingkat bila perlu, tambah soal baru sampai 15 per tingkat (sangat sulit: 5 bergaya olimpiade).
- [ ] Setiap soal angka diberi `// cek:` yang dihitung `cek_kuis.py`.
- [ ] `cek_kuis.py <bab>` lolos; `tsc` bersih; potret 4 soal bergambar acak per bab (arena) dan nilai.
- [ ] Commit per bab.

### Task 15: Deploy akhir, PROGRESS, memory

- [ ] `cek_kuis.py --semua`, `tsc`, `next build` lokal bila cepat, deploy, alias, hapus deploy lama.
- [ ] Verifikasi di situs tayang: `/latihan` (9 kartu 60 soal), satu arena per bab (gambar tampil), mode guru.
- [ ] PROGRESS.md entri, memory (status latihan, jebakan baru), laporan ke ARYA dengan bukti potret.
