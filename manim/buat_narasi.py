"""Membuat berkas suara narasi DAN mengukur durasinya, per kalimat.

Kenapa per kalimat, bukan satu berkas panjang: supaya animasi Manim bisa
disetel MENGIKUTI durasi suara yang sebenarnya, bukan ditebak. Menebak lama
tiap adegan adalah cara paling cepat menghasilkan video yang gambar dan
suaranya berjalan sendiri-sendiri.

    python manim/buat_narasi.py trigonometri

Keluaran:
    audio/<topik>/<nn>-<id>.mp3      potongan suara per kalimat
    audio/<topik>/durasi.json        durasi tiap potongan, dibaca oleh adegan Manim
    audio/<topik>/narasi-penuh.mp3   gabungan, untuk digabung ke video

Mesin suara: edge-tts, memakai suara Indonesia ASLI (id-ID-ArdiNeural).
ElevenLabs tidak dipakai karena tingkat gratisnya mengunci semua suara
Indonesia di balik langganan berbayar — terverifikasi 31 Agu 2026, pesan
API-nya: "Free users cannot use library voices via the API."
"""

from __future__ import annotations

import argparse
import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

AKAR = Path(__file__).resolve().parent.parent


def durasi_detik(berkas: Path) -> float:
    hasil = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(berkas)],
        capture_output=True, text=True,
    )
    if hasil.returncode != 0:
        raise SystemExit(f"ffprobe gagal untuk {berkas}")
    return float(hasil.stdout.strip())


async def buat(topik: str) -> None:
    berkas_naskah = AKAR / "manim" / "narasi" / f"{topik}.json"
    if not berkas_naskah.exists():
        raise SystemExit(f"naskah tidak ditemukan: {berkas_naskah}")

    naskah = json.loads(berkas_naskah.read_text(encoding="utf-8"))
    keluar = AKAR / "audio" / topik
    keluar.mkdir(parents=True, exist_ok=True)

    suara = naskah.get("suara", "id-ID-ArdiNeural")
    tempo = naskah.get("tempo", "+0%")
    print(f"naskah : {berkas_naskah.name}")
    print(f"suara  : {suara}  (tempo {tempo})\n")

    durasi: dict[str, float] = {}
    potongan: list[Path] = []
    total_huruf = 0

    for i, seg in enumerate(naskah["segmen"], start=1):
        # Tanda bintang adalah penanda TEBAL untuk subtitle, bukan untuk
        # diucapkan. Dibuang di sini supaya mesin suara tidak membacanya.
        teks = " ".join(seg["teks"].replace("*", "").split())
        total_huruf += len(teks)
        berkas = keluar / f"{i:02d}-{seg['id']}.mp3"
        await edge_tts.Communicate(teks, suara, rate=tempo).save(str(berkas))
        d = durasi_detik(berkas)
        durasi[seg["id"]] = round(d, 3)
        potongan.append(berkas)
        print(f"  {i:02d} {seg['id']:12s} {len(teks):4d} huruf  ->  {d:5.2f} detik")

    total = sum(durasi.values())
    print(f"\n  total naskah  : {total_huruf} huruf")
    print(f"  total durasi  : {total:.2f} detik")

    # gabungkan jadi satu berkas
    daftar = keluar / "daftar.txt"
    daftar.write_text(
        "\n".join(f"file '{p.name}'" for p in potongan) + "\n", encoding="utf-8"
    )
    penuh = keluar / "narasi-penuh.mp3"
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
         "-i", str(daftar), "-c", "copy", str(penuh)],
        check=True, cwd=keluar,
    )
    daftar.unlink()

    (keluar / "durasi.json").write_text(
        json.dumps({"total": round(total, 3), "segmen": durasi}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"  gabungan      : {penuh.relative_to(AKAR)}  ({durasi_detik(penuh):.2f} detik)")
    print(f"  durasi.json   : {(keluar / 'durasi.json').relative_to(AKAR)}")
    print("\n>>> Adegan Manim membaca durasi.json ini. Jalankan ulang skrip ini")
    print(">>> setiap kali naskahnya diubah, lalu render ulang adegannya.")


def main() -> None:
    p = argparse.ArgumentParser(description="Pembuat narasi MATRA")
    p.add_argument("topik", help="nama berkas naskah tanpa .json, mis. trigonometri")
    a = p.parse_args()
    asyncio.run(buat(a.topik))


if __name__ == "__main__":
    sys.exit(main())
