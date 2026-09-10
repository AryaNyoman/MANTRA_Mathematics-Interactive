"""Meramalkan jam adegan dari kodenya, SEBELUM dirender: tiap `tunggu_kata`
harus maju terus, animasi di antaranya harus muat, dan ekor babak tidak boleh
melewati ujung segmennya.

    python alat/cek_pemicu_urut.py manim/scenes/transformasi1_setiap_titik.py

KENAPA ALAT INI ADA
`alat/cek_waktu_adegan.py` sudah memeriksa tiap frasa `tunggu_kata` ADA di
segmennya. Itu perlu, tetapi tidak cukup. Pada 8 September 2026 adegan
Transformasi 01 memakai frasa yang SAMA dua kali di satu segmen:

    b.tunggu_kata("sepasang angka")     # kemunculan pertama, detik 8,1
    b.main(FadeIn(bawa), run_time=1.2)
    b.tunggu_kata("sepasang angka")     # MAKSUDNYA yang kedua, detik 10,4

`JamKata.jam` menjawab kemunculan ke-`ke` (bawaan pertama). Jadi pemicu kedua
menunjuk detik yang sudah lewat, dan `sinema.laporkan_pemicu` menggagalkan
render dengan "terlambat 1,22 detik". Kedua gerbang lama meloloskannya:
frasanya memang ada, dan jumlah waktunya memang muat.

Ongkosnya sembilan menit render 1080p60 untuk kesalahan satu baris. Berkas ini
memindahkan temuan itu ke sebelum render, tempat harganya nol.

YANG DIPERIKSA (gabungan temuan Turunan, Ruang 3D, dan Grafik Fungsi, 9 Sep 2026)
1. HILANG    frasa `tunggu_kata` tidak ada di kata.json segmennya.
2. MUNDUR    jam kata pemicu tidak maju. Sama besar pun ditolak: dua pemicu
             pada detik yang sama berarti yang kedua tidak menunggu apa-apa.
3. TERLAMBAT jam adegan yang DIRAMALKAN sudah melewati detik kata pemicu.
             Ramalannya: jalan dari awal audio segmen; tiap `run_time=` dan
             tiap penolong pemakan waktu memajukan jam; tiap `tunggu_kata`
             melompat ke detik katanya. Ambangnya NOL, bukan 0,15: pembulatan
             frame membuat selisih 0,04 di kertas menjadi 0,19 saat render.
4. EKOR      animasi SESUDAH pemicu terakhir melewati ujung segmen. Babak
             `kenapa` Ruang 3D materi 01 lolos pemeriksaan celah, lalu tetap
             menggagalkan render di menit ke-22 karena geseran kamera 2,6 detik
             sesudah kata terakhir menabrak ujung narasi.
5. NOL BABAK adegan punya `TOPIK = "..."` tetapi tidak satu babak pun terbaca:
             itu berarti pemeriksanya tidak mengerti bentuk berkasnya, dan
             melaporkan LOLOS untuk itu sama saja dengan tidak memeriksa.

BATASNYA JUJUR
Ini pemeriksa STATIS: ia membaca kode, bukan menjalankan adegannya.
- Percabangan atau perulangan yang mengubah urutan tidak terbaca.
- Hanya `run_time=` berangka tetap yang dihitung; `run_time=lama` yang dihitung
  saat jalan dihitung nol. Beberapa `run_time=` pada SATU baris dianggap satu
  `play` yang berjalan serentak, jadi diambil yang terbesar.
- Penolong yang memakan waktu tanpa `run_time=` hanya dikenali dari daftar
  `PENOLONG`. Tanpa daftar itu `sumbu_z_pamit(b, papan_koor, 0.8)` dihitung
  nol, dan babak `naik` Ruang 3D materi 01 lolos lalu gagal di menit ke-8.
- Metode pembantu adegan (`self.muncul(...)`, `self.papan(...)`) menyembunyikan
  waktunya di badan metode itu, jadi ramalannya OPTIMIS. Pada grafik3-puncak
  selisihnya terukur: pemeriksa meramalkan kelebihan 0,09 detik, rendernya
  melaporkan 0,82 detik untuk pemicu yang sama. Jadi "kelebihan kecil" di sini
  tetap berarti render akan gagal; beri jarak, jangan dipepetkan ke nol.
Jadi alat ini bisa MELEWATKAN kelebihan, tidak pernah mengarangnya.

Dibuktikan dua arah oleh `manim/uji/uji_pemicu_urut.py`.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AKAR / "manim"))

# Dua bentuk pembuka babak diterima, dan kutip tunggal maupun ganda:
#   with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
#   with self.bagian('buka') as b:          pembungkus yang menambahkan QC
# Bentuk kedua dipakai contoh rujukan yang disetujui ARYA
# (`manim/scenes/turunan2_garis_singgung.py`) dan adegan yang meniru polanya.
# Sebelum 9 Sep 2026 pemeriksa ini hanya mengenali bentuk pertama berkutip
# ganda, jadi ia melaporkan "0 pemicu di 0 babak" untuk adegan seperti itu dan
# LOLOS tanpa memeriksa apa pun.
BABAK = re.compile(r"""(?:sinema\.babak\(\s*self,|self\.bagian\()\s*(['"])([^'"]+)\1""")
# Cocok untuk `b.tunggu_kata("frasa", ke=2)` DAN untuk pembungkusnya, misalnya
# `tunggu_kata_bergeser(b, frame, "frasa")` yang menunggu sambil menggeser
# kamera. Pembungkus wajib ikut terbaca: begitu sebuah sesi memakai pembungkus,
# pemeriksa yang hanya mengenal bentuk asli akan diam-diam melewatkan sebagian
# besar pemicu (Ruang 3D 9 Sep: 44 dari 62 pemicu sempat tidak terbaca).
# Kelompok: 1 kutip, 2 frasa, 3 ke=.
TUNGGU = re.compile(
    r"""tunggu_kata\w*\(\s*(?:[^)'"]*?,\s*)?(['"])([^'"]+)\1(?:\s*,\s*ke\s*=\s*(\d+))?""")
TOPIK_BARIS = re.compile(r"""^TOPIK\s*=\s*(['"])([^'"]+)\1""", re.M)
# run_time= pada baris animasi, untuk meramalkan jam adegan tanpa render.
RUN_TIME = re.compile(r'run_time\s*=\s*([0-9.]+)')
# Penolong yang MEMAKAN WAKTU tanpa menulis `run_time=`.
PENOLONG = re.compile(
    r'(?:sumbu_z_pamit|sumbu_z_muncul)\([^)]*?,\s*([0-9.]+)\s*\)'
    r'|b\.(?:jeda|catat)\(\s*([0-9.]+)\s*\)')
# Batas pemakluman ekor babak, sama dengan yang dipakai `sinema.Babak`.
BATAS_EKOR = 0.15


def lama_animasi(baris: str) -> float:
    """Detik yang dimakan satu baris kode: run_time terbesar plus penolong."""
    rt = [float(x) for x in RUN_TIME.findall(baris)]
    lama = max(rt) if rt else 0.0
    lama += sum(float(a or b) for a, b in PENOLONG.findall(baris))
    return lama


def periksa(jalur: Path) -> int:
    isi = jalur.read_text(encoding="utf-8")
    m = TOPIK_BARIS.search(isi)
    if not m:
        print(f"{jalur.name}: tidak ada baris TOPIK = \"...\", dilewati")
        return 0
    topik = m.group(2)

    from gl import sinema
    jam = sinema.JamKata(topik)

    # Kejadian per babak, urut: ("tunggu", frasa, ke) atau ("animasi", detik).
    segmen_kini = None
    urut: dict[str, list[tuple]] = {}
    for baris in isi.split("\n"):
        b = BABAK.search(baris)
        if b:
            segmen_kini = b.group(2)
            urut.setdefault(segmen_kini, [])
        elif re.match(r"    (?:@|def |async def )", baris) and segmen_kini:
            # `construct` sudah habis; yang menyusul adalah metode pembantu
            # (`muncul`, `papan`, `hilang`). `run_time=` di dalamnya BUKAN milik
            # babak terakhir. Tanpa penjaga ini, adegan grafik3 menyumbangkan
            # 1,4 detik hantu ke babak 'tutup' dan menyembunyikannya dari
            # babak yang benar-benar memakainya.
            segmen_kini = None
        if not segmen_kini:
            continue
        t = TUNGGU.search(baris)
        if t:
            urut[segmen_kini].append(("tunggu", t.group(2), int(t.group(3) or 1)))
            continue
        lama = lama_animasi(baris)
        if lama > 0:
            urut[segmen_kini].append(("animasi", lama))

    buruk = 0
    for segmen, kejadian in urut.items():
        try:
            jam_kini = jam.mulai(segmen)
        except KeyError:
            buruk += 1
            print(f"  HILANG  segmen {segmen!r} tidak ada di kata.json")
            continue
        sebelum_nama, sebelum_jam, sebelum_ke = None, None, None
        ada_pemicu = False
        for k in kejadian:
            if k[0] == "animasi":
                jam_kini += k[1]
                continue
            _, f, ke = k
            ada_pemicu = True
            try:
                saat = jam.jam(segmen, f, ke=ke)
            except Exception as e:
                buruk += 1
                tulis_ke = "" if ke == 1 else f" (ke={ke})"
                print(f"  HILANG  {segmen}: {f!r}{tulis_ke} -> {str(e)[:90]}")
                continue
            if sebelum_jam is not None and saat <= sebelum_jam:
                buruk += 1
                print(f"  MUNDUR  {segmen}: {f!r} di {saat:.2f} s, padahal "
                      f"{sebelum_nama!r} sudah di {sebelum_jam:.2f} s")
                if f == sebelum_nama and ke == sebelum_ke:
                    print(f"          frasanya SAMA dan ke= sama. Kalau yang dimaksud "
                          f"kemunculan berikutnya, tulis ke={ke + 1}.")
            elif jam_kini > saat + 1e-9:
                buruk += 1
                print(f"  TERLAMBAT {segmen}: {f!r} diucapkan detik {saat:.2f}, tetapi "
                      f"animasi sebelumnya membawa jam ke {jam_kini:.2f} "
                      f"(kelebihan {jam_kini - saat:.2f} s). Pendekkan animasi sebelum pemicu ini.")
            jam_kini = max(jam_kini, saat)
            sebelum_nama, sebelum_jam, sebelum_ke = f, saat, ke

        # EKOR: babak berpemicu yang animasinya melewati ujung segmen. Babak
        # tanpa pemicu diperiksa totalnya oleh cek_waktu_adegan, jangan dobel.
        if ada_pemicu:
            try:
                akhir = jam.akhir(segmen)
            except Exception:
                akhir = None
            if akhir is not None and jam_kini > akhir + BATAS_EKOR:
                buruk += 1
                print(f"  EKOR    {segmen}: animasi sesudah {sebelum_nama!r} membawa jam "
                      f"ke {jam_kini:.2f} s, padahal segmennya habis di {akhir:.2f} s "
                      f"(kelebihan {jam_kini - akhir:.2f} s). Pendekkan animasinya.")

    jumlah = sum(1 for v in urut.values() for k in v if k[0] == "tunggu")

    if not urut:
        print(f"{jalur.name}: TIDAK ADA babak yang terbaca, padahal berkas ini "
              f"punya TOPIK = {topik!r}. Pemeriksa tidak mengerti bentuk "
              f"pembuka babaknya; jangan dianggap lolos.")
        return 1

    print(f"{jalur.name}: {jumlah} pemicu di {len(urut)} babak, "
          + ("semuanya maju terus dan tidak ada yang terlambat" if buruk == 0
             else f"{buruk} bermasalah"))
    return buruk


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("adegan", nargs="+", help="berkas adegan .py")
    a = p.parse_args()
    buruk = sum(periksa(Path(x)) for x in a.adegan)
    print()
    print("SEMUA LOLOS" if buruk == 0 else f"{buruk} pemicu perlu diperbaiki")
    return 0 if buruk == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
