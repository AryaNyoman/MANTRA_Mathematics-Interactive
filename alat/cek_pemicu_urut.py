"""Memeriksa jangkar `tunggu_kata` sebuah adegan MAJU TERUS, sebelum dirender.

    python alat/cek_pemicu_urut.py manim/scenes/transformasi1_setiap_titik.py

KENAPA ALAT INI ADA
`alat/cek_waktu_adegan.py` sudah memeriksa tiap frasa `tunggu_kata` ADA di
segmennya. Itu perlu, tetapi tidak cukup. Pada 8 September 2026 adegan
Transformasi 01 memakai frasa yang SAMA dua kali di satu segmen:

    b.tunggu_kata("sepasang angka")     # kemunculan pertama, detik 8,1
    b.main(FadeIn(bawa), run_time=1.2)
    b.tunggu_kata("sepasang angka")     # MAKSUDNYA yang kedua, detik 10,4

`JamKata.jam` selalu menjawab kemunculan PERTAMA (parameter `ke` ada, tetapi
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

Satu batas lagi yang perlu diketahui SEBELUM memercayai angkanya: ramalan jam
hanya menjumlahkan `run_time=` yang tertulis di dalam badan babak. Adegan yang
memanggil metode pembantu (`self.muncul(...)`, `self.papan(...)`) menyembunyikan
waktunya di badan metode itu, jadi ramalannya OPTIMIS. Pada grafik3-puncak
selisihnya terukur: pemeriksa meramalkan kelebihan 0,09 detik, rendernya
melaporkan 0,82 detik untuk pemicu yang sama. Jadi "kelebihan kecil" di sini
tetap berarti render akan gagal; beri jarak, jangan dipepetkan ke nol.
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
# LOLOS tanpa memeriksa apa pun. Diam yang terbaca sebagai lulus lebih
# berbahaya daripada tidak ada pemeriksa sama sekali.
BABAK = re.compile(r"""(?:sinema\.babak\(\s*self,|self\.bagian\()\s*(['"])([^'"]+)\1""")
TUNGGU = re.compile(r"""\.tunggu_kata\(\s*(['"])([^'"]+)\1(?:\s*,\s*ke\s*=\s*(\d+))?""")
TOPIK_BARIS = re.compile(r"""^TOPIK\s*=\s*(['"])([^'"]+)\1""", re.M)
# run_time= pada baris animasi, untuk MERAMALKAN jam adegan tanpa render.
RUN_TIME = re.compile(r'run_time\s*=\s*([0-9.]+)')


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
        r = RUN_TIME.search(baris)
        if r:
            urut[segmen_kini].append(("animasi", float(r.group(1))))

    buruk = 0
    for segmen, kejadian in urut.items():
        # RAMALAN JAM ADEGAN, tanpa render (usul sesi Turunan, video 04):
        # jalan dari awal audio segmen; tiap run_time memajukan jam, tiap
        # tunggu_kata melompat ke detik katanya. Kalau jam sudah MELEWATI
        # detik kata itu, render akan gagal di `tunggu_kata` sekarang juga.
        # Ambangnya NOL, bukan 0,15: pembulatan frame membuat selisih 0,04
        # di kertas menjadi 0,19 saat render.
        try:
            jam_kini = jam.mulai(segmen)
        except KeyError:
            buruk += 1
            print(f"  HILANG  segmen {segmen!r} tidak ada di kata.json")
            continue
        sebelum_nama, sebelum_jam = None, None
        for k in kejadian:
            if k[0] == "animasi":
                jam_kini += k[1]
                continue
            _, f, ke = k
            try:
                saat = jam.jam(segmen, f, ke=ke)
            except Exception as e:
                buruk += 1
                print(f"  HILANG  {segmen}: {f!r} (ke={ke}) -> {str(e)[:90]}")
                continue
            if sebelum_jam is not None and saat <= sebelum_jam:
                buruk += 1
                print(f"  MUNDUR  {segmen}: {f!r} di {saat:.2f} s, padahal "
                      f"{sebelum_nama!r} sudah di {sebelum_jam:.2f} s")
                if f == sebelum_nama and ke == 1:
                    print("          frasanya SAMA. Pakai `ke=2` untuk kemunculan kedua, "
                          "atau frasa lain yang diucapkan sesudahnya.")
            elif jam_kini > saat + 1e-9:
                buruk += 1
                print(f"  TERLAMBAT {segmen}: {f!r} diucapkan detik {saat:.2f}, tetapi "
                      f"animasi sebelumnya membawa jam ke {jam_kini:.2f} "
                      f"(kelebihan {jam_kini - saat:.2f} s). Pendekkan animasi sebelum pemicu ini.")
            jam_kini = max(jam_kini, saat)
            sebelum_nama, sebelum_jam = f, saat

    jumlah = sum(1 for v in urut.values() for k in v if k[0] == "tunggu")

    # Adegan standar v3 SELALU punya babak berpemicu kata. Kalau tidak ada satu
    # pun yang terbaca, yang terjadi bukan "adegannya bersih" melainkan
    # "pemeriksanya tidak mengerti berkas ini", dan melaporkan LOLOS untuk itu
    # sama saja dengan tidak memeriksa. Adegan yang memang belum memakai jam
    # kata tidak punya `TOPIK = "..."` dan sudah dilewati di atas.
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
