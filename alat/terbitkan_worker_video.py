# -*- coding: utf-8 -*-
"""Menerbitkan Worker Cloudflare `mantra-video` (alat/worker-video/index.js)
yang melayani video dari bucket R2 mantra-anim lewat *.workers.dev.

Kenapa lewat Worker, bukan alamat pub-....r2.dev: r2.dev diblokir Telkomsel
lewat DNS (Internet Baik) pada 15 Sep 2026, workers.dev tidak.

Memakai API Cloudflare langsung (tanpa wrangler, tanpa npm):
  1. verifikasi token
  2. pastikan akun punya subdomain workers.dev (dibuat bila belum ada)
  3. unggah skrip modul dengan binding R2 VIDEO -> mantra-anim
  4. nyalakan alamat workers.dev untuk skrip itu
  5. periksa: HEAD dan GET Range ke satu video

Rahasia dari D:\\MANIM-MATRA\\.env.local (JANGAN dicetak):
  CLOUDFLARE_API_TOKEN   token pengguna dari templat "Edit Cloudflare Workers"
  R2_ACCOUNT_ID          32 heksadesimal (atau alamat endpoint yang memuatnya)
Pilihan: WORKERS_SUBDOMAIN (bawaan mantra-matematika) bila akun belum punya.

Pemakaian:
  python alat/terbitkan_worker_video.py --coba    hanya verifikasi token dan tampilkan subdomain
  python alat/terbitkan_worker_video.py           terbitkan lalu periksa
"""
import argparse
import io
import json
import os
import re
import sys
import urllib.error
import urllib.request
import uuid

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_RAHASIA = os.path.join(AKAR, '.env.local')
SKRIP = os.path.join(AKAR, 'alat', 'worker-video', 'index.js')
NAMA_SKRIP = 'mantra-video'
BUCKET = 'mantra-anim'
API = 'https://api.cloudflare.com/client/v4'
TANGGAL_KOMPAT = '2026-09-01'
VIDEO_UJI = 'vektor1-perahu.mp4'
# User-Agent bawaan urllib ditolak 403 oleh tepi Cloudflare (15 Sep 2026)
UA = {'User-Agent': 'MANTRA-cek/1.0'}


def baca_env(jalur):
    nilai = {}
    if not os.path.exists(jalur):
        return nilai
    with io.open(jalur, encoding='utf-8') as f:
        for baris in f:
            baris = baris.strip()
            if not baris or baris.startswith('#') or '=' not in baris:
                continue
            k, v = baris.split('=', 1)
            nilai[k.strip()] = v.strip().strip('"').strip("'")
    return nilai


def panggil(token, metode, jalur, data=None, kepala=None):
    h = {'Authorization': f'Bearer {token}'}
    if kepala:
        h.update(kepala)
    isi = None
    if data is not None and not isinstance(data, bytes):
        isi = json.dumps(data).encode('utf-8')
        h['Content-Type'] = 'application/json'
    elif isinstance(data, bytes):
        isi = data
    req = urllib.request.Request(API + jalur, data=isi, method=metode, headers=h)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.load(r)
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.load(e)
        except Exception:  # noqa: BLE001
            return e.code, {'errors': [{'message': e.reason}]}


def galat(j):
    return '; '.join(str(x.get('message')) for x in j.get('errors', [])) or str(j)[:200]


def multipart(bagian):
    """bagian = [(nama, namaberkas, jenis, bytes)] -> (content-type, body)."""
    batas = 'batas-' + uuid.uuid4().hex
    b = bytearray()
    for nama, namaberkas, jenis, data in bagian:
        b += f'--{batas}\r\n'.encode()
        disp = f'form-data; name="{nama}"' + (f'; filename="{namaberkas}"' if namaberkas else '')
        b += f'Content-Disposition: {disp}\r\n'.encode()
        b += f'Content-Type: {jenis}\r\n\r\n'.encode()
        b += data + b'\r\n'
    b += f'--{batas}--\r\n'.encode()
    return f'multipart/form-data; boundary={batas}', bytes(b)


