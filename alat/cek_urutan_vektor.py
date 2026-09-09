"""Memeriksa tidak ada ISTILAH Vektor yang dipakai sebelum materi yang mengajarkannya.

    python alat/cek_urutan_vektor.py
    python alat/cek_urutan_vektor.py --rinci     tampilkan kalimatnya

KENAPA ALAT INI ADA
Aturan ARYA 5 September 2026: jangan sebut istilah yang belum dipelajari siswa.
Standar video v3 menambah beban baru pada aturan itu: tiap video sekarang wajib
membuka dengan SEGAR-INGAT yang menyebut nomor dan nama materi sebelumnya, jadi
naskahnya penuh rujukan antarmateri. Rujukan ke BELAKANG memang yang diminta;
rujukan ke DEPAN adalah cacat, dan keduanya berbunyi mirip saat dibaca sekilas.
Topik ini 12 materi ditambah enam naskah video, terlalu banyak untuk dijaga mata.

Saudaranya: `cek_urutan_turunan.py`, `cek_urutan_integral.py`,
`cek_urutan_belajar.py` (transformasi geometri). Strukturnya sengaja sama.

CARA MENILAINYA
Tiap istilah didaftarkan bersama nomor materi yang MENGAJARKANNYA. Istilah boleh
muncul di materi itu sendiri dan sesudahnya, tidak boleh sebelumnya. Rujukan
"Materi NN" juga diperiksa.

YANG SENGAJA TIDAK DIPERIKSA
Kata di dalam komentar kode dan di kepala berkas: itu dibaca pembuat situs,
bukan siswa. Nama berkas video, slug, dan nama widget juga bukan kalimat.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]

# Nomor materi yang MENGAJARKAN tiap istilah, memakai urutan Bab 3 Buku Panduan
# Guru Kelas X (Kemendikbudristek 2021) yang dipakai topik ini.
ISTILAH: dict[str, tuple[int, str]] = {
    r"ruas garis berarah": (2, "ruas garis berarah"),
    r"ekuivalen": (2, "vektor ekuivalen"),
    r"vektor lawan": (2, "vektor lawan"),
    r"vektor nol": (2, "vektor nol"),
    r"\bkomponen\b": (3, "komponen"),
    r"vektor baris|vektor kolom": (3, "vektor baris, vektor kolom"),
    r"vektor satuan": (5, "vektor satuan"),
    r"resultan": (6, "resultan"),
    r"aturan segitiga|ujung ke pangkal": (6, "aturan segitiga, ujung ke pangkal"),
    r"jajar ?genjang": (7, "aturan jajar genjang"),
    r"kali skalar|perkalian skalar|dikali skalar": (9, "perkalian dengan skalar"),
    r"perkalian titik|hasil kali titik": (11, "perkalian titik"),
    r"proyeksi": (12, "proyeksi"),
}

# YANG SENGAJA TIDAK MASUK DAFTAR, DAN KENAPA
#
# "pythagoras", "akar", "kuadrat", "panjang": ini bekal SMP, bukan istilah yang
# topik ini perkenalkan. Materi 01 memang memakainya untuk menjawab kenapa 3 dan
# 4 bisa menjadi 5, dan itu justru bagian yang disetujui. Materi 04 mengajarkan
# RUMUS panjang vektor dari komponennya, bukan teorema Pythagoras-nya.
#
# "arah", "panah", "geser", "menyeberang": kata Indonesia sehari-hari. Yang
# dilarang menyebut NAMA istilahnya lebih awal, bukan memperagakan geraknya.
#
# "skalar" sendirian: diajarkan Materi 01 bersama "vektor", jadi tidak perlu
# dijaga. Yang dijaga "kali skalar", operasinya, milik Materi 09.
#
# Pemeriksa yang terlalu galak sama merugikannya dengan yang terlalu longgar:
# keduanya mengarahkan perbaikan ke tempat yang salah.

# Begitu ada pengecualian, tulis di sini BESERTA alasannya, jangan didiamkan.
PENGECUALIAN: dict[int, set[str]] = {}


def ambil_teks_tahap() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, slugnya, dan semua kalimat yang tampil di layar.

    Diambil dengan regex, bukan dengan menjalankan TypeScript-nya: berkasnya
    hanya berisi data, dan menjalankan bundler untuk membaca data adalah harga
    yang tidak perlu dibayar.
    """
    berkas = AKAR / "web" / "content" / "vektor" / "tahap.ts"
    isi = berkas.read_text(encoding="utf-8")

    # Komentar dibuang lebih dulu: isinya untuk pembuat situs, bukan siswa.
    isi = re.sub(r"/\*.*?\*/", "", isi, flags=re.S)
    isi = re.sub(r"^\s*//.*$", "", isi, flags=re.M)

    # PENANDA, BUKAN KALIMAT. Nama berkas video, penanda widget, dan slug tidak
    # pernah dibaca siswa sebagai kalimat. Tanpa pembuangan ini, memasang video
    # di Materi 01 dilaporkan melanggar semata karena berkasnya bernama
    # "vektor1-perahu.mp4", dan widget 'pecah-komponen' di Materi 03 menuduh
    # dirinya sendiri.
    isi = re.sub(r"video:\s*\{[^}]*\}", "", isi)
    isi = re.sub(r"^\s*(?:widget|slug):\s*'[^']*',?$", "", isi, flags=re.M)

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
    peta: dict[str, int] = {
        "vektor1-perahu": 1,
        "vektor3-komponen": 3,
        "vektor4-panjang": 4,
        "vektor6-sambung": 6,
        "vektor8-selisih": 8,
        "vektor9-kali-skalar": 9,
    }
    hasil = []
    for nama, materi in peta.items():
        berkas = AKAR / "manim" / "narasi" / f"{nama}.json"
        if not berkas.exists():
            continue
        data = json.loads(berkas.read_text(encoding="utf-8"))
        kalimat = []
        for s in data["segmen"]:
            kalimat.append(s["teks"])
            kalimat.append(s.get("tulis", ""))
        hasil.append((nama, materi, kalimat))
    return hasil


