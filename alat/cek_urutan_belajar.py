"""Memeriksa tidak ada ISTILAH yang dipakai sebelum materi yang mengajarkannya.

    python alat/cek_urutan_belajar.py
    python alat/cek_urutan_belajar.py --rinci     tampilkan kalimatnya

KENAPA ALAT INI ADA
Aturan ARYA 5 September 2026: jangan sebut istilah yang belum dipelajari siswa,
prioritaskan urutan belajar. Aturan itu mudah diucapkan dan mustahil dijaga
dengan mata: topik ini 13 materi, kira-kira 50 KB teks, ditambah enam naskah
video. Satu istilah yang bocor ke materi sebelumnya membuat siswa berhenti dan
merasa ada yang terlewat, dan itu persis yang ditemukan ARYA pada video Materi
01, yang memakai dilatasi padahal dilatasi baru diajarkan Materi 07.

CARA MENILAINYA
Tiap istilah didaftarkan bersama nomor materi yang MENGAJARKANNYA. Istilah
boleh muncul di materi itu sendiri dan sesudahnya, tidak boleh sebelumnya.
Rujukan "Materi NN" juga diperiksa: materi tidak boleh menunjuk ke materi yang
belum dilewati siswa.

YANG SENGAJA TIDAK DIPERIKSA
Kata di dalam komentar kode dan di kepala berkas. Itu dibaca pembuat situs,
bukan siswa. Yang diperiksa hanya teks yang benar-benar tampil di layar.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]

# Nomor materi yang MENGAJARKAN tiap istilah, memakai urutan buku
# (Bab 4 Buku Siswa Kelas XI: pencerminan garis, pencerminan titik, translasi,
# rotasi, dilatasi, lalu matriks, lalu komposisi).
#
# Kuncinya pola regex, supaya "dicerminkan", "pencerminan", dan "cermin"
# tertangkap sekaligus tanpa mendaftar semua bentuknya satu per satu.
ISTILAH: dict[str, tuple[int, str]] = {
    r"prapeta": (1, "prapeta"),
    r"cermin": (2, "cermin, pencerminan, dicerminkan"),
    r"translasi": (5, "translasi"),
    r"rotasi": (6, "rotasi"),
    r"dilatasi": (7, "dilatasi"),
    r"faktor skala": (7, "faktor skala"),
    r"arah putar": (8, "arah putar"),
    r"matriks": (9, "matriks"),
    r"determinan": (9, "determinan"),
    r"komposisi": (11, "komposisi"),
}

# YANG SENGAJA TIDAK MASUK DAFTAR, DAN KENAPA
#
# "geser", "memutar", "diputar", "membesar": ini kata Indonesia sehari-hari,
# bukan nama transformasinya. Kalimat pembuka "stiker yang kamu geser di layar"
# justru contoh yang baik, sebab ia memakai pengalaman siswa untuk memperkenalkan
# gagasannya sebelum ada nama apa pun. Yang dilarang menyebut NAMANYA lebih awal
# ("translasi", "rotasi"), bukan memperagakan geraknya.
#
# Versi pertama alat ini memasukkan kata-kata itu dan melaporkan kalimat pembuka
# tadi sebagai pelanggaran. Kalau diikuti, saya akan memperbaiki hal yang justru
# sudah benar. Pemeriksa yang terlalu galak sama merugikannya dengan yang terlalu
# longgar: keduanya mengarahkan perbaikan ke tempat yang salah.
#
# "peta" juga dikeluarkan: kata itu dipakai dalam arti biasa ("kita lihat dari
# atas, seperti peta") jauh lebih sering daripada sebagai istilah.

# Beberapa materi memang bertugas MEMPERKENALKAN daftar, jadi boleh menyebut
# nama transformasi yang belum diajarkan. Sejauh ini tidak ada, dan daftar ini
# sengaja dibiarkan kosong: begitu ada pengecualian, ia harus ditulis di sini
# dengan alasannya, bukan didiamkan.
PENGECUALIAN: dict[int, set[str]] = {}


def ambil_teks_tahap() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, slugnya, dan semua kalimat yang tampil di layar.

    Diambil dengan regex, bukan dengan menjalankan TypeScript-nya: berkasnya
    hanya berisi data, dan menjalankan bundler untuk membaca data adalah harga
    yang tidak perlu dibayar.
    """
    berkas = AKAR / "web" / "content" / "transformasi-geometri" / "tahap.ts"
    isi = berkas.read_text(encoding="utf-8")

    # Komentar dibuang lebih dulu: isinya untuk pembuat situs, bukan siswa.
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
    peta = {
        "transformasi1-setiap-titik": 1,
        "transformasi2-cermin-garis": 2,
        "transformasi3-rotasi": 6,
        "transformasi4-dilatasi": 7,
        "transformasi5-matriks": 9,
        "transformasi6-urutan": 12,
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


# Kalimat yang MENJANJIKAN sesuatu untuk nanti boleh menyebut istilah yang
# belum diajarkan.
#
# Ada dua cara sebuah istilah muncul terlalu awal, dan akibatnya berlawanan:
#
#   "Hanya dilatasi yang mengubah ukuran."        -> siswa merasa ada yang
#                                                    terlewat, lalu berhenti.
#   "Alasannya dibahas nanti di Materi 09."       -> siswa tahu ini memang
#                                                    sengaja ditunda, lalu lanjut.
#
# Yang kedua adalah rambu, dan menghapusnya justru membuat siswa bertanya-tanya
# kenapa sebuah pernyataan dibiarkan tanpa alasan. Jadi yang dilarang memakai
# istilah SEOLAH SUDAH DIPAHAMI, bukan menyebutnya sebagai janji.
#
# Syaratnya ketat: kata penunjuk masa depannya harus ada di kalimat yang SAMA.
# Tanpa syarat itu, satu kata "nanti" di sebuah paragraf akan memutihkan semua
# istilah di sekitarnya.
# Nama topik MANTRA lain, dipakai untuk mengenali rujukan lintas topik seperti
# "Di Vektor, Materi 03, ...". Daftar ini sengaja ditulis tangan dan pendek:
# yang dibutuhkan cuma nama topik yang mungkin jadi prasyarat topik ini.
TOPIK_LAIN = re.compile(
    r"\b(?:Trigonometri|Limit|Grafik Fungsi|Vektor|Ruang 3D|Ruang Tiga Dimensi|"
    r"Statistika|Turunan|Integral)\b[^.]{0,30}?Materi \d{2}",
    re.I,
)

JANJI = re.compile(
    r"nanti|akan kita|akan dibahas|dibahas|kita buktikan|kita periksa|"
    r"belum kita|baru akan|kita kenal|kita pakai lagi|kita bahas|kita singgung|"
    r"kita lihat|kita temui|menyusul",
    re.I,
)


def periksa(nomor: int, kalimat: list[str]) -> list[tuple[str, str]]:
    """Istilah yang dipakai terlalu dini di satu materi.

    Kalimat yang berisi janji dilewati, sebab menyebut istilah sebagai sesuatu
    yang akan datang tidak membingungkan siswa.
    """
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

        # RUJUKAN BERTOPIK TIDAK DIHITUNG, dan itu keharusan Standar Video v3.
        #
        # v3 mewajibkan video Materi 01 tiap topik MENGINGAT topik prasyaratnya
        # dengan menyebut nomor DAN nama konsepnya ("Di Vektor, Materi 03,
        # Memecah panah jadi dua langkah"). Nomor itu milik topik LAIN, dan
        # membacanya sebagai rujukan ke Materi 03 topik ini keliru: ia bukan
        # rujukan ke depan sama sekali.
        #
        # Tanpa pengecualian ini, tiap video Materi 01 dari kedelapan sesi
        # gelombang 4 akan ditandai DINI oleh kalimat yang justru DIWAJIBKAN
        # standarnya. Alat yang menghukum kepatuhan lebih buruk daripada tidak
        # ada alat.
        #
        # Yang dikecualikan sempit: nomor yang didahului nama topik lain di
        # kalimat yang sama. "Materi 09" telanjang tetap ditangkap.
        bersih = TOPIK_LAIN.sub(" ", baris)
        for rujuk in re.findall(r"Materi (\d{2})", bersih):
            if int(rujuk) > nomor:
                temuan.append((f"rujukan ke Materi {rujuk}", baris))
    return temuan


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--rinci", action="store_true", help="tampilkan kalimatnya")
    a = p.parse_args()

    total = 0
    print("=== HALAMAN MATERI ===")
    for nomor, slug, kalimat in ambil_teks_tahap():
        temuan = periksa(nomor, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  Materi {nomor:02d} {slug:22s} {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    print("\n=== NASKAH VIDEO ===")
    for nama, materi, kalimat in ambil_teks_narasi():
        temuan = periksa(materi, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  {nama:28s} (Materi {materi:02d}) {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    print(f"\n{'SEMUA LOLOS' if total == 0 else f'{total} pemakaian istilah terlalu dini'}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
