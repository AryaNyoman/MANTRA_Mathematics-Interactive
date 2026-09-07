"""Penjaga sebelum naik PRODUKSI: tidak boleh ada video tinjauan 480p yang
ikut tayang. Video 480p dan 1080p memakai NAMA BERKAS YANG SAMA di
web/public/anim (temuan Ruang 3D 4 Sep 2026), jadi tanpa penjaga ini produksi
bisa menayangkan 480p tanpa ada yang sadar.

    python alat/cek_resolusi_anim.py            # semua mp4/webm di web/public/anim
    python alat/cek_resolusi_anim.py --minimal 1080

Keluar dengan kode 1 kalau ada video di bawah tinggi minimal. Dijalankan MASTER
sebelum `vercel promote`; ditulis di PROGRESS.md bagian cara deploy.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
ANIM = AKAR / "web" / "public" / "anim"


def tinggi(video: Path) -> int:
    keluar = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=height", "-of", "json", str(video)],
        capture_output=True, text=True)
    try:
        return int(json.loads(keluar.stdout)["streams"][0]["height"])
    except (KeyError, IndexError, ValueError, json.JSONDecodeError):
        return -1


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--minimal", type=int, default=1080)
    a = p.parse_args()
    rendah = []
    for v in sorted(list(ANIM.glob("*.mp4")) + list(ANIM.glob("*.webm"))):
        if v.name.startswith("beranda-"):
            continue  # cuplikan beranda, bukan video materi
        t = tinggi(v)
        if t < a.minimal:
            rendah.append((v.name, t))
    if rendah:
        print(f"TOLAK: {len(rendah)} video di bawah {a.minimal}p, jangan naik produksi:")
        for n, t in rendah:
            print(f"  {t:5d}p  {n}")
        return 1
    print(f"OK: semua video materi di web/public/anim minimal {a.minimal}p")
    return 0


if __name__ == "__main__":
    sys.exit(main())
