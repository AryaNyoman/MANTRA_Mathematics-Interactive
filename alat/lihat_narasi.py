"""Menampilkan naskah sebuah video beserta durasi tiap segmennya.

    python alat/lihat_narasi.py transformasi5-matriks [transformasi6-urutan ...]

Dipakai saat menilai apakah sebuah video perlu diperpanjang: yang menentukan
bukan jumlah babaknya, melainkan berapa detik narasi yang harus diisi gambar.
"""

from __future__ import annotations

import json
import pathlib
import sys

AKAR = pathlib.Path(__file__).resolve().parents[1]


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 1
    for topik in argv[1:]:
        naskah = json.loads(
            (AKAR / "manim" / "narasi" / f"{topik}.json").read_text(encoding="utf-8"))
        durasi = json.loads(
            (AKAR / "audio" / topik / "durasi.json").read_text(encoding="utf-8"))
        print(f"=== {topik}  ({len(naskah['segmen'])} segmen, "
              f"{durasi['total']:.2f} detik)")
        for s in naskah["segmen"]:
            d = durasi["segmen"].get(s["id"], 0.0)
            print(f"  {s['id']:<12} {d:6.2f}  {s['teks'][:78]}")
        print()
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
