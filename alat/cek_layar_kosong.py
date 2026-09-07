"""Mencari detik-detik yang AREA KERJANYA benar-benar kosong di video materi.

    python alat/cek_layar_kosong.py turunan                 semua video satu topik
    python alat/cek_layar_kosong.py web/public/anim/x.webm  satu berkas
    python alat/cek_layar_kosong.py turunan --rinci         tampilkan isi tiap cuplikan

KENAPA ALAT INI ADA
Gerbang `sinema.babak` sudah menghitung berapa lama sebuah babak DIAM, dan itu
menangkap banyak hal. Tetapi ia tidak bisa membedakan layar yang diam karena
menahan gambar dari layar yang diam karena TIDAK ADA APA-APA. Pada 8 Sep 2026
babak "berubah" video Materi 07 Turunan membersihkan layarnya di ujung babak
lalu menyisakan 5,5 detik tanpa satu benda pun, dan gerbang diam meloloskannya
karena animasinya sudah 7,9 detik dari 12 detik narasi. Lembar kontak juga
melewatkannya: lembar kontak memuat belasan frame pilihan, dan frame kosong
justru jatuh di detik yang tidak dipilih.

Yang diukur: berapa persen piksel yang BUKAN warna latar, DI LUAR jalur
identitas, panel rumus, dan jalur subtitle. Ketiga jalur itu dikeluarkan sebab
isinya memang menetap sepanjang video; kalau ikut dihitung, layar yang kosong
melompong tetap terlihat "berisi" karena panelnya penuh.

BATAS JALURNYA DIBACA DARI `manim/gl/sinema.py`, BUKAN DISALIN KE SINI.
Salinan angka akan basi diam-diam begitu tata letaknya digeser, dan alat yang
mengukur kotak yang salah lebih berbahaya daripada tidak ada alat. Kalau
angkanya tidak ketemu, alat ini BERHENTI, bukan memakai tebakan.

CARA MENILAI PANJANGNYA
Dicuplik dua kali sedetik. Deretan n cuplikan kosong berturut-turut MEMBUKTIKAN
layar kosong selama (n-1) * 0,5 detik, jadi deret 5 cuplikan membuktikan 2,0
detik. Yang dilaporkan hanya yang terbukti LEBIH dari 1,5 detik, supaya pudaran
antarbabak yang wajar (di bawah satu setengah detik) tidak ikut ditandai.
"""

from __future__ import annotations

import argparse
import ast
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

AKAR = Path(__file__).resolve().parents[1]

# Bingkai ManimGL bawaan proyek ini: tinggi 8 satuan, 16:9.
TINGGI_BINGKAI = 8.0
LEBAR_BINGKAI = TINGGI_BINGKAI * 16 / 9

CUPLIK_PER_DETIK = 2
LEBAR_CUPLIK, TINGGI_CUPLIK = 240, 135

# Piksel dianggap BUKAN latar kalau kecerahannya beda lebih dari ini dari warna
# yang paling sering muncul. 12 dipilih supaya tepi huruf yang dihaluskan tetap
# terhitung, tetapi noise kompresi tidak.
BEDA_LATAR = 12

# Di bawah ini area kerja dianggap kosong. Bukan nol: satu piksel nyasar dari
# kompresi video tidak boleh membuat frame kosong terlihat berisi.
AMBANG_KOSONG = 0.10        # persen dari piksel area kerja

# Kosong yang TERBUKTI lebih lama dari ini dilaporkan (detik).
BATAS_LAPOR = 1.5


def zona_dari_sinema() -> dict[str, tuple[float, float, float, float]]:
    """Batas jalur HUD, dibaca langsung dari sumbernya."""
    berkas = AKAR / "manim" / "gl" / "sinema.py"
    isi = berkas.read_text(encoding="utf-8")
    hasil = {}
    for nama in ("ZONA_IDENTITAS", "ZONA_RUMUS", "ZONA_SUBTITLE"):
        m = re.search(rf"^{nama}\s*=\s*(\([^)]*\))", isi, re.M)
        if not m:
            raise SystemExit(
                f"GAGAL: {nama} tidak ditemukan di {berkas}. Alat ini membaca batas "
                f"jalur HUD dari sana; kalau namanya berubah, perbaiki alat ini, "
                f"jangan menyalin angkanya ke sini.")
        hasil[nama] = tuple(float(x) for x in ast.literal_eval(m.group(1)))
    kiri, kanan, _, _ = hasil["ZONA_SUBTITLE"]
    lebar_terbaca = kanan - kiri
    if abs(lebar_terbaca - LEBAR_BINGKAI) > 0.05:
        raise SystemExit(
            f"GAGAL: lebar bingkai dari ZONA_SUBTITLE {lebar_terbaca:.2f} tidak cocok "
            f"dengan {LEBAR_BINGKAI:.2f} yang dipakai alat ini. Bingkainya berubah; "
            f"perbaiki TINGGI_BINGKAI di alat ini.")
    return hasil