def periksa(url_dasar):
    url = f'{url_dasar}/{VIDEO_UJI}'
    req = urllib.request.Request(url, method='HEAD', headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        print(f'  HEAD {VIDEO_UJI}: {r.status}, {r.headers.get("Content-Length")} byte, '
              f'{r.headers.get("Content-Type")}, cache {r.headers.get("Cache-Control")}')
        ukuran = int(r.headers.get('Content-Length') or 0)
    req = urllib.request.Request(url, headers={'Range': 'bytes=0-99', **UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        isi = r.read()
        print(f'  GET Range 0-99: {r.status}, {len(isi)} byte, content-range {r.headers.get("Content-Range")}')
        if r.status != 206 or len(isi) != 100:
            sys.exit('Range tidak bekerja: pemutar video tidak akan bisa menggeser waktu')
    lokal = os.path.join(AKAR, 'web', 'public', 'anim', VIDEO_UJI)
    if os.path.exists(lokal) and os.path.getsize(lokal) != ukuran:
        sys.exit(f'ukuran di Worker {ukuran} beda dengan lokal {os.path.getsize(lokal)}')
    req = urllib.request.Request(f'{url_dasar}/tidak-ada.mp4', method='HEAD', headers=UA)
    try:
        urllib.request.urlopen(req, timeout=60)
        sys.exit('berkas yang tidak ada malah dijawab 200')
    except urllib.error.HTTPError as e:
        print(f'  HEAD berkas tak ada: {e.code} (benar)')


def utama():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--coba', action='store_true', help='hanya verifikasi token, tidak menerbitkan')
    arg = ap.parse_args()
    rahasia = baca_env(ENV_RAHASIA)
    token = rahasia.get('CLOUDFLARE_API_TOKEN')
    if not token:
        sys.exit('CLOUDFLARE_API_TOKEN belum ada di .env.local')
    cocok = re.search(r'[0-9a-f]{32}', rahasia.get('R2_ACCOUNT_ID', '').lower())
    if not cocok:
        sys.exit('R2_ACCOUNT_ID (32 heksadesimal) belum ada di .env.local')
    akun = cocok.group(0)

    st, j = panggil(token, 'GET', '/user/tokens/verify')
    if st != 200 or not j.get('success'):
        sys.exit('token ditolak: ' + galat(j))
    print('token:', j['result'].get('status'))

    st, j = panggil(token, 'GET', f'/accounts/{akun}/workers/subdomain')
    sub = (j.get('result') or {}).get('subdomain') if st == 200 else None
    print('subdomain workers.dev akun:', sub or 'belum ada')
    if arg.coba:
        return
    if not sub:
        sub = rahasia.get('WORKERS_SUBDOMAIN') or 'mantra-matematika'
        st, j = panggil(token, 'PUT', f'/accounts/{akun}/workers/subdomain', {'subdomain': sub})
        if st != 200 or not j.get('success'):
            sys.exit(f'gagal membuat subdomain {sub}: ' + galat(j))
        print('subdomain dibuat:', sub)

    with io.open(SKRIP, 'rb') as f:
        kode = f.read()
    metadata = {
        'main_module': 'index.js',
        'compatibility_date': TANGGAL_KOMPAT,
        'bindings': [{'type': 'r2_bucket', 'name': 'VIDEO', 'bucket_name': BUCKET}],
    }
    jenis, isi = multipart([
        ('metadata', None, 'application/json', json.dumps(metadata).encode('utf-8')),
        ('index.js', 'index.js', 'application/javascript+module', kode),
    ])
    st, j = panggil(token, 'PUT', f'/accounts/{akun}/workers/scripts/{NAMA_SKRIP}', isi,
                    {'Content-Type': jenis})
    if st != 200 or not j.get('success'):
        sys.exit('gagal mengunggah skrip: ' + galat(j))
    print('skrip diunggah:', NAMA_SKRIP, f'({len(kode)} byte)')

    st, j = panggil(token, 'POST', f'/accounts/{akun}/workers/scripts/{NAMA_SKRIP}/subdomain',
                    {'enabled': True, 'previews_enabled': False})
    if st != 200 or not j.get('success'):
        sys.exit('gagal menyalakan alamat workers.dev: ' + galat(j))
    url = f'https://{NAMA_SKRIP}.{sub}.workers.dev'
    print('alamat:', url)
    print('periksa:')
    periksa(url)
    print('selesai. Isi NEXT_PUBLIC_ASAL_VIDEO di web/.env.production dengan', url)


if __name__ == '__main__':
    utama()
