"""Membuat berkas subtitle WebVTT dari naskah narasi dan durasi yang terukur.

    python manim/buat_subtitle.py tahap8-grafik-sin
    python manim/buat_subtitle.py --semua

Keluaran: `web/public/anim/<topik>.vtt`, langsung dipakai oleh <track> di
pemutar video situs.

KENAPA BERKAS TERPISAH, BUKAN DIBAKAR KE VIDEO (permintaan ARYA 31 Agu):
  * Tidak mungkin menindih animasi, peramban menaruhnya di lapisan sendiri,
    di luar gambar, dan siswa bisa menggesernya.
  * Bisa dimatikan kalau mengganggu.
  * Naskah berubah cukup jalankan ulang skrip ini (2 detik), tanpa render
    ulang video yang makan belasan menit.
  * Bisa disalin, dicari, dan dibaca pembaca layar.

KENAPA TIDAK PERLU MENEBAK WAKTUNYA:
`buat_narasi.py` sudah mengukur durasi TIAP KALIMAT dan menyimpannya di
`audio/<topik>/durasi.json`. Waktu mulai tiap subtitle tinggal penjumlahan
berurutan dari situ, sama persis dengan waktu yang dipakai adegan Manim.
Jadi subtitle, suara, dan gambar dijalankan oleh satu sumber angka yang sama.

KALIMAT PANJANG DIPECAH: satu segmen narasi bisa 10 detik dan terlalu panjang
untuk sekali baca. Segmen dipecah pada tanda titik menjadi beberapa baris,
dengan waktu dibagi menurut panjang hurufnya.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
NASKAH = AKAR / "manim" / "narasi"
TUJUAN = AKAR / "web" / "public" / "anim"

# Satu baris subtitle sebaiknya tidak lebih dari ini; di atasnya dipecah.
MAKS_HURUF = 84
MIN_DETIK = 1.2


def jam(detik: float) -> str:
    j, sisa = divmod(max(detik, 0.0), 3600)
    m, d = divmod(sisa, 60)
    return f"{int(j):02d}:{int(m):02d}:{d:06.3f}"


def tebalkan(teks: str) -> str:
    """`*istilah*` menjadi `<b>istilah</b>`.

    Penanda yang sama dibuang oleh `buat_narasi.py` sebelum teks dikirim ke
    mesin suara, jadi satu naskah melayani dua keluaran: suara yang bersih dan
    subtitle yang menebalkan istilah pentingnya.

    Dipakai tebal, bukan warna: `::cue` untuk warna dukungannya masih
    tambal-sulam antar peramban, sedangkan <b> tampil sama di semuanya.
    """
    return re.sub(r"\*([^*]+)\*", r"<b>\1</b>", teks)


def panjang_tampak(teks: str) -> int:
    """Panjang teks tanpa menghitung tag, dipakai membagi waktu baca."""
    return len(re.sub(r"<[^>]+>", "", teks))


def pecah(teks: str) -> list[str]:
    """Pecah satu segmen jadi beberapa baris yang enak dibaca."""
    teks = " ".join(teks.split())
    if panjang_tampak(teks) <= MAKS_HURUF:
        return [teks]
    # Pecah di batas kalimat lebih dulu; kalau masih panjang, di koma.
    bagian = [b.strip() for b in re.split(r"(?<=[.!?])\s+", teks) if b.strip()]
    hasil: list[str] = []
    for b in bagian:
        if panjang_tampak(b) <= MAKS_HURUF:
            hasil.append(b)
            continue
        potong = [c.strip() for c in re.split(r"(?<=,)\s+", b) if c.strip()]
        gabung = ""
        for c in potong:
            if gabung and panjang_tampak(gabung) + panjang_tampak(c) + 1 > MAKS_HURUF:
                hasil.append(gabung)
                gabung = c
            else:
                gabung = f"{gabung} {c}".strip()
        if gabung:
            hasil.append(gabung)
    return hasil or [teks]


def buat(topik: str, diam: bool = False) -> Path:
    berkas_naskah = NASKAH / f"{topik}.json"
    berkas_durasi = AKAR / "audio" / topik / "durasi.json"
    if not berkas_naskah.exists():
        raise SystemExit(f"naskah tidak ada: {berkas_naskah}")
    if not berkas_durasi.exists():
        raise SystemExit(
            f"durasi belum diukur: {berkas_durasi}\n"
            f"Jalankan dulu: python manim/buat_narasi.py {topik}")

    naskah = json.loads(berkas_naskah.read_text(encoding="utf-8"))
    durasi = json.loads(berkas_durasi.read_text(encoding="utf-8"))["segmen"]

    baris = ["WEBVTT", "",
             f"NOTE Dibuat otomatis dari manim/narasi/{topik}.json", ""]
    jalan = 0.0
    nomor = 0
    for seg in naskah["segmen"]:
        lama = durasi.get(seg["id"])
        if lama is None:
            raise SystemExit(
                f"segmen '{seg['id']}' ada di naskah tapi tidak di durasi.json. "
                f"Jalankan ulang buat_narasi.py {topik}.")
        # Medan `layar` = bentuk TERTULIS, dipakai kalau ada.
        # Aturan ARYA 2 Sep: subtitle tidak boleh menyalin mentah apa
        # yang diucapkan. Narator "f dari x kurang satu", subtitle
        # "f(x - 1)". Naskah tanpa `layar` tetap jalan seperti dulu.
        potongan = [tebalkan(x) for x in pecah(seg.get("layar") or seg["teks"])]
        total_huruf = sum(panjang_tampak(p) for p in potongan) or 1
        mulai = jalan
        for p in potongan:
            bagi = lama * panjang_tampak(p) / total_huruf
            # Baris yang sangat pendek tetap diberi waktu baca yang manusiawi,
            # selama tidak melewati akhir segmennya.
            selesai = min(mulai + max(bagi, MIN_DETIK), jalan + lama)
            if selesai <= mulai:
                selesai = mulai + 0.4
            nomor += 1
            baris += [str(nomor), f"{jam(mulai)} --> {jam(selesai)}", p, ""]
            mulai = selesai
        jalan += lama

    TUJUAN.mkdir(parents=True, exist_ok=True)
    keluar = TUJUAN / f"{topik}.vtt"
    keluar.write_text("\n".join(baris), encoding="utf-8")
    if not diam:
        print(f"  {topik:28s} {nomor:3d} baris  {jalan:6.2f} detik  -> "
              f"{keluar.relative_to(AKAR)}")
    return keluar


def main() -> int:
    for aliran in (sys.stdout, sys.stderr):
        try:
            aliran.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):                    # pragma: no cover
            pass
    p = argparse.ArgumentParser(description="Pembuat subtitle WebVTT MATRA")
    p.add_argument("topik", nargs="*", help="nama naskah tanpa .json")
    p.add_argument("--semua", action="store_true",
                   help="buat untuk semua naskah yang durasinya sudah diukur")
    a = p.parse_args()

    daftar = a.topik
    if a.semua:
        daftar = sorted(
            f.stem for f in NASKAH.glob("*.json")
            if (AKAR / "audio" / f.stem / "durasi.json").exists())
    if not daftar:
        print("tidak ada yang dibuat. Sebut topiknya, atau pakai --semua.")
        return 1

    print(f"membuat subtitle untuk {len(daftar)} naskah:")
    for t in daftar:
        buat(t)
    print("\n>>> Pemutar situs memuatnya lewat <track src=\"/anim/<topik>.vtt\">.")
    return 0


if __name__ == "__main__":
    sys.exit(main())