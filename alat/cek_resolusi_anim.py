"""Penjaga sebelum naik PRODUKSI: video materi wajib 1080p, wadah finalnya mp4.

Penjaga aslinya: tidak boleh ada video tinjauan 480p yang ikut tayang. Video
480p dan 1080p memakai NAMA BERKAS YANG SAMA di web/public/anim (temuan Ruang
3D 4 Sep 2026), jadi tanpa penjaga ini produksi bisa menayangkan 480p tanpa
ada yang sadar. Cuplikan beranda dikecualikan: ia hiasan halaman, bukan video
materi.

WADAH. Pada 7 Sep 2026 alat ini sempat MENOLAK mp4 ("keputusan ARYA: semua
webm, enam kali lebih ringan"). Angka itu keliru: ia membandingkan Ruang 3D
(permukaan bergradasi) dengan Statistika (garis datar), isi yang berbeda. Pada
isi yang sama, mp4 utuh (H.264 ManimGL + AAC) 17 persen lebih ringan daripada
webm (VP9 kode ulang + Opus), tanpa kode ulang, dan diputar semua HP.
KEPUTUSAN ARYA 8 Sep 2026: wadah final mp4. Webm yang masih ada dari masa
peralihan (Statistika) hanya DICATAT di sini, tidak menggagalkan, sampai
digabung ulang ke mp4; yang menggagalkan tetap resolusi.

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
    p.add_argument("--izinkan-mp4", action="store_true",
                   help="tidak berpengaruh lagi sejak 8 Sep 2026 (mp4 memang wadah final); "
                        "dipertahankan supaya perintah lama tidak gagal")
    a = p.parse_args()
    rendah, masih_webm = [], []
    for v in sorted(list(ANIM.glob("*.mp4")) + list(ANIM.glob("*.webm"))):
        if v.name.startswith("beranda-"):
            continue  # cuplikan beranda, bukan video materi
        t = tinggi(v)
        if t < a.minimal:
            rendah.append((v.name, t))
        if v.suffix == ".webm":
            masih_webm.append((v.name, v.stat().st_size / 1048576))
    if rendah:
        print(f"TOLAK: {len(rendah)} video di bawah {a.minimal}p, jangan naik produksi:")
        for n, t in rendah:
            print(f"  {t:5d}p  {n}")
    if masih_webm:
        muatan = sum(mb for _, mb in masih_webm)
        print(f"CATATAN: {len(masih_webm)} video masih berwadah webm ({muatan:.1f} MB); "
              f"wadah final mp4 (keputusan ARYA 8 Sep 2026). Gabung ulang dari master "
              f"H.264-nya: python manim/gabung_audio.py <nama-video> <Adegan> "
              f"--keluar <nama-video>.mp4")
        for n, mb in masih_webm:
            print(f"  {mb:6.1f} MB  {n}")
    if rendah:
        return 1
    print(f"OK: semua video materi di web/public/anim minimal {a.minimal}p")
    return 0


if __name__ == "__main__":
    sys.exit(main())
