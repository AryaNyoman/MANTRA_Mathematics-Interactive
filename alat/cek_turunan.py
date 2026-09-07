"""
Pemeriksa angka topik Turunan dengan sympy.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: tiap angka yang tampil di halaman wajib diperiksa mesin, bukan
diyakini. `alat/cek_soal.py` hanya paham bentuk limit, sedangkan topik ini
penuh turunan, titik stasioner, dan persamaan garis singgung. Jadi pemeriksanya
dibuat sendiri, meniru `alat/cek_vektor.py` yang sudah terbukti.

Yang dibandingkan adalah SELISIH yang disederhanakan sympy, bukan teksnya.
Alasannya: 1/(2*sqrt(x)) dan x**(-1/2)/2 adalah jawaban yang sama, dan
pemeriksa yang membandingkan teks akan menolak salah satunya tanpa sebab.

CARA PAKAI
----------
    python alat/cek_turunan.py <berkas.json> [berkas lain ...]

Isi tiap berkas adalah senarai objek:

    { "id": "...", "jenis": "...", ...bahan..., "jawaban": ... }

JENIS YANG DIDUKUNG
-------------------
    laju_rata_rata   { "titik1": [1, 20], "titik2": [3, 64] }      -> skalar
    nilai_fungsi     { "f": "x**2", "di": 3 }                      -> skalar
    turunan          { "f": "x**2" }                               -> ungkapan
    turunan_di       { "f": "x**2", "di": 1 }                      -> skalar
    turunan_kedua    { "f": "50*t - 5*t**2", "peubah": "t" }       -> ungkapan
    limit_definisi   { "f": "x**2", "di": 1 }                      -> skalar
    stasioner        { "f": "x**3 - 3*x" }                         -> senarai
    garis_singgung   { "f": "x**2 + 2*x + 1", "di": 0 }            -> ungkapan (ruas kanan y = ...)
    ekspresi         { "hitung": "44/2" }                          -> skalar

`limit_definisi` sengaja dipisah dari `turunan_di`: yang pertama menempuh jalan
definisi ( f(x+h) - f(x) ) / h dengan h menuju 0, yang kedua memakai `diff`
bawaan sympy. Materi 02 sampai 04 mengklaim keduanya memberi hasil sama, dan
klaim itu sendiri layak diperiksa.

Peubah bawaannya `x`; ganti dengan medan "peubah" kalau soalnya memakai t.

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

import sympy as sp


def baca(teks) -> sp.Expr:
    """Ubah angka atau teks menjadi ungkapan sympy."""
    return sp.sympify(teks, rational=True)


def sama(a: sp.Expr, b: sp.Expr) -> bool:
    """Benarkah dua ungkapan bernilai sama.

    Dibandingkan lewat selisih yang disederhanakan, bukan lewat teksnya.
    `simplify` bisa menyerah pada bentuk berakar, jadi kalau hasilnya belum
    jelas nol, dicoba sekali lagi dengan pembandingan numerik pada beberapa
    titik. Itu bukan kelonggaran: yang ditolak tetap yang selisihnya bukan nol.
    """
    selisih = sp.simplify(a - b)
    if selisih == 0:
        return True
    try:
        peubah = sorted(selisih.free_symbols, key=str)
        if not peubah:
            return bool(abs(complex(selisih.evalf())) < 1e-9)
        uji = [sp.Rational(1, 3), sp.Rational(3, 4), 2, 5]
        for nilai in uji:
            hasil = selisih.subs({p: nilai for p in peubah})
            if abs(complex(hasil.evalf())) > 1e-9:
                return False
        return True
    except (TypeError, ValueError):
        return False


def peubah_dari(soal: dict) -> sp.Symbol:
    return sp.Symbol(soal.get("peubah", "x"))


def hitung(soal: dict) -> sp.Expr:
    """Jawaban yang benar menurut sympy, untuk satu soal."""
    jenis = soal["jenis"]
    v = peubah_dari(soal)

    if jenis == "laju_rata_rata":
        (x1, y1), (x2, y2) = soal["titik1"], soal["titik2"]
        return (baca(y2) - baca(y1)) / (baca(x2) - baca(x1))

    if jenis == "nilai_fungsi":
        return baca(soal["f"]).subs(v, baca(soal["di"]))

    if jenis == "turunan":
        return sp.diff(baca(soal["f"]), v)

    if jenis == "turunan_di":
        return sp.diff(baca(soal["f"]), v).subs(v, baca(soal["di"]))

    if jenis == "turunan_kedua":
        return sp.diff(baca(soal["f"]), v, 2)

    if jenis == "limit_definisi":
        h = sp.Symbol("h")
        f = baca(soal["f"])
        a = baca(soal["di"])
        return sp.limit((f.subs(v, a + h) - f.subs(v, a)) / h, h, 0)

    if jenis == "stasioner":
        akar = sp.solve(sp.Eq(sp.diff(baca(soal["f"]), v), 0), v)
        return sorted(akar, key=lambda z: sp.re(z.evalf()))

    if jenis == "garis_singgung":
        f = baca(soal["f"])
        a = baca(soal["di"])
        return sp.expand(f.subs(v, a) + sp.diff(f, v).subs(v, a) * (v - a))

    if jenis == "ekspresi":
        return baca(soal["hitung"])

    raise KeyError(f"jenis tidak dikenal: {jenis}")


def periksa(soal: dict) -> tuple[bool, str]:
    benar = hitung(soal)
    diklaim = soal["jawaban"]

    if soal["jenis"] == "stasioner":
        klaim = sorted((baca(z) for z in diklaim), key=lambda z: sp.re(z.evalf()))
        if len(klaim) != len(benar):
            return False, f"benar {benar}, ditulis {klaim}"
        cocok = all(sama(a, b) for a, b in zip(benar, klaim))
        return cocok, f"benar {benar}, ditulis {klaim}"

    klaim = baca(diklaim)
    return sama(benar, klaim), f"benar {sp.simplify(benar)}, ditulis {klaim}"


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2

    gagal = 0
    total = 0
    for nama in argv[1:]:
        jalur = Path(nama)
        try:
            daftar = json.loads(jalur.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as e:
            print(f"BERKAS TIDAK TERBACA {jalur}: {e}")
            return 2

        print(f"=== {jalur.name} ({len(daftar)} klaim) ===")
        for soal in daftar:
            total += 1
            try:
                lolos, pesan = periksa(soal)
            except Exception as e:  # noqa: BLE001
                lolos, pesan = False, f"gagal dihitung: {e}"
            if lolos:
                print(f"  ok    {soal['id']}")
            else:
                gagal += 1
                print(f"  SALAH {soal['id']}: {pesan}")

    print(f"\n{total} klaim diperiksa, {gagal} salah")
    return 0 if gagal == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
