"""Memeriksa tidak ada ISTILAH Grafik Fungsi yang dipakai sebelum materi yang
mengajarkannya, baik di halaman materi maupun di naskah video.

    python alat/cek_urutan_grafik_fungsi.py
    python alat/cek_urutan_grafik_fungsi.py --rinci     tampilkan kalimatnya

KENAPA ALAT INI ADA
Aturan ARYA 5 September 2026: jangan sebut istilah yang belum dipelajari siswa.
Topik ini 13 materi, kira-kira 72 KB teks, ditambah naskah videonya. Satu
istilah yang bocor ke materi sebelumnya membuat siswa berhenti dan merasa ada
yang terlewat. Menjaganya dengan mata mustahil; ini yang menegakkannya.

Saudara alat ini: `cek_urutan_turunan.py`, `cek_urutan_integral.py`,
`cek_urutan_belajar.py` (khusus Transformasi Geometri). Polanya sama, daftar
istilahnya yang berbeda, karena yang menentukan pelanggaran adalah urutan
belajar topiknya sendiri.

YANG SENGAJA TIDAK DIDAFTARKAN, DAN KENAPA
- "geser", "cermin", "regang", "melebar", "berbalik": kata Indonesia
  sehari-hari, bukan nama teknis. Materi 03 memang perlu mengatakan
  parabolanya "pindah ke kanan"; yang dilarang menyebut NAMA transformasinya
  lebih awal, bukan memperagakan geraknya.
- "kuadrat", "akar" dalam arti pangkat dua dan akar pangkat dua: sudah dikenal
  siswa dari SMP, bukan istilah topik ini. Yang didaftarkan "akar persamaan".
- "limit", "turunan", "vektor": topik LAIN. Kalau muncul di sini, itu urusan
  sambungan antartopik, bukan urutan di dalam topik ini.

BATASNYA JUJUR
Pencocokan kata, bukan pemahaman. Alarm perlu dibaca dalam konteks: pemeriksa
berbasis kata bisa menandai kalimat yang sebenarnya sah (temuan sesi Turunan,
8 Sep 2026: "bagian dalam domain" dikira komposisi fungsi). Jangan mengubah
materi hanya untuk memuaskan pencocokan kata.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]

# Nomor materi yang MENGAJARKAN tiap istilah, memakai urutan topik ini:
# 01 grafik-bercerita, 02 potret-aturan, 03 bentuk-puncak, 04 bentuk-umum,
# 05 menyusun-parabola, 06 geser-cermin-regang, 07 nilai-mutlak, 08 eksponen,
# 09 logaritma, 10 fungsi-rasional, 11 komposisi, 12 invers, 13 dunia-nyata.
#
# Kuncinya pola regex supaya bentuk berimbuhan tertangkap sekaligus.
ISTILAH: dict[str, tuple[int, str]] = {
    r"\bdomain\b": (2, "domain"),
    r"\brange\b": (2, "range"),
    r"uji garis tegak": (2, "uji garis tegak"),
    r"\bparabola": (3, "parabola"),
    r"fungsi kuadrat": (3, "fungsi kuadrat"),
    r"bentuk puncak": (3, "bentuk puncak"),
    r"sumbu simetri": (3, "sumbu simetri"),
    r"bentuk umum": (4, "bentuk umum"),
    r"diskriminan": (4, "diskriminan"),
    r"akar persamaan": (4, "akar persamaan"),
    r"titik potong sumbu x": (4, "titik potong sumbu x"),
    r"melengkapkan kuadrat": (4, "melengkapkan kuadrat"),
    r"transformasi": (6, "transformasi"),
    r"nilai mutlak": (7, "nilai mutlak"),
    r"\beksponen": (8, "eksponen"),
    r"\blogaritma": (9, "logaritma"),
    r"asimtot": (10, "asimtot"),
    r"fungsi rasional": (10, "fungsi rasional"),
    r"komposisi": (11, "komposisi"),
    r"\binvers\b": (12, "invers"),
}

# Materi yang memang bertugas MEMPERKENALKAN daftar boleh menyebut istilah yang
# belum diajarkan. Ditulis di sini bersama alasannya, bukan didiamkan.
PENGECUALIAN: dict[int, set[str]] = {
    # Materi 02 menutup dengan janji ke mana siswa akan pergi: "Akar kuadrat
    # menolak bilangan negatif, dan pembagian menolak penyebut nol. Keduanya
    # akan kita temui nanti di tahap 9 dan 10." Itu penunjuk arah yang
    # disengaja, bukan istilah yang dipakai sebelum waktunya.
    2: set(),
}

# Naskah video topik ini dan materi yang ditempatinya.
NASKAH: dict[str, int] = {
    "grafik3-puncak": 3,
    "grafik6-transformasi": 6,
    "tahap8-grafik-sin": 8,
    "tahap9-tiga-grafik": 9,
}


def ambil_teks_tahap() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, slugnya, dan semua kalimat yang tampil di layar.

    Diambil dengan regex, bukan dengan menjalankan TypeScript-nya: berkasnya
    hanya berisi data, dan menjalankan bundler untuk membaca data adalah harga
    yang tidak perlu dibayar.
    """
    berkas = AKAR / "web" / "content" / "grafik-fungsi" / "tahap.ts"
    isi = berkas.read_text(encoding="utf-8")
    isi = re.sub(r"/\*.*?\*/", "", isi, flags=re.S)
    isi = re.sub(r"^\s*//.*$", "", isi, flags=re.M)

    potongan = re.split(r"\n  \{\n    no: ", isi)
    hasil = []
    for bagian in potongan[1:]:
        nomor = int(bagian.split(",", 1)[0].strip())
        slug = re.search(r"slug: '([a-z-]+)'", bagian)
        kalimat = re.findall(r"'((?:[^'\\]|\\.)*)'", bagian)
        hasil.append((nomor, slug.group(1) if slug else "?", kalimat))
    return hasil


