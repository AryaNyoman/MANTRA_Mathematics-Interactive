"""
Pemeriksa angka materi Integral dengan sympy.

KENAPA ALAT INI ADA
-------------------
`alat/cek_soal.py` hanya paham satu jenis klaim, yaitu limit. Materi Integral
mengklaim hal lain: antiturunan, integral tentu, jumlahan Riemann, luas daerah
yang sebagian ada di bawah sumbu, dan luas antara dua kurva. Klaim seperti itu
tidak bisa diperiksa alat limit, dan memeriksanya dengan tangan persis cara
kesalahan masuk ke situs.

Dibuat SEBELUM satu materi pun ditulis, dan dibuktikan DUA ARAH: berkas
`alat/uji-cek-integral-salah.json` berisi klaim yang sengaja dibuat salah, dan
alat ini wajib menolak semuanya. Pemeriksa yang belum pernah terbukti bisa
gagal tidak boleh dipercaya; alat mutu di proyek ini pernah salah lapor.

CARA PAKAI
----------
    python alat/cek_integral.py alat/materi-integral.json
    python alat/cek_integral.py alat/uji-cek-integral-salah.json --harus-gagal

JENIS KLAIM
-----------
antiturunan   F adalah antiturunan f. Diperiksa dengan MENURUNKAN F, persis
              cara buku membuktikannya. {"f": "x**5", "F": "x**6/6"}
tentu         integral tentu f dari a sampai b bernilai `jawaban`.
riemann       jumlahan Riemann n persegi panjang, titik sampel kiri, kanan,
              atau tengah. Dihitung sebagai JUMLAH, bukan sebagai integral.
luas          luas daerah antara kurva dan sumbu x, bagian di bawah sumbu
              dihitung positif. Titik potong dicari sendiri, bukan diberikan.
luas_antara   luas antara dua kurva: integral (atas dikurangi bawah) dari a
              sampai b. Alat menolak kalau `atas` ternyata tidak selalu berada
              di atas `bawah` pada selang itu.
akar          pembuat nol f pada selang [a, b] adalah `jawaban` (senarai).
nilai         sebuah ekspresi bernilai `jawaban`. Untuk angka biasa di tabel.

KODE KELUAR
-----------
0  semua klaim lolos (atau, dengan --harus-gagal, semua klaim ditolak)
1  ada yang tidak sesuai harapan
2  berkasnya tidak bisa dibaca

Yang dibandingkan selalu SELISIH yang disederhanakan, bukan teksnya: 26/3 dan
52/6 adalah bilangan yang sama.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import sympy

# Konsol Windows bawaan tidak bisa mencetak lambang yang ada di keterangan
# klaim. Alat mutu yang mati di tengah tabel terlihat seperti lolos, dan itu
# sudah pernah terjadi di proyek ini pada periksa_tahap.py.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def sama(a, b) -> bool:
    """Benar kalau dua nilai sama secara matematika, bukan sama tulisannya."""
    try:
        return sympy.simplify(a - b) == 0
    except (TypeError, ValueError, AttributeError):
        try:
            return abs(complex(a) - complex(b)) < 1e-12
        except (TypeError, ValueError):
            return False


def _x(klaim: dict) -> sympy.Symbol:
    """Peubah materinya, ditandai nyata supaya solveset dan Abs berperilaku benar.

    JEBAKAN YANG SUDAH MENGGIGIT SEKALI (7 Sep 2026): `Symbol('x', real=True)`
    BUKAN lambang yang sama dengan `x` bawaan `sympify('x**2')`. Kalau keduanya
    dicampur, `diff` mengembalikan 0 dan `integrate` memperlakukan rumusnya
    sebagai tetapan. Akibatnya alat menolak SEMUA klaim, termasuk yang benar,
    sambil terlihat lulus uji "harus gagal". Karena itu tiap rumus WAJIB dibaca
    lewat `_sym(teks, x)`, yang menanamkan lambang ini ke pembacaannya.
    """
    return sympy.Symbol(klaim.get("peubah", "x"), real=True)


def _sym(teks, x: sympy.Symbol | None = None) -> sympy.Expr:
    """Baca rumus. `x` ditanamkan supaya lambangnya sama dengan peubah materi."""
    lokal = {x.name: x} if x is not None else {}
    return sympy.sympify(str(teks), locals=lokal)


# --------------------------------------------------------------------------
# Satu fungsi per jenis klaim. Tiap fungsi mengembalikan (lolos, keterangan).
# --------------------------------------------------------------------------

def periksa_antiturunan(k: dict) -> tuple[bool, str]:
    """F benar antiturunan f kalau F' dikurangi f menyederhana jadi nol.

    Sengaja MENURUNKAN F, bukan mengintegralkan f: itu cara buku membuktikan
    tiap sifatnya, dan hasilnya tidak bergantung pada bentuk mana yang dipilih
    sympy untuk menuliskan antiturunannya.
    """
    x = _x(k)
    f, F = _sym(k["f"], x), _sym(k["F"], x)
    turunan = sympy.simplify(sympy.diff(F, x))
    if sympy.simplify(turunan - f) == 0:
        return True, f"F' = {turunan} cocok dengan f"
    return False, f"DITOLAK: turunan F adalah {turunan}, bukan {f}"


def periksa_tentu(k: dict) -> tuple[bool, str]:
    x = _x(k)
    hasil = sympy.simplify(sympy.integrate(_sym(k["f"], x), (x, _sym(k["a"], x), _sym(k["b"], x))))
    diklaim = _sym(k["jawaban"])
    if sama(hasil, diklaim):
        return True, f"integral tentunya {hasil}"
    return False, f"DITOLAK: dijawab {diklaim}, seharusnya {hasil}"


def periksa_riemann(k: dict) -> tuple[bool, str]:
    """Jumlahan Riemann dihitung sebagai JUMLAH, bukan sebagai integral.

    Kalau dihitung lewat integral, alat ini akan meloloskan klaim jumlahan yang
    salah selama nilai integralnya kebetulan dekat. Yang diperiksa harus benda
    yang sama dengan yang diajarkan: n persegi panjang, satu per satu.
    """
    x = _x(k)
    f = _sym(k["f"], x)
    a, b = _sym(k["a"], x), _sym(k["b"], x)
    n = int(k["n"])
    sampel = k.get("sampel", "kiri")
    geser = {"kiri": sympy.Integer(0), "kanan": sympy.Integer(1), "tengah": sympy.Rational(1, 2)}
    if sampel not in geser:
        return False, f"DITOLAK: titik sampel '{sampel}' tidak dikenal"
    lebar = (b - a) / n
    total = sympy.Integer(0)
    for i in range(n):
        titik = a + (i + geser[sampel]) * lebar
        total += f.subs(x, titik) * lebar
    total = sympy.simplify(total)
    diklaim = _sym(k["jawaban"])
    if sama(total, diklaim):
        return True, f"jumlahan {sampel} n={n} adalah {total}"
    return False, f"DITOLAK: dijawab {diklaim}, seharusnya {total}"


def periksa_luas(k: dict) -> tuple[bool, str]:
    """Luas daerah antara kurva dan sumbu x, bagian di bawah dihitung positif.

    Titik potong dicari sendiri dengan solveset, bukan diambil dari klaim.
    Kalau titik potongnya diberikan, kekeliruan yang paling sering terjadi
    (lupa memecah di titik potong) justru tidak akan pernah tertangkap.
    """
    x = _x(k)
    f = _sym(k["f"], x)
    a, b = _sym(k["a"], x), _sym(k["b"], x)
    akar = sympy.solveset(sympy.Eq(f, 0), x, sympy.Interval(a, b))
    try:
        titik = sorted({sympy.nsimplify(t) for t in akar} | {a, b}, key=lambda t: float(t))
    except TypeError:
        return False, "DITOLAK: titik potongnya tidak bisa diurutkan (bukan bilangan nyata)"
    total = sympy.Integer(0)
    for kiri, kanan in zip(titik, titik[1:]):
        total += sympy.Abs(sympy.integrate(f, (x, kiri, kanan)))
    total = sympy.simplify(total)
    diklaim = _sym(k["jawaban"])
    if sama(total, diklaim):
        dipecah = [str(t) for t in titik[1:-1]]
        return True, f"luasnya {total}, dipecah di {dipecah if dipecah else 'tidak perlu dipecah'}"
    return False, f"DITOLAK: dijawab {diklaim}, seharusnya {total}"


def periksa_luas_antara(k: dict) -> tuple[bool, str]:
    """Luas antara dua kurva, dengan memeriksa mana yang benar-benar di atas.

    Klaim "atas dikurangi bawah" yang urutannya terbalik memberi hasil negatif,
    dan itu kekeliruan yang dilawan Materi 10. Jadi alat memeriksa dua hal:
    hasilnya benar, DAN kurva `atas` memang tidak pernah berada di bawah kurva
    `bawah` pada selang itu.
    """
    x = _x(k)
    atas, bawah = _sym(k["atas"], x), _sym(k["bawah"], x)
    a, b = _sym(k["a"], x), _sym(k["b"], x)
    beda = sympy.simplify(atas - bawah)
    for bagi in range(1, 20):
        titik = a + (b - a) * sympy.Rational(bagi, 20)
        nilai = sympy.simplify(beda.subs(x, titik))
        if nilai.is_number and nilai.is_real and nilai < 0:
            return False, f"DITOLAK: di x = {titik} kurva 'atas' bernilai {nilai} di bawah kurva 'bawah'"
    hasil = sympy.simplify(sympy.integrate(beda, (x, a, b)))
    diklaim = _sym(k["jawaban"])
    if sama(hasil, diklaim):
        return True, f"luas antara dua kurvanya {hasil}"
    return False, f"DITOLAK: dijawab {diklaim}, seharusnya {hasil}"


def periksa_akar(k: dict) -> tuple[bool, str]:
    x = _x(k)
    f = _sym(k["f"], x)
    a, b = _sym(k.get("a", "-oo"), x), _sym(k.get("b", "oo"), x)
    ditemukan = sympy.solveset(sympy.Eq(f, 0), x, sympy.Interval(a, b))
    try:
        punya = sorted((sympy.nsimplify(t) for t in ditemukan), key=lambda t: float(t))
    except TypeError:
        return False, "DITOLAK: himpunan akarnya tidak berhingga atau bukan bilangan nyata"
    diklaim = sorted((_sym(t) for t in k["jawaban"]), key=lambda t: float(t))
    if len(punya) == len(diklaim) and all(sama(p, d) for p, d in zip(punya, diklaim)):
        return True, f"akarnya {[str(t) for t in punya]}"
    return False, f"DITOLAK: dijawab {[str(t) for t in diklaim]}, seharusnya {[str(t) for t in punya]}"


def periksa_nilai(k: dict) -> tuple[bool, str]:
    hasil = sympy.simplify(_sym(k["ekspresi"]))
    diklaim = _sym(k["jawaban"])
    if sama(hasil, diklaim):
        return True, f"nilainya {hasil}"
    return False, f"DITOLAK: dijawab {diklaim}, seharusnya {hasil}"


PEMERIKSA = {
    "antiturunan": periksa_antiturunan,
    "tentu": periksa_tentu,
    "riemann": periksa_riemann,
    "luas": periksa_luas,
    "luas_antara": periksa_luas_antara,
    "akar": periksa_akar,
    "nilai": periksa_nilai,
}


def periksa_satu(k: dict) -> tuple[bool, str]:
    nama = k.get("id", "(tanpa id)")
    jenis = k.get("jenis")
    if jenis not in PEMERIKSA:
        return False, f"{nama}: jenis klaim '{jenis}' tidak dikenal"
    try:
        lolos, kata = PEMERIKSA[jenis](k)
    except KeyError as galat:
        return False, f"{nama}: klaim {jenis} kekurangan medan {galat}"
    except (sympy.SympifyError, TypeError, ValueError, NotImplementedError) as galat:
        return False, f"{nama}: sympy gagal ({type(galat).__name__}: {galat})"
    return lolos, f"{nama} [{jenis}]: {kata}"


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser(description="Pemeriksa angka materi Integral.")
    p.add_argument("berkas", help="berkas klaim JSON")
    p.add_argument("--harus-gagal", action="store_true",
                   help="mode pembuktian: semua klaim wajib ditolak; kalau ada yang lolos, alatnya rusak")
    a = p.parse_args(argv[1:])

    jalur = Path(a.berkas)
    try:
        daftar = json.loads(jalur.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as galat:
        print(f"tidak bisa membaca {jalur}: {galat}", file=sys.stderr)
        return 2
    if not isinstance(daftar, list):
        print(f"{jalur} harus berisi senarai klaim", file=sys.stderr)
        return 2

    jumlah_lolos = 0
    for klaim in daftar:
        lolos, kata = periksa_satu(klaim)
        print(("  LOLOS  " if lolos else "  TOLAK  ") + kata)
        jumlah_lolos += 1 if lolos else 0

    jumlah = len(daftar)
    print()
    if a.harus_gagal:
        if jumlah_lolos == 0:
            print(f"PEMBUKTIAN BERHASIL: {jumlah} klaim sengaja salah, {jumlah} ditolak.")
            return 0
        print(f"ALATNYA RUSAK: {jumlah_lolos} dari {jumlah} klaim yang sengaja salah justru LOLOS.")
        return 1

    if jumlah_lolos == jumlah:
        print(f"{jumlah} dari {jumlah} klaim lolos.")
        return 0
    print(f"{jumlah_lolos} dari {jumlah} lolos, {jumlah - jumlah_lolos} DITOLAK.")
    print("Perbaiki materinya, jangan melonggarkan alatnya.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
