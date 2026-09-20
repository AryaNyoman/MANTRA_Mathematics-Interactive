"""
Memastikan alat/bekal/peta-sumber.json menyebut SEMUA materi (slug di tahap.ts
tiap bab), sumbernya dikenal (sumber.json), halamannya ada di teks hasil
ekstraksi, dan taksiran token tiap kutipan di bawah batas jenisnya
(Kemdikbud 4000, ITB 3000, Purcell 2000; 3,4 huruf per token).

  python alat/bekal/periksa_peta.py
"""
import json
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
AKAR = Path(__file__).resolve().parent
REPO = AKAR.parent.parent
PETA = json.loads((AKAR / 'peta-sumber.json').read_text(encoding='utf-8'))
SUMBER = json.loads((AKAR / 'sumber.json').read_text(encoding='utf-8'))
BAB = ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']
BATAS = {'kemdikbud': 4000, 'itb': 3000, 'purcell': 2000}
teks_cache = {}


def teks_sumber(nama):
    if nama not in teks_cache:
        jalur = AKAR / 'teks' / f'{nama}.jsonl'
        teks_cache[nama] = {json.loads(b)['hal']: json.loads(b)['teks'] for b in jalur.read_text(encoding='utf-8').splitlines() if b.strip()}
    return teks_cache[nama]


def slug_bab(bab):
    skrip = (
        f"import('./web/content/{bab}/tahap.ts').then(m => "
        "console.log(JSON.stringify((m.TAHAP || Object.values(m).filter(Array.isArray).flat()).map(t => t.slug))))"
    )
    if bab == 'statistika':
        skrip = (
            "Promise.all(['tahap-penyajian','tahap-pemusatan','tahap-hubungan','tahap-nyata'].map(b => import('./web/content/statistika/' + b + '.ts')))"
            ".then(ms => console.log(JSON.stringify(ms.flatMap(m => Object.values(m).filter(Array.isArray).flat()).map(t => t.slug))))"
        )
    keluar = subprocess.run(['node', '-e', skrip], capture_output=True, text=True, encoding='utf-8', cwd=REPO).stdout.strip()
    return json.loads(keluar.splitlines()[-1])


galat = 0
jumlah_materi = 0
for bab in BAB:
    for s in slug_bab(bab):
        jumlah_materi += 1
        if s not in PETA.get(bab, {}):
            print(f'GALAT {bab}/{s}: tidak ada di peta')
            galat += 1
            continue
        for k in PETA[bab][s]:
            if k['sumber'] not in SUMBER:
                print(f'GALAT {bab}/{s}: sumber {k["sumber"]} tidak dikenal')
                galat += 1
                continue
            halaman = teks_sumber(k['sumber'])
            if k['dari'] > k['sampai'] or k['dari'] not in halaman:
                print(f'GALAT {bab}/{s}: halaman {k["dari"]}-{k["sampai"]} {k["sumber"]} tidak ada')
                galat += 1
                continue
            huruf = sum(len(halaman.get(h, '')) for h in range(k['dari'], k['sampai'] + 1))
            token = -(-huruf // 3.4)
            batas = BATAS[SUMBER[k['sumber']]['jenis']]
            if token > batas:
                print(f'GALAT {bab}/{s}: {k["sumber"]} {k["dari"]}-{k["sampai"]} kira-kira {int(token)} token, batas {batas}')
                galat += 1
peta_slug = {f'{b}/{s}' for b in PETA for s in PETA[b]}
print(f'{jumlah_materi} materi diperiksa, {len(peta_slug)} entri peta')
print('semua materi terpetakan' if galat == 0 else f'{galat} galat')
sys.exit(1 if galat else 0)