# Kalimat yang MENJANJIKAN sesuatu untuk nanti boleh menyebut istilah yang belum
# diajarkan. Menyebut istilah sebagai sesuatu yang akan datang tidak
# membingungkan siswa; yang membingungkan adalah memakainya SEOLAH sudah
# dipahami. Syaratnya ketat: kata penunjuk masa depannya harus ada di kalimat
# yang SAMA, supaya satu kata "nanti" tidak memutihkan seluruh paragraf.
JANJI = re.compile(
    r"nanti|akan kita|akan dibahas|dibahas|kita buktikan|kita periksa|"
    r"belum kita|baru akan|kita kenal|kita pakai lagi|kita bahas|kita singgung|"
    r"kita temui|menyusul|materi berikutnya|video berikutnya|belakangan|"
    r"bocoran|belum diuji|belum kenal",
    re.I,
)

# Topik MANTRA lain yang boleh dirujuk beserta nomor materinya: semuanya tayang
# sebelum Vektor atau berdiri sendiri, jadi menyebutnya bukan rujukan ke depan.
TOPIK_LAIN = r"(?:Limit|Trigonometri|Grafik Fungsi|Statistika|Ruang 3D|Ruang Tiga Dimensi|Transformasi Geometri|Turunan|Integral)"


def periksa(nomor: int, kalimat: list[str]) -> list[tuple[str, str]]:
    """Istilah yang dipakai terlalu dini di satu materi."""
    temuan = []
    diizinkan = PENGECUALIAN.get(nomor, set())
    for baris in kalimat:
        if JANJI.search(baris):
            continue
        rendah = baris.lower()

        for pola, (materi_ajar, nama) in ISTILAH.items():
            if materi_ajar <= nomor or nama in diizinkan:
                continue
            if re.search(pola, rendah):
                temuan.append((f"{nama} (diajarkan Materi {materi_ajar:02d})", baris))

        # Rujukan ke materi TOPIK LAIN dibuang lebih dulu: "Trigonometri tahap 4"
        # menunjuk materi keempat topik lain, bukan materi keempat topik ini.
        tanpa_topik_lain = re.sub(rf"topik {TOPIK_LAIN},? Materi \d{{1,2}}", "", baris)
        tanpa_topik_lain = re.sub(rf"{TOPIK_LAIN} (?:Materi|tahap) \d{{1,2}}", "", tanpa_topik_lain)
        for rujuk in re.findall(r"[Mm]ateri (\d{1,2})", tanpa_topik_lain):
            if int(rujuk) > nomor:
                temuan.append((f"rujukan ke Materi {rujuk}", baris))
    return temuan


def main() -> int:
    p = argparse.ArgumentParser(description="Pemeriksa urutan istilah topik Vektor")
    p.add_argument("--rinci", action="store_true", help="tampilkan kalimatnya")
    a = p.parse_args()

    total = 0
    print("=== HALAMAN MATERI ===")
    for nomor, slug, kalimat in ambil_teks_tahap():
        temuan = periksa(nomor, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  Materi {nomor:02d} {slug:26s} {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    naskah = ambil_teks_narasi()
    print("\n=== NASKAH VIDEO ===")
    if not naskah:
        print("  belum ada naskah video Vektor")
    for nama, materi, kalimat in naskah:
        temuan = periksa(materi, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  {nama:24s} (Materi {materi:02d}) {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    print(f"\n{'LOLOS' if total == 0 else f'{total} pemakaian terlalu dini'}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
