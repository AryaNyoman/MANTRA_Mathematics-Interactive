"""Membuat poster video dari sebuah frame, dan MENOLAK frame yang kosong.

    python alat/buat_poster.py transformasi3-rotasi 121
    python alat/buat_poster.py --periksa            # nilai semua poster yang ada

KENAPA ALAT INI ADA
Pada 6 September 2026 MASTER menemukan tiga cacat sekaligus di poster topik
Transformasi Geometri saat memasangnya ke situs: poster Materi 06 dan Materi 07
berukuran persis sama, 2.635 byte, dan keduanya ternyata GAMBAR RATA SATU WARNA;
poster Materi 09 tidak ada sama sekali.

Poster kosong lolos sebab tidak ada satu pun yang memeriksanya. Ia terbentuk
kalau frame diambil pada detik yang kebetulan jatuh di kartu judul yang sudah
memudar, di jeda antarbabak, atau di tengah `lahir_rumus` yang meredupkan
seluruh dunia. Ketiganya menghasilkan berkas jpg yang sah, berukuran wajar,
dan sama sekali tidak berguna.

DUA UKURAN, SEBAB SATU SAJA BISA DIBOHONGI
1. RENTANG TERANG. Gambar rata satu warna punya rentang nol. Ambangnya 40 dari
   255: cukup longgar untuk gambar berlatar kertas yang isinya cuma garis tipis,
   cukup ketat untuk menolak bidang kosong.
2. LUAS YANG BUKAN LATAR. Sebuah frame bisa punya rentang lebar hanya karena
   sisa tulisan yang belum habis memudar. Karena itu dihitung juga berapa persen
   piksel yang berbeda jauh dari warna paling sering.

ANGKANYA DIKALIBRASI KE GAMBAR NYATA, BUKAN DIKARANG
Percobaan pertama memakai ambang 1,5 persen dan menolak SELURUH poster proyek
ini, termasuk yang jelas-jelas bagus. Sebabnya video MANTRA adalah gambar garis
di atas kertas: tintanya memang cuma satu persen layar. Alat mutu yang menolak
semuanya sama tidak bergunanya dengan alat yang meloloskan semuanya.

Yang terukur pada berkas yang sungguh ada:

    0,00 persen  poster Materi 06 dan 07: rata satu warna, benar-benar kosong
    0,27 persen  vektor6-sambung: bidang petak kosong, tanpa satu vektor pun
    0,75 persen  transformasi2-cermin-garis: bagus
    0,91 persen  transformasi1-setiap-titik: bagus

Jadi ambang TOLAK 0,35 persen memisahkan yang kosong dari yang berisi, dan
ambang PERINGATAN 0,60 persen menandai yang perlu dilihat manusia. Poster
vektor6 sengaja dibiarkan tertangkap: ia memang poster yang buruk untuk video
tentang menyambung vektor, walaupun bukan milik topik ini untuk diperbaiki.

Alat ini tidak memilih detiknya. Memilih detik adalah keputusan tentang apa
yang layak mewakili videonya, dan itu tugas manusia yang menonton, bukan tugas
skrip. Yang dikerjakan alat ini cuma menolak pilihan yang jelas salah.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
# Video sumber dicari berurutan: yang TAYANG lebih dulu, baru versi tinjauan.
# Gelombang 3 (render akhir 1080p) menaruh videonya di web/public/anim, dan
# posternya harus diambil dari video yang benar-benar dilihat siswa. Sebelum
# ini folder 480p dipatok mati, sehingga sesi gelombang 3 mendapat
# "tidak ada videonya" padahal videonya ada, cuma di tempat lain.
TUJUAN = AKAR / "web" / "public" / "anim"
SUMBER_URUT = (TUJUAN, AKAR / "media" / "uji-480p", AKAR / "media")


def cari_sumber(topik: str) -> Path | None:
    for folder in SUMBER_URUT:
        for akhiran in (".mp4", ".webm"):
            calon = folder / f"{topik}{akhiran}"
            if calon.exists():
                return calon
    return None

AMBANG_RENTANG = 40          # dari 255
AMBANG_TOLAK = 0.0035        # 0,35 persen piksel bukan latar: di bawah ini kosong
AMBANG_TIPIS = 0.0060        # 0,60 persen: masih lolos, tetapi minta dilihat
JARAK_LATAR = 24             # beda terang yang dianggap "bukan latar"


def nilai(jalur: Path) -> tuple[str, str]:
    """Nilai satu poster. Kembalikan (vonis, keterangan).

    Vonis: "ok", "tipis" (lolos tetapi minta dilihat), atau "cacat".
    """
    from PIL import Image
    im = Image.open(jalur).convert("L")
    lo, hi = im.getextrema()
    rentang = hi - lo
    hist = im.histogram()
    modus = max(range(256), key=lambda i: hist[i])
    bukan_latar = sum(n for i, n in enumerate(hist) if abs(i - modus) > JARAK_LATAR)
    bagian = bukan_latar / (im.width * im.height)
    ket = f"rentang {rentang:3d}, bukan latar {bagian * 100:.2f} persen"
    if rentang < AMBANG_RENTANG:
        return "cacat", f"KOSONG: {ket}"
    if bagian < AMBANG_TOLAK:
        return "cacat", f"NYARIS KOSONG: {ket}"
    if bagian < AMBANG_TIPIS:
        return "tipis", f"{ket} (tipis, lihat sendiri)"
    return "ok", ket


def buat(topik: str, detik: float) -> int:
    video = cari_sumber(topik)
    if video is None:
        daftar = "\n  ".join(str(f / f"{topik}.mp4") for f in SUMBER_URUT)
        print(f"tidak ada videonya. Dicari di:\n  {daftar}")
        return 1
    print(f"sumber   {video.relative_to(AKAR)}")
    TUJUAN.mkdir(parents=True, exist_ok=True)
    sementara = TUJUAN / f".{topik}.calon.jpg"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-ss", str(detik),
         "-i", str(video), "-frames:v", "1", "-q:v", "3", str(sementara)],
        check=True,
    )
    vonis, ket = nilai(sementara)
    if vonis == "cacat":
        sementara.unlink(missing_ok=True)
        print(f"DITOLAK  {topik} detik {detik}: {ket}")
        print("Pilih detik lain: hindari kartu judul, jeda antarbabak, dan")
        print("tengah `lahir_rumus` yang meredupkan seluruh dunia.")
        return 1
    akhir = TUJUAN / f"{topik}.jpg"
    sementara.replace(akhir)
    print(f"JADI     {topik} detik {detik} -> {akhir.name}  "
          f"({akhir.stat().st_size} B, {ket})")
    return 0


def periksa_semua(saring: str | None = None) -> int:
    buruk = tipis = 0
    for p in sorted(TUJUAN.glob("*.jpg")):
        if saring and saring not in p.name:
            continue
        vonis, ket = nilai(p)
        buruk += vonis == "cacat"
        tipis += vonis == "tipis"
        print(f"  {vonis.upper():6s} {p.name:34s} {ket}")
    print()
    if buruk:
        print(f"{buruk} poster kosong atau nyaris kosong"
              + (f", {tipis} tipis" if tipis else ""))
        return 1
    print("SEMUA LOLOS" + (f", {tipis} tipis dan minta dilihat sendiri" if tipis else ""))
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("topik", nargs="?")
    p.add_argument("detik", nargs="?", type=float)
    p.add_argument("--periksa", action="store_true",
                   help="nilai semua poster yang sudah ada, jangan membuat apa pun")
    p.add_argument("--saring", help="dengan --periksa: hanya nama yang memuat teks ini")
    a = p.parse_args()
    if a.periksa:
        return periksa_semua(a.saring)
    if not a.topik or a.detik is None:
        p.print_help()
        return 1
    return buat(a.topik, a.detik)


if __name__ == "__main__":
    sys.exit(main())
