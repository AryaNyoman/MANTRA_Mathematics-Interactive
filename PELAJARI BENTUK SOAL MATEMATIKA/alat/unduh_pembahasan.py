"""Mengunduh halaman pembahasan mathcyber1997 yang ditautkan tiap PDF soal,
lalu menyimpan isi artikelnya (teks plus rumus LaTeX mentah, penanda gambar)
sebagai berkas .md di folder pembahasan-web/.

Jalankan dari folder PELAJARI BENTUK SOAL MATEMATIKA:
    python alat/unduh_pembahasan.py            # semua PDF
    python alat/unduh_pembahasan.py --ulang    # timpa yang sudah ada
"""
import os, re, sys, time, json
import fitz
import requests
from bs4 import BeautifulSoup, NavigableString, Tag

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KELUAR = os.path.join(AKAR, 'pembahasan-web')
os.makedirs(KELUAR, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
      "Accept-Language": "id,en;q=0.8"}
ULANG = '--ulang' in sys.argv


def tautan_pdf(path):
    doc = fitz.open(path)
    urls, teks = set(), ''
    for pg in doc:
        for l in pg.get_links():
            u = l.get('uri')
            if u: urls.add(u)
        teks += pg.get_text()
    for m in re.finditer(r'(https?://\S*mathcyber1997\.com\S*)', teks):
        urls.add(m.group(1).rstrip('.,);'))
    # hanya halaman artikel: punya path lebih dari sekadar domain
    return sorted(u for u in urls if 'mathcyber1997.com/' in u and len(u.split('mathcyber1997.com/')[1].strip('/')) > 3)


def ke_teks(node, keluar):
    """Jalan rekursif: paragraf jadi baris, gambar jadi penanda, LaTeX dibiarkan."""
    if isinstance(node, NavigableString):
        keluar.append(str(node))
        return
    if not isinstance(node, Tag):
        return
    nama = node.name
    if nama in ('script', 'style', 'noscript'):
        return
    if nama == 'img':
        src = node.get('data-src') or node.get('src') or ''
        alt = (node.get('alt') or '').strip()
        keluar.append(f"\n[GAMBAR: {src}{(' | ' + alt) if alt else ''}]\n")
        return
    if nama == 'br':
        keluar.append('\n'); return
    blok = nama in ('p', 'div', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'table', 'tr', 'blockquote', 'section', 'article', 'ul', 'ol', 'pre', 'figure', 'figcaption', 'details', 'summary')
    if nama in ('h1', 'h2', 'h3', 'h4', 'h5'):
        keluar.append('\n\n' + '#' * int(nama[1]) + ' ')
    elif nama == 'li':
        keluar.append('\n- ')
    elif nama in ('td', 'th'):
        keluar.append(' | ')
    elif blok:
        keluar.append('\n')
    for anak in node.children:
        ke_teks(anak, keluar)
    if blok:
        keluar.append('\n')


def artikel(html):
    soup = BeautifulSoup(html, 'lxml')  # lxml lebih tahan HTML yang tidak rapi; html.parser memotong halaman fungsi kuadrat di soal 1
    judul = soup.find('h1')
    judul = judul.get_text(' ', strip=True) if judul else ''
    isi = soup.select_one('div.entry-content') or soup.select_one('article') or soup.body
    keluar = []
    ke_teks(isi, keluar)
    t = ''.join(keluar)
    t = re.sub(r'[ \t]+', ' ', t)
    t = re.sub(r'\n{3,}', '\n\n', t)
    return judul, t.strip()


def main():
    peta = {}
    for sub in ('MATERI MATEMATIKA FULL', 'UTBK DAN UNBK'):
        for f in sorted(os.listdir(os.path.join(AKAR, sub))):
            if not f.lower().endswith('.pdf'): continue
            urls = tautan_pdf(os.path.join(AKAR, sub, f))
            peta[f] = urls
    semua = sorted({u for us in peta.values() for u in us})
    print(len(semua), 'tautan unik')
    log = []
    for u in semua:
        slug = u.rstrip('/').split('/')[-1][:90]
        tujuan = os.path.join(KELUAR, slug + '.md')
        if os.path.exists(tujuan) and not ULANG:
            log.append((u, 'ada')); continue
        try:
            r = requests.get(u, headers=UA, timeout=90)
            if r.status_code != 200:
                log.append((u, f'HTTP {r.status_code}')); continue
            os.makedirs(os.path.join(KELUAR, 'html'), exist_ok=True)
            with open(os.path.join(KELUAR, 'html', slug + '.html'), 'w', encoding='utf-8') as f:
                f.write(r.text)
            judul, teks = artikel(r.text)
            with open(tujuan, 'w', encoding='utf-8') as f:
                f.write(f"# {judul}\nSumber: {u}\n\n{teks}\n")
            log.append((u, f'ok {len(teks)} huruf'))
            print('ok', slug, len(teks))
        except Exception as e:
            log.append((u, 'GAGAL ' + str(e)[:120]))
            print('GAGAL', slug, e)
        time.sleep(1.5)
    with open(os.path.join(KELUAR, '_peta.json'), 'w', encoding='utf-8') as f:
        json.dump({'pdf_ke_url': peta, 'log': log}, f, ensure_ascii=False, indent=1)
    print('selesai:', sum(1 for _, s in log if s.startswith('ok') or s == 'ada'), 'dari', len(log))


if __name__ == '__main__':
    main()
