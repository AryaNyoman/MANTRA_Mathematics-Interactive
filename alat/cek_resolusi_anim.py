"""Penjaga sebelum naik PRODUKSI: video materi wajib 1080p DAN berwadah WebM.

KEPUTUSAN ARYA 7 September 2026: SEMUA video materi memakai WebM. Alasannya
ukuran unduhan, bukan selera. Video Ruang 3D 1080p berwadah mp4 H.264 memakan
sekitar 14 MB untuk 85 detik, sedangkan video Statistika 1080p berwadah WebM
VP9 sekitar 3 MB untuk 115 detik: kira-kira enam kali lebih ringan per menit,
pada mutu gambar yang sama. Situs ini dibuka siswa lewat HP dan kuota.

Dijaga di sini, bukan diingat, sebab seluruh sesi ini membuktikan aturan yang
cuma ditulis di catatan akan terlewat. Cuplikan beranda dikecualikan: ia hiasan
halaman, bukan video materi.

Penjaga aslinya: tidak boleh ada video tinjauan 480p yang ikut tayang. Video 480p dan 1080p memakai NAMA BERKAS YANG SAMA di
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
    p.add_argument("--izinkan-mp4", action="store_true",
                   help="lewati pemeriksaan wadah, untuk peralihan saja")
    a = p.parse_args()
    rendah, bukan_webm = [], []
    for v in sorted(list(ANIM.glob("*.mp4")) + list(ANIM.glob("*.webm"))):
        if v.name.startswith("beranda-"):
            continue  # cuplikan beranda, bukan video materi
        t = tinggi(v)
        if t < a.minimal:
            rendah.append((v.name, t))
        if v.suffix != ".webm" and not a.izinkan_mp4:
            bukan_webm.append((v.name, v.stat().st_size / 1048576))
    if rendah:
        print(f"TOLAK: {len(rendah)} video di bawah {a.minimal}p, jangan naik produksi:")
        for n, t in rendah:
            print(f"  {t:5d}p  {n}")
    if bukan_webm:
        muatan = sum(mb for _, mb in bukan_webm)
        print(f"TOLAK: {len(bukan_webm)} video materi BUKAN WebM ({muatan:.1f} MB), "
              f"keputusan ARYA 7 Sep 2026:")
        for n, mb in bukan_webm:
            print(f"  {mb:6.1f} MB  {n}")
        print("  Ubah wadahnya: python manim/gabung_audio.py <topik> <Adegan> "
              "--keluar <topik>.webm")
    if rendah or bukan_webm:
        return 1
    print(f"OK: semua video materi di web/public/anim minimal {a.minimal}p dan berwadah WebM")
    return 0


if __name__ == "__main__":
    sys.exit(main())
