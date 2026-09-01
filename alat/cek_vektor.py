"""
Pemeriksa jawaban soal vektor dengan sympy.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: jawaban soal wajib diperiksa dengan hitungan mesin, bukan dengan
keyakinan. Alat ini dibuat SEBELUM satu soal vektor pun ditulis, meniru
`alat/cek_soal.py` yang sudah terbukti pada topik Limit.

Bedanya dengan pemeriksa limit: di sini yang sering muncul bukan pecahan
melainkan AKAR. Panjang vektor (3 4) adalah 5, tetapi panjang (2 3) adalah
akar 13. Kalau dibandingkan sebagai desimal, akar 13 dan 3,606 akan dianggap
berbeda, padahal soalnya memang menuliskan salah satunya. Karena itu yang
dibandingkan adalah selisih yang disederhanakan sympy, bukan teksnya, dan
bukan pula desimalnya.

CARA PAKAI
----------
    python alat/cek_vektor.py <berkas.json> [berkas lain ...]

Isi tiap berkas adalah senarai objek. Bentuk umumnya:

    { "id": "...", "jenis": "...", ...bahan..., "jawaban": ... }

JENIS YANG DIDUKUNG
-------------------
    panjang           { "v": [3, 4] }                     -> skalar
    jumlah            { "a": [3, 1], "b": [1, 2] }        -> vektor
    selisih           { "a": [3, 1], "b": [1, 2] }        -> vektor
    dari_dua_titik    { "a": [2, 1], "b": [6, 4] }        -> vektor (ujung - pangkal)
    kali_skalar       { "k": -2, "v": [2, 1] }            -> vektor
    satuan            { "v": [3, 4] }                     -> vektor
    titik             { "a": [4, 3], "b": [2, 0] }        -> skalar
    sudut             { "a": [1, 0], "b": [0, 1] }        -> skalar, dalam derajat
    proyeksi_panjang  { "a": [4, 3], "b": [2, 0] }        -> skalar
    proyeksi_vektor   { "a": [4, 3], "b": [2, 0] }        -> vektor
    pembulatan        { "nilai": "sqrt(13)", "desimal": 2 }  -> skalar bundar
    sejajar           { "a": [2, 1], "b": [6, 3] }        -> true atau false
    ekspresi          { "hitung": "sqrt(13)" }            -> skalar, untuk hitungan bebas

Komponen dan jawaban boleh ditulis sebagai angka ATAU sebagai teks yang dibaca
sympy, misalnya "sqrt(13)", "3/5", "2*sqrt(5)". Vektor boleh 2 atau 3 komponen.

KODE KELUAR
-----------
0  semua lolos
1  ada jawaban yang salah
2  berkasnya tidak bisa dibaca
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import sympy


def nilai(x):
    """Ubah angka atau teks menjadi bilangan sympy yang tepat."""
    if isinstance(x, bool):
        return x
    if isinstance(x, (int, float)):
        return sympy.nsimplify(sympy.Rational(str(x)), rational=True)
    return sympy.sympify(str(x), rational=True)


def vektor(daftar):
    if not isinstance(daftar, (list, tuple)) or len(daftar) not in (2, 3):
        raise ValueError(f'vektor harus 2 atau 3 komponen, dapat {daftar!r}')
    return sympy.Matrix([nilai(k) for k in daftar])


def sama(hasil, diklaim) -> bool:
    """
    Benar kalau keduanya sama secara matematika.

    Perbandingan teks tidak dipakai: sympy bisa menuliskan bilangan yang sama
    dengan bentuk berbeda, dan soal sering menuliskan akar sedangkan hitungan
    menghasilkan bentuk lain yang setara. Yang dipakai selisih yang
    disederhanakan.
    """
    if isinstance(hasil, bool) or isinstance(diklaim, bool):
        return bool(hasil) == bool(diklaim)
    if isinstance(hasil, sympy.Matrix):
        if not isinstance(diklaim, sympy.Matrix) or hasil.shape != diklaim.shape:
            return False
        return all(sympy.simplify(a - b) == 0 for a, b in zip(hasil, diklaim))
    try:
        return sympy.simplify(hasil - diklaim) == 0
    except TypeError:
        return False


def hitung(soal: dict):
    """Hitung jawaban yang SEBENARNYA dari bahan yang diberikan."""
    jenis = soal['jenis']

    if jenis == 'panjang':
        return vektor(soal['v']).norm()

    if jenis == 'jumlah':
        return vektor(soal['a']) + vektor(soal['b'])

    if jenis == 'selisih':
        return vektor(soal['a']) - vektor(soal['b'])

    if jenis == 'dari_dua_titik':
        # ujung dikurangi pangkal, bukan sebaliknya
        return vektor(soal['b']) - vektor(soal['a'])

    if jenis == 'kali_skalar':
        return nilai(soal['k']) * vektor(soal['v'])

    if jenis == 'satuan':
        v = vektor(soal['v'])
        if v.norm() == 0:
            raise ValueError('vektor nol tidak punya vektor satuan')
        return v / v.norm()

    if jenis == 'titik':
        return vektor(soal['a']).dot(vektor(soal['b']))

    if jenis == 'sudut':
        a, b = vektor(soal['a']), vektor(soal['b'])
        if a.norm() == 0 or b.norm() == 0:
            raise ValueError('vektor nol tidak punya sudut')
        kos = sympy.simplify(a.dot(b) / (a.norm() * b.norm()))
        return sympy.deg(sympy.acos(kos))

    if jenis == 'proyeksi_panjang':
        a, b = vektor(soal['a']), vektor(soal['b'])
        return sympy.simplify(a.dot(b) / b.norm())

    if jenis == 'proyeksi_vektor':
        a, b = vektor(soal['a']), vektor(soal['b'])
        return sympy.simplify(a.dot(b) / b.dot(b)) * b

    if jenis == 'sejajar':
        # Sejajar kalau salah satunya kelipatan yang lain. Diperiksa lewat
        # hasil kali silang, sebab cara itu berlaku di 2D maupun 3D dan tidak
        # perlu membagi (yang bisa membagi nol).
        a, b = vektor(soal['a']), vektor(soal['b'])
        if len(a) == 2:
            return sympy.simplify(a[0] * b[1] - a[1] * b[0]) == 0
        return all(sympy.simplify(k) == 0 for k in a.cross(b))

    if jenis == 'ekspresi':
        return nilai(soal['hitung'])

    if jenis == 'pembulatan':
        # Naskah materi memuat angka bundar seperti "sekitar 3,61", sedangkan
        # nilai tepatnya akar 13. Keduanya harus sama-sama diperiksa: yang tepat
        # supaya matematikanya benar, yang bundar supaya yang DIBACA siswa benar.
        tepat = nilai(soal['nilai'])
        return sympy.Float(round(float(tepat), int(soal['desimal'])))

    raise ValueError(f'jenis tidak dikenal: {jenis}')


def diklaim(soal: dict):
    j = soal['jawaban']
    if isinstance(j, bool):
        return j
    if isinstance(j, (list, tuple)):
        return vektor(j)
    return nilai(j)


def periksa(berkas: Path) -> tuple[int, int]:
    try:
        daftar = json.loads(berkas.read_text(encoding='utf-8'))
    except Exception as galat:
        print(f'GAGAL membaca {berkas}: {galat}')
        sys.exit(2)

    lolos = 0
    gagal = 0
    for soal in daftar:
        nama = soal.get('id', '(tanpa id)')
        try:
            benar = hitung(soal)
            klaim = diklaim(soal)
        except Exception as galat:
            gagal += 1
            print(f'  RUSAK  {nama}: {galat}')
            continue

        if sama(benar, klaim):
            lolos += 1
        else:
            gagal += 1
            rapi = list(benar) if isinstance(benar, sympy.Matrix) else benar
            print(f'  SALAH  {nama}')
            print(f'         diklaim : {soal["jawaban"]}')
            print(f'         benarnya: {rapi}')
    return lolos, gagal


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2

    total_lolos = 0
    total_gagal = 0
    for nama in sys.argv[1:]:
        berkas = Path(nama)
        print(f'== {berkas} ==')
        lolos, gagal = periksa(berkas)
        print(f'   {lolos} lolos, {gagal} gagal')
        total_lolos += lolos
        total_gagal += gagal

    print()
    if total_gagal:
        print(f'ADA YANG SALAH: {total_gagal} dari {total_lolos + total_gagal}')
        return 1
    print(f'SEMUA LOLOS: {total_lolos} soal')
    return 0


if __name__ == '__main__':
    sys.exit(main())
