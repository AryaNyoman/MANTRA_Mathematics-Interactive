"""
Pemeriksa angka statistika, untuk topik Statistika MATRA.

KENAPA ALAT INI ADA
-------------------
Aturan proyek: angka yang ditampilkan ke siswa wajib diperiksa hitungan mesin,
bukan diperiksa keyakinan. Untuk statistika bahayanya berlipat, sebab satu
kumpulan data melahirkan belasan angka turunan (mean, median, ketiga kuartil,
jangkauan antar kuartil, varian, simpangan baku), dan satu salah ketik pada
datanya menular ke semuanya sekaligus tanpa terlihat aneh.

Alat ini dibuat SEBELUM satu angka pun ditulis ke halaman, meniru
`alat/cek_soal.py` yang sudah terbukti di topik Limit.

DUA HAL YANG DIJAGA KETAT
-------------------------
1. Hitungan dilakukan dengan pecahan EKSAK (`fractions.Fraction`), jadi 42,875
   tetap 42,875 dan bukan 42,87499999999999 hasil kesalahan pembulatan biner.
2. Angka yang ditulis di halaman dianggap benar kalau ia adalah PEMBULATAN YANG
   BENAR dari nilai sesungguhnya, pada banyak desimal yang ditulis itu sendiri.
   Jadi klaim "1,58" lolos kalau nilai sebenarnya membulat ke 1,58 pada dua
   desimal, dan gugur kalau tidak.

CARA KUARTIL DATA TUNGGAL
-------------------------
Memakai cara kurikulum: median membelah data, lalu Q1 dan Q3 adalah median dari
belahan kiri dan kanan, TANPA menyertakan median itu sendiri kalau banyak
datanya ganjil. Diverifikasi dari Buku Panduan Guru Matematika SMA/SMK Kelas X,
Dicky Susanto dkk, Kemendikbudristek 2021, halaman 227 sampai 228: untuk 7 data
Q1 jatuh di data ke-2 dan Q3 di data ke-6, untuk 10 data Q1 di data ke-3 dan Q3
di data ke-8. Kedua contoh itu dipasang sebagai uji-diri di bawah, sebab alat
pemeriksa yang salah lebih berbahaya daripada tidak punya alat.

CARA PAKAI
----------
    python alat/cek_statistik.py <berkas.json>
    python alat/cek_statistik.py --uji-diri

Isi berkasnya senarai objek. Tiga jenis:

    { "id": "t1-kelas-a", "jenis": "tunggal",
      "data": [6, 6, 7, 7, 7, 7, 8, 8],
      "klaim": { "mean": 7, "median": 7, "modus": [7], "jangkauan": 2 } }

    { "id": "t9-nilai", "jenis": "kelompok",
      "kelas": [ { "bawah": 40, "atas": 50, "f": 3 } ],
      "klaim": { "mean": "45,5", "median": "46,25" } }

    { "id": "t11-belajar", "jenis": "bivariat",
      "pasangan": [ [1, 60], [2, 65] ],
      "klaim": { "gradien": 5, "konstanta": 55, "r": 1 } }

Nama klaim yang dikenal ada di `NAMA_KLAIM` di bawah. Klaim yang namanya tidak
dikenal dilaporkan sebagai kesalahan, bukan didiamkan, supaya salah ketik nama
tidak lolos menjadi "tidak ada yang diperiksa".

KODE KELUAR
-----------
0  semua klaim lolos
1  ada klaim yang salah
2  berkasnya tidak bisa dibaca
"""

from __future__ import annotations

import json
import math
import sys
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction
from pathlib import Path


# ------------------------------------------------------------------ #
# Membaca angka                                                       #
# ------------------------------------------------------------------ #

def urai(nilai) -> Fraction:
    """
    Ubah angka apa pun menjadi pecahan eksak.

    Float sengaja dilewatkan lewat `str` dulu. `Fraction(0.1)` menghasilkan
    pecahan biner raksasa yang bukan sepersepuluh, sedangkan
    `Fraction("0.1")` menghasilkan tepat 1/10.
    """
    if isinstance(nilai, Fraction):
        return nilai
    if isinstance(nilai, int):
        return Fraction(nilai)
    if isinstance(nilai, float):
        return Fraction(str(nilai))
    if isinstance(nilai, str):
        teks = nilai.strip().replace(",", ".")
        return Fraction(teks)
    raise ValueError(f"bukan angka: {nilai!r}")


