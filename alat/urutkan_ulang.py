"""Menggeser urutan materi Transformasi Geometri ke urutan BUKU.

    python alat/urutkan_ulang.py --lihat    tampilkan rencananya saja
    python alat/urutkan_ulang.py --kerjakan tulis perubahannya

KENAPA DIGESER
Keputusan ARYA 5 September 2026: prioritaskan urutan belajar, dan jangan sebut
istilah yang belum dipelajari siswa. Urutan lama mulai dari translasi supaya
bisa menyambung ke topik Vektor; urutan buku mulai dari pencerminan. Menyambung
ke Vektor ternyata harganya lebih mahal daripada untungnya, sebab ia memaksa
materi pencerminan menyebut translasi dan sebaliknya.

Urutan buku: Bab 4 Buku Siswa Matematika Tingkat Lanjut SMA Kelas XI, halaman
177, bagian A: 1. Pencerminan terhadap Garis, 2. Pencerminan terhadap Titik,
3. Translasi, 4. Rotasi, 5. Dilatasi.

YANG DIKERJAKAN SKRIP INI
1. Memetakan nomor lama ke nomor baru di seluruh rujukan "Materi NN".
2. Menyusun ulang blok materinya dan menomori ulang medan `no:`.

Rujukan silang dikerjakan LEBIH DULU dan atas seluruh berkas, sebab satu saja
yang terlewat mengirim siswa ke materi yang salah, dan itu kesalahan yang tidak
akan terlihat sampai ada yang mengklik.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
BERKAS = AKAR / "web" / "content" / "transformasi-geometri" / "tahap.ts"

# nomor lama -> nomor baru
PETA = {1: 1, 2: 5, 3: 2, 4: 3, 5: 4, 6: 6, 7: 7, 8: 8,
        9: 9, 10: 10, 11: 11, 12: 12, 13: 13}

# urutan blok yang baru, ditulis sebagai nomor LAMA
URUTAN_LAMA = [1, 3, 4, 5, 2, 6, 7, 8, 9, 10, 11, 12, 13]


def pisah(isi: str) -> tuple[str, dict[int, str], str]:
    """Kepala berkas, blok tiap materi menurut nomor LAMA, dan ekornya."""
    tanda = "\n  {\n    no: "
    bagian = isi.split(tanda)
    kepala = bagian[0]
    blok: dict[int, str] = {}
    ekor = ""
    for i, b in enumerate(bagian[1:]):
        nomor = int(b.split(",", 1)[0].strip())
        if i == len(bagian) - 2:
            # blok terakhir masih membawa penutup senarai
            potong = b.rfind("\n]")
            ekor = b[potong:]
            b = b[:potong]
        blok[nomor] = b
    return kepala, blok, ekor


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--kerjakan", action="store_true")
    a = p.parse_args()

    isi = BERKAS.read_text(encoding="utf-8")

    # --- 1. rujukan silang, atas seluruh berkas -------------------------- #
    def ganti_rujukan(m: re.Match) -> str:
        lama = int(m.group(1))
        return f"Materi {PETA[lama]:02d}"

    baru = re.sub(r"Materi (\d{2})", ganti_rujukan, isi)
    jumlah_rujukan = sum(1 for _ in re.finditer(r"Materi \d{2}", isi))

    # --- 2. susun ulang bloknya ------------------------------------------ #
    kepala, blok, ekor = pisah(baru)
    if sorted(blok) != sorted(URUTAN_LAMA):
        print(f"GAGAL: blok yang ketemu {sorted(blok)}, diharapkan {sorted(URUTAN_LAMA)}")
        return 1

    potongan = []
    for baru_no, lama_no in enumerate(URUTAN_LAMA, start=1):
        b = blok[lama_no]
        # medan `no:` ditulis ulang; sisanya tidak disentuh
        b = re.sub(r"^\s*\d+,", f"{baru_no},", b, count=1)
        potongan.append(b)

    hasil = kepala + "\n  {\n    no: " + "\n  {\n    no: ".join(potongan) + ekor

    print(f"rujukan 'Materi NN' diperiksa : {jumlah_rujukan}")
    print("urutan baru (nomor lama -> baru):")
    for baru_no, lama_no in enumerate(URUTAN_LAMA, start=1):
        slug = re.search(r"slug: '([a-z-]+)'", blok[lama_no])
        tanda = "" if lama_no == baru_no else "  <- digeser"
        print(f"  {lama_no:2d} -> {baru_no:2d}  {slug.group(1) if slug else '?':22s}{tanda}")

    if a.kerjakan:
        BERKAS.write_text(hasil, encoding="utf-8")
        print("\nDITULIS.")
    else:
        print("\n(belum ditulis, pakai --kerjakan)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
