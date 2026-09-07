"""Memeriksa berkas pendamping tiap video: subtitle dan poster.

    python alat/cek_aset_video.py transformasi
    python alat/cek_aset_video.py              # semua topik yang ada videonya

KENAPA ALAT INI ADA
Pada 6 September 2026 MASTER menemukan dua cacat sekaligus saat memasang video
Transformasi Geometri ke situs, dan keduanya lolos dari SEMUA gerbang yang ada:

1. SUBTITLE BASI. Naskah video 05 dan 06 diperpanjang dari 77 dan 81 detik jadi
   144 dan 143, tetapi berkas `.vtt`-nya tidak ikut dibuat ulang. Akibatnya
   subtitle berhenti di tengah video: penonton kehilangan separuh terakhir
   kalimatnya. Videonya sendiri benar, audionya benar, dan tidak ada satu pun
   alat yang membandingkan keduanya dengan panjang videonya.
2. POSTER KOSONG. Dua poster berukuran persis sama, 2.635 byte, dan keduanya
   gambar rata satu warna. Satu lagi tidak ada sama sekali.

3. POTONGAN SUARA BASI. Naskah yang diperpanjang menggeser penomoran segmennya,
   dan `buat_narasi.py` menulis berkas baru tanpa membuang yang lama. Tiga belas
   berkas tertinggal di lima video, dan penomorannya BENTROK: `07-luas.mp3` yang
   basi berdampingan dengan `07-aturan.mp3` yang sah. Tidak ada yang membacanya
   (`gabung_audio.py` dan adegannya membaca `durasi.json`), tetapi sesi
   berikutnya yang membuka folder itu akan salah mengira segmennya masih ada.
   Itu sudah terjadi sekali pada video 03, 5 September.

Ketiga cacat itu punya bentuk yang sama: berkas PENDAMPING video ketinggalan
saat videonya berubah. Video diperiksa berlapis-lapis di proyek ini, berkas
pendampingnya tidak sama sekali. Berkas ini menutup celah itu.

BATAS TOLERANSI SUBTITLE
Isyarat terakhir tidak harus jatuh persis di detik terakhir video: kalimat
penutup wajar berhenti satu dua detik sebelum layar habis. Yang tidak wajar
adalah selisih PULUHAN detik. Ambangnya 15 detik, dan itu sengaja longgar:
yang dicari cacat sebesar "subtitle berhenti di separuh video", bukan selisih
kecil yang memang normal.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
ANIM = AKAR / "web" / "public" / "anim"
# Video dicari di DUA tempat: yang tayang lebih dulu, baru versi tinjauan 480p.
# Sebelum ini folder 480p dipatok mati, jadi sesi gelombang 3 (render akhir
# 1080p, videonya di web/public/anim) mendapat "tidak ada video yang cocok"
# padahal videonya ada. Cacat yang sama dengan buat_poster.py, sumbernya juga
# sama: kedua alat lahir di alur tinjauan 480p.
VIDEO_URUT = (ANIM, AKAR / "media" / "uji-480p")


def daftar_video(saring: str | None) -> list[Path]:
    hasil, sudah = [], set()
    for folder in VIDEO_URUT:
        if not folder.exists():
            continue
        for v in sorted(folder.glob("*.mp4")):
            if "-bersubtitle" in v.stem or v.stem in sudah:
                continue
            if saring and saring not in v.stem:
                continue
            sudah.add(v.stem)
            hasil.append(v)
    return sorted(hasil, key=lambda x: x.stem)


def video_topik(topik: str):
    """Berkas video sebuah topik: yang FINAL dulu, versi uji 480p belakangan.

    Alat ini dibuat saat semua video masih berupa render uji, jadi sumbernya
    dipatok ke `media/uji-480p/`. Di gelombang 3 folder itu kosong (versi uji
    dikeluarkan dari git), sehingga alatnya melapor "tidak ada video yang cocok"
    padahal ketiga belas video final ada di `web/public/anim/`. Melapor tidak
    ada video sama saja dengan tidak memeriksa apa pun, dan itu justru jenis
    kebutaan yang bikin alat ini dibuat. Ditemukan sesi Statistika 7 Sep 2026.
    """
    # Urutan folder dari VIDEO_URUT (final dulu, uji belakangan); di tiap
    # folder webm didahulukan daripada mp4, sebab mp4 480p yang tidak
    # dilacak git bisa tertinggal di samping webm 1080p-nya.
    for folder in VIDEO_URUT:
        for akhiran in (".webm", ".mp4"):
            calon = folder / f"{topik}{akhiran}"
            if calon.exists() and calon.stat().st_size > 1024:
                return calon
    return None

AMBANG_SELISIH = 15.0    # detik


def durasi_video(jalur: Path) -> float:
    hasil = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(jalur)],
        capture_output=True, text=True, check=True,
    )
    return float(hasil.stdout.strip())


def akhir_subtitle(jalur: Path) -> float | None:
    """Detik berakhirnya isyarat TERAKHIR di berkas WebVTT."""
    pola = re.compile(
        r"-->\s*(\d+):(\d{2}):(\d{2})\.(\d{3})")
    akhir = None
    for m in pola.finditer(jalur.read_text(encoding="utf-8")):
        j, m_, d, ms = (int(x) for x in m.groups())
        akhir = j * 3600 + m_ * 60 + d + ms / 1000
    return akhir


def suara_basi(topik: str) -> list[str]:
    """Potongan suara yang tidak lagi disebut naskahnya.

    Nama berkasnya `<nn>-<id>.mp3`, dengan nn urutan segmen. Naskah yang
    diperpanjang menggeser nn, dan `buat_narasi.py` tidak membuang yang lama.
    """
    import json
    naskah = AKAR / "manim" / "narasi" / f"{topik}.json"
    folder = AKAR / "audio" / topik
    if not naskah.exists() or not folder.exists():
        return []
    segmen = json.loads(naskah.read_text(encoding="utf-8"))["segmen"]
    sah = {f"{i:02d}-{s['id']}.mp3" for i, s in enumerate(segmen, 1)}
    sah.add("narasi-penuh.mp3")
    return sorted(p.name for p in folder.glob("*.mp3") if p.name not in sah)


def periksa(saring: str | None) -> int:
    from buat_poster import nilai  # noqa: E402

    buruk = 0
    # Topik dikumpulkan dari video FINAL dan versi uji sekaligus, lalu
    # `video_topik` memilih yang final kalau ada. Dulu hanya `media/uji-480p`
    # yang dilihat, jadi alatnya buta begitu versi uji dibersihkan.
    nama = set()
    for folder in VIDEO_URUT:
        if not folder.exists():
            continue
        for pola in ("*.webm", "*.mp4"):
            for p in folder.glob(pola):
                if "-bersubtitle" in p.stem:
                    continue
                if saring and saring not in p.stem:
                    continue
                nama.add(p.stem)
    daftar = [v for v in (video_topik(t) for t in sorted(nama)) if v is not None]
    if not daftar:
        tempat = " atau ".join(str(f) for f in VIDEO_URUT)
        print(f"tidak ada video yang cocok dengan {saring!r} di {tempat}")
        return 1

    for v in daftar:
        topik = v.stem
        lama = durasi_video(v)
        catat = []

        vtt = ANIM / f"{topik}.vtt"
        if not vtt.exists():
            catat.append("subtitle TIDAK ADA")
        else:
            akhir = akhir_subtitle(vtt)
            if akhir is None:
                catat.append("subtitle kosong, tidak ada satu isyarat pun")
            elif lama - akhir > AMBANG_SELISIH:
                catat.append(
                    f"subtitle BASI: berhenti di {akhir:.1f} s, videonya {lama:.1f} s "
                    f"(tertinggal {lama - akhir:.1f} s)")

        jpg = ANIM / f"{topik}.jpg"
        if not jpg.exists():
            catat.append("poster TIDAK ADA")
        else:
            vonis, ket = nilai(jpg)
            if vonis == "cacat":
                catat.append(f"poster {ket}")

        basi = suara_basi(topik)
        if basi:
            catat.append(
                f"{len(basi)} potongan suara BASI, tidak disebut naskahnya lagi: "
                + ", ".join(basi[:4]) + (" ..." if len(basi) > 4 else ""))

        if catat:
            buruk += 1
            print(f"  CACAT  {topik}  ({lama:.1f} s)")
            for c in catat:
                print(f"           {c}")
        else:
            print(f"  ok     {topik}  ({lama:.1f} s)")

    print()
    if buruk:
        print(f"{buruk} dari {len(daftar)} video berkas pendampingnya bermasalah")
        print("Subtitle: python manim/buat_subtitle.py <topik>")
        print("Poster  : python alat/buat_poster.py <topik> <detik>")
        print("Suara   : buang berkas mp3 yang namanya tidak ada di naskah")
        return 1
    print(f"SEMUA LOLOS: {len(daftar)} video, subtitle, poster, dan potongan "
          f"suaranya cocok.")
    return 0


def main() -> int:
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("saring", nargs="?", help="hanya topik yang namanya memuat teks ini")
    a = p.parse_args()
    return periksa(a.saring)


if __name__ == "__main__":
    sys.exit(main())
