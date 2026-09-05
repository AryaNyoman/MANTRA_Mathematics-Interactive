"""Menambahkan sorotan bentuk utuh ke babak yang ditandai `alat/cek_kejadian.py`.

    python alat/tambah_sorotan.py

Tiap sisipan ditulis tangan di daftar di bawah, bukan ditebak skrip: benda yang
disorot harus benda yang SEDANG DIBICARAKAN narator di babak itu. Menyorot
sembarang benda supaya angka diamnya turun akan melanggar standar proyek yang
melarang "gerakan tanpa makna yang mencuri perhatian", sambil memenuhi
ukurannya. Itu memperbaiki angka dan merusak videonya.

Warna sorotnya selalu BERBEDA dari warna bendanya. `Indicate` menyorot dengan
membesarkan dan mengganti warna; kalau warnanya sama, separuh sorotan hilang
dan sisanya tidak terbaca alat ukur. Diperiksa `alat/warna_sorot.py`.
"""

from __future__ import annotations

import pathlib
import sys

AKAR = pathlib.Path(__file__).resolve().parents[1]

# (berkas, penanda yang dicari, baris yang disisipkan sesudahnya)
SISIPAN = [
    # --- video 01 -------------------------------------------------------- #
    ("transformasi1_setiap_titik.py",
     "                run_time=max(2.4, DURASI[\"pindah\"] - 3.4),\n            )\n",
     "            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)\n"),
    ("transformasi1_setiap_titik.py",
     "            papan.baris(r\"(x,\\ y) \\to (x,\\ -y)\", warna=TINTA, b=b)\n",
     "            b.main(Indicate(peta_bentuk, color=SOROT), run_time=1.4)\n"),
    ("transformasi1_setiap_titik.py",
     "            b.main(Indicate(titik_sumbu, color=AKSEN), run_time=1.2)\n",
     "            b.main(Indicate(peta_besar, color=AKSEN), run_time=1.4)\n"),

    # --- video 02 -------------------------------------------------------- #
    ("transformasi2_cermin_garis.py",
     "            papan.baris(r\"A(1,\\ 1) \\to A'(9,\\ 1)\", warna=AKSEN2, b=b)\n",
     "            b.main(Indicate(peta_b, color=AKSEN), run_time=1.4)\n"),
    ("transformasi2_cermin_garis.py",
     "            b.main(Indicate(garis_cermin, color=AKSEN2), run_time=1.2)\n"
     "        qc.periksa_adegan(self, {\"prapeta\": prapeta, \"peta\": peta_b},\n"
     "                          hud={\"identitas\": ident, \"papan\": papan.semua()},\n"
     "                          dunia={\"bidang\": bidang_b})\n\n"
     "        # Pertanyaan penutup",
     None),  # ditangani terpisah di bawah

    # --- video 04 -------------------------------------------------------- #
    ("transformasi4_dilatasi.py",
     "            b.main(Indicate(tanda_pusat, color=AKSEN2), run_time=0.8)\n",
     "            b.main(Indicate(prapeta, color=SOROT), run_time=1.4)\n"),
    ("transformasi4_dilatasi.py",
     "            b.main(*[ShowCreation(s) for s in sinar], run_time=1.8)\n",
     "            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)\n"),
    ("transformasi4_dilatasi.py",
     "                run_time=max(2.0, DURASI[\"meluncur\"] - 2.6),\n            )\n",
     "            b.main(Indicate(prapeta, color=AKSEN), run_time=1.4)\n"),
    ("transformasi4_dilatasi.py",
     "                warna=SOROT, b=b,\n            )\n",
     "            b.main(Indicate(peta_besar, color=SOROT), run_time=1.4)\n"),
    ("transformasi4_dilatasi.py",
     "            papan.baris(r\"4 = 2^2,\\ \\text{bukan } 2\", warna=SOROT, b=b)\n",
     "            b.main(Indicate(peta_besar, color=AKSEN), run_time=1.4)\n"),
]


def main() -> int:
    n = 0
    for nama, penanda, sisip in SISIPAN:
        if sisip is None:
            continue
        p = AKAR / "manim" / "scenes" / nama
        s = p.read_text(encoding="utf-8")
        if penanda not in s:
            print(f"LEWAT  {nama}: penanda tidak ketemu ({penanda[:52]!r})")
            continue
        if sisip.strip() in s:
            print(f"LEWAT  {nama}: sudah ada ({sisip.strip()[:52]!r})")
            continue
        s = s.replace(penanda, penanda + sisip, 1)
        p.write_text(s, encoding="utf-8")
        n += 1
        print(f"SISIP  {nama}: {sisip.strip()[:64]}")
    print(f"\n{n} sorotan disisipkan")
    return 0


if __name__ == "__main__":
    sys.exit(main())