def desimal_klaim(nilai) -> int | None:
    """
    Banyak angka di belakang koma pada klaim, apa adanya seperti yang ditulis.

    Mengembalikan None kalau klaimnya bilangan bulat atau pecahan, sebab yang
    seperti itu diperiksa persis, bukan lewat pembulatan.
    """
    teks = str(nilai).strip().replace(",", ".")
    if "/" in teks:
        return None
    if "." not in teks:
        return None
    return len(teks.split(".")[1])


def bulat(nilai: Fraction | float, desimal: int) -> Decimal:
    """Pembulatan setengah ke atas, cara yang dipakai buku sekolah."""
    if isinstance(nilai, Fraction):
        d = Decimal(nilai.numerator) / Decimal(nilai.denominator)
    else:
        d = Decimal(repr(nilai))
    return d.quantize(Decimal(1).scaleb(-desimal), rounding=ROUND_HALF_UP)


def cocok(benar: Fraction | float, diklaim) -> tuple[bool, str]:
    """
    Bandingkan nilai sesungguhnya dengan yang diklaim halaman.

    Klaim bilangan bulat atau pecahan diperiksa persis. Klaim berdesimal
    dianggap benar kalau ia pembulatan yang benar pada banyak desimalnya sendiri.
    """
    d = desimal_klaim(diklaim)
    if d is None:
        try:
            sama = isinstance(benar, Fraction) and benar == urai(diklaim)
        except ValueError:
            return False, f"klaim {diklaim!r} tidak terbaca sebagai angka"
        if not sama and not isinstance(benar, Fraction):
            return False, (
                f"nilainya {benar!r} bukan pecahan bulat, jadi klaim tanpa desimal "
                "tidak bisa dipakai. Tulis klaimnya berdesimal."
            )
        return sama, "" if sama else f"seharusnya {tampil(benar)}, ditulis {diklaim}"

    kiri = bulat(benar, d)
    kanan = Decimal(str(diklaim).strip().replace(",", "."))
    sama = kiri == kanan
    return sama, "" if sama else f"seharusnya {kiri} pada {d} desimal, ditulis {diklaim}"


def tampil(nilai: Fraction | float) -> str:
    """Tampilkan nilai apa adanya: pecahan tetap pecahan, akar tetap desimal."""
    if isinstance(nilai, Fraction):
        if nilai.denominator == 1:
            return str(nilai.numerator)
        return f"{nilai.numerator}/{nilai.denominator} (= {float(nilai):.6g})"
    return f"{nilai:.10g}"


# ------------------------------------------------------------------ #
# Data tunggal                                                        #
# ------------------------------------------------------------------ #

def median_dari(urut: list[Fraction]) -> Fraction:
    n = len(urut)
    tengah = n // 2
    if n % 2 == 1:
        return urut[tengah]
    return (urut[tengah - 1] + urut[tengah]) / 2


def kuartil_tunggal(urut: list[Fraction]) -> tuple[Fraction, Fraction, Fraction]:
    """
    Q1, Q2, Q3 dengan cara kurikulum: belah di median, median itu sendiri TIDAK
    ikut masuk ke belahan mana pun saat banyak datanya ganjil.
    """
    n = len(urut)
    if n < 4:
        raise ValueError("kuartil butuh sedikitnya 4 data")
    q2 = median_dari(urut)
    tengah = n // 2
    kiri = urut[:tengah]
    kanan = urut[tengah + 1:] if n % 2 == 1 else urut[tengah:]
    return median_dari(kiri), q2, median_dari(kanan)


