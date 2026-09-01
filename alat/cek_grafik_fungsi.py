"""
Pemeriksa jawaban soal Grafik Fungsi dengan sympy.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: jawaban soal wajib diperiksa dengan hitungan mesin, bukan dengan
keyakinan. Soal buatan Claude juga cenderung terlalu mudah dan cenderung salah
diam-diam pada langkah aljabar yang panjang. Itu temuan ARYA, bukan dugaan.

Alat ini dibuat SEBELUM satu soal pun ditulis, meniru urutan yang berhasil pada
topik Limit (`alat/cek_soal.py`). Berkas itu tidak dipakai ulang karena
pertanyaannya berbeda jenis: di sana yang diperiksa nilai limit, di sini yang
diperiksa koordinat puncak, diskriminan, akar, hasil transformasi, komposisi,
dan rumus invers.

CARA PAKAI
----------
    python alat/cek_grafik_fungsi.py <berkas.json>
    python alat/cek_grafik_fungsi.py --uji-sendiri

`--uji-sendiri` menjalankan contoh bawaan yang SENGAJA memuat jawaban salah,
untuk membuktikan pemeriksanya benar-benar menolak. Pemeriksa yang selalu
bilang lolos tidak ada gunanya, dan itu justru pernah terjadi di proyek ini
(pembungkus rtk melaporkan lulus padahal perintahnya tidak jalan).

BENTUK BERKASNYA
----------------
Senarai objek. Semua angka dan rumus ditulis sebagai teks dalam tata cara
Python, misalnya "x**2 - 4*x + 1", "sqrt(3)", "Rational(1,4)", "oo".

  {"id": "m04-1", "jenis": "puncak",       "a": 1, "b": -4, "c": 1,
                  "jawaban": ["2", "-3"]}
  {"id": "m04-2", "jenis": "diskriminan",  "a": 1, "b": -4, "c": 1,
                  "jawaban": "12"}
  {"id": "m04-3", "jenis": "akar",         "a": 1, "b": -5, "c": 6,
                  "jawaban": ["2", "3"]}
  {"id": "m05-1", "jenis": "ekspresi",     "kiri": "-(x - 2)**2 + 8",
                  "kanan": "-x**2 + 4*x + 4"}
  {"id": "m08-1", "jenis": "nilai",        "ekspresi": "2**x", "di": "10",
                  "jawaban": "1024"}
  {"id": "m11-1", "jenis": "komposisi",    "f": "x**2 + 1", "g": "2*x - 3",
                  "jawaban": "(2*x - 3)**2 + 1"}
  {"id": "m11-2", "jenis": "invers",       "f": "(x - 3)/2",
                  "jawaban": "2*x + 3"}

Untuk "akar", tulis "jawaban": "tidak ada" kalau grafiknya memang tidak
memotong sumbu x.

Peubahnya selalu `x` kecuali disebut lain lewat "peubah".

KODE KELUAR
-----------
0  semua soal lolos
1  ada jawaban yang salah
2  berkasnya tidak bisa dibaca

Yang dibandingkan SELALU selisihnya yang disederhanakan, bukan teksnya. Dengan
begitu "1/4", "0.25", dan "2/8" dianggap sama, dan "-(x - 2)**2 + 8" dianggap
sama dengan "-x**2 + 4*x + 4". Perbandingan teks akan menolak keduanya, padahal
keduanya parabola yang sama persis.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import sympy

# Peubahnya dinyatakan REAL sejak awal, bukan bilangan kompleks.
# Tanpa itu sympy menolak menyederhanakan log(2**x)/log(2) menjadi x, karena
# untuk bilangan kompleks penyederhanaan itu memang tidak selalu sah. Di
# matematika SMA seluruh peubahnya bilangan real, jadi menyatakannya di sini
# membuat pemeriksa cocok dengan bahan yang diperiksanya, bukan melonggarkannya.
X = sympy.Symbol('x', real=True)


def urai(teks, peubah: sympy.Symbol = X):
    """Ubah teks menjadi ungkapan sympy. Angka desimal dijadikan pecahan tepat."""
    if isinstance(teks, (int, float)):
        teks = str(teks)
    return sympy.sympify(teks, rational=True, locals={str(peubah): peubah})


def sama(kiri, kanan) -> bool:
    """
    Benar kalau kedua ungkapan itu sama secara matematika.

    Dipakai `simplify` pada selisihnya, bukan `==`, karena `==` pada sympy
    membandingkan bentuk tulisannya. `(x - 2)**2` dan `x**2 - 4*x + 4` adalah
    ungkapan yang sama tetapi bentuk tulisannya berbeda, dan pemeriksa yang
    memakai `==` akan menolak jawaban yang benar.
    """
    if kiri in (sympy.oo, -sympy.oo, sympy.zoo, sympy.nan) or kanan in (
        sympy.oo, -sympy.oo, sympy.zoo, sympy.nan
    ):
        return kiri == kanan
    try:
        return sympy.simplify(sympy.expand(kiri - kanan)) == 0
    except Exception:
        return False


def daftar_sama(hasil: list, diklaim: list) -> bool:
    """Dua senarai bilangan sama, dengan urutan yang sudah disamakan."""
    if len(hasil) != len(diklaim):
        return False
    return all(sama(a, b) for a, b in zip(hasil, diklaim))


# ------------------------------------------------------------------ #
# Pemeriksa per jenis soal                                            #
# ------------------------------------------------------------------ #

def periksa_puncak(s: dict) -> tuple[bool, str]:
    a, b, c = (urai(s[k]) for k in ('a', 'b', 'c'))
    if a == 0:
        return False, 'a nol, jadi ini bukan fungsi kuadrat dan tidak punya puncak'
    h = -b / (2 * a)
    k = c - b**2 / (4 * a)
    diklaim = [urai(v) for v in s['jawaban']]
    ok = daftar_sama([sympy.nsimplify(h), sympy.nsimplify(k)], diklaim)
    return ok, f'puncak sebenarnya ({sympy.nsimplify(h)}, {sympy.nsimplify(k)})'


def periksa_diskriminan(s: dict) -> tuple[bool, str]:
    a, b, c = (urai(s[k]) for k in ('a', 'b', 'c'))
    D = sympy.expand(b**2 - 4 * a * c)
    return sama(D, urai(s['jawaban'])), f'diskriminan sebenarnya {D}'


def periksa_akar(s: dict) -> tuple[bool, str]:
    a, b, c = (urai(s[k]) for k in ('a', 'b', 'c'))
    persamaan = a * X**2 + b * X + c
    nyata = sorted(
        [r for r in sympy.solve(persamaan, X) if r.is_real],
        key=lambda r: float(r),
    )
    if isinstance(s['jawaban'], str) and s['jawaban'].strip().lower() == 'tidak ada':
        return len(nyata) == 0, f'akar sebenarnya {nyata}'
    diklaim = sorted([urai(v) for v in s['jawaban']], key=lambda r: float(r))
    return daftar_sama(nyata, diklaim), f'akar sebenarnya {nyata}'


def periksa_ekspresi(s: dict) -> tuple[bool, str]:
    kiri, kanan = urai(s['kiri']), urai(s['kanan'])
    return sama(kiri, kanan), f'selisihnya {sympy.simplify(sympy.expand(kiri - kanan))}'


def periksa_nilai(s: dict) -> tuple[bool, str]:
    peubah = sympy.Symbol(s.get('peubah', 'x'), real=True)
    f = urai(s['ekspresi'], peubah)
    hasil = sympy.simplify(f.subs(peubah, urai(s['di'], peubah)))
    return sama(hasil, urai(s['jawaban'])), f'nilai sebenarnya {hasil}'


def periksa_komposisi(s: dict) -> tuple[bool, str]:
    """(f komposisi g)(x) = f(g(x)). Urutannya sengaja ditulis jelas di sini."""
    f, g = urai(s['f']), urai(s['g'])
    hasil = sympy.expand(f.subs(X, g))
    return sama(hasil, urai(s['jawaban'])), f'f(g(x)) sebenarnya {sympy.simplify(hasil)}'


def periksa_invers(s: dict) -> tuple[bool, str]:
    """
    Invers diperiksa dengan MENJALANKANNYA, bukan dengan menurunkan rumusnya.

    Kalau jawaban yang diklaim memang invers dari f, maka f(jawaban(x)) harus
    kembali menjadi x, dan jawaban(f(x)) juga harus kembali menjadi x. Dua arah
    itu diperiksa dua-duanya, karena satu arah saja bisa lolos untuk fungsi
    yang tidak satu-satu.
    """
    f = urai(s['f'])
    inv = urai(s['jawaban'])
    maju = sympy.simplify(f.subs(X, inv))
    mundur = sympy.simplify(inv.subs(X, f))
    ok = sama(maju, X) and sama(mundur, X)
    return ok, f'f(jawaban) = {maju}, jawaban(f) = {mundur}, keduanya harus x'


PEMERIKSA = {
    'puncak': periksa_puncak,
    'diskriminan': periksa_diskriminan,
    'akar': periksa_akar,
    'ekspresi': periksa_ekspresi,
    'nilai': periksa_nilai,
    'komposisi': periksa_komposisi,
    'invers': periksa_invers,
}


def jalankan(soal: list[dict]) -> int:
    salah = 0
    for s in soal:
        nama = s.get('id', '(tanpa id)')
        jenis = s.get('jenis')
        pemeriksa = PEMERIKSA.get(jenis)
        if pemeriksa is None:
            print(f'GAGAL  {nama}: jenis "{jenis}" tidak dikenal')
            salah += 1
            continue
        try:
            ok, keterangan = pemeriksa(s)
        except Exception as e:  # noqa: BLE001
            print(f'GAGAL  {nama}: tidak bisa dihitung, {e}')
            salah += 1
            continue
        if ok:
            print(f'lolos  {nama}  ({jenis})')
        else:
            print(f'GAGAL  {nama}  ({jenis}): {keterangan}')
            salah += 1

    total = len(soal)
    print()
    if salah:
        print(f'{salah} dari {total} soal SALAH. Perbaiki dulu sebelum masuk situs.')
        return 1
    print(f'{total} soal lolos semua.')
    return 0


# ------------------------------------------------------------------ #
# Uji terhadap pemeriksanya sendiri                                   #
# ------------------------------------------------------------------ #

# Tiap butir: (soal, apakah SEHARUSNYA lolos). Yang benar dan yang salah
# dicampur dengan sengaja, karena pemeriksa yang selalu bilang lolos tidak ada
# gunanya sama sekali.
UJI_SENDIRI = [
    ({'id': 'benar-puncak', 'jenis': 'puncak', 'a': 1, 'b': -4, 'c': 1,
      'jawaban': ['2', '-3']}, True),
    ({'id': 'salah-puncak', 'jenis': 'puncak', 'a': 1, 'b': -4, 'c': 1,
      'jawaban': ['2', '3']}, False),
    ({'id': 'benar-diskriminan', 'jenis': 'diskriminan', 'a': 1, 'b': -4, 'c': 1,
      'jawaban': '12'}, True),
    ({'id': 'salah-diskriminan', 'jenis': 'diskriminan', 'a': 1, 'b': -4, 'c': 1,
      'jawaban': '-12'}, False),
    ({'id': 'benar-akar', 'jenis': 'akar', 'a': 1, 'b': -5, 'c': 6,
      'jawaban': ['2', '3']}, True),
    ({'id': 'benar-akar-kosong', 'jenis': 'akar', 'a': 1, 'b': 0, 'c': 4,
      'jawaban': 'tidak ada'}, True),
    ({'id': 'salah-akar-kosong', 'jenis': 'akar', 'a': 1, 'b': -5, 'c': 6,
      'jawaban': 'tidak ada'}, False),
    # bentuk puncak dan bentuk umum yang memang parabola sama, ditulis beda
    ({'id': 'benar-bentuk', 'jenis': 'ekspresi', 'kiri': '-(x - 2)**2 + 8',
      'kanan': '-x**2 + 4*x + 4'}, True),
    ({'id': 'salah-bentuk', 'jenis': 'ekspresi', 'kiri': '-(x - 2)**2 + 8',
      'kanan': '-x**2 + 4*x - 4'}, False),
    # jebakan tanda pada geseran: f(x - 3) bergeser ke KANAN
    ({'id': 'benar-geser', 'jenis': 'nilai', 'ekspresi': '(x - 3)**2', 'di': '3',
      'jawaban': '0'}, True),
    ({'id': 'salah-geser', 'jenis': 'nilai', 'ekspresi': '(x - 3)**2', 'di': '-3',
      'jawaban': '0'}, False),
    ({'id': 'benar-komposisi', 'jenis': 'komposisi', 'f': 'x**2 + 1', 'g': '2*x - 3',
      'jawaban': '4*x**2 - 12*x + 10'}, True),
    # urutan komposisi ditukar: hasilnya memang berbeda, jadi harus ditolak
    ({'id': 'salah-komposisi', 'jenis': 'komposisi', 'f': 'x**2 + 1', 'g': '2*x - 3',
      'jawaban': '2*x**2 - 1'}, False),
    ({'id': 'benar-invers', 'jenis': 'invers', 'f': '(x - 3)/2',
      'jawaban': '2*x + 3'}, True),
    # kekeliruan klasik: invers dikira satu per fungsinya
    ({'id': 'salah-invers', 'jenis': 'invers', 'f': 'x + 3',
      'jawaban': '1/(x + 3)'}, False),
]


def uji_sendiri() -> int:
    meleset = 0
    for soal, harus_lolos in UJI_SENDIRI:
        pemeriksa = PEMERIKSA[soal['jenis']]
        try:
            ok, _ = pemeriksa(soal)
        except Exception as e:  # noqa: BLE001
            ok = False
            print(f'  ({soal["id"]} melempar galat: {e})')
        tanda = 'baik ' if ok == harus_lolos else 'RUSAK'
        maunya = 'lolos' if harus_lolos else 'ditolak'
        print(f'{tanda} {soal["id"]}: seharusnya {maunya}, hasilnya '
              f'{"lolos" if ok else "ditolak"}')
        if ok != harus_lolos:
            meleset += 1

    print()
    if meleset:
        print(f'{meleset} dari {len(UJI_SENDIRI)} perilaku pemeriksa SALAH. '
              'Jangan dipakai sebelum diperbaiki.')
        return 1
    print(f'Pemeriksa berperilaku benar pada {len(UJI_SENDIRI)} kasus, '
          'termasuk yang sengaja dibuat salah.')
    return 0


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    if sys.argv[1] == '--uji-sendiri':
        return uji_sendiri()

    berkas = Path(sys.argv[1])
    try:
        soal = json.loads(berkas.read_text(encoding='utf-8'))
    except Exception as e:  # noqa: BLE001
        print(f'Berkas {berkas} tidak bisa dibaca: {e}')
        return 2
    if not isinstance(soal, list):
        print('Isi berkas harus berupa senarai objek soal.')
        return 2
    return jalankan(soal)


if __name__ == '__main__':
    raise SystemExit(main())
