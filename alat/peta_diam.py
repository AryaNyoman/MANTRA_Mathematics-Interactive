"""Memasangkan tiap rentang DIAM dengan babak dan kalimat narasinya.

Alat `alat/ukur_detik_pertama.py` melaporkan rentang diam sebagai detik, dan
detik saja tidak bisa dinilai: STANDAR butir 3 membolehkan layar diam selama
narasinya masih membahas yang tampil. Yang menentukan layak atau tidak adalah
KALIMAT yang sedang berjalan di situ. Berkas ini menyandingkan keduanya supaya
penilaiannya berdasar, bukan berdasar angka telanjang.

    python alat/peta_diam.py <topik> <awal>-<akhir> [<awal>-<akhir> ...]
    python alat/peta_diam.py transformasi1-setiap-titik 67.1-82.1 46.6-59.0
"""

import json
import pathlib
import sys

AKAR = pathlib.Path(__file__).resolve().parents[1]


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 1
    topik = argv[1]
    rentang = []
    for teks in argv[2:]:
        a, z = teks.split("-")
        rentang.append((float(a), float(z)))

    durasi = json.loads(
        (AKAR / "audio" / topik / "durasi.json").read_text(encoding="utf-8")
    )["segmen"]
    naskah = {
        s["id"]: s["teks"]
        for s in json.loads(
            (AKAR / "manim" / "narasi" / f"{topik}.json").read_text(encoding="utf-8")
        )["segmen"]
    }

    batas, jam = [], 0.0
    for nama, lama in durasi.items():
        batas.append((nama, jam, jam + lama))
        jam += lama

    print(f"### {topik}  (total {jam:.1f} detik, {len(batas)} babak)")
    for awal, akhir in sorted(rentang, key=lambda r: r[0] - r[1]):
        kena = [(n, m, x) for n, m, x in batas if not (x <= awal or m >= akhir)]
        print(f"\n  DIAM {awal:6.1f} - {akhir:6.1f}  ({akhir - awal:.1f} detik)")
        for n, m, x in kena:
            tumpang = min(akhir, x) - max(awal, m)
            print(f"    {n:9s} {m:6.1f}-{x:6.1f}  diam {tumpang:4.1f}s  {naskah[n][:84]}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
