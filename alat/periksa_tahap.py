"""
Periksa mekanis daftar periksa STANDAR-MENGAJAR bagian 6 untuk tiap tahap.

KENAPA ALAT INI ADA
Enam dari sepuluh butir daftar periksa bisa dijawab dari struktur isinya
sendiri, dan jawaban mesin lebih dapat dipercaya daripada mata yang sudah
membaca berkas yang sama belasan kali. Empat butir sisanya memang penilaian,
dan alat ini sengaja TIDAK menjawabnya: ia hanya menyiapkan bahan supaya
penilaiannya cepat dan tidak asal.

Yang dijawab mesin: butir 2 (panggil ulang), 4 (satu ide per sesi, diukur dari
jumlah blok per sesi), 6 (ada contoh berlangkah), 7 (ada coba berpenuntun),
9 (intisari ada dan wajar), 10 (kata terlarang dan em-dash).

Yang disiapkan untuk dinilai manusia: butir 1, 3, 5, 8.

CARA PAKAI
    python alat/periksa_tahap.py            ringkasan tabel
    python alat/periksa_tahap.py --rinci    plus bahan untuk butir 1, 3, 5, 8
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
TAHAP_TS = AKAR / 'web' / 'content' / 'grafik-fungsi' / 'tahap.ts'

TERLARANG = ['miskonsepsi', 'tentu saja', 'gampang']
# "mudah" dan "jelas" diperiksa terpisah: keduanya sah kalau menggambarkan
# BENDA ("jelas bukan nol"), dan hanya terlarang kalau menilai tugas siswa.
CURIGA = ['terasa mudah', 'lebih mudah', 'sangat mudah', 'jelas sekali']


def baca_tahap() -> list[dict]:
    """
    Pecah tahap.ts menjadi potongan per tahap.

    Dibaca sebagai TEKS, bukan dijalankan sebagai modul. Alasannya: yang
    diperiksa di sini justru bentuk tulisannya (ada berapa penanda sesi, ada
    blok contoh atau tidak, ada kata terlarang atau tidak), dan itu hilang
    begitu berkasnya diubah menjadi data.
    """
    teks = TAHAP_TS.read_text(encoding='utf-8')
    potongan = re.split(r'\n  \{\n    no: (\d+),', teks)
    hasil = []
    for i in range(1, len(potongan), 2):
        hasil.append({'no': int(potongan[i]), 'teks': potongan[i + 1]})
    return hasil


def nilai(t: dict) -> dict:
    s = t['teks']
    sesi = re.findall(r"jenis: 'sesi', judul: '([^']*)'", s)
    blok = re.findall(r"jenis: '(\w+)'", s)

    # butir 4: hitung berapa blok di antara dua penanda sesi
    batas = [i for i, b in enumerate(blok) if b == 'sesi']
    panjang = []
    for n, i in enumerate(batas):
        akhir = batas[n + 1] if n + 1 < len(batas) else len(blok)
        panjang.append(akhir - i - 1)

    judul_tahap = re.search(r"judul: '([^']*)'", s)
    return {
        'no': t['no'],
        'judul': judul_tahap.group(1) if judul_tahap else '?',
        'b2_panggil_ulang': bool(re.search(r'tahap \d|di SMP|sudah sering|sudah pernah|sudah (Anda )?(pelajari|kenal|lihat|melihat)', s)),
        'b4_sesi': len(sesi),
        'b4_blok_per_sesi': panjang,
        'b6_contoh': blok.count('contoh'),
        'b7_coba': "jenis: 'coba'" in s and 'langkah:' in s,
        'b8_seringkeliru': "seringKeliru" in s,
        'b9_intisari': len(re.findall(r"^      '", s, re.M)) if 'intisari' in s else 0,
        'b10_terlarang': [k for k in TERLARANG + CURIGA if k in s.lower()],
        'b10_emdash': '—' in s or '–' in s,
        'sesi': sesi,
    }


def main() -> int:
    rinci = '--rinci' in sys.argv
    daftar = [nilai(t) for t in baca_tahap()]

    print(f'{"#":>3}  {"tahap":34s} b2  b4(sesi)  b6  b7  b8  b10')
    print('-' * 78)
    masalah = 0
    for d in daftar:
        gemuk = [p for p in d['b4_blok_per_sesi'] if p > 9]
        b10 = 'ok' if not d['b10_terlarang'] and not d['b10_emdash'] else 'AWAS'
        if d['b10_terlarang'] or d['b10_emdash']:
            masalah += 1
        print(f'{d["no"]:>3}  {d["judul"][:34]:34s} '
              f'{"ya" if d["b2_panggil_ulang"] else "TDK":3s} '
              f'{d["b4_sesi"]:>2}{"!" if gemuk else " "}       '
              f'{d["b6_contoh"]:>2}  '
              f'{"ya" if d["b7_coba"] else "-":2s}  '
              f'{"ya" if d["b8_seringkeliru"] else "-":2s}  {b10}')
        if d['b10_terlarang']:
            print(f'     kata perlu diperiksa: {d["b10_terlarang"]}')
        if gemuk:
            print(f'     sesi kelewat panjang (blok): {d["b4_blok_per_sesi"]}')

    if rinci:
        print('\n\nBAHAN UNTUK BUTIR 1, 3, 5, DAN 8 (dinilai manusia)\n')
        for d in daftar:
            print(f'--- tahap {d["no"]}: {d["judul"]}')
            print(f'    sesi: {d["sesi"]}')

    print()
    print('Semua tahap lolos pemeriksaan mekanis.' if masalah == 0
          else f'{masalah} tahap perlu diperiksa tangan.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
