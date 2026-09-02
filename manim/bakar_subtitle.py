"""Membakar subtitle ke SALINAN TINJAUAN saja, bukan ke video yang tayang.

    python manim/bakar_subtitle.py vektor1-perahu
    python manim/bakar_subtitle.py vektor1-perahu vektor6-sambung

Masukan : `media/uji-480p/<topik>.mp4` (keluaran `gabung_audio.py --uji`)
          `web/public/anim/<topik>.vtt`  (keluaran `buat_subtitle.py`)
Keluaran: `media/uji-480p/<topik>-bersubtitle.mp4`

KENAPA ADA ALAT INI
Keputusan ARYA 31 Agustus tetap berlaku: video yang TAYANG tidak boleh punya
subtitle yang dibakar ke gambar. Alasannya masih benar semua (bisa dimatikan,
bisa disalin, tidak menindih animasi, naskah berubah tanpa render ulang).

Tetapi saat MENINJAU, ARYA menonton berkas `.mp4` langsung, dan `.mp4` tidak
membawa berkas `.vtt` yang terpisah itu. Akibatnya ia melihat video tanpa
subtitle sama sekali dan mengira subtitlenya belum dibuat. Alat ini menutup
lubang itu: satu salinan khusus tinjauan, dengan akhiran `-bersubtitle`, yang
TIDAK PERNAH disalin ke `web/public/anim/`.

KENAPA TIDAK MENUMPANG DI `gabung_audio.py`
Berkas itu milik MASTER dan dipakai lima sesi. Menambah bendera di situ berarti
mengubah alur kerja semua orang untuk kebutuhan tinjauan satu orang.

GAYA SUBTITLENYA
Tanpa kotak dan tanpa bayangan, sesuai catatan "subtitle tanpa bayangan".
Tinta gelap di atas latar terang MATRA sudah cukup terbaca. Ditaruh di bawah
bidang koordinat, di pita yang memang sengaja dikosongkan, jadi ia tidak
menutupi angka sumbu maupun panah.

PATH WINDOWS
Tapis `subtitles=` milik ffmpeg memperlakukan titik dua sebagai pemisah
argumen, jadi `D:/...` merusak perintahnya. Ditangani dengan menjalankan
ffmpeg dari dalam folder berkas subtitlenya dan menyebut nama berkasnya saja.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
UJI = AKAR / "media" / "uji-480p"
VTT = AKAR / "web" / "public" / "anim"

# Ukuran huruf dan jarak dari tepi bawah dalam satuan ASS pada video 480p.
#
# Angkanya BUKAN selera. Pada 854x480, baris angka paling bawah bidang
# koordinat berhenti di sekitar piksel 405 dari 480. Dengan FontSize 19 dan
# MarginV 14, subtitle DUA BARIS mulai di piksel 414 dan baris pertamanya
# menyentuh angka sumbu itu (terlihat saat memeriksa salinan tinjauan
# pertama). FontSize 17 dengan MarginV 8 menaruh blok dua baris di piksel 426
# ke bawah, menyisakan jarak aman. Marginnya juga dirapatkan supaya kalimat
# lebih sering muat satu baris.
GAYA = ("FontSize=15,PrimaryColour=&H00262626,BorderStyle=1,Outline=0,"
        "Shadow=0,Alignment=2,MarginV=3,MarginL=20,MarginR=20")


def bakar(topik: str) -> Path:
    masuk = UJI / f"{topik}.mp4"
    teks = VTT / f"{topik}.vtt"
    keluar = UJI / f"{topik}-bersubtitle.mp4"
    if not masuk.exists():
        raise SystemExit(
            f"video uji tidak ada: {masuk}\n"
            f"Jalankan dulu: python manim/gabung_audio.py {topik} <Adegan> --uji")
    if not teks.exists():
        raise SystemExit(
            f"subtitle tidak ada: {teks}\n"
            f"Jalankan dulu: python manim/buat_subtitle.py {topik}")

    with tempfile.TemporaryDirectory() as kerja:
        kerja = Path(kerja)
        shutil.copy(teks, kerja / "sub.vtt")
        perintah = [
            "ffmpeg", "-y", "-loglevel", "error",
            "-i", str(masuk),
            "-vf", f"subtitles=sub.vtt:force_style='{GAYA}'",
            "-c:a", "copy",
            str(keluar),
        ]
        jalan = subprocess.run(perintah, cwd=kerja, capture_output=True, text=True)
    if jalan.returncode != 0 or not keluar.exists():
        raise SystemExit(f"ffmpeg gagal untuk {topik}:\n{jalan.stderr.strip()}")

    mb = keluar.stat().st_size / 1_048_576
    print(f"  {topik:24s} {mb:5.2f} MB  -> {keluar.relative_to(AKAR)}")
    return keluar


def main() -> int:
    for aliran in (sys.stdout, sys.stderr):
        try:
            aliran.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):                    # pragma: no cover
            pass
    p = argparse.ArgumentParser(
        description="Bakar subtitle ke salinan tinjauan MATRA (bukan versi tayang)")
    p.add_argument("topik", nargs="+", help="nama naskah tanpa .json")
    a = p.parse_args()

    print(f"membakar subtitle ke {len(a.topik)} salinan tinjauan:")
    for t in a.topik:
        bakar(t)
    print("\n>>> Berkas '-bersubtitle' HANYA untuk ditinjau ARYA.")
    print(">>> Jangan pernah disalin ke web/public/anim/; yang tayang memakai .vtt terpisah.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
