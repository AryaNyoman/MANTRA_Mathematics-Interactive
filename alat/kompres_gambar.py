"""
Kompres foto galeri supaya ringan untuk siswa berkuota terbatas.

KENAPA ALAT INI ADA
Aturan proyek: berkas gambar di situs harus di bawah 150 KB. Itu bukan selera,
melainkan soal siswa yang kuotanya terbatas. Enam foto galeri Grafik Fungsi
diunduh apa adanya dari Wikimedia dan dua di antaranya jauh melewati batas,
yang terberat 265 KB.

CARA KERJANYA
Lebarnya dipangkas dulu ke ukuran yang memang dipakai halaman (kartu galeri
tidak pernah lebih lebar dari sekitar 600 piksel, jadi 820 sudah lebih dari
cukup termasuk untuk layar rapat piksel), lalu mutu JPEG-nya diturunkan
bertahap sampai berkasnya masuk batas.

Mutu TIDAK diturunkan membabi buta ke angka rendah. Ia diturunkan setahap demi
setahap dan berhenti begitu batasnya terpenuhi, supaya fotonya sepelan mungkin
kehilangan detail. Mutu di bawah 55 ditolak: lebih baik lapor gagal daripada
diam-diam memasang foto yang penuh bercak.

CARA PAKAI
    python alat/kompres_gambar.py                 lihat dulu, tidak mengubah
    python alat/kompres_gambar.py --kerjakan      benar-benar menimpa berkasnya
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

FOLDER = Path(__file__).resolve().parent.parent / 'web' / 'public' / 'gambar'

# Hanya foto galeri Grafik Fungsi. Foto topik lain BUKAN wilayah sesi ini.
BERKAS = ['basket.jpg', 'jembatan.jpg', 'antena.jpg',
          'bakteri.jpg', 'obat.jpg', 'seismograf.jpg']

BATAS_KB = 150
LEBAR_MAKS = 820
MUTU_AWAL = 86
MUTU_MINIMUM = 55


def kompres(sumber: Path, kerjakan: bool) -> tuple[int, int, int, int]:
    """Kembalikan (kb_sebelum, kb_sesudah, lebar_sesudah, mutu_terpakai)."""
    kb_awal = sumber.stat().st_size // 1024
    gambar = Image.open(sumber)
    if gambar.mode != 'RGB':
        gambar = gambar.convert('RGB')

    if gambar.width > LEBAR_MAKS:
        tinggi = round(gambar.height * LEBAR_MAKS / gambar.width)
        gambar = gambar.resize((LEBAR_MAKS, tinggi), Image.LANCZOS)

    from io import BytesIO
    mutu = MUTU_AWAL
    while mutu >= MUTU_MINIMUM:
        tampung = BytesIO()
        gambar.save(tampung, 'JPEG', quality=mutu, optimize=True, progressive=True)
        if tampung.tell() <= BATAS_KB * 1024:
            if kerjakan:
                sumber.write_bytes(tampung.getvalue())
            return kb_awal, tampung.tell() // 1024, gambar.width, mutu
        mutu -= 4

    raise SystemExit(f'{sumber.name}: tidak bisa masuk {BATAS_KB} KB tanpa turun '
                     f'di bawah mutu {MUTU_MINIMUM}. Ganti fotonya, jangan dipaksa.')


def main() -> int:
    kerjakan = '--kerjakan' in sys.argv
    if not kerjakan:
        print('Mode lihat saja. Tambahkan --kerjakan untuk benar-benar menimpa.\n')

    gagal = 0
    for nama in BERKAS:
        berkas = FOLDER / nama
        if not berkas.exists():
            print(f'GAGAL  {nama}: berkasnya tidak ada')
            gagal += 1
            continue
        awal, akhir, lebar, mutu = kompres(berkas, kerjakan)
        tanda = 'ok  ' if akhir <= BATAS_KB else 'AWAS'
        print(f'{tanda} {nama:16s} {awal:4d} KB -> {akhir:4d} KB   '
              f'lebar {lebar}, mutu {mutu}')

    print()
    print('Selesai.' if kerjakan else 'Belum ada yang diubah.')
    return 1 if gagal else 0


if __name__ == '__main__':
    raise SystemExit(main())
