#!/bin/bash
# Uji kepekaan tarikan semua widget lewat playwright-cli (dev server :3210).
# Untuk tiap halaman materi dan tiap elemen ber-onPointerDown: tarikan sintetis
# 60 px ke kanan, kiri, atas, bawah; dicatat seberapa jauh pegangan dan elemen
# lain bergeser (piksel) dan apakah nilai kendali berubah. Pegangan yang
# bergeser jauh lebih dari 60 px = terasa "licin" (temuan ARYA 16 Sep 2026 pada
# segitiga A2 dan kubus 3D). Hasil: qc/uji-seret.jsonl, ringkasan lewat
#   PYTHONIOENCODING=utf-8 python alat/uji-seret/ringkas_probe.py
# Pemakaian (per topik, tiap topik 3 sampai 8 menit):
#   bash alat/uji-seret/jalankan.sh trigonometri limit
# Halaman yang sudah ada di hasil dilewati; hapus qc/uji-seret.jsonl untuk mengulang.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AKAR="$(cd "$DIR/../.." && pwd)"
KELUAR="$AKAR/qc/uji-seret.jsonl"
mkdir -p "$AKAR/qc"; touch "$KELUAR"
cd "$AKAR"
declare -A JUMLAH=( [grafik-fungsi]=13 [integral]=11 [limit]=10 [ruang-3d]=10 [statistika]=14 [transformasi-geometri]=13 [trigonometri]=10 [turunan]=12 [vektor]=12 )
for topik in "$@"; do
  n=${JUMLAH[$topik]}
  for ((m=1; m<=n; m++)); do
    if grep -q "\"topik\":\"$topik\",\"materi\":$m,.*\(selesai\|tanpaWidget\)" "$KELUAR"; then continue; fi
    for ((i=0; i<8; i++)); do
      if grep -q "\"topik\":\"$topik\",\"materi\":$m,\"i\":$i," "$KELUAR"; then continue; fi
      playwright-cli goto "http://localhost:3210/topik/$topik?materi=$m&p=$i" >/dev/null 2>&1
      sleep 3
      hasil=$(playwright-cli eval "$(cat "$DIR/probe_seret.js")" 2>&1 | grep -A1 '### Result' | tail -1)
      echo "{\"topik\":\"$topik\",\"materi\":$m,\"i\":$i,\"hasil\":$hasil}" >> "$KELUAR"
      if echo "$hasil" | grep -q -E 'selesai|tanpaWidget|Error'; then break; fi
    done
  done
done
echo "SELESAI $*" >> "$KELUAR"
