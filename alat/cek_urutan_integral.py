"""Memeriksa tidak ada ISTILAH Integral yang dipakai sebelum materi yang mengajarkannya.

    python alat/cek_urutan_integral.py
    python alat/cek_urutan_integral.py --rinci     tampilkan kalimatnya

KENAPA ALAT INI ADA
Aturan ARYA 5 September 2026: jangan sebut istilah yang belum dipelajari siswa.
Aturan itu mudah diucapkan dan mustahil dijaga dengan mata: topik ini 11 materi,
kira-kira 60 KB teks. Satu istilah yang bocor ke materi sebelumnya membuat siswa
berhenti dan merasa ada yang terlewat. Di topik Transformasi Geometri hal itu
sudah terjadi dan ditemukan ARYA, bukan oleh yang menulisnya.

Disalin dari `alat/cek_urutan_belajar.py` (milik Transformasi Geometri), dengan
tabel istilah dan berkas tahap diganti. Dua hal ditambahkan, keduanya karena
Integral punya keadaan yang tidak dipunyai Transformasi:

1.  Rujukan ke topik LAIN tidak dihitung pelanggaran. Kalimat "di topik Turunan"
    dan "Turunan Materi 07" menunjuk topik yang letaknya sebelum Integral, jadi
    siswa memang sudah melewatinya. Yang dilarang hanya menunjuk materi Integral
    yang belum dilewati.
2.  Kata "integral" sendiri TIDAK didaftarkan. Ia nama topiknya, muncul di judul
    halaman dan di kalimat pembuka Materi 01, dan melarangnya berarti melarang
    menyebutkan nama pelajaran yang sedang dipelajari.

CARA MENILAINYA
Tiap istilah didaftarkan bersama nomor materi yang MENGAJARKANNYA. Istilah boleh
muncul di materi itu sendiri dan sesudahnya, tidak boleh sebelumnya. Kalimat yang
MENJANJIKAN pembahasan nanti dikecualikan, sebab menyebut istilah sebagai sesuatu
yang akan datang tidak membuat siswa merasa tertinggal.

YANG DIPERIKSA
Halaman materi (`web/content/integral/tahap.ts`) DAN naskah video
(`manim/narasi/integral*.json`, medan `teks` dan `tulis`). Naskah video ikut
diperiksa karena videonya ditonton di halaman materinya sendiri: istilah yang
belum diajarkan sama merusaknya kalau diucapkan narator.

YANG SENGAJA TIDAK DIPERIKSA
Kata di dalam komentar kode dan di kepala berkas. Itu dibaca pembuat situs, bukan
siswa. Yang diperiksa hanya teks yang benar-benar tampil di layar.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

AKAR = Path(__file__).resolve().parents[1]

# Nomor materi yang MENGAJARKAN tiap istilah, memakai urutan Bab 3 buku
# Matematika Tingkat Lanjut Kelas XII.
#
# Kuncinya pola regex, supaya "antiturunan" dan "antiturunannya" tertangkap
# sekaligus tanpa mendaftar semua bentuknya satu per satu.
ISTILAH: dict[str, tuple[int, str]] = {
    r"antiturunan": (1, "antiturunan"),
    r"integral tak tentu": (2, "integral tak tentu"),
    r"tanda integral": (2, "tanda integral"),
    r"integran": (2, "integran"),
    r"aturan pangkat": (2, "aturan pangkat"),
    r"substitusi": (3, "substitusi"),
    r"parsial": (4, "integral parsial"),
    r"sec kuadrat": (4, "sec kuadrat"),
    r"partisi": (5, "partisi"),
    r"riemann": (5, "jumlahan Riemann"),
    r"titik sampel": (5, "titik sampel"),
    r"delta x": (5, "delta x"),
    r"integral tentu": (6, "integral tentu"),
    r"batas atas": (6, "batas atas"),
    r"batas bawah": (6, "batas bawah"),
    r"luas bertanda": (6, "luas bertanda"),
    r"teorema dasar kalkulus": (7, "Teorema Dasar Kalkulus"),
    r"fungsi luas": (7, "fungsi luas"),
    r"kurung siku": (8, "kurung siku"),
    r"daerah di bawah sumbu": (9, "daerah di bawah sumbu"),
    r"titik potong": (9, "titik potong"),
    r"kurva atas": (10, "kurva atas"),
    r"kurva bawah": (10, "kurva bawah"),
    r"usaha": (11, "usaha"),
    r"joule": (11, "joule"),
    r"newton": (11, "newton"),
}

# YANG SENGAJA TIDAK MASUK DAFTAR, DAN KENAPA
#
# "integral": nama topiknya sendiri. Lihat catatan di kepala berkas.
#
# "luas", "jumlah", "tumpukan", "laju", "kurva", "turunan": kata yang sudah
# dimiliki siswa sebelum topik ini. "turunan" khususnya adalah topik sebelumnya
# dan justru menjadi pijakan Materi 01; melarangnya akan membuat materi pertama
# tidak bisa ditulis sama sekali.
#
#
# "luas daerah" dikeluarkan dari daftar, walau tabel rancangan menaruhnya di
# Materi 09. Versi pertama alat ini memasukkannya dan melaporkan tiga
# pelanggaran, dua di Materi 01 dan satu di Materi 05. Ketiganya kalimat yang
# justru benar: pertanyaan pembuka Materi 05 berbunyi "bagaimana mengukur luas
# daerah yang salah satu tepinya melengkung", dan gagasan pokok Materi 01 adalah
# bahwa jumlah sama dengan luas daerah di bawah grafik laju. Kalau frasa itu
# dilarang, dua materi pertama tidak bisa ditulis sama sekali. Yang benar-benar
# baru di Materi 09 bukan frasanya, melainkan keadaan "daerah di bawah sumbu",
# dan itulah yang didaftarkan. Perlindungannya tidak hilang: gagasan luas yang
# bertanda tetap dijaga lewat "luas bertanda" di Materi 06.
#
# "titik potong" ditempatkan di Materi 09, BUKAN Materi 10 seperti pada tabel
# rancangan. Alasannya: Materi 09 memang perlu menyebut tempat kurva memotong
# sumbu x, dan di situlah gagasannya lahir. Materi 10 memakainya lagi untuk dua
# kurva. Menaruhnya di 10 akan membuat alat ini melaporkan Materi 09 sebagai
# pelanggaran, padahal Materi 09 yang benar. Pemeriksa yang terlalu galak sama
# merugikannya dengan yang terlalu longgar.
PENGECUALIAN: dict[int, set[str]] = {}


def ambil_teks_tahap() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, slugnya, dan semua kalimat yang tampil di layar.

    Diambil dengan regex, bukan dengan menjalankan TypeScript-nya: berkasnya
    hanya berisi data, dan menjalankan bundler untuk membaca data adalah harga
    yang tidak perlu dibayar.
    """
    berkas = AKAR / "web" / "content" / "integral" / "tahap.ts"
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


