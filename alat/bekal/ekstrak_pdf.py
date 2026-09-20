"""
Mengekstrak teks PDF sumber bekal Asisten Tanya ke alat/bekal/teks/<sumber>.jsonl
(satu baris JSON per halaman: {"hal": 1, "teks": "..."}). Berkas keluarannya
berhak cipta: di-gitignore, dipakai hanya oleh alat/bekal_asisten.mjs.

  python alat/bekal/ekstrak_pdf.py                 semua sumber di sumber.json
  python alat/bekal/ekstrak_pdf.py kemdikbud-10    satu sumber
  python alat/bekal/ekstrak_pdf.py --cari lanjut-12 "Turunan Fungsi"
                                                   halaman yang memuat frasa itu
"""
import io
import json
import re
import sys
from pathlib import Path

import fitz

sys.stdout.reconfigure(encoding='utf-8')
AKAR = Path(__file__).resolve().parent
SUMBER = json.loads((AKAR / 'sumber.json').read_text(encoding='utf-8'))
KELUAR = AKAR / 'teks'


def bersihkan(teks: str) -> str:
    baris = []
    for b in teks.splitlines():
        s = b.strip()
        if not s:
            continue
        if re.fullmatch(r'[0-9]{1,3}', s):  # nomor halaman
            continue
        if len(s) < 60 and re.fullmatch(r'(Bab|BAB|Chapter)\s+[0-9IVX]+\s*[|·-]?.*', s):
            continue  # header berjalan
        baris.append(s)
    teks = ' '.join(baris)
    teks = re.sub(r'\s+', ' ', teks)
    teks = re.sub(r'(\w)- (\w)', r'\1\2', teks)  # pemenggalan kata di ujung baris
    return teks.strip()


def ekstrak(nama: str) -> int:
    info = SUMBER[nama]
    d = fitz.open(info['berkas'])
    KELUAR.mkdir(exist_ok=True)
    n = 0
    with io.open(KELUAR / f'{nama}.jsonl', 'w', encoding='utf-8', newline='\n') as f:
        for i in range(d.page_count):
            t = bersihkan(d[i].get_text())
            if len(t) < 40:
                continue
            f.write(json.dumps({'hal': i + 1, 'teks': t}, ensure_ascii=False) + '\n')
            n += 1
    return n


def cari(nama: str, frasa: str) -> None:
    jalur = KELUAR / f'{nama}.jsonl'
    pola = re.compile(re.escape(frasa), re.I)
    for baris in jalur.read_text(encoding='utf-8').splitlines():
        h = json.loads(baris)
        m = pola.search(h['teks'])
        if m:
            a = max(0, m.start() - 60)
            print(f"hal {h['hal']:4d}: ...{h['teks'][a:m.end() + 80]}...")


if __name__ == '__main__':
    arg = sys.argv[1:]
    if arg and arg[0] == '--cari':
        cari(arg[1], arg[2])
    else:
        for nama in (arg or list(SUMBER)):
            print(f'{nama}: {ekstrak(nama)} halaman berisi teks')
