"""Memastikan naskah video mengikuti pembuka v3.1 (keputusan ARYA 10 Sep 2026).

    python alat/cek_pembuka_video.py turunan2-garis-singgung
    python alat/cek_pembuka_video.py --semua

YANG DIPERIKSA
1. PEMBUKA   dua segmen pertama harus mengucapkan judul yang diucapkan:
             "<nama sub-bab>, Bagian n" (n = urutan materi di dalam sub-babnya),
             atau nama sub-bab saja bila isinya satu materi. Satu-satunya
             sumber nama: `web/content/subbab.ts`. Judul materi ("Grafik itu
             Bercerita") BUKAN pengganti: siswa tidak tahu itu materi mana.
2. TAHAP     kata "tahap" tidak boleh ada di `teks` maupun `tulis`; unit
             belajar disebut "materi".
3. SEGAR     kalimat yang memuat "materi sebelumnya" harus menyebut nama
             sub-bab (topik mana pun) supaya siswa tahu video yang dimaksud.
4. PYTHAGORAS hanya PERINGATAN: Pythagoras dulu contoh di catatan dan
             dipaksakan ke hampir semua video; sebutkan hanya bila memang
             prasyarat materi ini.

Nama naskah dipetakan ke (slug, nomor) lewat POLA_NAMA; naskah yang tidak
terpetakan (contoh-perahu, trigonometri) dilewati dengan keterangan.
Keluar 0 bila lolos, 1 bila ada cacat. Dibuktikan dua arah oleh
`alat/uji_cek_pembuka_video.py`.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
NASKAH = AKAR / "manim" / "narasi"
SUBBAB = AKAR / "web" / "content" / "subbab.ts"

POLA_NAMA = [
    (re.compile(r"^tahap(\d+)-"), "trigonometri"),
    (re.compile(r"^limit(\d+)-"), "limit"),
    (re.compile(r"^grafik(\d+)-"), "grafik-fungsi"),
    (re.compile(r"^vektor(\d+)-"), "vektor"),
    (re.compile(r"^ruang-3d-(\d+)$"), "ruang-3d"),
    (re.compile(r"^statistika(\d+)-"), "statistika"),
    (re.compile(r"^transformasi(\d+)-"), "transformasi-geometri"),
    (re.compile(r"^turunan(\d+)-"), "turunan"),
    (re.compile(r"^integral(\d+)-"), "integral"),
]
SLUG_RE = re.compile(r"slug:\s*'([^']+)'")
SUB_RE = re.compile(r"huruf:\s*'([A-Z])',\s*nama:\s*'([^']+)',\s*nomor:\s*\[([^\]]*)\]")
TAHAP_RE = re.compile(r"\btahap\b", re.I)
KALIMAT_RE = re.compile(r"[^.!?]+[.!?]?")


def baca_subbab(jalur: Path = SUBBAB) -> dict[str, list[tuple[str, str, list[int]]]]:
    """{slug: [(huruf, nama, [nomor...]), ...]} dibaca dari subbab.ts."""
    isi = jalur.read_text(encoding="utf-8")
    temu = list(SLUG_RE.finditer(isi))
    hasil = {}
    for i, m in enumerate(temu):
        akhir = temu[i + 1].start() if i + 1 < len(temu) else len(isi)
        badan = isi[m.end():akhir]
        sub = [(h, n, [int(x) for x in re.findall(r"\d+", nom)])
               for h, n, nom in SUB_RE.findall(badan)]
        hasil[m.group(1)] = sub
    return hasil


def judul_ucap(peta, slug: str, nomor: int) -> str:
    """Judul yang diucapkan di pembuka video materi ke-`nomor` topik `slug`."""
    for _, nama, daftar in peta.get(slug, []):
        if nomor in daftar:
            return nama if len(daftar) == 1 else f"{nama}, Bagian {daftar.index(nomor) + 1}"
    raise KeyError(f"materi {nomor} topik {slug!r} tidak ada di subbab.ts")


def petakan(nama_naskah: str) -> tuple[str, int] | None:
    for pola, slug in POLA_NAMA:
        m = pola.match(nama_naskah)
        if m:
            return slug, int(m.group(1))
    return None


def _rapi(s: str) -> str:
    return " ".join(s.split()).lower()


def periksa(jalur: Path, slug: str, nomor: int, peta=None) -> list[str]:
    peta = peta or baca_subbab()
    seg = json.loads(jalur.read_text(encoding="utf-8"))["segmen"]
    temuan = []
    harap = judul_ucap(peta, slug, nomor)
    awal = " ".join(_rapi(s.get("tulis") or s["teks"]) + " " + _rapi(s["teks"]) for s in seg[:2])
    if _rapi(harap) not in awal:
        temuan.append(f"PEMBUKA: dua segmen pertama tidak mengucapkan {harap!r}")
    semua_nama = sorted({n.lower() for subs in peta.values() for _, n, _ in subs}, key=len, reverse=True)
    for s in seg:
        for medan in ("teks", "tulis"):
            isi = s.get(medan) or ""
            if TAHAP_RE.search(isi):
                temuan.append(f"TAHAP: segmen {s['id']!r} medan {medan} memuat kata \"tahap\"; "
                              f"sebut \"materi\"")
                break
        for kal in KALIMAT_RE.findall(s["teks"]):
            k = kal.lower()
            if "materi sebelumnya" in k and not any(n in k for n in semua_nama):
                temuan.append(f"SEGAR: segmen {s['id']!r} menyebut \"materi sebelumnya\" tanpa "
                              f"nama sub-babnya: {kal.strip()[:80]!r}")
    if any("pythagoras" in s["teks"].lower() for s in seg):
        print(f"  PERINGATAN {jalur.stem}: menyebut Pythagoras; pastikan itu prasyarat "
              f"nyata materi ini, bukan sisa contoh di catatan lama")
    return temuan


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("naskah", nargs="?")
    p.add_argument("--semua", action="store_true")
    a = p.parse_args()
    if a.semua:
        daftar = sorted(n.stem for n in NASKAH.glob("*.json"))
    elif a.naskah:
        daftar = [a.naskah]
    else:
        p.error("sebut nama naskah, atau --semua")
    peta = baca_subbab()
    buruk = 0
    for nama in daftar:
        pet = petakan(nama)
        if not pet:
            print(f"  lewat  {nama} (tidak terpetakan ke topik dan nomor materi)")
            continue
        temuan = periksa(NASKAH / f"{nama}.json", pet[0], pet[1], peta)
        if temuan:
            buruk += 1
            print(f"  CACAT  {nama}")
            for t in temuan:
                print(f"         {t}")
        else:
            print(f"  ok     {nama}  ({judul_ucap(peta, *pet)})")
    print(f"\n{'SEMUA LOLOS' if not buruk else str(buruk) + ' naskah belum mengikuti pembuka v3.1'}: "
          f"{len(daftar)} naskah diperiksa")
    return 1 if buruk else 0


if __name__ == "__main__":
    sys.exit(main())
