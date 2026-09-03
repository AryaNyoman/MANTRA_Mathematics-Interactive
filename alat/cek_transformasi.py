"""
Pemeriksa angka topik Transformasi Geometri.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: tiap angka yang muncul di halaman siswa diperiksa MESIN, bukan
dipercaya. Itu berlaku untuk contoh berhitung di dalam materi, untuk jawaban
soal latihan, dan untuk jawaban bank kuis.

Alasannya bukan teori. Saat menulis spesifikasi topik ini, satu baris tabel
Materi 08 ditulis salah: dilatasi dengan k negatif dikira membalik arah putar,
padahal determinannya k kuadrat yang selalu positif. Kesalahan itu tertangkap
karena diperiksa, bukan karena dibaca ulang.

BEDANYA DENGAN `alat/uji-matriks-transformasi.mts`
--------------------------------------------------
Berkas `.mts` itu menguji KODE widget: apakah fungsi `rotasi` benar. Alat ini
menguji ISI HALAMAN: apakah angka yang tertulis di contoh dan di kunci jawaban
memang hasil dari fungsi itu. Keduanya bisa gagal sendiri-sendiri, jadi
keduanya ada.

Hitungannya di sini ditulis ulang dari nol dengan `Fraction`, TIDAK mengimpor
apa pun dari widget. Kalau alat ini memakai fungsi yang sama dengan yang
diperiksanya, kesalahan yang sama akan lolos dua kali.

CARA PAKAI
----------
    python alat/cek_transformasi.py alat/materi-transformasi-geometri.json
    python alat/cek_transformasi.py alat/soal-latihan-transformasi.json
    python alat/cek_transformasi.py alat/soal-kuis-transformasi.json

Tanpa nama berkas, ketiganya diperiksa sekaligus.

KODE KELUAR
-----------
0  semua klaim cocok
1  ada klaim yang salah
2  berkasnya tidak bisa dibaca
"""

from __future__ import annotations

import json
import math
import sys
from fractions import Fraction
from pathlib import Path

AKAR = Path(__file__).resolve().parent
BAWAAN = [
    'materi-transformasi-geometri.json',
    'soal-latihan-transformasi.json',
    'soal-kuis-transformasi.json',
]

Titik = tuple[Fraction, Fraction]


def F(n) -> Fraction:
    """Angka apa pun jadi pecahan tepat. Desimal dari JSON pun jadi pecahan."""
    return Fraction(str(n))


def titik(pasangan) -> Titik:
    return (F(pasangan[0]), F(pasangan[1]))


# ------------------------------------------------------------------ #
# Kelima transformasi, ditulis ulang dari definisinya                 #
# ------------------------------------------------------------------ #

def translasi(p: Titik, g: Titik) -> Titik:
    return (p[0] + g[0], p[1] + g[1])


def cermin_sumbu_x(p: Titik) -> Titik:
    return (p[0], -p[1])


def cermin_sumbu_y(p: Titik) -> Titik:
    return (-p[0], p[1])


def cermin_garis_tegak(p: Titik, k: Fraction) -> Titik:
    return (2 * k - p[0], p[1])


def cermin_garis_datar(p: Titik, h: Fraction) -> Titik:
    return (p[0], 2 * h - p[1])


def cermin_y_x(p: Titik) -> Titik:
    return (p[1], p[0])


def cermin_y_min_x(p: Titik) -> Titik:
    return (-p[1], -p[0])


def cermin_titik(p: Titik, m: Titik) -> Titik:
    return (2 * m[0] - p[0], 2 * m[1] - p[1])


def rotasi(p: Titik, derajat, pusat: Titik):
    """
    Rotasi. Untuk kelipatan 90 derajat hasilnya TEPAT sebagai pecahan.
    Untuk sudut lain hasilnya desimal, dan pembandingnya pakai toleransi.

    Kelipatan 90 dikerjakan terpisah dengan sengaja: sudut itulah yang paling
    sering muncul di soal, dan jawabannya wajib berupa bilangan bulat yang bisa
    dibandingkan tanpa toleransi sama sekali.
    """
    dx = p[0] - pusat[0]
    dy = p[1] - pusat[1]
    sisa = int(derajat) % 360 if float(derajat).is_integer() else None

    if sisa == 0:
        rx, ry = dx, dy
    elif sisa == 90:
        rx, ry = -dy, dx
    elif sisa == 180:
        rx, ry = -dx, -dy
    elif sisa == 270:
        rx, ry = dy, -dx
    else:
        r = math.radians(float(derajat))
        rx = float(dx) * math.cos(r) - float(dy) * math.sin(r)
        ry = float(dx) * math.sin(r) + float(dy) * math.cos(r)
        return (rx + float(pusat[0]), ry + float(pusat[1]))

    return (rx + pusat[0], ry + pusat[1])


def dilatasi(p: Titik, k: Fraction, pusat: Titik) -> Titik:
    return (pusat[0] + k * (p[0] - pusat[0]), pusat[1] + k * (p[1] - pusat[1]))


# ------------------------------------------------------------------ #
# Matriks                                                             #
# ------------------------------------------------------------------ #

def kenakan(m, p: Titik):
    """m ditulis [[a, b], [c, d]]."""
    a, b = F(m[0][0]), F(m[0][1])
    c, d = F(m[1][0]), F(m[1][1])
    return (a * p[0] + b * p[1], c * p[0] + d * p[1])


def kali_matriks(m2, m1):
    a2, b2, c2, d2 = F(m2[0][0]), F(m2[0][1]), F(m2[1][0]), F(m2[1][1])
    a1, b1, c1, d1 = F(m1[0][0]), F(m1[0][1]), F(m1[1][0]), F(m1[1][1])
    return [
        [a2 * a1 + b2 * c1, a2 * b1 + b2 * d1],
        [c2 * a1 + d2 * c1, c2 * b1 + d2 * d1],
    ]


