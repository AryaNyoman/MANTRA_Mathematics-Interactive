"""Subtitle Turunan 3 mengikuti WordBoundary rekaman, bukan panjang kalimat."""
import json
import re
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
TOPIK = 'turunan3-fungsi-turunan'


def normal(s):
    return re.sub(r'[^\w]', '', s.lower())


def stamp(t):
    ms = round(t * 1000)
    return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}'


def main():
    naskah = json.loads((AKAR/'manim/narasi'/f'{TOPIK}.json').read_text(encoding='utf-8'))
    waktu = json.loads((AKAR/'audio'/TOPIK/'kata.json').read_text(encoding='utf-8'))
    angka = {
        "ef aksen eks": "f′(x)",
        "de ye per de eks": "dy/dx",
        "negatif satu": "−1",
        "negatif dua": "−2",
        "positif satu": "+1",
        "eks": "x",
        "ha": "h",
        "nol": "0",
        "satu": "1",
        "dua": "2",
        "tiga": "3",
        "empat": "4",
        "enam": "6",
        "sembilan": "9",
        "ye": "y",
        "eks sama dengan satu": "x = 1",
        "eks negatif satu": "x = −1",
        "eks nol": "x = 0",
        "eks satu": "x = 1",
        "eks dua": "x = 2",
        "eks tiga": "x = 3",
        "dua eks tambah ha": "2x + h",
        "dua eks ha": "2xh",
        "eks tambah ha": "x + h",
        "eks kuadrat": "x²",
        "ha kuadrat": "h²",
        "eks ha": "xh",
        "ha eks": "hx",
        "dua eks": "2x",
        "dua kali eks": "2x",
        "tiga kuadrat": "3²",
        "dua kali tiga": "2 × 3",
        "nilai mutlak eks": "|x|"
    }
    # Bentuk tulis menyimpan kalimat UTUH. Hanya ejaan bilangan menjadi angka.
    for seg in naskah['segmen']:
        pattern = r'\b(' + '|'.join(re.escape(k) for k in sorted(angka, key=len, reverse=True)) + r')\b'
        lengkap = re.sub(pattern, lambda m: angka[m.group(0).lower()], seg['teks'], flags=re.I)
        if lengkap != seg['tulis']:
            raise ValueError(f"Subtitle tidak setara dengan narasi: {seg['id']}")
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
                # Jangan gabungkan akhir satu kalimat dengan awal berikutnya:
                # "dua eks. Ha kuadrat" bukan satu suku "dua eks ha".
                rentang = kata[i:i+len(parts)]
                if any(x['text'].endswith(tuple('.,!?;:')) for x in rentang[:-1]):
                    continue
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
