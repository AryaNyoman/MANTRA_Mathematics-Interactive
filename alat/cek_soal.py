"""
Pemeriksa jawaban soal limit dengan sympy.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: soal buatan Claude cenderung terlalu mudah DAN jawabannya wajib
diperiksa dengan hitungan mesin, bukan dengan keyakinan. Itu temuan ARYA, bukan
dugaan. Untuk topik Limit, sympy bisa memeriksa dengan TEPAT (pecahan tetap
pecahan, bukan desimal yang dibulatkan), jadi tidak ada alasan menebak.

Alat ini dibuat SEBELUM satu soal pun ditulis, supaya soal yang salah tidak
sempat masuk ke situs.

CARA PAKAI
----------
    python alat/cek_soal.py <berkas.json>

Isi berkasnya senarai objek:

    {
      "id":       "k01",                     nama soal, untuk laporan
      "ekspresi": "(x**2 - 1)/(x - 1)",      tulis dalam tata cara Python
      "peubah":   "x",
      "menuju":   "1",                       boleh "oo", "-oo", "pi/2", dst
      "jawaban":  "2",                       jawaban yang DIKLAIM benar
      "arah":     "+"                        boleh dikosongkan; "+" kanan, "-" kiri
    }

Kalau limitnya memang tidak ada, tulis "jawaban": "tidak ada".

KODE KELUAR
-----------
0  semua soal lolos
1  ada jawaban yang salah
2  berkasnya tidak bisa dibaca

Sengaja BUKAN membandingkan teks. "1/4" dan "0.25" dan "2/8" harus dianggap
sama, jadi yang dibandingkan adalah selisihnya yang disederhanakan.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import sympy


def bandingkan(hasil, diklaim) -> bool:
    """
    Benar kalau kedua nilai itu sama secara matematika.

    Perbandingan teks tidak dipakai karena sympy bisa menuliskan bilangan yang
    sama dengan bentuk berbeda. Yang dipakai: selisihnya disederhanakan, lalu
    dilihat apakah nol.
    """
    if hasil in (sympy.oo, -sympy.oo, sympy.zoo, sympy.nan):
        return hasil == diklaim
    try:
        return sympy.simplify(hasil - diklaim) == 0
    except TypeError:
        return False


def periksa_satu(soal: dict) -> tuple[bool, str]:
    """Kembalikan (lolos, keterangan) untuk satu soal."""
    nama = soal.get("id", "(tanpa id)")
    peubah = sympy.Symbol(soal.get("peubah", "x"))

    try:
        ekspresi = sympy.sympify(soal["ekspresi"])
        menuju = sympy.sympify(soal["menuju"])
    except (sympy.SympifyError, KeyError, TypeError) as galat:
        return False, f"{nama}: rumusnya tidak bisa dibaca sympy ({galat})"

    arah = soal.get("arah", "+-")
    if arah not in ("+", "-", "+-"):
        return False, f"{nama}: arah '{arah}' tidak dikenal, pakai '+', '-', atau kosongkan"

    try:
        hasil = sympy.limit(ekspresi, peubah, menuju, dir=arah)
    except (ValueError, NotImplementedError, sympy.PoleError) as galat:
        # Limit dua arah yang berbeda kiri dan kanan memang gagal di sini.
        # Itu jawaban yang sah kalau soalnya memang "tidak ada".
        if str(soal.get("jawaban", "")).strip().lower() == "tidak ada":
            return True, f"{nama}: benar, limitnya memang tidak ada"
        return False, f"{nama}: sympy tidak bisa menghitungnya ({type(galat).__name__}: {galat})"

    diklaim_mentah = str(soal.get("jawaban", "")).strip()

    if diklaim_mentah.lower() == "tidak ada":
        # Klaimnya "tidak ada", tapi sympy menemukan nilainya. Periksa dua sisi.
        kiri = sympy.limit(ekspresi, peubah, menuju, dir="-")
        kanan = sympy.limit(ekspresi, peubah, menuju, dir="+")
        if kiri != kanan:
            return True, f"{nama}: benar, kiri {kiri} dan kanan {kanan} tidak sama"
        return False, f"{nama}: DIKLAIM tidak ada, padahal limitnya {hasil}"

    try:
        diklaim = sympy.sympify(diklaim_mentah)
    except sympy.SympifyError:
        return False, f"{nama}: jawaban '{diklaim_mentah}' tidak bisa dibaca sympy"

    if bandingkan(hasil, diklaim):
        return True, f"{nama}: benar, {hasil}"
    return False, f"{nama}: DITOLAK, dijawab {diklaim}, seharusnya {hasil}"


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("cara pakai: python alat/cek_soal.py <berkas.json>", file=sys.stderr)
        return 2

    berkas = Path(argv[1])
    try:
        daftar = json.loads(berkas.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as galat:
        print(f"tidak bisa membaca {berkas}: {galat}", file=sys.stderr)
        return 2

    if not isinstance(daftar, list):
        print(f"{berkas} harus berisi senarai soal", file=sys.stderr)
        return 2

    salah = 0
    for soal in daftar:
        lolos, keterangan = periksa_satu(soal)
        print(("  LOLOS  " if lolos else "  TOLAK  ") + keterangan)
        if not lolos:
            salah += 1

    jumlah = len(daftar)
    print()
    if salah:
        print(f"{jumlah - salah} dari {jumlah} lolos, {salah} DITOLAK.")
        print("Perbaiki soalnya, jangan melonggarkan alatnya.")
        return 1

    print(f"{jumlah} dari {jumlah} lolos.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