def ringkas_tunggal(data: list[Fraction]) -> dict[str, object]:
    n = len(data)
    if n == 0:
        raise ValueError("datanya kosong")
    urut = sorted(data)
    jumlah = sum(urut, Fraction(0))
    mean = jumlah / n

    # varian populasi, pembagi n, sesuai buku SMA
    varian = sum(((x - mean) ** 2 for x in urut), Fraction(0)) / n
    baku = math.sqrt(float(varian))

    sering: dict[Fraction, int] = {}
    for x in urut:
        sering[x] = sering.get(x, 0) + 1
    puncak = max(sering.values())
    # kalau semua nilai sama seringnya, datanya tidak punya modus
    modus = sorted(k for k, v in sering.items() if v == puncak) if puncak > 1 else []

    hasil: dict[str, object] = {
        "n": Fraction(n),
        "jumlah": jumlah,
        "mean": mean,
        "median": median_dari(urut),
        "modus": modus,
        "min": urut[0],
        "maks": urut[-1],
        "jangkauan": urut[-1] - urut[0],
        "varian": varian,
        "simpangan_baku": baku,
    }

    if n >= 4:
        q1, q2, q3 = kuartil_tunggal(urut)
        jak = q3 - q1
        bawah = q1 - Fraction(3, 2) * jak
        atas = q3 + Fraction(3, 2) * jak
        hasil.update({
            "q1": q1, "q2": q2, "q3": q3, "jak": jak,
            "pagar_bawah": bawah, "pagar_atas": atas,
            "pencilan": sorted(x for x in urut if x < bawah or x > atas),
        })
    return hasil


# ------------------------------------------------------------------ #
# Data berkelompok                                                    #
# ------------------------------------------------------------------ #

def ringkas_kelompok(kelas: list[dict]) -> dict[str, object]:
    """
    Rumus data berkelompok yang dipakai buku SMA.

    Tepi kelas diambil dari `bawah` dan `atas` apa adanya, jadi tulislah tepi
    yang sudah benar (misalnya 39,5 dan 49,5 untuk kelas 40-49), bukan batas
    yang tertulis di tabel. Alat ini sengaja tidak menebak-nebak tepinya, sebab
    tebakan yang salah akan menggeser semua hasilnya diam-diam.
    """
    if not kelas:
        raise ValueError("tidak ada kelas")

    bawah = [urai(k["bawah"]) for k in kelas]
    atas = [urai(k["atas"]) for k in kelas]
    freq = [int(k["f"]) for k in kelas]
    n = sum(freq)
    if n == 0:
        raise ValueError("semua frekuensinya nol")

    tengah = [(b + a) / 2 for b, a in zip(bawah, atas)]
    panjang = [a - b for b, a in zip(bawah, atas)]
    mean = sum((t * f for t, f in zip(tengah, freq)), Fraction(0)) / n

    # modus: kesebangunan di dalam batang tertinggi
    i = freq.index(max(freq))
    d1 = Fraction(freq[i] - (freq[i - 1] if i > 0 else 0))
    d2 = Fraction(freq[i] - (freq[i + 1] if i + 1 < len(freq) else 0))
    modus = bawah[i] + (d1 / (d1 + d2)) * panjang[i] if (d1 + d2) != 0 else tengah[i]

    def letak(bagian: Fraction) -> Fraction:
        """Interpolasi: masuk ke dalam kelas sejauh bagian yang masih kurang."""
        sasaran = bagian * n
        kumulatif = Fraction(0)
        for j, f in enumerate(freq):
            if kumulatif + f >= sasaran:
                if f == 0:
                    kumulatif += f
                    continue
                return bawah[j] + ((sasaran - kumulatif) / f) * panjang[j]
            kumulatif += f
        return atas[-1]

    varian = sum(((t - mean) ** 2 * f for t, f in zip(tengah, freq)), Fraction(0)) / n

    return {
        "n": Fraction(n),
        "mean": mean,
        "modus": modus,
        "median": letak(Fraction(1, 2)),
        "q1": letak(Fraction(1, 4)),
        "q2": letak(Fraction(1, 2)),
        "q3": letak(Fraction(3, 4)),
        "jak": letak(Fraction(3, 4)) - letak(Fraction(1, 4)),
        "varian": varian,
        "simpangan_baku": math.sqrt(float(varian)),
    }


# ------------------------------------------------------------------ #
# Dua peubah                                                          #
# ------------------------------------------------------------------ #

