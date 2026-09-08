"""Memeriksa jangkar `tunggu_kata` sebuah adegan MAJU TERUS, sebelum dirender.

    python alat/cek_pemicu_urut.py manim/scenes/transformasi1_setiap_titik.py

KENAPA ALAT INI ADA
`alat/cek_waktu_adegan.py` sudah memeriksa tiap frasa `tunggu_kata` ADA di
segmennya. Itu perlu, tetapi tidak cukup. Pada 8 September 2026 adegan
Transformasi 01 memakai frasa yang SAMA dua kali di satu segmen:

    b.tunggu_kata("sepasang angka")     # kemunculan pertama, detik 8,1
    b.main(FadeIn(bawa), run_time=1.2)
    b.tunggu_kata("sepasang angka")     # MAKSUDNYA yang kedua, detik 10,4

`JamKata.jam` menjawab kemunculan ke-`ke` (bawaan pertama; sejak tambalan
`tunggu_kata` tidak meneruskannya). Jadi pemicu kedua menunjuk detik yang sudah
lewat, dan `sinema.laporkan_pemicu` menggagalkan render dengan "terlambat 1,22
detik". Kedua gerbang lama meloloskannya: frasanya memang ada, dan jumlah
waktunya memang muat.

Ongkosnya sembilan menit render 1080p60 untuk kesalahan satu baris. Berkas ini
memindahkan temuan itu ke sebelum render, tempat harganya nol.

YANG DIPERIKSA
Untuk tiap segmen, jam kata semua `tunggu_kata`-nya harus MAJU TERUS. Sama
besar pun ditolak: dua pemicu pada detik yang sama berarti yang kedua tidak
menunggu apa-apa, dan animasi di antaranya menggeser semuanya.

BATASNYA JUJUR
Ini pemeriksa STATIS: ia membaca urutan `tunggu_kata` dari kode, bukan
menjalankan adegannya. Percabangan atau perulangan yang mengubah urutan tidak
terbaca. Ia juga tidak menilai apakah animasi di antara dua pemicu muat; itu
tugas `cek_waktu_adegan.py` dan, pada akhirnya, rendernya sendiri.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AKAR / "manim"))

BABAK = re.compile(r'sinema\.babak\(\s*self,\s*"([^"]+)"')
# Lama animasi di antara dua pemicu. Hanya angka tetap yang dibaca;
# `run_time=lama` yang dihitung saat jalan sengaja dilewati dan dihitung nol,
# jadi alat ini bisa MELEWATKAN kelebihan, tidak pernah mengarangnya.
RUN_TIME = re.compile(r'run_time\s*=\s*([0-9.]+)')
# Cocok untuk `b.tunggu_kata("frasa", ke=2)` DAN untuk pembungkusnya, misalnya
# `tunggu_kata_bergeser(b, frame, "frasa")` yang menunggu sambil menggeser
# kamera. Pembungkus wajib ikut terbaca: begitu sebuah sesi memakai pembungkus,
# pemeriksa yang hanya mengenal bentuk asli akan diam-diam melewatkan sebagian
# besar pemicu, dan gerbang yang melewatkan diam-diam lebih berbahaya daripada
# tidak ada gerbang (Ruang 3D 9 Sep: 44 dari 62 pemicu sempat tidak terbaca).
TUNGGU = re.compile(
    r'tunggu_kata\w*\(\s*(?:[^)"]*?,\s*)?"([^"]+)"(?:\s*,\s*ke\s*=\s*(\d+))?')
TOPIK_BARIS = re.compile(r'^TOPIK\s*=\s*"([^"]+)"', re.M)


def periksa(jalur: Path) -> int:
    isi = jalur.read_text(encoding="utf-8")
    m = TOPIK_BARIS.search(isi)
    if not m:
        print(f"{jalur.name}: tidak ada baris TOPIK = \"...\", dilewati")
        return 0
    topik = m.group(1)

    from gl import sinema
    jam = sinema.JamKata(topik)

    segmen_kini = None
    urut: dict[str, list[str]] = {}
    for baris in isi.split("\n"):
        b = BABAK.search(baris)
        if b:
            segmen_kini = b.group(1)
            urut.setdefault(segmen_kini, [])
        t = TUNGGU.search(baris)
        if t and segmen_kini:
            urut[segmen_kini].append((t.group(1), int(t.group(2) or 1), 0.0))
        elif segmen_kini and urut.get(segmen_kini):
            # Animasi SESUDAH pemicu terakhir: waktunya menggeser pemicu berikutnya.
            for rt in RUN_TIME.findall(baris):
                f, ke, lama_anim = urut[segmen_kini][-1]
                urut[segmen_kini][-1] = (f, ke, lama_anim + float(rt))

    buruk = 0
    for segmen, frasa in urut.items():
        sebelum_nama, sebelum_jam, sebelum_ke, sebelum_anim = None, None, None, 0.0
        for f, ke, anim in frasa:
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
            elif sebelum_jam is not None and sebelum_anim > (saat - sebelum_jam) + 0.15:
                # Celah antar-kata TIDAK MUAT untuk animasi di antaranya. Inilah
                # yang menggagalkan render Ruang 3D materi 01 (9 Sep): animasi
                # 1,4 detik di celah 0,78 detik, ketahuan sesudah render jalan.
                # Ketiga gerbang lama tidak melihatnya: yang satu memeriksa
                # URUTAN pemicu, yang lain memeriksa TOTAL babak, dan celah di
                # antara dua pemicu tidak diperiksa siapa pun.
                buruk += 1
                print(f"  SEMPIT  {segmen}: animasi {sebelum_anim:.2f} s sesudah "
                      f"{sebelum_nama!r}, padahal {f!r} menyusul "
                      f"{saat - sebelum_jam:.2f} s kemudian. Pendekkan animasinya.")
            sebelum_nama, sebelum_jam, sebelum_ke, sebelum_anim = f, saat, ke, anim

        # EKOR: animasi sesudah pemicu TERAKHIR harus muat sampai ujung segmen.
        # Celah antar-pemicu saja tidak cukup: babak `kenapa` Ruang 3D materi 01
        # lolos pemeriksaan celah, lalu tetap menggagalkan render di menit ke-22
        # karena geseran kamera 2,6 detik sesudah kata terakhir menabrak ujung
        # narasi. Render yang gagal di menit ke-22 harganya jauh di atas nol.
        if sebelum_jam is not None and sebelum_anim > 0:
            try:
                sisa_segmen = jam.akhir(segmen) - sebelum_jam
            except Exception:
                sisa_segmen = None
            if sisa_segmen is not None and sebelum_anim > sisa_segmen + 0.15:
                buruk += 1
                print(f"  EKOR    {segmen}: animasi {sebelum_anim:.2f} s sesudah "
                      f"{sebelum_nama!r}, padahal segmennya habis "
                      f"{sisa_segmen:.2f} s kemudian. Pendekkan animasinya.")

    jumlah = sum(len(v) for v in urut.values())
    print(f"{jalur.name}: {jumlah} pemicu di {len(urut)} babak, "
          + ("semuanya maju terus" if buruk == 0 else f"{buruk} bermasalah"))
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
