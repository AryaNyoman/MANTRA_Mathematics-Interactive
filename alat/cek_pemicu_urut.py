"""Memeriksa jangkar `tunggu_kata` sebuah adegan MAJU TERUS, sebelum dirender.

    python alat/cek_pemicu_urut.py manim/scenes/transformasi1_setiap_titik.py

KENAPA ALAT INI ADA
`alat/cek_waktu_adegan.py` sudah memeriksa tiap frasa `tunggu_kata` ADA di
segmennya. Itu perlu, tetapi tidak cukup. Pada 8 September 2026 adegan
Transformasi 01 memakai frasa yang SAMA dua kali di satu segmen:

    b.tunggu_kata("sepasang angka")     # kemunculan pertama, detik 8,1
    b.main(FadeIn(bawa), run_time=1.2)
    b.tunggu_kata("sepasang angka")     # MAKSUDNYA yang kedua, detik 10,4

`JamKata.jam` selalu menjawab kemunculan PERTAMA (parameter `ke` ada, tetapi
`tunggu_kata` tidak meneruskannya). Jadi pemicu kedua menunjuk detik yang sudah
lewat, dan `sinema.laporkan_pemicu` menggagalkan render dengan "terlambat 1,22
detik". Kedua gerbang lama meloloskannya: frasanya memang ada, dan jumlah
waktunya memang muat.

Ongkosnya sembilan menit render 1080p60 untuk kesalahan satu baris. Berkas ini
memindahkan temuan itu ke sebelum render, tempat harganya nol.

YANG DIPERIKSA
Untuk tiap segmen, jam kata semua `tunggu_kata`-nya harus MAJU TERUS. Sama
besar pun ditolak: dua pemicu pada detik yang sama berarti yang kedua tidak
menunggu apa-apa, dan animasi di antaranya menggeser semuanya.

BATASNYA JUJUR
Ini pemeriksa STATIS: ia membaca urutan `tunggu_kata` dari kode, bukan
menjalankan adegannya. Percabangan atau perulangan yang mengubah urutan tidak
terbaca. Ia juga tidak menilai apakah animasi di antara dua pemicu muat; itu
tugas `cek_waktu_adegan.py` dan, pada akhirnya, rendernya sendiri.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AKAR / "manim"))

BABAK = re.compile(r'sinema\.babak\(\s*self,\s*"([^"]+)"')
TUNGGU = re.compile(r'\.tunggu_kata\(\s*"([^"]+)"')
TOPIK_BARIS = re.compile(r'^TOPIK\s*=\s*"([^"]+)"', re.M)


def periksa(jalur: Path) -> int:
    isi = jalur.read_text(encoding="utf-8")
    m = TOPIK_BARIS.search(isi)
    if not m:
        print(f"{jalur.name}: tidak ada baris TOPIK = \"...\", dilewati")
        return 0
    topik = m.group(1)

    from gl import sinema
    jam = sinema.JamKata(topik)

    segmen_kini = None
    urut: dict[str, list[str]] = {}
    for baris in isi.split("\n"):
        b = BABAK.search(baris)
        if b:
            segmen_kini = b.group(1)
            urut.setdefault(segmen_kini, [])
        t = TUNGGU.search(baris)
        if t and segmen_kini:
            urut[segmen_kini].append(t.group(1))

    buruk = 0
    for segmen, frasa in urut.items():
        sebelum_nama, sebelum_jam = None, None
        for f in frasa:
            try:
                saat = jam.jam(segmen, f)
            except Exception as e:
                buruk += 1
                print(f"  HILANG  {segmen}: {f!r} -> {str(e)[:90]}")
                continue
            if sebelum_jam is not None and saat <= sebelum_jam:
                buruk += 1
                print(f"  MUNDUR  {segmen}: {f!r} di {saat:.2f} s, padahal "
                      f"{sebelum_nama!r} sudah di {sebelum_jam:.2f} s")
                if f == sebelum_nama:
                    print(f"          frasanya SAMA. `tunggu_kata` selalu mengambil "
                          f"kemunculan pertama; pakai frasa lain yang muncul sesudahnya.")
            sebelum_nama, sebelum_jam = f, saat

    jumlah = sum(len(v) for v in urut.values())
    print(f"{jalur.name}: {jumlah} pemicu di {len(urut)} babak, "
          + ("semuanya maju terus" if buruk == 0 else f"{buruk} bermasalah"))
    return buruk


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("adegan", nargs="+", help="berkas adegan .py")
    a = p.parse_args()
    buruk = sum(periksa(Path(x)) for x in a.adegan)
    print()
    print("SEMUA LOLOS" if buruk == 0 else f"{buruk} pemicu perlu diperbaiki")
    return 0 if buruk == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