def ringkas_bivariat(pasangan: list[list]) -> dict[str, object]:
    """
    Garis regresi kuadrat terkecil dan korelasi product moment.

    Namanya sengaja `gradien` dan `konstanta`, bukan a dan b. Buku sendiri
    mencatat bahwa tertukarnya a dan b adalah kesalahan yang sering terjadi
    (Buku Guru Kelas XI halaman 168), jadi alat pemeriksa tidak ikut memakai
    huruf yang membingungkan itu.
    """
    n = len(pasangan)
    if n < 3:
        raise ValueError("butuh sedikitnya 3 pasang data")

    xs = [urai(p[0]) for p in pasangan]
    ys = [urai(p[1]) for p in pasangan]
    mx = sum(xs, Fraction(0)) / n
    my = sum(ys, Fraction(0)) / n

    sxy = sum(((x - mx) * (y - my) for x, y in zip(xs, ys)), Fraction(0))
    sxx = sum(((x - mx) ** 2 for x in xs), Fraction(0))
    syy = sum(((y - my) ** 2 for y in ys), Fraction(0))
    if sxx == 0:
        raise ValueError("semua nilai x sama, garis regresinya tidak ada")

    gradien = sxy / sxx
    konstanta = my - gradien * mx
    r = float(sxy) / math.sqrt(float(sxx) * float(syy)) if syy != 0 else 0.0

    return {
        "n": Fraction(n),
        "mean_x": mx,
        "mean_y": my,
        "gradien": gradien,
        "konstanta": konstanta,
        "r": r,
        "r2": r * r,
    }


# ------------------------------------------------------------------ #
# Pemeriksaan                                                         #
# ------------------------------------------------------------------ #

def ringkas_kategori(kategori: list[dict]) -> dict[str, object]:
    """
    Data kategori, misalnya cara siswa berangkat ke sekolah.

    Tidak ada mean atau median di sini, sebab kategori tidak punya urutan angka.
    Yang diperiksa cuma dua hal, dan keduanya sering salah: jumlah seluruh
    frekuensinya, dan persentase yang tertulis di tiap potongan diagram
    lingkaran. Persentase yang dibulatkan sendiri-sendiri gampang tidak berjumlah
    100, dan itu terlihat jelas oleh siswa.
    """
    if not kategori:
        raise ValueError("tidak ada kategori")
    freq = [int(k["f"]) for k in kategori]
    n = sum(freq)
    if n == 0:
        raise ValueError("semua frekuensinya nol")
    return {
        "n": Fraction(n),
        "persen": [Fraction(f * 100, n) for f in freq],
    }


NAMA_KLAIM = {
    "kategori": {"n", "persen"},
    "tunggal": {
        "n", "jumlah", "mean", "median", "modus", "min", "maks", "jangkauan",
        "varian", "simpangan_baku", "q1", "q2", "q3", "jak",
        "pagar_bawah", "pagar_atas", "pencilan",
    },
    "kelompok": {
        "n", "mean", "modus", "median", "q1", "q2", "q3", "jak",
        "varian", "simpangan_baku",
    },
    "bivariat": {"n", "mean_x", "mean_y", "gradien", "konstanta", "r", "r2"},
}

