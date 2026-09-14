"""Mendaftar pertanyaan tiap bank soal MANTRA (web/content/<bab>/kuis.ts) ke satu
berkas markdown, untuk dibandingkan dengan jenis soal mathcyber1997."""
import re, os

AKAR = r"D:\MANIM-MATRA"
KELUAR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_daftar_soal_mantra.md")
BAB = ['trigonometri', 'vektor', 'grafik-fungsi', 'statistika', 'transformasi-geometri',
       'limit', 'ruang-3d', 'turunan', 'integral']

POLA_A = re.compile(r"id: '([^']+)',\s*tingkat: '([^']+)',\s*pertanyaan:\s*'((?:[^'\\]|\\.)*)'")
POLA_B = re.compile(r"id: '([^']+)',\s*pertanyaan:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?tingkat: '([^']+)'")

out = []
total = 0
for bab in BAB:
    s = open(os.path.join(AKAR, 'web', 'content', bab, 'kuis.ts'), encoding='utf-8').read()
    items = POLA_A.findall(s)
    if not items:
        items = [(a, c, b) for a, b, c in POLA_B.findall(s)]
    out.append(f"\n## {bab} ({len(items)} soal)\n")
    for i, (id_, tk, q) in enumerate(items, 1):
        q = q.replace("\\'", "'")
        out.append(f"{i:2d}. [{tk}] {id_}: {q[:170]}")
        total += 1
open(KELUAR, 'w', encoding='utf-8').write('\n'.join(out))
print(total, 'soal MANTRA terdaftar ->', KELUAR)
