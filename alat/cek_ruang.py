"""
Pemeriksa jawaban soal ruang tiga dimensi dengan sympy.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: jawaban soal wajib diperiksa hitungan mesin, bukan keyakinan.
Untuk ruang tiga dimensi alasannya lebih kuat lagi, sebab hampir semua
jawabannya berbentuk akar. Perbedaan antara 2*sqrt(6) dan 2*sqrt(3) tidak
kentara saat dibaca sepintas, tetapi jelas beda saat dihitung.

Alat ini dibuat SEBELUM satu tahap pun ditulis, meniru `alat/cek_soal.py` yang
dipakai topik Limit.

Dipakai dengan koordinat, bukan dengan gambar. Rumus jalan pintas yang nanti
diajarkan ke siswa (luas segitiga, volume limas) sengaja TIDAK dipakai di sini,
supaya pemeriksaan ini benar benar bebas dari cara yang sedang diperiksa.

CARA PAKAI
----------
    python alat/cek_ruang.py <berkas.json>
    python alat/cek_ruang.py --uji        (menjalankan uji bawaan)

Isi berkasnya satu objek:

    {
      "bangun": { "jenis": "kubus", "rusuk": 6 },
      "soal": [
        { "id": "t5-contoh", "tanya": "jarak_titik_garis",
          "titik": "B", "garis": ["A", "G"], "jawaban": "2*sqrt(6)" }
      ]
    }

Bentuk `bangun` yang dikenal:

    { "jenis": "kubus",  "rusuk": 6 }                 titik A sampai H
    { "jenis": "balok",  "p": 8, "l": 6, "t": 4 }     titik A sampai H
    { "jenis": "limas",  "alas": 6, "tinggi": 9 }     titik A sampai D dan T
    { "jenis": "titik",  "titik": { "A": [0,0,0] } }  koordinat ditulis sendiri

Titik bantu ditambahkan lewat kunci "tambahan" di dalam "bangun":

    "tambahan": { "P": ["E", "H"], "Q": [1, 2, 3] }

Dua nama titik berarti titik tengah ruasnya, tiga angka berarti koordinat.

Penamaan kubus dan balok mengikuti kebiasaan buku Indonesia: ABCD.EFGH, alas
ABCD berlawanan arah jarum jam dilihat dari atas, dan A tepat di bawah E.

Jenis pertanyaan yang dikenal:

    jarak_titik          "dari", "ke"
    jarak_titik_garis    "titik", "garis"  (dua nama titik)
    jarak_titik_bidang   "titik", "bidang" (tiga nama titik)
    jarak_garis_bidang   "garis", "bidang"     wajib sejajar
    jarak_bidang_bidang  "bidang1", "bidang2"  wajib sejajar
    jarak_garis_garis    "garis1", "garis2"    untuk garis bersilangan
    panjang_proyeksi_garis_bidang  "garis", "bidang"
    sudut_garis_garis    "garis1", "garis2"        jawaban dalam DERAJAT
    sudut_garis_bidang   "garis", "bidang"         jawaban dalam DERAJAT
    sudut_bidang_bidang  "bidang1", "bidang2"      jawaban dalam DERAJAT
    kedudukan_garis      "garis1", "garis2"        jawaban berupa kata
    kedudukan_garis_bidang "garis", "bidang"       jawaban berupa kata
    kedudukan_bidang     "bidang1", "bidang2"      jawaban berupa kata

Jawaban kata yang dikenal: "berpotongan", "sejajar", "bersilangan", "berimpit",
"terletak pada", "menembus".

KODE KELUAR
-----------
0  semua soal lolos
1  ada jawaban yang salah
2  berkasnya tidak bisa dibaca atau isinya tidak dikenali

Sengaja BUKAN membandingkan teks. "2*sqrt(3)" dan "6/sqrt(3)" dan "3.4641"
harus dianggap sama, jadi yang dibandingkan selisihnya yang disederhanakan,
dan kalau salah satunya desimal, dibandingkan nilainya dengan toleransi.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import sympy
from sympy import Matrix, acos, asin, deg, nsimplify, simplify, sqrt

# Selisih yang masih dianggap nol saat salah satu pihak ditulis desimal.
TOLERANSI = sympy.Rational(1, 10000)

KATA_KEDUDUKAN = {
    "berpotongan",
    "sejajar",
    "bersilangan",
    "berimpit",
    "terletak pada",
    "menembus",
}


class Salah(Exception):
    """Isi berkas tidak bisa dipakai. Dibedakan dari jawaban yang keliru."""


# ------------------------------------------------------------------ #
# Membangun titik                                                      #
# ------------------------------------------------------------------ #


def bangun_kubus(rusuk) -> dict[str, Matrix]:
    return bangun_balok(rusuk, rusuk, rusuk)


def bangun_balok(p, l, t) -> dict[str, Matrix]:
    """
    ABCD.EFGH. Alas ABCD di z = 0, tutup EFGH di z = t, A tepat di bawah E.

    Urutan alasnya A(0,0), B(p,0), C(p,l), D(0,l), yaitu berlawanan arah jarum
    jam dilihat dari atas. Ini penamaan yang dipakai buku Indonesia, dan wajib
    sama dengan yang digambar widget, kalau tidak jawabannya akan benar tetapi
    gambarnya salah.
    """
    p, l, t = nsimplify(p), nsimplify(l), nsimplify(t)
    return {
        "A": Matrix([0, 0, 0]),
        "B": Matrix([p, 0, 0]),
        "C": Matrix([p, l, 0]),
        "D": Matrix([0, l, 0]),
        "E": Matrix([0, 0, t]),
        "F": Matrix([p, 0, t]),
        "G": Matrix([p, l, t]),
        "H": Matrix([0, l, t]),
    }


def bangun_limas(alas, tinggi) -> dict[str, Matrix]:
    """T.ABCD, alas persegi, puncak T tepat di atas titik potong diagonalnya."""
    a, t = nsimplify(alas), nsimplify(tinggi)
    return {
        "A": Matrix([0, 0, 0]),
        "B": Matrix([a, 0, 0]),
        "C": Matrix([a, a, 0]),
        "D": Matrix([0, a, 0]),
        "T": Matrix([a / 2, a / 2, t]),
    }


def tambah_titik(daftar: dict[str, Matrix], tambahan: dict) -> dict[str, Matrix]:
    """
    Titik bantu di luar titik sudut bangunnya.

    Soal ujian sering memakai titik tengah rusuk, misalnya "P titik tengah EH".
    Dua bentuk dikenal:

        "P": ["E", "H"]        titik tengah ruas EH
        "Q": [1, 2, 3]         koordinat ditulis sendiri
    """
    for nama, isi in tambahan.items():
        if len(isi) == 2 and all(isinstance(x, str) for x in isi):
            a, b = titik(daftar, isi[0]), titik(daftar, isi[1])
            daftar[nama] = (a + b) / 2
        elif len(isi) == 3:
            daftar[nama] = Matrix([nsimplify(k) for k in isi])
        else:
            raise Salah(f"titik tambahan {nama!r} tidak dikenali bentuknya")
    return daftar


def buat_titik(bangun: dict) -> dict[str, Matrix]:
    jenis = bangun.get("jenis")
    if jenis == "kubus":
        return bangun_kubus(bangun["rusuk"])
    if jenis == "balok":
        return bangun_balok(bangun["p"], bangun["l"], bangun["t"])
    if jenis == "limas":
        return bangun_limas(bangun["alas"], bangun["tinggi"])
    if jenis == "titik":
        return {
            nama: Matrix([nsimplify(k) for k in koordinat])
            for nama, koordinat in bangun["titik"].items()
        }
    raise Salah(f"jenis bangun tidak dikenal: {jenis!r}")


def siapkan(bangun: dict) -> dict[str, Matrix]:
    """Titik bangunnya, ditambah titik bantu kalau soalnya memakai."""
    daftar = buat_titik(bangun)
    if bangun.get("tambahan"):
        daftar = tambah_titik(daftar, bangun["tambahan"])
    return daftar


# ------------------------------------------------------------------ #
# Hitungan dasar, semuanya lewat vektor                                #
# ------------------------------------------------------------------ #


def arah_garis(p, q) -> Matrix:
    u = q - p
    if simplify(u.norm()) == 0:
        raise Salah("dua titik penyusun garis berada di tempat yang sama")
    return u


def normal_bidang(p, q, r) -> Matrix:
    n = (q - p).cross(r - p)
    if simplify(n.norm()) == 0:
        raise Salah("tiga titik penyusun bidang terletak pada satu garis")
    return n


def jarak_titik(p, q):
    return simplify((p - q).norm())


def jarak_titik_garis(p, a, b):
    u = arah_garis(a, b)
    return simplify(((p - a).cross(u)).norm() / u.norm())


def jarak_titik_bidang(p, a, b, c):
    n = normal_bidang(a, b, c)
    return simplify(sympy.Abs((p - a).dot(n)) / n.norm())


def jarak_garis_garis(a1, a2, b1, b2):
    """
    Jarak dua garis bersilangan. Kalau keduanya sejajar, jatuh kembali ke jarak
    titik ke garis, sebab rumus umumnya membagi nol di kasus itu.
    """
    u, v = arah_garis(a1, a2), arah_garis(b1, b2)
    n = u.cross(v)
    if simplify(n.norm()) == 0:
        return jarak_titik_garis(b1, a1, a2)
    return simplify(sympy.Abs((b1 - a1).dot(n)) / n.norm())


def proyeksi_titik_bidang(p, a, b, c) -> Matrix:
    """Kaki tegak lurus dari titik p pada bidang abc."""
    n = normal_bidang(a, b, c)
    t = (p - a).dot(n) / n.dot(n)
    return sympy.simplify(p - t * n)


def panjang_proyeksi_garis_bidang(a, b, p, q, r):
    """
    Panjang bayangan ruas AB pada bidang pqr.

    Soal ujian menanyakan ini dengan kalimat "panjang proyeksi garis ... pada
    bidang ...". Caranya memproyeksikan kedua ujungnya, lalu mengukur jarak
    kedua bayangan itu.
    """
    return simplify(
        (proyeksi_titik_bidang(a, p, q, r) - proyeksi_titik_bidang(b, p, q, r)).norm()
    )


def sudut_dua_arah(u: Matrix, v: Matrix):
    """
    Sudut antara dua ARAH, dalam derajat, selalu diambil yang tidak tumpul.

    Sudut antara dua garis tidak peduli arah panahnya: garis yang sama bisa
    ditulis dari A ke B atau dari B ke A. Karena itu nilai mutlaknya diambil,
    sehingga hasilnya selalu antara 0 dan 90 derajat.
    """
    kos = simplify(sympy.Abs(u.dot(v)) / (u.norm() * v.norm()))
    return simplify(deg(acos(kos)))


def sudut_garis_bidang(a, b, p, q, r):
    """
    Sudut garis dengan bidang, yaitu sudut garis itu dengan proyeksinya.

    Dihitung lewat normal bidang: sudut terhadap normal ditambah sudut terhadap
    bidang selalu 90 derajat, jadi cukup memakai arcsin.
    """
    u = arah_garis(a, b)
    n = normal_bidang(p, q, r)
    sin_sudut = simplify(sympy.Abs(u.dot(n)) / (u.norm() * n.norm()))
    return simplify(deg(asin(sin_sudut)))


# ------------------------------------------------------------------ #
# Kedudukan                                                            #
# ------------------------------------------------------------------ #


def kedudukan_garis(a1, a2, b1, b2) -> str:
    u, v, w = arah_garis(a1, a2), arah_garis(b1, b2), b1 - a1
    sejajar = simplify(u.cross(v).norm()) == 0
    if sejajar:
        return "berimpit" if simplify(w.cross(u).norm()) == 0 else "sejajar"
    return "berpotongan" if simplify(w.dot(u.cross(v))) == 0 else "bersilangan"


def kedudukan_garis_bidang(a, b, p, q, r) -> str:
    u = arah_garis(a, b)
    n = normal_bidang(p, q, r)
    if simplify(u.dot(n)) != 0:
        return "menembus"
    return "terletak pada" if simplify((a - p).dot(n)) == 0 else "sejajar"


def kedudukan_bidang(p1, q1, r1, p2, q2, r2) -> str:
    n1, n2 = normal_bidang(p1, q1, r1), normal_bidang(p2, q2, r2)
    if simplify(n1.cross(n2).norm()) != 0:
        return "berpotongan"
    return "berimpit" if simplify((p2 - p1).dot(n1)) == 0 else "sejajar"


# ------------------------------------------------------------------ #
# Membandingkan jawaban                                                #
# ------------------------------------------------------------------ #


def bandingkan(hasil, diklaim_teks: str) -> bool:
    """
    Benar kalau kedua nilai sama secara matematika.

    Perbandingan teks tidak dipakai: "2*sqrt(3)", "6/sqrt(3)", dan "3.4641"
    adalah bilangan yang sama ditulis tiga cara. Yang dibandingkan selisihnya.
    Kalau salah satu pihak ditulis desimal, selisihnya cukup lebih kecil dari
    toleransi, sebab desimal memang tidak pernah persis.
    """
    diklaim = sympy.sympify(diklaim_teks)
    selisih = simplify(hasil - diklaim)
    if selisih == 0:
        return True
    desimal = any(
        isinstance(x, sympy.Float) for x in sympy.preorder_traversal(diklaim)
    )
    if desimal:
        return sympy.Abs(selisih).evalf() < TOLERANSI
    return False


def titik(daftar: dict[str, Matrix], nama: str) -> Matrix:
    if nama not in daftar:
        raise Salah(f"titik {nama!r} tidak ada pada bangun ini")
    return daftar[nama]


def dua(daftar, nama_nama, label) -> tuple[Matrix, Matrix]:
    if len(nama_nama) != 2:
        raise Salah(f"{label} harus disebut dengan tepat dua titik")
    return titik(daftar, nama_nama[0]), titik(daftar, nama_nama[1])


def tiga(daftar, nama_nama, label) -> tuple[Matrix, Matrix, Matrix]:
    if len(nama_nama) != 3:
        raise Salah(f"{label} harus disebut dengan tepat tiga titik")
    return tuple(titik(daftar, n) for n in nama_nama)


def hitung(soal: dict, p: dict[str, Matrix]):
    """Kembalikan nilai yang benar untuk satu soal. Kata dikembalikan apa adanya."""
    tanya = soal.get("tanya")

    if tanya == "jarak_titik":
        return jarak_titik(titik(p, soal["dari"]), titik(p, soal["ke"]))

    if tanya == "jarak_titik_garis":
        a, b = dua(p, soal["garis"], "garis")
        return jarak_titik_garis(titik(p, soal["titik"]), a, b)

    if tanya == "jarak_titik_bidang":
        a, b, c = tiga(p, soal["bidang"], "bidang")
        return jarak_titik_bidang(titik(p, soal["titik"]), a, b, c)

    if tanya == "jarak_garis_bidang":
        a, b = dua(p, soal["garis"], "garis")
        q, r, s = tiga(p, soal["bidang"], "bidang")
        letak = kedudukan_garis_bidang(a, b, q, r, s)
        if letak != "sejajar":
            raise Salah(
                f"jarak garis ke bidang hanya berarti kalau sejajar, "
                f"yang ini {letak}"
            )
        return jarak_titik_bidang(a, q, r, s)

    if tanya == "jarak_bidang_bidang":
        a, b, c = tiga(p, soal["bidang1"], "bidang1")
        d, e, f = tiga(p, soal["bidang2"], "bidang2")
        letak = kedudukan_bidang(a, b, c, d, e, f)
        if letak != "sejajar":
            raise Salah(
                f"jarak dua bidang hanya berarti kalau sejajar, yang ini {letak}"
            )
        return jarak_titik_bidang(a, d, e, f)

    if tanya == "jarak_garis_garis":
        a1, a2 = dua(p, soal["garis1"], "garis1")
        b1, b2 = dua(p, soal["garis2"], "garis2")
        return jarak_garis_garis(a1, a2, b1, b2)

    if tanya == "panjang_proyeksi_garis_bidang":
        a, b = dua(p, soal["garis"], "garis")
        q, r, s = tiga(p, soal["bidang"], "bidang")
        return panjang_proyeksi_garis_bidang(a, b, q, r, s)

    if tanya == "sudut_garis_garis":
        a1, a2 = dua(p, soal["garis1"], "garis1")
        b1, b2 = dua(p, soal["garis2"], "garis2")
        return sudut_dua_arah(arah_garis(a1, a2), arah_garis(b1, b2))

    if tanya == "sudut_garis_bidang":
        a, b = dua(p, soal["garis"], "garis")
        q, r, s = tiga(p, soal["bidang"], "bidang")
        return sudut_garis_bidang(a, b, q, r, s)

    if tanya == "sudut_bidang_bidang":
        a, b, c = tiga(p, soal["bidang1"], "bidang1")
        d, e, f = tiga(p, soal["bidang2"], "bidang2")
        return sudut_dua_arah(normal_bidang(a, b, c), normal_bidang(d, e, f))

    if tanya == "kedudukan_garis":
        a1, a2 = dua(p, soal["garis1"], "garis1")
        b1, b2 = dua(p, soal["garis2"], "garis2")
        return kedudukan_garis(a1, a2, b1, b2)

    if tanya == "kedudukan_garis_bidang":
        a, b = dua(p, soal["garis"], "garis")
        q, r, s = tiga(p, soal["bidang"], "bidang")
        return kedudukan_garis_bidang(a, b, q, r, s)

    if tanya == "kedudukan_bidang":
        a, b, c = tiga(p, soal["bidang1"], "bidang1")
        d, e, f = tiga(p, soal["bidang2"], "bidang2")
        return kedudukan_bidang(a, b, c, d, e, f)

    raise Salah(f"jenis pertanyaan tidak dikenal: {tanya!r}")


def periksa(bangun: dict, daftar_soal: list[dict]) -> int:
    """Kembalikan jumlah soal yang jawabannya salah. Laporan dicetak di sini."""
    p = siapkan(bangun)
    salah = 0

    for soal in daftar_soal:
        nama = soal.get("id", soal.get("tanya", "?"))
        try:
            benar = hitung(soal, p)
        except Salah as e:
            print(f"  RUSAK  {nama}: {e}")
            salah += 1
            continue

        diklaim = str(soal.get("jawaban", ""))

        if isinstance(benar, str):
            cocok = diklaim.strip().lower() == benar
            if diklaim.strip().lower() not in KATA_KEDUDUKAN:
                print(f"  RUSAK  {nama}: kata {diklaim!r} tidak dikenal")
                salah += 1
                continue
        else:
            try:
                cocok = bandingkan(benar, diklaim)
            except (sympy.SympifyError, TypeError):
                print(f"  RUSAK  {nama}: jawaban {diklaim!r} tidak bisa dibaca")
                salah += 1
                continue

        if cocok:
            print(f"  lolos  {nama}: {benar}")
        else:
            print(f"  SALAH  {nama}: ditulis {diklaim}, seharusnya {benar}")
            salah += 1

    return salah


# ------------------------------------------------------------------ #
# Uji bawaan                                                           #
# ------------------------------------------------------------------ #

UJI = {
    "bangun": {"jenis": "kubus", "rusuk": 6},
    "soal": [
        {"id": "diagonal sisi AC", "tanya": "jarak_titik", "dari": "A", "ke": "C",
         "jawaban": "6*sqrt(2)"},
        {"id": "diagonal ruang AG", "tanya": "jarak_titik", "dari": "A", "ke": "G",
         "jawaban": "6*sqrt(3)"},
        {"id": "B ke garis AG", "tanya": "jarak_titik_garis", "titik": "B",
         "garis": ["A", "G"], "jawaban": "2*sqrt(6)"},
        {"id": "B ke garis AG, ditulis desimal", "tanya": "jarak_titik_garis",
         "titik": "B", "garis": ["A", "G"], "jawaban": "4.898979"},
        {"id": "A ke bidang BDE", "tanya": "jarak_titik_bidang", "titik": "A",
         "bidang": ["B", "D", "E"], "jawaban": "2*sqrt(3)"},
        {"id": "A ke bidang BDG", "tanya": "jarak_titik_bidang", "titik": "A",
         "bidang": ["B", "D", "G"], "jawaban": "2*sqrt(3)"},
        {"id": "garis AE ke bidang BCGF", "tanya": "jarak_garis_bidang",
         "garis": ["A", "E"], "bidang": ["B", "C", "G"], "jawaban": "6"},
        {"id": "bidang ABCD ke bidang EFGH", "tanya": "jarak_bidang_bidang",
         "bidang1": ["A", "B", "C"], "bidang2": ["E", "F", "G"], "jawaban": "6"},
        {"id": "garis AB ke garis CG (bersilangan)", "tanya": "jarak_garis_garis",
         "garis1": ["A", "B"], "garis2": ["C", "G"], "jawaban": "6"},
        {"id": "sudut AH dengan AF", "tanya": "sudut_garis_garis",
         "garis1": ["A", "H"], "garis2": ["A", "F"], "jawaban": "60"},
        {"id": "sudut AG dengan alas ABCD", "tanya": "sudut_garis_bidang",
         "garis": ["A", "G"], "bidang": ["A", "B", "C"], "jawaban": "35.264390"},
        {"id": "sudut bidang BDG dengan alas", "tanya": "sudut_bidang_bidang",
         "bidang1": ["B", "D", "G"], "bidang2": ["A", "B", "C"],
         "jawaban": "54.735610"},
        {"id": "kedudukan AB dan CG", "tanya": "kedudukan_garis",
         "garis1": ["A", "B"], "garis2": ["C", "G"], "jawaban": "bersilangan"},
        {"id": "kedudukan AB dan HG", "tanya": "kedudukan_garis",
         "garis1": ["A", "B"], "garis2": ["H", "G"], "jawaban": "sejajar"},
        {"id": "kedudukan AB dan AD", "tanya": "kedudukan_garis",
         "garis1": ["A", "B"], "garis2": ["A", "D"], "jawaban": "berpotongan"},
        {"id": "kedudukan AE dengan alas", "tanya": "kedudukan_garis_bidang",
         "garis": ["A", "E"], "bidang": ["A", "B", "C"], "jawaban": "menembus"},
        {"id": "kedudukan EF dengan alas", "tanya": "kedudukan_garis_bidang",
         "garis": ["E", "F"], "bidang": ["A", "B", "C"], "jawaban": "sejajar"},
        {"id": "kedudukan AB dengan alas", "tanya": "kedudukan_garis_bidang",
         "garis": ["A", "B"], "bidang": ["A", "B", "C"], "jawaban": "terletak pada"},
        {"id": "kedudukan alas dan tutup", "tanya": "kedudukan_bidang",
         "bidang1": ["A", "B", "C"], "bidang2": ["E", "F", "G"], "jawaban": "sejajar"},
        {"id": "kedudukan alas dan BDG", "tanya": "kedudukan_bidang",
         "bidang1": ["A", "B", "C"], "bidang2": ["B", "D", "G"],
         "jawaban": "berpotongan"},
    ],
}

# Soal yang jawabannya SENGAJA salah. Alat yang tidak menolak ini tidak berguna,
# jadi uji bawaan ikut memeriksa bahwa penolakannya benar benar bekerja.
UJI_HARUS_DITOLAK = {
    "bangun": {"jenis": "kubus", "rusuk": 6},
    "soal": [
        {"id": "sengaja salah: akar tertukar", "tanya": "jarak_titik_garis",
         "titik": "B", "garis": ["A", "G"], "jawaban": "2*sqrt(3)"},
        {"id": "sengaja salah: sudut", "tanya": "sudut_garis_garis",
         "garis1": ["A", "H"], "garis2": ["A", "F"], "jawaban": "45"},
        {"id": "sengaja salah: kedudukan", "tanya": "kedudukan_garis",
         "garis1": ["A", "B"], "garis2": ["C", "G"], "jawaban": "sejajar"},
        {"id": "sengaja rusak: bidang tidak sejajar", "tanya": "jarak_garis_bidang",
         "garis": ["A", "E"], "bidang": ["A", "B", "C"], "jawaban": "6"},
    ],
}


def jalankan_uji() -> int:
    print("UJI 1: dua puluh jawaban yang benar, semuanya harus lolos")
    salah = periksa(UJI["bangun"], UJI["soal"])
    print(f"  -> {len(UJI['soal']) - salah} lolos, {salah} gagal\n")

    print("UJI 2: empat jawaban yang sengaja salah, semuanya harus ditolak")
    ditolak = periksa(UJI_HARUS_DITOLAK["bangun"], UJI_HARUS_DITOLAK["soal"])
    harus = len(UJI_HARUS_DITOLAK["soal"])
    print(f"  -> {ditolak} dari {harus} berhasil ditolak\n")

    beres = salah == 0 and ditolak == harus
    print("HASIL: alat siap dipakai" if beres else "HASIL: ALAT INI BELUM BENAR")
    return 0 if beres else 1


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__.strip().splitlines()[0])
        print("Cara pakai: python alat/cek_ruang.py <berkas.json>  atau  --uji")
        return 2

    if sys.argv[1] == "--uji":
        return jalankan_uji()

    berkas = Path(sys.argv[1])
    try:
        isi = json.loads(berkas.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        print(f"Berkas tidak bisa dibaca: {e}")
        return 2

    # Dua bentuk diterima: satu kelompok, atau senarai kelompok. Bentuk senarai
    # dibutuhkan sebab satu berkas soal biasanya memakai beberapa kubus dengan
    # panjang rusuk berbeda, dan memaksa satu berkas per kubus membuat
    # pemeriksaannya terpecah pecah tanpa alasan.
    kelompok = isi if isinstance(isi, list) else [isi]

    total = 0
    salah = 0
    for k in kelompok:
        try:
            bangun = k["bangun"]
            daftar = k["soal"]
        except (KeyError, TypeError):
            print("Tiap kelompok harus punya kunci 'bangun' dan 'soal'.")
            return 2

        judul = k.get("nama", bangun.get("jenis", "?"))
        print(f"\n[{judul}] {len(daftar)} soal")
        try:
            salah += periksa(bangun, daftar)
        except Salah as e:
            print(f"Bangunnya tidak bisa dibuat: {e}")
            return 2
        total += len(daftar)

    print(f"\n{total - salah} lolos, {salah} salah")
    return 1 if salah else 0


if __name__ == "__main__":
    sys.exit(main())