def periksa_satu(butir: dict) -> list[str]:
    """Kembalikan daftar keluhan. Senarai kosong berarti lolos."""
    nama = butir.get("id", "(tanpa id)")
    jenis = butir.get("jenis")
    if jenis not in NAMA_KLAIM:
        return [f"{nama}: jenis {jenis!r} tidak dikenal"]

    try:
        if jenis == "tunggal":
            benar = ringkas_tunggal([urai(x) for x in butir["data"]])
        elif jenis == "kelompok":
            benar = ringkas_kelompok(butir["kelas"])
        elif jenis == "kategori":
            benar = ringkas_kategori(butir["kategori"])
        else:
            benar = ringkas_bivariat(butir["pasangan"])
    except (KeyError, ValueError, ZeroDivisionError) as e:
        return [f"{nama}: datanya tidak bisa dihitung, {e}"]

    klaim = butir.get("klaim") or {}
    if not klaim:
        return [f"{nama}: tidak ada satu pun klaim yang diperiksa"]

    keluhan: list[str] = []
    for kunci, nilai in klaim.items():
        if kunci not in NAMA_KLAIM[jenis]:
            keluhan.append(f"{nama}: klaim {kunci!r} tidak dikenal untuk jenis {jenis}")
            continue
        if kunci not in benar:
            keluhan.append(f"{nama}: {kunci} tidak bisa dihitung dari data ini")
            continue

        if kunci == "persen":
            punya = benar[kunci]
            if len(punya) != len(nilai):
                keluhan.append(
                    f"{nama}: persen berisi {len(nilai)} angka, kategorinya {len(punya)}"
                )
                continue
            for n_ke, (asli, ditulis) in enumerate(zip(punya, nilai), start=1):
                lolos, pesan = cocok(asli, ditulis)
                if not lolos:
                    keluhan.append(f"{nama}: persen kategori ke-{n_ke} {pesan}")
            continue

        # Yang menentukan bentuk perbandingan adalah nilai sesungguhnya, bukan
        # nama klaimnya. "modus" berupa daftar pada data tunggal (boleh lebih
        # dari satu) tetapi berupa satu angka pada data berkelompok.
        if isinstance(benar[kunci], list):
            if not isinstance(nilai, list):
                keluhan.append(f"{nama}: {kunci} seharusnya ditulis sebagai daftar")
                continue
            punya = [tampil(x) for x in benar[kunci]]
            minta = [tampil(urai(x)) for x in nilai]
            if punya != minta:
                keluhan.append(
                    f"{nama}: {kunci} seharusnya [{', '.join(punya) or 'tidak ada'}], "
                    f"ditulis [{', '.join(minta) or 'tidak ada'}]"
                )
            continue

        lolos, pesan = cocok(benar[kunci], nilai)
        if not lolos:
            keluhan.append(f"{nama}: {kunci} {pesan}")
    return keluhan


def uji_diri() -> int:
    """
    Membuktikan alatnya sendiri benar, memakai contoh dari buku.

    Kalau bagian ini gagal, jangan percaya hasil pemeriksaan mana pun.
    """
    kasus: list[tuple[str, object]] = []

    # Buku Guru Kelas X hal. 227: 7 data, Q1 di data ke-2, Q3 di data ke-6.
    tujuh = [urai(x) for x in [10, 20, 30, 40, 50, 60, 70]]
    q1, q2, q3 = kuartil_tunggal(tujuh)
    kasus.append(("7 data, Q1 = data ke-2 (20)", q1 == 20))
    kasus.append(("7 data, Q2 = data ke-4 (40)", q2 == 40))
    kasus.append(("7 data, Q3 = data ke-6 (60)", q3 == 60))

    # Buku Guru Kelas X hal. 228: 10 data, Q1 di data ke-3, Q3 di data ke-8.
    sepuluh = [urai(x) for x in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]
    q1b, q2b, q3b = kuartil_tunggal(sepuluh)
    kasus.append(("10 data, Q1 = data ke-3 (3)", q1b == 3))
    kasus.append(("10 data, Q2 = antara ke-5 dan ke-6 (5,5)", q2b == Fraction(11, 2)))
    kasus.append(("10 data, Q3 = data ke-8 (8)", q3b == 8))

    # pembulatan: 2,675 pada dua desimal harus 2,68, bukan 2,67
    kasus.append(("pembulatan setengah ke atas", bulat(Fraction(2675, 1000), 2) == Decimal("2.68")))

    # pecahan eksak, bukan float
    kasus.append(("0,1 + 0,2 = 0,3 persis", urai("0.1") + urai("0.2") == urai("0.3")))

    # mean sebagai titik seimbang: jumlah simpangan selalu nol
    contoh = [urai(x) for x in [3, 4, 5, 7, 7, 9, 10, 11]]
    r = ringkas_tunggal(contoh)
    seimbang = sum((x - r["mean"] for x in contoh), Fraction(0))
    kasus.append(("jumlah simpangan ke mean = 0", seimbang == 0))
    kasus.append(("mean contoh = 7", r["mean"] == 7))

    # garis regresi pada data yang benar-benar lurus harus tepat
    lurus = [[1, 5], [2, 7], [3, 9], [4, 11]]
    b = ringkas_bivariat(lurus)
    kasus.append(("regresi data lurus, gradien 2", b["gradien"] == 2))
    kasus.append(("regresi data lurus, konstanta 3", b["konstanta"] == 3))
    kasus.append(("regresi data lurus, r = 1", abs(b["r"] - 1) < 1e-12))

    gagal = 0
    for nama, lolos in kasus:
        print(f"  {'ok  ' if lolos else 'GAGAL'} {nama}")
        if not lolos:
            gagal += 1
    print()
    if gagal:
        print(f"UJI DIRI GAGAL: {gagal} dari {len(kasus)}. Jangan pakai alat ini dulu.")
        return 1
    print(f"Uji diri lolos, {len(kasus)} dari {len(kasus)}.")
    return 0


