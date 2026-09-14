"""Cetak kode satu babak beserta jam kata segmennya, untuk menyetel ulang irama
animasi terhadap narasi (14 Sep 2026, saat suara diganti ke ElevenLabs Bian dan
gerbang cek_pemicu_urut menandai babak yang tidak muat).

    python alat/lihat_babak.py manim/scenes/integral03_substitusi.py empat [babak lain ...]
"""
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
berkas = Path(sys.argv[1])
isi = berkas.read_text(encoding="utf-8").split("\n")
topik = re.search(r'TOPIK\s*=\s*"([^"]+)"', "\n".join(isi)).group(1)
kata = json.loads((AKAR / "audio" / topik / "kata.json").read_text(encoding="utf-8"))
for nama in sys.argv[2:]:
    seg = kata[nama]
    print(f"\n=== {nama}: {seg['durasi']:.2f} s")
    print("   " + "  ".join(f"{w['kata']}@{w['mulai']:.2f}" for w in seg["kata"]))
    pola = re.compile(r'babak\(self, ["\']%s["\']' % re.escape(nama))
    for i, baris in enumerate(isi):
        if pola.search(baris):
            j = i + 1
            while j < len(isi) and (isi[j].startswith("            ") or not isi[j].strip()):
                j += 1
            for k in range(i, j):
                print(f"{k + 1:5d}  {isi[k]}")
            break
    else:
        print("   (babak tidak ditemukan di berkas)")
