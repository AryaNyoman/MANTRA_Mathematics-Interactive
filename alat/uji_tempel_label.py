"""Bukti bahwa `transformasi_umum.tempel_label` sungguh bisa MENOLAK.

    python alat/uji_tempel_label.py

Penjaga yang tidak pernah diuji adalah penjaga yang belum tentu menjaga. Alat
mutu topik ini pernah lapor "lolos" pada video yang cacat, jadi tiap penjaga
baru harus dibuktikan gagal pada kerusakan yang sengaja ditanam.

Tiga hal yang dibuktikan:
  1. Menempel ke KOORDINAT ditolak. Itu bentuk persis bug video 02.
  2. Menempel ke BENDA lolos, dan labelnya sungguh di luar benda.
  3. Label yang dipaksa masuk ke dalam benda ditolak.
"""

from __future__ import annotations

import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AKAR / "manim"))
sys.path.insert(0, str(AKAR / "manim" / "scenes"))

from gl import UP, TINTA, sinema  # noqa: E402
from transformasi_umum import (  # noqa: E402
    LabelTertelan, poligon, tempel_label, titik3,
)

# Sosok yang sama seperti video 02: pusatnya (-2, 2), menjulur 1,12 ke atas.
PUSAT = (-2.0, 2.0)
SOSOK = [
    (PUSAT[0] - 0.56, PUSAT[1] - 1.12),
    (PUSAT[0] + 0.56, PUSAT[1] - 1.12),
    (PUSAT[0] + 0.56, PUSAT[1] + 0.32),
    (PUSAT[0], PUSAT[1] + 1.12),
]


def main() -> int:
    gagal = 0
    benda = poligon(SOSOK, TINTA, tebal=4.0, isian=0.16)

    # 1. koordinat ditolak
    try:
        tempel_label(sinema.label("kamu", warna=TINTA), titik3(PUSAT), UP)
    except TypeError as e:
        print(f"1 OK   koordinat ditolak: {str(e)[:60]}...")
    else:
        gagal += 1
        print("1 GAGAL koordinat DITERIMA; ini bug video 02 yang lolos lagi")

    # 2. benda diterima, dan labelnya sungguh di atas puncak sosoknya
    label = tempel_label(sinema.label("kamu", warna=TINTA), benda, UP)
    if label.get_bottom()[1] > benda.get_top()[1]:
        print(f"2 OK   label di atas benda: {label.get_bottom()[1]:.2f} > "
              f"{benda.get_top()[1]:.2f}")
    else:
        gagal += 1
        print("2 GAGAL label tidak berada di atas bendanya")

    # 3. kerusakan yang ditanam: buff negatif menyeret label masuk ke badan
    #    sosoknya. Kalau ini lolos, penjaganya cuma hiasan.
    try:
        tempel_label(sinema.label("kamu", warna=TINTA), benda, UP, buff=-1.2)
    except LabelTertelan as e:
        print(f"3 OK   label tertelan ditolak: {str(e)[:60]}...")
    else:
        gagal += 1
        print("3 GAGAL label DI DALAM benda dinyatakan bersih")

    print("\n" + ("SEMUA LOLOS" if gagal == 0 else f"{gagal} uji gagal"))
    return 0 if gagal == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
