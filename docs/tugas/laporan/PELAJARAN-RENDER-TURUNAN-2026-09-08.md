# Pelajaran produksi Turunan 1–3 — 8 September 2026

Catatan tambahan atas permintaan ARYA setelah revisi Turunan 3. “Video-video ini”
dicatat sebagai rangkaian Turunan 1, 2, dan 3; setiap temuan menyebut asalnya.
Audit ini membaca ulang laporan QC, log dan kode yang dipakai saat produksi.
Tidak ada render baru atau perubahan kode, narasi, audio, maupun media pada pembaruan ini.

Implementasi berada di D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515.
Salinan catatan tersedia di checkout MASTER dan worktree tersebut. Belum ada
commit, penggabungan cabang, deploy, atau pesan langsung ke task MASTER.

## Temuan pengajaran yang harus dibawa ke revisi berikutnya

1. **Timing tepat belum berarti kalimatnya lengkap.** Turunan 2 mencatat galat
   pemicu maksimum 0,03113 detik, tetapi ARYA tetap menemukan penghubung
   “hitungan yang sama” tanpa menyebut jelas apa yang sama. Penilaian waktu
   dan penilaian makna harus terpisah. Ucapkan hubungan lengkap ke video 1,
   “kemiringan adalah kenaikan dibagi langkah mendatar”, baru ringkas tulisan
   menjadi “miring = naik/datar”. Ini sudah diterapkan pada revisi 1 dan 3.
   **Penghubung lama dalam media Turunan 2 belum direvisi kembali.**
   Persetujuan ARYA atas ketenangan suara versi 2 tidak menghapus koreksi ini.

2. **Segitiga memanggil pengetahuan lama siswa.** Gambar untuk naik/datar bisa
   dianggap soal mencari sisi miring. Revisi 1 memakai contoh 3–4–5 cm:
   panjang sisi miring 5 cm, sedangkan kemiringan 3/4 = 0,75. Di grafik
   produksi, barang dan jam juga bukan dua panjang sejenis. Revisi 3 mengingatkan
   perbedaan itu. Pelajarannya: jelaskan besaran yang dicari dan satuannya,
   bukan hanya menggambar bentuk yang sudah dikenal siswa.

3. **Perubahan isi satu video mengubah penghubung video berikutnya.** Turunan 3
   sekarang membuktikan f′(x)=2x, sesuai permintaan asal rumus dari ARYA.
   Halaman 03 dan penghubung halaman 04 sudah diselaraskan. Namun narasi video
   04 bagian pola masih mengatakan hasil sebelumnya hanya dari empat titik,
   “Itu pola, bukan bukti.” Bagian berikutnya juga merujuk empat titik tadi.
   **MASTER perlu menyelaraskan penghubung video 04 ketika merevisinya.**
   Audio/video 04 masih versi lama; catatan ini tidak mengklaim sudah memperbaikinya.

## Temuan saat render dan pemeriksaan

| Temuan nyata | Perbaikan atau status | Pelajaran untuk produksi |
|---|---|---|
| Turunan 2: pembulatan frame menumpuk sekitar 1 detik pada uji 30 fps. | Penutupan babak mengikuti waktu audio absolut; pola ini dipakai juga oleh revisi 1 dan 3. | Jangan menjumlahkan durasi animasi saja untuk mengukur keselarasan sepanjang video. |
| Turunan 3: dua pemicu terlambat sekitar 0,27/0,33 detik walau kata target ditemukan. Animasi sebelumnya memakai terlalu banyak waktu. | Persiapan dipersingkat atau dimajukan; hasil akhir 88 pemicu, galat maksimum 0,111834 detik. | Bandingkan waktu aktual pemicu dengan kata audio; keberhasilan menemukan kata saja tidak cukup. |
| Turunan 1: render uji memiliki layar kosong 2,5 detik saat beralih ke sumbu. | Pembersihan gambar dipindah mendekati ucapan transisi; pemindaian akhir lulus. | Tahan konteks lama sampai konteks baru siap diperkenalkan. |
| Turunan 3: morph menuju pecahan dy/dx memperbesar tinggi formula dan bertabrakan dengan y=f(x). | Letak y=f(x) dipindah ke dekat kartu contoh; QC akhir lulus. | Sediakan ruang untuk ukuran akhir formula dan periksa tahap sesudah morph. |
| Turunan 3: garis biru pada y=−1 menimpa label angka sumbu; pemeriksa tata letak tidak menangkapnya. Turunan 1 juga sempat memiliki label 1 cm ditembus garis. | Angka −1 dipindah ke sisi kanan sumbu; label 1 cm dipindah ke bawah. | Pemeriksaan frame perlu mencakup perpotongan garis dengan huruf/angka, termasuk tanda minus. |
| Turunan 3: detektor memberi 38 calon diam; rentang 56,50–72,25 detik ditandai diam selama 15,75 detik. | Frame 61 dan 70 detik menunjukkan angka tabel bertambah. Perubahan kecil di bawah ambang piksel. | Calon diam adalah petunjuk pemeriksaan, bukan bukti video macet. Jangan menambah gerak hias hanya untuk menghapus alarm. |
| Pemeriksa urutan seri menganggap “bagian dalam domain” pada Materi 02 sebagai komposisi fungsi. | Alarm dibaca dalam konteks; tidak mengubah materi 02 untuk memuaskan pencocokan kata. | Alarm berbasis kata perlu penilaian isi; jangan menganggap semua alarm sebagai kesalahan materi. |

