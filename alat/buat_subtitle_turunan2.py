"""Subtitle Turunan 2 mengikuti WordBoundary rekaman, bukan panjang kalimat."""
import json
import re
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
TOPIK = 'turunan2-garis-singgung'


def normal(s):
    return re.sub(r'[^\w]', '', s.lower())


def stamp(t):
    ms = round(t * 1000)
    return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}'


def main():
    naskah = json.loads((AKAR/'manim/narasi'/f'{TOPIK}.json').read_text(encoding='utf-8'))
    waktu = json.loads((AKAR/'audio'/TOPIK/'kata.json').read_text(encoding='utf-8'))
    angka = {
        'negatif nol koma nol satu': '−0,01', 'negatif nol koma satu': '−0,1',
        'dua koma nol satu': '2,01', 'nol koma nol satu': '0,01',
        'satu koma sembilan sembilan': '1,99', 'satu koma dua lima': '1,25',
        'dua koma lima': '2,5', 'dua koma satu': '2,1', 'nol koma lima': '0,5',
        'nol koma satu': '0,1', 'satu koma sembilan': '1,9',
        'ef aksen satu': 'f′(1)', 'x kuadrat': 'x²', 'h kuadrat': 'h²',
    }
    pengganti = sorted(angka.items(), key=lambda x: -len(x[0].split()))
    cues = []
    for seg in naskah['segmen']:
        jam = waktu[seg['id']]
        kata, cursor = [], 0
        for w in jam['kata']:
            text = w['kata']
            match = re.search(re.escape(text)+r'([.,!?;:]?)',seg['teks'][cursor:],re.I)
            if match:
                text = match.group(0)
                cursor += match.end()
            kata.append(dict(text=text, awal=jam['mulai']+w['mulai'],
                             akhir=jam['mulai']+w['mulai']+w['durasi']))
        tokens, i = [], 0
        while i < len(kata):
            count, text = 1, kata[i]['text']
            for frase, nilai in pengganti:
                parts = frase.split()
                if [normal(x['text']) for x in kata[i:i+len(parts)]] == parts:
                    count = len(parts)
                    akhir = kata[i+count-1]['text']
                    text = nilai + (akhir[-1] if akhir[-1] in '.,!?;:' else '')
                    break
            tokens.append(dict(text=text,awal=kata[i]['awal'],akhir=kata[i+count-1]['akhir']))
            i += count
        grup = []
        for token in tokens:
            chars = len(' '.join(x['text'] for x in grup)) + len(token['text']) + 1
            if grup and (chars > 52 or token['akhir']-grup[0]['awal'] > 4.6):
                cues.append(grup)
                grup = []
            grup.append(token)
            if token['text'].endswith(('.', '?', '!')) and token['akhir']-grup[0]['awal'] > 1:
                cues.append(grup)
                grup = []
        if grup:
            cues.append(grup)
    rows = ['WEBVTT', '']
    for i, cue in enumerate(cues):
        end = cue[-1]['akhir'] + 0.15
        if i+1 < len(cues):
            end = min(end, cues[i+1][0]['awal'])
        rows += [str(i+1),f"{stamp(cue[0]['awal'])} --> {stamp(end)}",' '.join(x['text'] for x in cue),'']
    text = '\n'.join(rows)
    for folder in ('web/public/anim', 'media'):
        (AKAR/folder/f'{TOPIK}.vtt').write_text(text,encoding='utf-8')
    print(f'{len(cues)} cue, waktu kata asli, akhir {end:.3f} detik')


if __name__ == '__main__':
    main()
