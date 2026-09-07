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

# Konsol Windows bawaan (cp1252) tidak bisa mencetak huruf seperti ˣ atau θ
# yang ada di judul materi, dan alat ini pernah mati di tengah tabel karena
# itu (Turunan Materi 08, 7 Sep 2026) sambil terlihat seolah lolos. Keluaran
# dipaksa UTF-8 supaya yang dinilai isinya, bukan kemampuan konsolnya.
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

AKAR = Path(__file__).resolve().parent.parent

# Topik yang diperiksa. Bawaannya tetap `grafik-fungsi` supaya perintah lama
# `python alat/periksa_tahap.py` berperilaku persis seperti sebelumnya dan
# kebiasaan sesi lain tidak terganggu. Topik lain diperiksa dengan menyebut
# slug-nya, misalnya:
#     python alat/periksa_tahap.py transformasi-geometri
#     python alat/periksa_tahap.py transformasi-geometri --rinci
TOPIK_BAWAAN = 'grafik-fungsi'


def jalur_tahap() -> Path:
    slug = next((a for a in sys.argv[1:] if not a.startswith('--')), TOPIK_BAWAAN)
    return AKAR / 'web' / 'content' / slug / 'tahap.ts'

TERLARANG = ['miskonsepsi', 'tentu saja', 'gampang']
# "mudah" dan "jelas" diperiksa terpisah: keduanya sah kalau menggambarkan
# BENDA ("jelas bukan nol"), dan hanya terlarang kalau menilai tugas siswa.
CURIGA = ['terasa mudah', 'lebih mudah', 'sangat mudah', 'jelas sekali']
# Bentuk lain ("sisanya mudah", "lebarnya sudah jelas", "paling mudah dilihat")
# lolos dari daftar di atas; ketahuan 7 Sep 2026 di Integral, empat kalimat.
# Daftar frasa tidak akan pernah lengkap, jadi SETIAP kalimat yang memuat kata
# "mudah" atau "jelas" dicetak untuk dilihat mata, tanpa menggagalkan: yang
# menggambarkan benda sah, yang menilai tugas siswa harus diganti.
KATA_MATA = re.compile(r'(mudah|jelas)', re.I)


def baca_tahap() -> list[dict]:
    """
    Pecah tahap.ts menjadi potongan per tahap.

    Dibaca sebagai TEKS, bukan dijalankan sebagai modul. Alasannya: yang
    diperiksa di sini justru bentuk tulisannya (ada berapa penanda sesi, ada
    blok contoh atau tidak, ada kata terlarang atau tidak), dan itu hilang
    begitu berkasnya diubah menjadi data.
    """
    teks = jalur_tahap().read_text(encoding="utf-8")
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
        # Butir 2: apakah tahap ini memanggil ulang pengetahuan sebelumnya.
        #
        # Pola "Materi \d" dan "topik X" ditambahkan 3 Sep 2026. Sebabnya
        # bukan pelonggaran: pemeriksa ini semula hanya mengenali kata
        # "tahap 3", padahal antarmuka MANTRA menyebut tiap tahap sebagai
        # "MATERI 03", dan topik yang ditulis belakangan mengikuti sebutan itu.
        # Akibatnya seluruh 13 tahap topik Transformasi Geometri dilaporkan
        # TIDAK memanggil ulang, padahal isinya penuh rujukan ke Materi
        # sebelumnya dan ke topik Vektor serta Trigonometri. Itu kesalahan
        # alatnya, dan kesalahan yang berbahaya: laporan "TDK" yang salah
        # membuat pembacanya berhenti memercayai kolom ini.
        'b2_panggil_ulang': bool(re.search(
            r'tahap \d|Materi \d|di SMP|topik (Vektor|Trigonometri|Grafik Fungsi|Limit|Statistika|Ruang Tiga Dimensi|Transformasi Geometri|Turunan|Integral)'
            r'|sudah sering|sudah pernah|sudah kita|sudah kamu'
            r'|sudah (Anda )?(pelajari|kenal|lihat|melihat)', s)),
        'b4_sesi': len(sesi),
        'b4_blok_per_sesi': panjang,
        'b6_contoh': blok.count('contoh'),
        'b7_coba': "jenis: 'coba'" in s and 'langkah:' in s,
        'b8_seringkeliru': "seringKeliru" in s,
        'b9_intisari': len(re.findall(r"^      '", s, re.M)) if 'intisari' in s else 0,
        'b10_terlarang': [k for k in TERLARANG + CURIGA if k in s.lower()],
        'b10_mata': [k for k in re.findall(r"'((?:[^'\\]|\\.)*)'", s) if KATA_MATA.search(k)],
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
        if d['b10_mata']:
            print(f'     lihat dengan mata, {len(d["b10_mata"])} kalimat memuat "mudah"/"jelas"'
                  + (':' if rinci else ' (--rinci untuk kalimatnya)'))
            if rinci:
                for k in d['b10_mata']:
                    i = KATA_MATA.search(k).start()
                    print(f'       ...{k[max(0, i - 60):i + 50]}...')
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
