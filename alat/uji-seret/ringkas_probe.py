# -*- coding: utf-8 -*-
# Ringkasan qc/uji-seret.jsonl (lihat jalankan.sh). Tanda: LICIN? = pegangan
# bergeser > 75 px atau ada elemen > 90 px untuk tarikan 60 px; DIAM = tidak
# menanggapi tarikan sintetis (biasanya tombol, bukan pegangan); diredam = < 45 px.
import json, io, os
AKAR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
baris = io.open(os.path.join(AKAR, 'qc', 'uji-seret.jsonl'), encoding='utf-8').read().splitlines()
JARAK = 60
rek = []
for b in baris:
    if not b.startswith('{'):
        continue
    try:
        d = json.loads(b)
    except Exception:
        continue
    h = d.get('hasil')
    if isinstance(h, str):
        try:
            h = json.loads(h)
        except Exception:
            h = {'mentah': h[:80]}
    d['hasil'] = h
    rek.append(d)

print(f'{len(rek)} rekaman')
print(f"{'topik':22} {'m':>2} {'i':>1} {'judul':34} {'jenis':10} {'peg k/kr/a/b':>16} {'maks k/kr/a/b':>16} {'kendali':8} nilai")
for d in rek:
    h = d['hasil']
    if not isinstance(h, dict) or 'hasil' not in h:
        if isinstance(h, dict) and (h.get('selesai') or h.get('tanpaWidget')):
            continue
        print(f"{d['topik']:22} {d['materi']:>2} {d['i']:>1} ??? {str(h)[:70]}")
        continue
    r = h['hasil']
    peg = [r[k]['pegangan'] for k in ('kanan', 'kiri', 'atas', 'bawah')]
    mak = [r[k]['maks'] for k in ('kanan', 'kiri', 'atas', 'bawah')]
    ken = ''.join('1' if r[k]['kendali'] else '0' for k in ('kanan', 'kiri', 'atas', 'bawah'))
    nilai = ''
    for k in ('kanan', 'kiri', 'atas', 'bawah'):
        if r[k]['kendali']:
            nilai = f"{k}: {r[k]['k0'][-40:]} -> {r[k]['k1'][-40:]}"
            break
    tanda = ''
    if max(peg) > 75 or max(m for m in mak) > 90:
        tanda = 'LICIN?'
    elif max(peg) == 0 and max(mak) <= 0 and ken == '0000':
        tanda = 'DIAM'
    elif 0 < max(peg) < 45:
        tanda = 'diredam'
    else:
        tanda = '1:1'
    print(f"{d['topik']:22} {d['materi']:>2} {d['i']:>1} {h['judul'][:34]:34} {h['jenis'][:10]:10} {'/'.join(map(str, peg)):>16} {'/'.join(map(str, mak)):>16} {ken:8} {tanda:8} {nilai[:70]}")
