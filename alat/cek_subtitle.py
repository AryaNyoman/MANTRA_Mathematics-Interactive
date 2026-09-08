"""Memastikan subtitle (.vtt) memuat PERSIS kalimat `tulis` naskahnya.

    python alat/cek_subtitle.py <nama-video>       contoh: turunan2-garis-singgung
    python alat/cek_subtitle.py --semua            semua video yang punya naskah dan vtt

KENAPA ALAT INI ADA
Pembanding subtitle Turunan 3 (8 Sep 2026) menormalkan teks dengan membuang
semua karakter bukan huruf, sehingga "2x + h" dan "2xh", "−1" dan "1",
"f′(x)" dan "f(x)", "dy/dx" dan "dydx" dianggap sama. Alat ini membandingkan
teks apa adanya: hanya spasi ganda, huruf besar-kecil, tag <b>, dan tanda
tebal * yang disamakan. Operator, tanda minus, aksen turunan, pangkat, dan
garis bagi TETAP ikut dibandingkan.

Yang diperiksa:
1. gabungan teks semua cue == gabungan `tulis` semua segmen (huruf demi huruf);
2. tidak ada tanda * yang tersisa di vtt;
3. cue tidak tumpang tindih dan tidak mundur.

Keluar 0 bila lolos, 1 bila ada cacat. Dibuktikan dua arah oleh
`alat/uji_cek_subtitle.py`.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
ANIM = AKAR / "web" / "public" / "anim"
NASKAH = AKAR / "manim" / "narasi"


def _tulis(seg: dict) -> str:
    return seg.get("tulis") or seg.get("layar") or seg.get("subtitle") or seg["teks"]


def _rapi(teks: str) -> str:
    teks = re.sub(r"</?b>", "", teks)
    teks = teks.replace("*", "")
    return " ".join(teks.split()).lower()


def _cue(vtt: str) -> list[tuple[float, float, str]]:
    hasil = []
    blok = re.split(r"\n\s*\n", vtt.strip())
    pola = re.compile(r"(\d+):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d+):(\d{2}):(\d{2})\.(\d{3})")
    for b in blok:
        baris = b.strip().splitlines()
        for i, l in enumerate(baris):
            m = pola.search(l)
            if m:
                g = [int(x) for x in m.groups()]
                awal = g[0] * 3600 + g[1] * 60 + g[2] + g[3] / 1000
                akhir = g[4] * 3600 + g[5] * 60 + g[6] + g[7] / 1000
                hasil.append((awal, akhir, " ".join(baris[i + 1:])))
                break
    return hasil


def periksa(topik: str) -> list[str]:
    naskah = NASKAH / f"{topik}.json"
    vtt = ANIM / f"{topik}.vtt"
    if not naskah.exists():
        return [f"naskah tidak ada: {naskah}"]
    if not vtt.exists():
        return [f"vtt tidak ada: {vtt}"]
    segmen = json.loads(naskah.read_text(encoding="utf-8"))["segmen"]
    isi = vtt.read_text(encoding="utf-8")
    cue = _cue(isi)
    temuan = []
    if "*" in "".join(c[2] for c in cue):
        temuan.append("tanda * tersisa di teks cue (penanda tebal bocor)")
    harap = _rapi(" ".join(_tulis(s) for s in segmen))
    dapat = _rapi(" ".join(c[2] for c in cue))
    if harap != dapat:
        # tunjuk tempat pertama yang berbeda
        n = next((i for i, (a, b) in enumerate(zip(harap, dapat)) if a != b), min(len(harap), len(dapat)))
        temuan.append(
            f"teks cue TIDAK sama dengan `tulis` naskah. Beda pertama di huruf ke-{n}:\n"
            f"       naskah : ...{harap[max(0, n - 40):n + 40]}...\n"
            f"       vtt    : ...{dapat[max(0, n - 40):n + 40]}...")
    for i in range(1, len(cue)):
        if cue[i][0] < cue[i - 1][1] - 1e-6:
            temuan.append(f"cue {i + 1} mulai ({cue[i][0]:.3f}) sebelum cue {i} selesai ({cue[i - 1][1]:.3f})")
            break
    for i, (a, b, _) in enumerate(cue):
        if b <= a:
            temuan.append(f"cue {i + 1} berdurasi nol atau negatif")
            break
    return temuan


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("topik", nargs="?")
    p.add_argument("--semua", action="store_true")
    a = p.parse_args()
    if a.semua:
        daftar = sorted(n.stem for n in NASKAH.glob("*.json") if (ANIM / f"{n.stem}.vtt").exists())
    elif a.topik:
        daftar = [a.topik]
    else:
        p.error("sebut nama video, atau --semua")
    buruk = 0
    for t in daftar:
        temuan = periksa(t)
        if temuan:
            buruk += 1
            print(f"  CACAT  {t}")
            for x in temuan:
                print(f"         {x}")
        else:
            print(f"  ok     {t}")
    print(f"\n{'SEMUA LOLOS' if not buruk else str(buruk) + ' video subtitle-nya tidak sama dengan naskah'}: {len(daftar)} video diperiksa")
    return 1 if buruk else 0


if __name__ == "__main__":
    sys.exit(main())