def ambil_teks_narasi() -> list[tuple[str, int, list[str]]]:
    """Nama naskah video, materi yang ditempatinya, dan kalimat narasinya."""
    hasil = []
    for nama, nomor in NASKAH.items():
        berkas = AKAR / "manim" / "narasi" / f"{nama}.json"
        if not berkas.exists():
            continue
        data = json.loads(berkas.read_text(encoding="utf-8"))
        segmen = data["segmen"] if isinstance(data, dict) else data
        kalimat = []
        for s in segmen:
            kalimat.append(s.get("teks", ""))
            if s.get("tulis"):
                kalimat.append(s["tulis"])
        hasil.append((nama, nomor, kalimat))
    return hasil


def periksa(nomor: int, kalimat: list[str]) -> list[tuple[str, str]]:
    """Istilah yang dipakai terlalu awal, bersama kalimat tempat ia muncul."""
    temuan = []
    boleh = PENGECUALIAN.get(nomor, set())
    for pola, (diajarkan, nama) in ISTILAH.items():
        if diajarkan <= nomor or nama in boleh:
            continue
        for k in kalimat:
            if re.search(pola, k, re.I):
                temuan.append((nama, k))
                break
    return temuan


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--rinci", action="store_true", help="tampilkan kalimatnya")
    a = p.parse_args()

    buruk = 0
    for nomor, slug, kalimat in ambil_teks_tahap():
        for nama, k in periksa(nomor, kalimat):
            buruk += 1
            diajarkan = next(v[0] for v in ISTILAH.values() if v[1] == nama)
            print(f"  Materi {nomor:02d} ({slug}) memakai {nama!r}, "
                  f"padahal diajarkan Materi {diajarkan:02d}")
            if a.rinci:
                print(f"      {k[:150]}")

    for nama_naskah, nomor, kalimat in ambil_teks_narasi():
        for nama, k in periksa(nomor, kalimat):
            buruk += 1
            diajarkan = next(v[0] for v in ISTILAH.values() if v[1] == nama)
            print(f"  Naskah {nama_naskah} (Materi {nomor:02d}) memakai {nama!r}, "
                  f"padahal diajarkan Materi {diajarkan:02d}")
            if a.rinci:
                print(f"      {k[:150]}")

    if buruk:
        print(f"\n{buruk} istilah dipakai sebelum waktunya. "
              f"Baca dalam konteks dulu: pencocokan kata bisa keliru.")
        return 1
    print("Urutan istilah Grafik Fungsi LOLOS: "
          f"{len(ISTILAH)} istilah diperiksa pada 13 materi dan "
          f"{len(ambil_teks_narasi())} naskah video.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
