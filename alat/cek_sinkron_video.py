"""Periksa apakah GAMBAR mendahului SUARA, dengan mengukur, bukan menonton.

    python alat/cek_sinkron_video.py <video.mp4> <topik> --pola "<awalan kalimat>"

Berlaku untuk SEMUA topik MATRA, bukan cuma Grafik Fungsi. Yang membedakan
antar topik cuma dua hal, dan keduanya lewat parameter: berkas `.vtt` topiknya
(dipilih lewat argumen `topik`, atau `--vtt` kalau berkasnya di tempat lain) dan
pola kalimat yang tiap kemunculannya menambah satu benda di layar (`--pola`).

Contoh pemakaian per topik:

    # Grafik Fungsi: tiap "x = -2 memberi 4" menambah satu titik ungu
    python alat/cek_sinkron_video.py media/uji-480p/grafik6-transformasi.mp4 \
        grafik6-transformasi --pola "^x = (-?\\d+) memberi" --warna SOROT

    # Statistika: tiap "Data ke-3 adalah ..." menambah satu batang
    python alat/cek_sinkron_video.py media/uji-480p/statistika5-pemusatan.mp4 \
        statistika5-pemusatan --pola "^Data ke-\\d+" --warna AKSEN2

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

`durasi.json` sengaja TIDAK dibaca. Ia cuma tahu panjang tiap segmen narasi,
sedangkan yang diperlukan di sini adalah detik keberapa tiap KALIMAT mulai, dan
angka itu sudah ada di `.vtt` dalam bentuk waktu mutlak. Membaca keduanya cuma
menambah satu sumber waktu yang bisa berbeda sendiri.

Menghitung bendanya memakai warna, bukan pengenalan bentuk: tiap benda MATRA
punya warna dari daftar tema yang tetap, jadi bercak sewarna bisa dihitung
langsung. Sederhana, dan cukup untuk pertanyaan "sudah ada berapa".
"""
from __future__ import annotations

import argparse
import colorsys
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

AKAR = Path(__file__).resolve().parent.parent
TEMA = AKAR / "manim" / "gl" / "tema.py"


def baca_palet() -> dict[str, tuple[int, int, int]]:
    """Ambil palet langsung dari `manim/gl/tema.py`, jangan disalin ke sini.

    Versi pertama menyalin keenam warna sebagai angka. Salinan itu lalu
    MELESET: LATAR tertulis (245, 241, 234) padahal tema memakai #F7F3EE, yaitu
    (247, 243, 238). Untuk alat yang menggolongkan piksel ke warna TERDEKAT,
    palet yang meleset berarti penggolongan yang meleset, dan alat pemeriksa
    yang salah lebih berbahaya daripada tidak punya alat, karena ia meyakinkan.

    Dibaca sebagai teks, bukan `import`: `tema.py` memuat seluruh manimlib, dan
    alat pemeriksa tidak perlu membuka OpenGL cuma untuk enam angka.
    """
    if not TEMA.exists():
        raise SystemExit(f"berkas tema tidak ada: {TEMA}")
    palet = {}
    for nama, heks in re.findall(
        r'^(LATAR|TINTA|REDUP|AKSEN2?|SOROT)\s*=\s*"#([0-9A-Fa-f]{6})"',
        TEMA.read_text(encoding="utf-8"), re.M,
    ):
        palet[nama] = tuple(int(heks[i:i + 2], 16) for i in (0, 2, 4))
    kurang = {"LATAR", "TINTA", "REDUP", "AKSEN", "AKSEN2", "SOROT"} - set(palet)
    if kurang:
        raise SystemExit(f"warna tema tidak terbaca dari {TEMA}: {sorted(kurang)}")
    return palet


PAPAN = baca_palet()

# Warna yang masuk akal dipakai sebagai penanda BENDA: ketiganya berwarna kuat
# sehingga ronanya khas. LATAR jelas tidak. REDUP dipakai garis bantu dan angka
# sumbu. TINTA hampir kelabu, ronanya goyah, dan ia dipakai SEMUA tulisan.
WARNA_BENDA = ("SOROT", "AKSEN", "AKSEN2")


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