## Subtitle: bug yang sudah diperbaiki dan celah QC yang baru ditemukan

**Sudah diperbaiki di pembuat subtitle Turunan 3:** normalisasi kata pernah
menggabungkan akhir kalimat “dua eks.” dengan awal kalimat “Ha kuadrat”.
Pencocokan frasa kemudian membacanya sebagai “dua eks ha” atau 2xh, padahal
kalimat yang dimaksud adalah “2xh menjadi 2x.” lalu “h² menjadi h.”
Penggantian frasa kini berhenti pada tanda baca di tengah rentang kata.
Pemeriksaan seluruh teks VTT terhadap medan tulis menangkap kasus tersebut.
Perbaikan berada di alat/buat_subtitle_turunan3.py; jangan menganggap otomatis
sudah diterapkan ke pembuat subtitle video lainnya.

**Celah baru yang dikonfirmasi pada audit catatan ini:** fungsi normalisasi
di qc/turunan3-fungsi-turunan/periksa-hasil.py menghapus seluruh karakter
non-kata memakai pola \W+. Akibatnya, perbandingan yang dimaksudkan untuk
memeriksa kesetaraan subtitle juga membuang operator dan tanda matematika:

| Dua tulisan berbeda | Hasil normalisasi sama |
|---|---|
| 2x + h dan 2xh | 2xh |
| −1 dan 1 | 1 |
| f′(x) dan f(x) | fx |
| dy/dx dan dydx | dydx |

Keempat pasangan diuji langsung dengan ekspresi normalisasi yang sama, tanpa
mengubah aset. Ini **celah kemampuan pemeriksa**, bukan bukti bahwa kesalahan
tersebut ada dalam video final. Status “subtitle utuh” berarti lulus pemeriksa
yang ada, disertai tinjauan frame yang dicatat; bukan jaminan setiap operator
tervalidasi otomatis. **Tindak lanjut MASTER:** pertahankan operator, tanda
minus, aksen turunan, pangkat, dan garis bagi dalam pembanding; normalisasi
hanya variasi penulisan yang memang setara. Kode pemeriksa belum diubah pada
tugas pencatatan ini.

## Render lama dapat terbaca sebagai hasil baru

Log media/turunan3-mux-uji.log merekam penolakan “video lebih TUA daripada
adegannya”. Pelindung pada manim/gabung_audio.py bekerja: keluaran yang lama
tidak digabung dengan suara baru setelah source berubah. Saat pengerjaan,
render yang gagal di bagian akhir sempat meninggalkan MP4 lama serta keluaran
sementara; pemeriksaan berikutnya juga sempat membaca salinan uji lama setelah
langkah penggabungan ditolak. Artefak tersebut tidak dipakai sebagai hasil akhir.

Jangan menyimpulkan keberhasilan dari nama file yang ada atau kode keluar
Manim saja; pesan pelindung juga menjelaskan Manim dapat keluar dengan kode 0
setelah penolakan QC. Untuk rangkaian berikutnya, hentikan langkah turunan
ketika langkah sebelumnya gagal, periksa log seluruh babak, waktu berkas
dibanding source, durasi lengkap, dan metadata keluaran. Jangan mengubah
timestamp untuk melewati pelindung. Salinan tinjau/subtitle harus dibuat dari
MP4 final yang sudah diverifikasi. Ini arahan alur kerja; belum dibuat
pelaksana otomatis baru pada pembaruan catatan ini.