def hitung_saja(butir: dict) -> dict[str, object]:
    jenis = butir.get("jenis")
    if jenis == "tunggal":
        return ringkas_tunggal([urai(x) for x in butir["data"]])
    if jenis == "kelompok":
        return ringkas_kelompok(butir["kelas"])
    if jenis == "kategori":
        return ringkas_kategori(butir["kategori"])
    if jenis == "bivariat":
        return ringkas_bivariat(butir["pasangan"])
    raise ValueError(f"jenis {jenis!r} tidak dikenal")


def ringkas_semua(isi: list[dict]) -> int:
    """
    Cetak seluruh angka turunan tiap kumpulan data.

    Gunanya supaya angka yang ditulis ke halaman BERASAL dari hitungan mesin
    sejak awal, bukan dikarang lalu dibela belakangan. Nilai berdesimal
    ditampilkan sampai 6 angka di belakang koma supaya pembulatannya bisa
    dipilih sendiri saat menulis.
    """
    for butir in isi:
        nama = butir.get("id", "(tanpa id)")
        judul = butir.get("judul", "")
        print(f"== {nama}  {judul}")
        try:
            hasil = hitung_saja(butir)
        except (KeyError, ValueError, ZeroDivisionError) as e:
            print(f"   tidak bisa dihitung: {e}")
            continue
        for kunci, nilai in hasil.items():
            if isinstance(nilai, list):
                isi_daftar = ", ".join(tampil(x) for x in nilai) or "tidak ada"
                print(f"   {kunci:16} [{isi_daftar}]")
            elif isinstance(nilai, Fraction):
                tambahan = "" if nilai.denominator == 1 else f"   = {float(nilai):.6f}"
                print(f"   {kunci:16} {tampil(nilai)}{tambahan}")
            else:
                print(f"   {kunci:16} {nilai:.6f}")
        print()
    return 0


def main(argv: list[str]) -> int:
    if not argv or len(argv) > 2:
        print(__doc__)
        return 2
    if argv[0] in ("--uji-diri", "-u"):
        return uji_diri()

    ringkas = argv[0] in ("--ringkas", "-r")
    if ringkas:
        if len(argv) != 2:
            print("Pakai: python alat/cek_statistik.py --ringkas <berkas.json>")
            return 2
        argv = argv[1:]
    elif len(argv) != 1:
        print(__doc__)
        return 2

    berkas = Path(argv[0])
    try:
        isi = json.loads(berkas.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        print(f"Berkasnya tidak bisa dibaca: {e}")
        return 2
    if not isinstance(isi, list):
        print("Isi berkasnya harus berupa senarai objek.")
        return 2

    if ringkas:
        return ringkas_semua(isi)

    semua: list[str] = []
    for butir in isi:
        keluhan = periksa_satu(butir)
        nama = butir.get("id", "(tanpa id)")
        if keluhan:
            semua.extend(keluhan)
            for k in keluhan:
                print(f"  SALAH {k}")
        else:
            jumlah = len(butir.get("klaim") or {})
            print(f"  ok    {nama}, {jumlah} angka cocok")

    print()
    if semua:
        print(f"GAGAL: {len(semua)} angka salah dari {len(isi)} kumpulan data.")
        return 1
    total = sum(len(b.get("klaim") or {}) for b in isi)
    print(f"Lolos: {total} angka dari {len(isi)} kumpulan data, semuanya cocok.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
