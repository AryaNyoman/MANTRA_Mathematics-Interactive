#!/usr/bin/env bash
# Render final SEMUA video Trigonometri, 1080p60, berurutan.
#
#     bash manim/render_semua.sh
#
# BERURUTAN, BUKAN BERSAMAAN. Pada 31 Agu 2026 dua render Manim dijalankan
# berbarengan dan salah satunya terputus diam-diam di animasi 34 dari 46,
# meninggalkan berkas video LAMA di tempatnya tanpa pesan galat apa pun.
#
# Tiap video melewati rantai lengkap:
#   render 1080p60 -> gabung narasi -> poster -> lembar kontak untuk diperiksa
# Kalau salah satu langkah gagal, video itu dilewati dan dicatat, sisanya jalan.

set -u
cd "$(dirname "$0")/.."

VIDEO=(
  "tahap2_perbandingan_tetap:PerbandinganTetap:tahap2-perbandingan-tetap"
  "tahap4_lahirnya_rasio:LahirnyaRasio:tahap4-lahirnya-rasio"
  "tahap5_lingkaran_satuan:LingkaranSatuanLahir:tahap5-lingkaran-satuan"
  "tahap6_enam_rasio:EnamRasioNyata:tahap6-enam-rasio"
  "tahap7_sudut_istimewa:SudutIstimewaLahir:tahap7-sudut-istimewa"
  "tahap8_grafik_sin:GrafikSinusLahir:tahap8-grafik-sin"
  "tahap9_tiga_grafik:TigaGrafikBersama:tahap9-tiga-grafik"
)

LOG=/d/tmp/render_final
mkdir -p "$LOG"
BERHASIL=(); GAGAL=()

for baris in "${VIDEO[@]}"; do
  IFS=: read -r berkas adegan topik <<< "$baris"
  echo ""
  echo "==================== $topik ===================="

  if ! manim -qh --format=webm --disable_caching \
        "manim/scenes/$berkas.py" "$adegan" > "$LOG/$topik.log" 2>&1; then
    echo "  GAGAL saat render — lihat $LOG/$topik.log"
    grep -iE "CacatTataLetak|WaktuTidakMuat" "$LOG/$topik.log" | tail -2
    GAGAL+=("$topik (render)")
    continue
  fi
  echo "  render 1080p60 selesai"

  if ! python manim/gabung_audio.py "$topik" "$adegan" --keluar "$topik.webm" \
        > "$LOG/$topik-audio.log" 2>&1; then
    echo "  GAGAL saat gabung narasi:"
    grep -iE "BERHENTI|selisih" "$LOG/$topik-audio.log" | tail -3
    GAGAL+=("$topik (audio)")
    continue
  fi
  grep -E "^hasil" "$LOG/$topik-audio.log" | sed 's/^/  /'

  ffmpeg -y -v error -ss 60 -i "web/public/anim/$topik.webm" \
         -frames:v 1 -q:v 3 "web/public/anim/$topik.jpg"
  python manim/buat_subtitle.py "$topik" > /dev/null 2>&1
  rm -rf "qc/$topik"
  python manim/cek_video.py "media/$topik.webm" --per-detik 0.25 \
        > "$LOG/$topik-qc.log" 2>&1
  echo "  poster + subtitle + lembar kontak siap: qc/$topik/kontak.png"
  BERHASIL+=("$topik")
done

echo ""
echo "======================================================"
echo "berhasil : ${#BERHASIL[@]} dari ${#VIDEO[@]}"
for v in "${BERHASIL[@]}"; do echo "   OK  $v"; done
if [ ${#GAGAL[@]} -gt 0 ]; then
  echo "gagal:"
  for v in "${GAGAL[@]}"; do echo "   XX  $v"; done
fi
echo ""
echo ">>> WAJIB: buka tiap qc/<topik>/kontak.png dan nilai frame-nya."
