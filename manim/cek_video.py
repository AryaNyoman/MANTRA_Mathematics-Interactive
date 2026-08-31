"""Pemeriksa video WAJIB — jalankan sebelum video apa pun dinyatakan selesai.

Membuat lembar kontak (satu gambar berisi banyak frame) supaya seluruh video
bisa dinilai sekaligus, plus frame lepasan pada detik-detik tertentu.

    python manim/cek_video.py media/videos/<...>/Adegan.webm
    python manim/cek_video.py <video> --detik 5 12 17

Keluaran masuk ke `qc/<nama-adegan>/`.

ATURAN: hasilnya HARUS dilihat satu per satu. "Render sukses" bukan bukti bahwa
videonya benar — itu cuma bukti tidak ada error Python.
"""

from __future__ import annotations

import argparse
import json
import math
import subprocess
import sys
from pathlib import Path


def jalankan(cmd: list[str]) -> str:
    hasil = subprocess.run(cmd, capture_output=True, text=True)
    if hasil.returncode != 0:
        print(hasil.stderr[-800:], file=sys.stderr)
        raise SystemExit(f"gagal: {' '.join(cmd[:3])} ...")
    return hasil.stdout


def info(video: Path) -> dict:
    keluar = jalankan([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,r_frame_rate",
        "-show_entries", "format=duration,size",
        "-of", "json", str(video),
    ])
    data = json.loads(keluar)
    s, f = data["streams"][0], data["format"]
    pembilang, penyebut = (int(x) for x in s["r_frame_rate"].split("/"))
    return {
        "lebar": s["width"], "tinggi": s["height"],
        "fps": pembilang / penyebut,
        "durasi": float(f["duration"]),
        "ukuran_mb": int(f["size"]) / 1024 / 1024,
    }


def lembar_kontak(video: Path, keluar: Path, durasi: float, per_detik: float = 1.0):
    jumlah = max(1, math.ceil(durasi * per_detik))
    kolom = min(5, jumlah)
    baris = math.ceil(jumlah / kolom)
    jalankan([
        "ffmpeg", "-y", "-v", "error", "-i", str(video),
        "-vf", f"fps={per_detik},scale=440:-1,tile={kolom}x{baris}",
        "-frames:v", "1", str(keluar),
    ])
    return kolom, baris, jumlah


def frame_lepas(video: Path, folder: Path, detik: list[float]):
    hasil = []
    for d in detik:
        target = folder / f"detik-{str(d).replace('.', '_')}.png"
        jalankan([
            "ffmpeg", "-y", "-v", "error", "-ss", str(d),
            "-i", str(video), "-frames:v", "1", str(target),
        ])
        hasil.append(target)
    return hasil


def main() -> None:
    p = argparse.ArgumentParser(description="Pemeriksa frame video MATRA")
    p.add_argument("video", type=Path)
    p.add_argument("--detik", type=float, nargs="*", default=[],
                   help="detik tertentu yang mau diambil frame-nya")
    p.add_argument("--per-detik", type=float, default=1.0,
                   help="berapa frame per detik untuk lembar kontak (default 1)")
    a = p.parse_args()

    if not a.video.exists():
        raise SystemExit(f"tidak ditemukan: {a.video}")

    m = info(a.video)
    folder = Path("qc") / a.video.stem
    folder.mkdir(parents=True, exist_ok=True)

    print(f"berkas   : {a.video}")
    print(f"ukuran   : {m['lebar']}x{m['tinggi']} @ {m['fps']:.0f} fps")
    print(f"durasi   : {m['durasi']:.2f} detik")
    print(f"besar    : {m['ukuran_mb']:.2f} MB")
    if m["ukuran_mb"] > 4:
        print("PERINGATAN: > 4 MB. Kompres sebelum masuk web/public/anim/.")

    kontak = folder / "kontak.png"
    kol, bar, n = lembar_kontak(a.video, kontak, m["durasi"], a.per_detik)
    print(f"\nlembar kontak: {kontak}  ({kol}x{bar}, {n} frame)")

    if a.detik:
        for f in frame_lepas(a.video, folder, a.detik):
            print(f"frame lepas  : {f}")

    print("\n>>> WAJIB: buka gambar di atas dan nilai satu per satu.")
    print(">>> Periksa: teks bertindih? keluar tepi? warna belang? waktu mati?")


if __name__ == "__main__":
    main()