def ke_piksel(zona, lebar, tinggi):
    """Kotak dunia (kiri, kanan, bawah, atas) jadi kotak piksel (x0, x1, y0, y1)."""
    kiri, kanan, bawah, atas = zona
    x0 = int(round((kiri + LEBAR_BINGKAI / 2) / LEBAR_BINGKAI * lebar))
    x1 = int(round((kanan + LEBAR_BINGKAI / 2) / LEBAR_BINGKAI * lebar))
    # Sumbu y layar terbalik: dunia +4 di baris 0.
    y0 = int(round((TINGGI_BINGKAI / 2 - atas) / TINGGI_BINGKAI * tinggi))
    y1 = int(round((TINGGI_BINGKAI / 2 - bawah) / TINGGI_BINGKAI * tinggi))
    return max(0, x0), min(lebar, x1), max(0, y0), min(tinggi, y1)


def isi_tiap_cuplikan(video: Path, zona) -> np.ndarray:
    """Persen piksel berisi di AREA KERJA, satu angka per cuplikan."""
    kerja = Path(tempfile.mkdtemp(prefix="cek_kosong_"))
    try:
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(video),
             "-vf", f"fps={CUPLIK_PER_DETIK},scale={LEBAR_CUPLIK}:{TINGGI_CUPLIK}",
             str(kerja / "f%06d.png")],
            check=True,
        )
        berkas = sorted(kerja.glob("*.png"))
        if not berkas:
            raise SystemExit(f"GAGAL: tidak ada frame terbaca dari {video}")
        kotak = [ke_piksel(zona[n], LEBAR_CUPLIK, TINGGI_CUPLIK)
                 for n in ("ZONA_IDENTITAS", "ZONA_RUMUS", "ZONA_SUBTITLE")]
        persen = []
        for f in berkas:
            a = np.asarray(Image.open(f).convert("L"), dtype=np.int16)
            latar = int(np.bincount(a.ravel(), minlength=256).argmax())
            berisi = np.abs(a - latar) > BEDA_LATAR
            for x0, x1, y0, y1 in kotak:
                berisi[y0:y1, x0:x1] = False
            persen.append(float(berisi.mean()) * 100.0)
        return np.array(persen)
    finally:
        shutil.rmtree(kerja, ignore_errors=True)


def rentang_kosong(persen: np.ndarray) -> list[tuple[float, float, float]]:
    """Rentang yang TERBUKTI kosong lebih lama dari BATAS_LAPOR."""
    kosong = persen < AMBANG_KOSONG
    hasil, i = [], 0
    while i < len(kosong):
        if not kosong[i]:
            i += 1
            continue
        j = i
        while j < len(kosong) and kosong[j]:
            j += 1
        # n cuplikan berturut-turut membuktikan (n-1) langkah kosong.
        terbukti = (j - i - 1) / CUPLIK_PER_DETIK
        if terbukti > BATAS_LAPOR:
            hasil.append((i / CUPLIK_PER_DETIK, (j - 1) / CUPLIK_PER_DETIK, terbukti))
        i = j
    return hasil


def periksa(video: Path, rinci: bool = False) -> int:
    zona = zona_dari_sinema()
    persen = isi_tiap_cuplikan(video, zona)
    temuan = rentang_kosong(persen)
    lama = len(persen) / CUPLIK_PER_DETIK
    tanda = "ok" if not temuan else f"{len(temuan)} KOSONG"
    print(f"  {tanda:10s} {video.name:34s} {lama:6.1f} detik, "
          f"isi area kerja rata-rata {persen.mean():.2f} persen")
    for a, b, t in temuan:
        print(f"      {a:6.1f} sampai {b:6.1f} detik: {t:.1f} detik TANPA APA PUN "
              f"di luar identitas, panel, dan jalur subtitle")
    if rinci:
        for k, p in enumerate(persen):
            print(f"      {k / CUPLIK_PER_DETIK:6.1f} detik  {p:5.2f} persen")
    return len(temuan)


def cari_video(sasaran: str) -> list[Path]:
    calon = Path(sasaran)
    if calon.exists() and calon.is_file():
        return [calon]
    folder = AKAR / "web" / "public" / "anim"
    berkas = sorted(p for p in folder.iterdir()
                    if p.suffix in (".webm", ".mp4") and p.name.startswith(sasaran))
    if not berkas:
        raise SystemExit(
            f"GAGAL: tidak ada berkas video yang namanya diawali '{sasaran}' di {folder}, "
            f"dan '{sasaran}' juga bukan berkas yang ada.")
    return berkas


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("sasaran", help="nama topik (mis. turunan) atau path satu berkas video")
    p.add_argument("--rinci", action="store_true", help="tampilkan isi tiap cuplikan")
    a = p.parse_args()

    berkas = cari_video(a.sasaran)
    print(f"memindai {len(berkas)} video, {CUPLIK_PER_DETIK} cuplikan per detik, "
          f"melaporkan kosong lebih dari {BATAS_LAPOR} detik\n")
    total = sum(periksa(v, a.rinci) for v in berkas)
    print()
    if total == 0:
        print(f"SEMUA LOLOS: {len(berkas)} video, tidak ada layar kosong berkepanjangan.")
        return 0
    print(f"{total} rentang layar kosong. Beri kejadian pada benda yang sedang "
          f"disebut narator, atau pindahkan pembersihan layar ke awal babak berikutnya.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
