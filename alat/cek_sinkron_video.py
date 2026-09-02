"""Periksa apakah GAMBAR mendahului SUARA, dengan mengukur, bukan menonton.

    python alat/cek_sinkron_video.py <video.mp4> <topik>

Kenapa alat ini ada
-------------------
2 September 2026, ARYA: "subtitle dan suaranya telat saat menyebutkan
titik-titik itu, sekitar mulai detik ke 36". Ia benar. Titik hasil hitungan
mendarat di detik 30,95 padahal narator baru menyebut angkanya di detik 32,83.
Semua titik sekitar dua detik terlalu cepat.

Tidak satu pun gerbang yang ada bisa menangkapnya. `cek_kode` memeriksa tulisan,
`qc.periksa_adegan` memeriksa tabrakan dan potongan, `sinema.babak` memeriksa
apakah animasi MELEBIHI narasi. Tidak ada yang memeriksa apakah animasi
MENDAHULUI narasi, padahal itu justru yang merusak: penonton melihat jawabannya
sebelum pertanyaannya selesai diucapkan.

Cara kerjanya
-------------
Berkas `.vtt` sudah tahu detik keberapa tiap kalimat diucapkan. Jadi untuk tiap
kalimat yang menyebut sesuatu yang bisa dihitung di layar (misal "x = -2
memberi 4" harus menghasilkan SATU titik), alat ini mengambil frame tepat
sebelum kalimat itu MULAI dan tepat sebelum ia SELESAI, lalu menghitung
bendanya. Kalau bendanya sudah ada sebelum kalimatnya dimulai, gambar
mendahului suara dan alat ini berteriak.

Menghitung bendanya memakai warna, bukan pengenalan bentuk: tiap benda MATRA
punya warna dari daftar tema yang tetap, jadi bercak sewarna bisa dihitung
langsung. Sederhana, dan cukup untuk pertanyaan "sudah ada berapa".
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

AKAR = Path(__file__).resolve().parent.parent
LATAR = np.array([245, 241, 234])

# Warna tema yang dipakai sebagai penanda benda. Dari gl/tema.py.
WARNA = {
    "SOROT": (0x6A, 0x4C, 0x93),
    "AKSEN": (0xC2, 0x5E, 0x4D),
    "AKSEN2": (0x3A, 0x6E, 0xA5),
}


def jam_ke_detik(s: str) -> float:
    j, m, d = s.strip().split(":")
    return int(j) * 3600 + int(m) * 60 + float(d)


def baca_vtt(p: Path) -> list[tuple[float, float, str]]:
    """(mulai, selesai, kalimat) untuk tiap baris subtitle."""
    hasil, baris = [], p.read_text(encoding="utf-8").splitlines()
    for i, b in enumerate(baris):
        if "-->" not in b or i + 1 >= len(baris):
            continue
        a, z = b.split("-->")
        kalimat = re.sub(r"<[^>]+>", "", baris[i + 1]).strip()
        hasil.append((jam_ke_detik(a), jam_ke_detik(z), kalimat))
    return hasil


def frame(video: Path, detik: float, tujuan: Path) -> np.ndarray:
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-ss", f"{detik:.3f}", "-i", str(video),
         "-frames:v", "1", str(tujuan)],
        check=True,
    )
    return np.asarray(Image.open(tujuan).convert("RGB")).astype(int)


# Seluruh papan warna MATRA. Dipakai untuk MEMILAH, bukan sekadar
# membandingkan: satu piksel dihitung ungu hanya kalau ungu adalah warna
# TERDEKAT untuknya, bukan kalau ia kebetulan cukup dekat.
#
# Percobaan pertama memakai ambang jarak saja dan langsung salah: abu hangat
# REDUP (139, 131, 120) jaraknya 115 dari ungu SOROT, di bawah ambang 150,
# jadi angka-angka sumbu ikut terhitung sebagai benda. Alat pemeriksa yang
# salah lebih berbahaya daripada tidak punya alat, karena ia meyakinkan.
PAPAN = {
    "LATAR": (245, 241, 234),
    "TINTA": (31, 36, 48),
    "REDUP": (139, 131, 120),
    "AKSEN": (194, 94, 77),
    "AKSEN2": (58, 110, 165),
    "SOROT": (106, 76, 147),
}


def hitung_bercak(a: np.ndarray, rgb: tuple[int, int, int], min_px: int = 45) -> int:
    """Berapa bercak berwarna `rgb` ada di frame ini.

    Bercak yang lebih kecil dari `min_px` diabaikan: itu tepi huruf atau ujung
    garis yang kena kabur tepi, bukan benda.
    """
    nama = [k for k in PAPAN]
    warna = np.array([PAPAN[k] for k in nama])
    jarak = np.abs(a[:, :, None, :] - warna[None, None, :, :]).sum(axis=3)
    terdekat = jarak.argmin(axis=2)
    incar = nama.index(next(k for k, v in PAPAN.items() if tuple(v) == tuple(rgb)))
    topeng = terdekat == incar
    lab, n = ndimage.label(topeng)
    if n == 0:
        return 0
    ukuran = ndimage.sum(topeng, lab, range(1, n + 1))
    return int((ukuran >= min_px).sum())


def utama() -> int:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("video")
    p.add_argument("topik")
    p.add_argument("--warna", default="SOROT", choices=sorted(WARNA))
    p.add_argument("--pola", default=r"^x = (-?\d+) memberi",
                   help="kalimat yang tiap kemunculannya menambah satu benda")
    a = p.parse_args()

    video = Path(a.video)
    vtt = AKAR / "web" / "public" / "anim" / f"{a.topik}.vtt"
    if not video.exists():
        print(f"video tidak ada: {video}")
        return 2
    if not vtt.exists():
        print(f"subtitle tidak ada: {vtt}. Jalankan buat_subtitle.py dulu.")
        return 2

    cocok = [(m, s, t) for m, s, t in baca_vtt(vtt) if re.match(a.pola, t)]
    if not cocok:
        print(f"tidak ada kalimat yang cocok dengan pola {a.pola!r}")
        return 2

    rgb = WARNA[a.warna]
    print(f"video   : {video}")
    print(f"subtitle: {vtt.name}, {len(cocok)} kalimat cocok")
    print(f"warna   : {a.warna} {rgb}\n")
    print(f"{'kalimat':<26} {'mulai':>7} {'sebelum':>8} {'sesudah':>8}  hasil")

    salah = 0
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / "f.png"
        for i, (mulai, selesai, teks) in enumerate(cocok, start=1):
            sebelum = hitung_bercak(frame(video, max(0.0, mulai - 0.20), png), rgb)
            sesudah = hitung_bercak(frame(video, max(0.0, selesai - 0.15), png), rgb)
            # Sebelum kalimat ke-i diucapkan harus ada i-1 benda; sesudahnya i.
            ok = (sebelum == i - 1) and (sesudah == i)
            if not ok:
                salah += 1
            print(f"{teks[:26]:<26} {mulai:7.2f} {sebelum:8d} {sesudah:8d}  "
                  f"{'ok' if ok else 'SALAH, harusnya %d lalu %d' % (i - 1, i)}")

    print()
    if salah:
        print(f">>> {salah} dari {len(cocok)} kalimat TIDAK sinkron.")
        print(">>> Benda muncul sebelum kalimatnya diucapkan, atau tertinggal.")
        print(">>> Ikat animasinya ke jam subtitle, jangan disusun dari run_time.")
        return 1
    print(f">>> {len(cocok)} kalimat sinkron: tiap benda muncul saat disebut.")
    return 0


if __name__ == "__main__":
    sys.exit(utama())