# ------------------------------------------------------------------ #
# Pengerjaan satu klaim                                               #
# ------------------------------------------------------------------ #

def kerjakan_satu(langkah: dict, p: Titik):
    """Satu langkah transformasi pada sebuah titik, dipakai juga oleh komposisi."""
    j = langkah['jenis']
    if j == 'translasi':
        return translasi(p, titik(langkah['geser']))
    if j == 'cermin_sumbu_x':
        return cermin_sumbu_x(p)
    if j == 'cermin_sumbu_y':
        return cermin_sumbu_y(p)
    if j == 'cermin_garis_tegak':
        return cermin_garis_tegak(p, F(langkah['k']))
    if j == 'cermin_garis_datar':
        return cermin_garis_datar(p, F(langkah['h']))
    if j == 'cermin_y_x':
        return cermin_y_x(p)
    if j == 'cermin_y_min_x':
        return cermin_y_min_x(p)
    if j == 'cermin_titik':
        return cermin_titik(p, titik(langkah['pusat']))
    if j == 'rotasi':
        return rotasi(p, langkah['derajat'], titik(langkah.get('pusat', [0, 0])))
    if j == 'dilatasi':
        return dilatasi(p, F(langkah['k']), titik(langkah.get('pusat', [0, 0])))
    if j == 'matriks':
        return kenakan(langkah['m'], p)
    raise ValueError(f'jenis langkah tidak dikenal: {j}')


def dekat(a, b, toleransi=1e-9) -> bool:
    return abs(float(a) - float(b)) <= toleransi


def periksa(klaim: dict) -> tuple[bool, str]:
    j = klaim['jenis']

    if j == 'komposisi':
        p = titik(klaim['titik'])
        for langkah in klaim['langkah']:
            p = kerjakan_satu(langkah, p)
        harap = titik(klaim['jawaban'])
        ok = dekat(p[0], harap[0]) and dekat(p[1], harap[1])
        return ok, f'dapat ({p[0]}, {p[1]})'

    if j == 'kali_matriks':
        dapat = kali_matriks(klaim['m2'], klaim['m1'])
        harap = klaim['jawaban']
        ok = all(
            dekat(dapat[r][c], F(harap[r][c]))
            for r in range(2) for c in range(2)
        )
        return ok, f'dapat {[[str(x) for x in baris] for baris in dapat]}'

    if j == 'titik_tengah':
        a = titik(klaim['a'])
        b = titik(klaim['b'])
        dapat = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
        harap = titik(klaim['jawaban'])
        ok = dapat == harap
        return ok, f'dapat ({dapat[0]}, {dapat[1]})'

    if j == 'vektor_translasi':
        a = titik(klaim['a'])
        b = titik(klaim['b'])
        dapat = (b[0] - a[0], b[1] - a[1])
        harap = titik(klaim['jawaban'])
        ok = dapat == harap
        return ok, f'dapat ({dapat[0]}, {dapat[1]})'

    if j == 'titik_pada_garis':
        # Memeriksa apakah sebuah titik benar-benar terletak pada garis
        # y = m x + c. Dipakai untuk soal yang mentransformasi GARIS, bukan
        # titik: sebuah titik diambil dari garis semula, dipetakan, lalu
        # diperiksa apakah ia jatuh pada garis yang diklaim sebagai petanya.
        # Dua titik yang cocok sudah cukup, sebab dua titik menentukan garis.
        p = titik(klaim['titik'])
        dapat = F(klaim['m']) * p[0] + F(klaim['c'])
        ok = dapat == p[1]
        return ok, f'y garisnya {dapat}, y titiknya {p[1]}'

    if j == 'luas_dilatasi':
        luas = F(klaim['luas'])
        k = F(klaim['k'])
        dapat = luas * k * k
        ok = dapat == F(klaim['jawaban'])
        return ok, f'dapat {dapat}'

    # Sisanya: satu transformasi pada satu titik.
    p = kerjakan_satu(klaim, titik(klaim['titik']))
    harap = titik(klaim['jawaban'])
    ok = dekat(p[0], harap[0]) and dekat(p[1], harap[1])
    return ok, f'dapat ({p[0]}, {p[1]})'


def periksa_berkas(jalur: Path) -> tuple[int, int]:
    try:
        daftar = json.loads(jalur.read_text(encoding='utf-8'))
    except Exception as e:
        print(f'GAGAL membaca {jalur.name}: {e}')
        raise SystemExit(2)

    lolos = 0
    for klaim in daftar:
        ok, catatan = periksa(klaim)
        if ok:
            lolos += 1
        else:
            print(f'  SALAH  {klaim["id"]:32s} {catatan}, '
                  f'ditulis {klaim.get("jawaban")}')
    return lolos, len(daftar)


def main() -> int:
    berkas = sys.argv[1:] or [str(AKAR / n) for n in BAWAAN]
    total_lolos = 0
    total = 0

    for nama in berkas:
        jalur = Path(nama)
        if not jalur.is_absolute():
            jalur = Path.cwd() / jalur
        lolos, jumlah = periksa_berkas(jalur)
        print(f'{jalur.name:38s} {lolos} dari {jumlah} lolos')
        total_lolos += lolos
        total += jumlah

    print()
    if total_lolos == total:
        print(f'SEMUA LOLOS: {total} klaim diperiksa.')
        return 0
    print(f'{total - total_lolos} dari {total} klaim SALAH.')
    return 1


if __name__ == '__main__':
    raise SystemExit(main())