def hitung_bercak(a: np.ndarray, rgb: tuple[int, int, int], min_px: int = 45,
                  toleransi: float = 0.055, min_sat: float = 0.18) -> int:
    """Berapa bercak berwarna `rgb` ada di frame ini, dihitung dari RONA.

    Bercak yang lebih kecil dari `min_px` diabaikan: itu tepi huruf atau ujung
    garis yang kena kabur tepi, bukan benda.

    KENAPA RONA, BUKAN WARNA TERDEKAT. Versi pertama menggolongkan tiap piksel
    ke warna palet yang paling dekat. Cara itu GAGAL pada benda bercahaya, dan
    kegagalannya diam: bola penanda dibuat dengan `set_shading`, jadi sebagian
    besar pikselnya jadi ungu gelap, dan ungu gelap lebih dekat ke TINTA
    (31, 36, 48) daripada ke ungu SOROT (106, 76, 147). Akibatnya titik yang
    JELAS TERLIHAT di layar terhitung nol, lalu alat ini melaporkan video yang
    sinkron sebagai tidak sinkron. Diukur 3 September 2026 pada
    grafik6-transformasi detik 38,14: satu titik ungu di layar, terhitung 0.

    Pencahayaan mengubah GELAP TERANGnya, bukan ronanya. Jadi yang dipakai
    sekarang rona, dengan syarat warnanya cukup pekat (`min_sat`) supaya latar
    krem dan garis abu tidak ikut terhitung. Diuji pada tujuh detik di
    grafik6-transformasi: 0, 1, 1, 2, 3, 4, 5 titik, semuanya tepat.
    """
    hsv = np.asarray(Image.fromarray(a.astype(np.uint8)).convert("HSV")).astype(float) / 255.0
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    rona = colorsys.rgb_to_hsv(*[c / 255 for c in rgb])[0]
    beda = np.abs(h - rona)
    beda = np.minimum(beda, 1.0 - beda)   # rona melingkar: 0,99 dan 0,01 bertetangga
    topeng = (beda < toleransi) & (s > min_sat) & (v < 0.90)
    lab, n = ndimage.label(topeng)
    if n == 0:
        return 0
    ukuran = ndimage.sum(topeng, lab, range(1, n + 1))
    return int((ukuran >= min_px).sum())


def utama() -> int:
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("video")
    p.add_argument("topik", help="nama topik, dipakai mencari "
                                 "web/public/anim/<topik>.vtt")
    p.add_argument("--vtt", default=None,
                   help="berkas .vtt langsung, kalau letaknya bukan yang biasa")
    p.add_argument("--warna", default="SOROT", choices=sorted(WARNA_BENDA))
    # TIDAK ADA nilai bawaan. Sebelumnya polanya bernilai bawaan kalimat Grafik
    # Fungsi ("x = -2 memberi"), dan topik lain yang menjalankannya tanpa
    # --pola cuma dapat "tidak ada kalimat yang cocok" tanpa tahu sebabnya.
    p.add_argument("--pola", default=None,
                   help="regex awal kalimat yang tiap kemunculannya menambah "
                        r'satu benda, mis. "^x = (-?\d+) memberi"')
    p.add_argument("--awal", type=int, default=0,
                   help="berapa benda sewarna yang SUDAH ada sebelum kalimat "
                        "pertama. Hitung juga TULISAN sewarna, bukan cuma "
                        "bendanya: pada grafik3-puncak, label puncak (1, 4) "
                        "berwarna SOROT sama seperti titiknya, jadi --awal 2, "
                        "bukan 1. Kalau semua baris meleset dengan selisih "
                        "yang sama, hampir pasti angka inilah yang kurang")
    a = p.parse_args()

    if not a.pola:
        print("--pola wajib diisi: tiap topik punya kalimat penambah benda "
              "sendiri.\nContoh:")
        print(r'  Grafik Fungsi : --pola "^x = (-?\d+) memberi" --warna SOROT')
        print(r'  Statistika    : --pola "^Data ke-\d+"        --warna AKSEN2')
        print("Lihat kalimat yang tersedia di "
              f"web/public/anim/{a.topik}.vtt")
        return 2

    video = Path(a.video)
    vtt = Path(a.vtt) if a.vtt else AKAR / "web" / "public" / "anim" / f"{a.topik}.vtt"
    if not video.exists():
        print(f"video tidak ada: {video}")
        return 2
    if not vtt.exists():
        print(f"subtitle tidak ada: {vtt}. Jalankan buat_subtitle.py dulu.")
        return 2

    cocok = [(m, s, t) for m, s, t in baca_vtt(vtt) if re.match(a.pola, t)]
    if not cocok:
        print(f"tidak ada kalimat yang cocok dengan pola {a.pola!r} di {vtt.name}.")
        print("Kalimat yang ada di berkas itu:")
        for _, _, t in baca_vtt(vtt)[:12]:
            print(f"  {t}")
        return 2

    rgb = PAPAN[a.warna]
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
            harus_sebelum, harus_sesudah = a.awal + i - 1, a.awal + i
            ok = (sebelum == harus_sebelum) and (sesudah == harus_sesudah)
            if not ok:
                salah += 1
            kabar = "ok" if ok else (
                "SALAH, harusnya %d lalu %d" % (harus_sebelum, harus_sesudah))
            print(f"{teks[:26]:<26} {mulai:7.2f} {sebelum:8d} {sesudah:8d}  {kabar}")

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
