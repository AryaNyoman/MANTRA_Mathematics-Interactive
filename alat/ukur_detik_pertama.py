"""Ukur "DETIK PERTAMA BERGERAK": jarak dari akhir kartu judul sampai benda
pertama di layar bergerak atau berubah.

    python alat/ukur_detik_pertama.py media/uji-480p/statistika6-pencilan.mp4
    python alat/ukur_detik_pertama.py --judul 3.2 media/uji-480p/*.mp4
    python alat/ukur_detik_pertama.py --uji-alatnya

Kenapa alat ini ada
-------------------
Aturan STANDAR 4 September 2026, lahir dari Vektor 06: sesudah pembuka 3D
dipotong, dua puluh lima detik pertama videonya jadi bidang kosong dengan satu
benda diam sementara narator bercerita. Kekosongan cuma pindah dimensi. Batasnya
sekarang LIMA DETIK, dan kartu judul TIDAK dihitung sebagai gerakan.

Cara mengukurnya
----------------
Panjang kartu judul TIDAK ditebak dari gambar. Versi pertama alat ini mencoba
mengenalinya dari pita atas layar, dan meleset di Materi 06: sesudah orangnya
dibesarkan, kepala mereka masuk pita judul, jadi pita itu tidak pernah kosong
dan alatnya melapor "judul selesai 19,50 detik". Sekarang panjangnya diberikan
(`--judul`, bawaan 3,2 detik = `sinema.judul_pembuka(lama=3.2)` yang dipakai
semua adegan Statistika), dan alat ini cuma mengukur SESUDAH itu.

Frame diambil 8 kali per detik. Jalur subtitle di kaki layar diabaikan sebab
subtitle tidak dibakar ke video. Selisih dihitung antar frame berurutan; frame
pertama yang berubah melebihi ambang adalah "benda pertama bergerak".
"""

from __future__ import annotations

import argparse
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

FPS = 8
LAMA_UKUR = 25.0          # detik pertama yang diperiksa
AMBANG = 0.0008           # bagian piksel yang berubah, 0,08 persen
BATAS_STANDAR = 5.0       # detik, aturan STANDAR 4 Sep 2026
JALUR_SUBTITLE = 0.82     # bagian bawah gambar yang diabaikan


def ambil_frame(video: Path, keluar: Path) -> list[Path]:
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(video), "-t", str(LAMA_UKUR),
         "-vf", f"fps={FPS},scale=320:-1", "-f", "image2", str(keluar / "f%04d.png")],
        check=True,
    )
    return sorted(keluar.glob("f*.png"))


def ukur(video: Path, lama_judul: float) -> tuple[float | None, str]:
    """Kembalikan (detik sejak kartu judul selesai sampai ada yang berubah, catatan)."""
    with tempfile.TemporaryDirectory() as d:
        berkas = ambil_frame(video, Path(d))
        if len(berkas) < 3:
            return None, "video terlalu pendek"
        gambar = [np.asarray(Image.open(p).convert("L"), dtype=np.int16) for p in berkas]
        batas_bawah = int(gambar[0].shape[0] * JALUR_SUBTITLE)
        mulai = max(1, int(round(lama_judul * FPS)))
        for i in range(mulai + 1, len(gambar)):
            beda = np.abs(gambar[i] - gambar[i - 1])[:batas_bawah]
            if (beda > 12).sum() / beda.size > AMBANG:
                return (i - mulai) / FPS, "ok"
        return None, f"tidak ada gerakan dalam {LAMA_UKUR:.0f} detik"


def uji_alatnya() -> int:
    """Tanam kerusakan sengaja: alat yang tidak bisa gagal tidak membuktikan apa pun."""
    with tempfile.TemporaryDirectory() as d:
        d = Path(d)
        latar = np.full((180, 320), 244, dtype=np.uint8)
        # 3,2 detik judul, lalu 9 detik BEKU, baru sebuah kotak muncul.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40            # kartu judul
            if t >= 3.2 + 9.0:
                g[80:120, 120:200] = 60          # benda pertama, telat 9 detik
            Image.fromarray(g).save(d / f"f{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "f%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "beku.mp4")], check=True)
        jeda, catatan = ukur(d / "beku.mp4", 3.2)
        print(f"  video beku bikinan  : jeda {jeda}  ({catatan})")
        if jeda is None or jeda < BATAS_STANDAR:
            print("  GAGAL: alatnya tidak menangkap kebekuan 9 detik yang sengaja ditanam")
            return 1

        # Kendali kedua: gerak langsung sesudah judul, harus dinyatakan ok.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40
            if t >= 3.4:
                lebar = min(200, int((t - 3.4) * 60) + 20)
                g[80:120, 120:120 + lebar] = 60
            Image.fromarray(g).save(d / f"g{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "g%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "hidup.mp4")], check=True)
        jeda2, catatan2 = ukur(d / "hidup.mp4", 3.2)
        print(f"  video hidup bikinan : jeda {jeda2}  ({catatan2})")
        if jeda2 is None or jeda2 > BATAS_STANDAR:
            print("  GAGAL: alatnya melapor cacat pada video yang sebenarnya bergerak")
            return 1
    print("  UJI ALAT LOLOS: menangkap yang beku, membiarkan yang bergerak")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="Ukur detik pertama bergerak")
    p.add_argument("video", nargs="*", type=Path)
    p.add_argument("--judul", type=float, default=3.2, help="panjang kartu judul (detik)")
    p.add_argument("--uji-alatnya", action="store_true", help="uji alatnya sendiri")
    a = p.parse_args()
    if a.uji_alatnya:
        return uji_alatnya()
    if not a.video:
        p.print_help()
        return 2
    buruk = 0
    print(f"{'video':<34} {'gerak pertama':>14}  vonis")
    for v in a.video:
        jeda, catatan = ukur(v, a.judul)
        if jeda is None:
            print(f"{v.stem:<34} {'-':>14}  {catatan}")
            buruk += 1
            continue
        lewat = jeda > BATAS_STANDAR
        buruk += lewat
        print(f"{v.stem:<34} {jeda:>13.2f}s  {'LEWAT BATAS' if lewat else 'ok'}")
    print(f"\n{len(a.video) - buruk} dari {len(a.video)} memenuhi batas {BATAS_STANDAR} detik")
    return 1 if buruk else 0


if __name__ == "__main__":
    raise SystemExit(main())