def ambil_teks_naskah() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, nama berkas, dan semua kalimat naskah video.

    NAMA BERKAS MENENTUKAN MATERINYA: `integral05-riemann.json` diperiksa dengan
    aturan Materi 05. Penomoran ini sengaja memakai nomor MATERI, bukan nomor
    urut pembuatan video seperti pada Transformasi Geometri, yang
    `transformasi3-rotasi.json`-nya ternyata Materi 06. Nomor urut pembuatan
    tidak ada artinya bagi siswa, sementara alat ini perlu tahu materi mana yang
    sudah dilewati saat video itu ditonton.

    Yang diperiksa `teks` (terucap) DAN `tulis` (subtitle). Keduanya sampai ke
    siswa, dan istilah yang belum diajarkan sama merusaknya di telinga maupun
    di mata.
    """
    hasil = []
    folder = AKAR / "manim" / "narasi"
    if not folder.is_dir():
        return hasil
    for berkas in sorted(folder.glob("integral*.json")):
        cocok = re.match(r"integral(\d+)", berkas.stem)
        if not cocok:
            print("  LEWAT %s: nomor materinya tidak terbaca dari namanya" % berkas.name)
            continue
        data = json.loads(berkas.read_text(encoding="utf-8"))
        kalimat = []
        for segmen in data.get("segmen", []):
            for medan in ("teks", "tulis"):
                if segmen.get(medan):
                    kalimat.append(segmen[medan])
        hasil.append((int(cocok.group(1)), berkas.name, kalimat))
    return hasil


# Kalimat yang MENJANJIKAN sesuatu untuk nanti boleh menyebut istilah yang belum
# diajarkan.
#
# Ada dua cara sebuah istilah muncul terlalu awal, dan akibatnya berlawanan:
#
#   "Luas bertanda itu negatif."            -> siswa merasa ada yang terlewat,
#                                              lalu berhenti.
#   "Namanya baru kita beri di Materi 06."  -> siswa tahu ini memang sengaja
#                                              ditunda, lalu lanjut.
#
# Syaratnya ketat: kata penunjuk masa depannya harus ada di kalimat yang SAMA.
JANJI = re.compile(
    r"nanti|akan kita|akan dibahas|dibahas|kita buktikan|kita periksa|"
    r"belum kita|baru akan|baru bisa|kita kenal|kita pakai lagi|kita bahas|"
    r"kita singgung|kita lihat|kita temui|kita punya|kita temukan|menyusul|"
    r"berikutnya|khusus membahas",
    re.I,
)

# Rujukan ke topik lain, misalnya "topik Turunan" atau "Turunan Materi 07".
# Topik Turunan dan Limit letaknya SEBELUM Integral, jadi menunjuk ke sana bukan
# pelanggaran urutan belajar.
TOPIK_LAIN = re.compile(r"(?:Turunan|Limit|Grafik Fungsi)\s+Materi\s+(\d{2})")


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

        # Rujukan ke materi Integral yang belum dilewati siswa. Rujukan ke topik
        # lain dibuang lebih dulu supaya "Turunan Materi 07" tidak ikut terjaring.
        tanpa_topik_lain = TOPIK_LAIN.sub("", baris)
        for rujuk in re.findall(r"Materi (\d{2})", tanpa_topik_lain):
            if int(rujuk) > nomor:
                temuan.append((f"rujukan ke Materi {rujuk}", baris))
    return temuan


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--rinci", action="store_true", help="tampilkan kalimatnya")
    a = p.parse_args()

    total = 0
    print("=== HALAMAN MATERI INTEGRAL ===")
    for nomor, slug, kalimat in ambil_teks_tahap():
        temuan = periksa(nomor, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  Materi {nomor:02d} {slug:28s} {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    naskah = ambil_teks_naskah()
    print("\n=== NASKAH VIDEO INTEGRAL ===")
    if not naskah:
        print("  belum ada naskah video (manim/narasi/integral*.json)")
    for nomor, nama, kalimat in naskah:
        temuan = periksa(nomor, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  {nama:34s} (Materi {nomor:02d}) {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    print(f"\n{'SEMUA LOLOS' if total == 0 else f'{total} pemakaian istilah terlalu dini'}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
