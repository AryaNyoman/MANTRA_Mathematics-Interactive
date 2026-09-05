"""Memeriksa berkas pendamping tiap video: subtitle dan poster.

    python alat/cek_aset_video.py transformasi
    python alat/cek_aset_video.py              # semua topik yang ada videonya

KENAPA ALAT INI ADA
Pada 6 September 2026 MASTER menemukan dua cacat sekaligus saat memasang video
Transformasi Geometri ke situs, dan keduanya lolos dari SEMUA gerbang yang ada:

1. SUBTITLE BASI. Naskah video 05 dan 06 diperpanjang dari 77 dan 81 detik jadi
   144 dan 143, tetapi berkas `.vtt`-nya tidak ikut dibuat ulang. Akibatnya
   subtitle berhenti di tengah video: penonton kehilangan separuh terakhir
   kalimatnya. Videonya sendiri benar, audionya benar, dan tidak ada satu pun
   alat yang membandingkan keduanya dengan panjang videonya.
2. POSTER KOSONG. Dua poster berukuran persis sama, 2.635 byte, dan keduanya
   gambar rata satu warna. Satu lagi tidak ada sama sekali.

Kedua cacat itu punya bentuk yang sama: berkas PENDAMPING video ketinggalan
saat videonya berubah. Video diperiksa berlapis-lapis di proyek ini, berkas
pendampingnya tidak sama sekali. Berkas ini menutup celah itu.

BATAS TOLERANSI SUBTITLE
Isyarat terakhir tidak harus jatuh persis di detik terakhir video: kalimat
penutup wajar berhenti satu dua detik sebelum layar habis. Yang tidak wajar
adalah selisih PULUHAN detik. Ambangnya 15 detik, dan itu sengaja longgar:
yang dicari cacat sebesar "subtitle berhenti di separuh video", bukan selisih
kecil yang memang normal.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
VIDEO = AKAR / "media" / "uji-480p"
ANIM = AKAR / "web" / "public" / "anim"

AMBANG_SELISIH = 15.0    # detik


def durasi_video(jalur: Path) -> float:
    hasil = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(jalur)],
        capture_output=True, text=True, check=True,
    )
    return float(hasil.stdout.strip())


def akhir_subtitle(jalur: Path) -> float | None:
    """Detik berakhirnya isyarat TERAKHIR di berkas WebVTT."""
    pola = re.compile(
        r"-->\s*(\d+):(\d{2}):(\d{2})\.(\d{3})")
    akhir = None
    for m in pola.finditer(jalur.read_text(encoding="utf-8")):
        j, m_, d, ms = (int(x) for x in m.groups())
        akhir = j * 3600 + m_ * 60 + d + ms / 1000
    return akhir


def periksa(saring: str | None) -> int:
    from buat_poster import nilai  # noqa: E402

    buruk = 0
    daftar = sorted(p for p in VIDEO.glob("*.mp4")
                    if "-bersubtitle" not in p.stem
                    and (not saring or saring in p.stem))
    if not daftar:
        print(f"tidak ada video yang cocok dengan {saring!r} di {VIDEO}")
        return 1

    for v in daftar:
        topik = v.stem
        lama = durasi_video(v)
        catat = []

        vtt = ANIM / f"{topik}.vtt"
        if not vtt.exists():
            catat.append("subtitle TIDAK ADA")
        else:
            akhir = akhir_subtitle(vtt)
            if akhir is None:
                catat.append("subtitle kosong, tidak ada satu isyarat pun")
            elif lama - akhir > AMBANG_SELISIH:
                catat.append(
                    f"subtitle BASI: berhenti di {akhir:.1f} s, videonya {lama:.1f} s "
                    f"(tertinggal {lama - akhir:.1f} s)")

        jpg = ANIM / f"{topik}.jpg"
        if not jpg.exists():
            catat.append("poster TIDAK ADA")
        else:
            vonis, ket = nilai(jpg)
            if vonis == "cacat":
                catat.append(f"poster {ket}")

        if catat:
            buruk += 1
            print(f"  CACAT  {topik}  ({lama:.1f} s)")
            for c in catat:
                print(f"           {c}")
        else:
            print(f"  ok     {topik}  ({lama:.1f} s)")

    print()
    if buruk:
        print(f"{buruk} dari {len(daftar)} video berkas pendampingnya bermasalah")
        print("Subtitle: python manim/buat_subtitle.py <topik>")
        print("Poster  : python alat/buat_poster.py <topik> <detik>")
        return 1
    print(f"SEMUA LOLOS: {len(daftar)} video, subtitle dan posternya cocok.")
    return 0


def main() -> int:
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("saring", nargs="?", help="hanya topik yang namanya memuat teks ini")
    a = p.parse_args()
    return periksa(a.saring)


if __name__ == "__main__":
    sys.exit(main())
