"""Periksa tiap `saat_kalimat(JAM, "...")` di adegan benar-benar ada di subtitle.

    python alat/cek_kalimat_adegan.py manim/scenes/ruang_3d_04.py

Kenapa ada: kejadian di layar diikat ke kalimat narasi lewat jam subtitle
(syarat MASTER 4 Sep 2026). Satu salah ketik pada awalan kalimat baru ketahuan
saat render, dan render 480p tiga menit adalah cara paling mahal untuk
menemukan salah ketik. Alat ini menemukannya dalam sepersekian detik.

Sekalian mencetak jam tiap kejadian, jadi urutannya bisa diperiksa mata: kalau
ada kejadian yang jamnya MUNDUR dari kejadian sebelumnya, animasinya akan
saling mendahului.
"""
from __future__ import annotations

import re
import sys
import unicodedata
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]


def polos(t: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", t)
                   if not unicodedata.combining(c)).casefold()


def jam_subtitle(topik: str) -> list[tuple[float, str]]:
    p = AKAR / "web" / "public" / "anim" / f"{topik}.vtt"
    if not p.exists():
        return []
    hasil, baris = [], p.read_text(encoding="utf-8").splitlines()
    for i, bs in enumerate(baris):
        if "-->" not in bs or i + 1 >= len(baris):
            continue
        j, m, d = bs.split("-->")[0].strip().split(":")
        hasil.append((int(j) * 3600 + int(m) * 60 + float(d),
                      re.sub(r"</?b>", "", baris[i + 1]).strip()))
    return hasil


def periksa(berkas: Path) -> int:
    teks = berkas.read_text(encoding="utf-8")
    topik = re.search(r'TOPIK\s*=\s*"([^"]+)"', teks)
    if not topik:
        print(f"{berkas.name}: tidak ada TOPIK, dilewati")
        return 0
    jam = jam_subtitle(topik.group(1))
    if not jam:
        print(f"{berkas.name}: subtitle {topik.group(1)}.vtt belum ada. "
              "Jalankan buat_subtitle.py dulu.")
        return 1
    # Dua bentuk pemakaian: `saat_kalimat(JAM, "...")` langsung, dan
    # pembungkusnya `tunggu_bergeser(b, frame, JAM, "...")` yang mengisi tunggu
    # dengan geseran kamera pelan.
    awalan = re.findall(r'(?:saat_kalimat|tunggu_bergeser)\([^)"]*"([^"]+)"\)', teks)
    if not awalan:
        print(f"{berkas.name}: tidak ada saat_kalimat, tidak ada yang diperiksa")
        return 0
    print(f"{berkas.name}  ({len(awalan)} kejadian terikat kalimat)")
    buruk, sebelumnya = 0, -1.0
    for a in awalan:
        t = next((d for d, k in jam if polos(k).startswith(polos(a))), None)
        if t is None:
            print(f"  TIDAK ADA  {a!r}")
            buruk += 1
            continue
        mundur = "  <-- MUNDUR dari kejadian sebelumnya" if t < sebelumnya else ""
        print(f"  {t:7.2f}s  {a!r}{mundur}")
        buruk += bool(mundur)
        sebelumnya = t
    return buruk


def main() -> int:
    berkas = [Path(x) for x in sys.argv[1:]]
    if not berkas:
        berkas = sorted((AKAR / "manim" / "scenes").glob("*.py"))
    buruk = sum(periksa(b) for b in berkas)
    print(f"\n{'ADA MASALAH: ' + str(buruk) if buruk else 'semua kalimat ketemu dan urut'}")
    return 1 if buruk else 0


if __name__ == "__main__":
    raise SystemExit(main())