## Suara dan ketergantungan alat

- Pembuat suara Turunan 1 dan 3 mengimpor alat/buat_suara_turunan2.py sebagai
  mesin bersama. Nama “turunan2” bukan tanda bahwa dampaknya terbatas pada
  video 2. Saat memindahkan implementasi, sertakan mesin itu. Saat mengubahnya,
  periksa ketiga pemanggil dan regenerasi hanya aset yang termasuk pekerjaan.
- Adegan membaca kata.json dan durasi.json dari rekaman yang sama. Pembuat
  suara umum tidak menggantikan alat khusus ini karena tidak menyediakan
  penanda kata yang diperlukan.
- TTS Turunan 3 mengeja y sebagai “ye”, tetapi Whisper base tetap salah
  mengenali sebagian huruf matematika. Audit 3 hanya mengambil tujuh bagian
  penting; transkripsi otomatis dan ukuran galat waktu tidak membuktikan
  intonasi atau pemahaman siswa. Belum ada uji langsung kepada siswa.
- Ukur audio yang benar-benar dihasilkan sebelum render mahal. Batas ARYA
  tetap 180–360 detik; jangan mengejar batas dengan mempercepat suara tenang
  atau menambah jeda kosong. Durasi akhir 1/2/3 masing-masing 351,766667 /
  355,966667 / 355,333333 detik.

## Bukti yang dapat ditelusuri

Berkas QC dan kode berikut berada di worktree, bukan otomatis tersedia pada
checkout MASTER. Catatan ini merangkum bukti agar MASTER mengetahui konteksnya.

- [Hasil revisi Turunan 1](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan1-laju-rata-rata/hasil-revisi-lanjutan.md):
  layar kosong, label, Pythagoras, timing, dan batas audit suara.
- [Pemeriksaan Turunan 2](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan2-garis-singgung/hasil-pemeriksaan.md):
  pembulatan frame, pemicu kata dan keterbatasan transkripsi.
- [Hasil revisi Turunan 3](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan3-fungsi-turunan/hasil-revisi.md),
  [calon diam](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan3-fungsi-turunan/calon-diam.md), dan
  [audit timing](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan3-fungsi-turunan/audit-timing.json).
- [Pembuat subtitle 3](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/alat/buat_subtitle_turunan3.py) dan
  [pemeriksa hasil 3](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/qc/turunan3-fungsi-turunan/periksa-hasil.py):
  batas tanda baca dan normalisasi yang masih membuang operator.
- [Log penolakan video lama](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/media/turunan3-mux-uji.log) dan
  [pelindung penggabungan](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/manim/gabung_audio.py).
- [Narasi video 04](D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515/manim/narasi/turunan4-aturan-pangkat.json):
  rujukan pola/empat titik yang perlu diselaraskan.
- Bukti koreksi ARYA: foto-1-turunan2-rumus-subtitle.png dan
  foto-2-turunan1-segitiga.png di docs/tugas/laporan/bukti-turunan-2026-09-08/.

## Daftar tindak lanjut untuk MASTER

1. Saat memperkuat pemeriksa subtitle, pertahankan tanda matematika; simpan
   empat pasangan di atas sebagai kasus yang harus dibedakan.
2. Saat merevisi Turunan 2 berikutnya, lengkapi penghubung lisan dan urutan
   tulisan lengkap → “miring = naik/datar” sesuai koreksi ARYA.
3. Saat merevisi video 04, selaraskan penghubung dengan bukti yang sudah ada
   di video 03, termasuk rujukan empat titik setelah pembuka.
4. Pertahankan pemeriksaan makna, waktu, dan frame sebagai pemeriksaan
   terpisah. Pahami alarm otomatis sebelum memutuskan perubahan adegan.

Temuan yang sudah diperbaiki di atas tidak mengubah status akhir produksi.
Revisi terbaru Turunan 1 dan 3 masih menunggu tinjauan ARYA; persetujuan lama
atas Turunan 2 tidak dianggap sebagai persetujuan otomatis atas semua versi.
