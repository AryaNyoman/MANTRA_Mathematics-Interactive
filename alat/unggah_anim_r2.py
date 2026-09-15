# -*- coding: utf-8 -*-
"""Mengunggah video di web/public/anim (mp4, webm) ke bucket Cloudflare R2.

Sejak 15 Sep 2026 video MANTRA dilayani dari R2, bukan ikut deploy Vercel:
tiap deploy yang membawa folder video (505 MB) menambah Deployment Storage
Vercel sekitar 0,5 GB dan angkanya tidak turun walau deployment dihapus
(17,33 GB pada 15 Sep, batas Hobby 10 GB). Situs menunjuk ke R2 lewat
NEXT_PUBLIC_ASAL_VIDEO di web/.env.production; subtitle dan poster tetap
ikut deploy (kecil).

Alur sesudah merender video:
  1. mp4 baru ada di web/public/anim (gabung_audio.py)
  2. node web/scripts/versi-anim.mjs        (sidik ?v= diperbarui)
  3. python alat/unggah_anim_r2.py          (hanya yang berubah yang diunggah)
  4. deploy Vercel seperti biasa (video tidak ikut, .vercelignore)

Rahasia dibaca dari D:\\MANIM-MATRA\\.env.local (tidak masuk git, JANGAN
dicetak): R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, dan
R2_BUCKET (bawaan mantra-anim). Alamat publik untuk pemeriksaan dibaca dari
web/.env.production (NEXT_PUBLIC_ASAL_VIDEO).

Pemakaian:
  python alat/unggah_anim_r2.py            unggah yang berubah, lalu periksa alamat publiknya
  python alat/unggah_anim_r2.py --coba     hanya tampilkan yang akan diunggah
  python alat/unggah_anim_r2.py --hapus-yatim   hapus objek di bucket yang tidak ada lagi di folder

Berkas di bawah 64 MB diunggah satu bagian, sehingga ETag di bucket = MD5
isinya dan pembandingan "sudah sama atau belum" tidak perlu mengunduh apa pun.
"""
import argparse
import hashlib
import io
import os
import re
import sys
import urllib.request

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOLDER = os.path.join(AKAR, 'web', 'public', 'anim')
ENV_RAHASIA = os.path.join(AKAR, '.env.local')
ENV_PUBLIK = os.path.join(AKAR, 'web', '.env.production')
EKSTENSI = ('.mp4', '.webm')
CACHE_CONTROL = 'public, max-age=31536000, immutable'
JENIS = {'.mp4': 'video/mp4', '.webm': 'video/webm'}
BATAS_SATU_BAGIAN = 64 * 1024 * 1024


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


def md5_berkas(jalur):
    h = hashlib.md5()
    with io.open(jalur, 'rb') as f:
        for potongan in iter(lambda: f.read(1024 * 1024), b''):
            h.update(potongan)
    return h.hexdigest()


def klien_r2(rahasia):
    import boto3
    from botocore.config import Config
    kurang = [k for k in ('R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY') if not rahasia.get(k)]
    if kurang:
        sys.exit('Belum ada di .env.local: ' + ', '.join(kurang))
    # Account ID = 32 heksadesimal. ARYA menempelkan seluruh alamat endpoint
    # (https://<id>.r2.cloudflarestorage.com) pada 15 Sep 2026; keduanya diterima.
    cocok = re.search(r'[0-9a-f]{32}', rahasia['R2_ACCOUNT_ID'].lower())
    if not cocok:
        sys.exit('R2_ACCOUNT_ID di .env.local tidak memuat 32 karakter heksadesimal')
    return boto3.client(
        's3',
        endpoint_url=f"https://{cocok.group(0)}.r2.cloudflarestorage.com",
        aws_access_key_id=rahasia['R2_ACCESS_KEY_ID'],
        aws_secret_access_key=rahasia['R2_SECRET_ACCESS_KEY'],
        region_name='auto',
        config=Config(signature_version='s3v4', retries={'max_attempts': 5, 'mode': 'standard'}),
    )


def daftar_bucket(s3, bucket):
    """{nama: (etag md5, ukuran)} untuk semua objek di bucket."""
    hasil = {}
    token = None
    while True:
        arg = {'Bucket': bucket}
        if token:
            arg['ContinuationToken'] = token
        r = s3.list_objects_v2(**arg)
        for o in r.get('Contents', []):
            hasil[o['Key']] = (o['ETag'].strip('"'), o['Size'])
        if not r.get('IsTruncated'):
            return hasil
        token = r.get('NextContinuationToken')


def periksa_publik(asal, nama, ukuran):
    """HEAD alamat publik: harus 200 dengan Content-Length yang sama."""
    url = f"{asal.rstrip('/')}/{nama}"
    req = urllib.request.Request(url, method='HEAD')
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            panjang = int(r.headers.get('Content-Length') or -1)
            return r.status == 200 and panjang == ukuran, f"{r.status} {panjang}"
    except Exception as e:  # noqa: BLE001
        return False, str(e)[:80]


def utama():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--coba', action='store_true', help='hanya tampilkan rencana, tidak mengunggah')
    ap.add_argument('--hapus-yatim', action='store_true', help='hapus objek yang tidak ada lagi di folder')
    ap.add_argument('--tanpa-periksa', action='store_true', help='lewati HEAD ke alamat publik')
    arg = ap.parse_args()

    rahasia = baca_env(ENV_RAHASIA)
    bucket = rahasia.get('R2_BUCKET') or 'mantra-anim'
    asal = baca_env(ENV_PUBLIK).get('NEXT_PUBLIC_ASAL_VIDEO', '')

    lokal = {}
    for n in sorted(os.listdir(FOLDER)):
        if n.lower().endswith(EKSTENSI) and os.path.isfile(os.path.join(FOLDER, n)):
            j = os.path.join(FOLDER, n)
            lokal[n] = (md5_berkas(j), os.path.getsize(j))
    print(f"lokal: {len(lokal)} video, {sum(u for _, u in lokal.values()) / 1048576:.1f} MB")

    s3 = klien_r2(rahasia)
    from boto3.s3.transfer import TransferConfig
    aturan = TransferConfig(multipart_threshold=BATAS_SATU_BAGIAN)
    jauh = daftar_bucket(s3, bucket)
    print(f"bucket {bucket}: {len(jauh)} objek")

    perlu = [n for n, (md5, _) in lokal.items() if jauh.get(n, ('', 0))[0] != md5]
    yatim = [k for k in jauh if k not in lokal]
    print(f"perlu diunggah: {len(perlu)} ({sum(lokal[n][1] for n in perlu) / 1048576:.1f} MB), "
          f"sudah sama: {len(lokal) - len(perlu)}, yatim di bucket: {len(yatim)}")
    for n in perlu:
        print('  unggah', n, f"{lokal[n][1] / 1048576:.1f} MB")
    for k in yatim:
        print('  yatim ', k)
    if arg.coba:
        return

    gagal = []
    for i, n in enumerate(perlu, 1):
        j = os.path.join(FOLDER, n)
        ext = os.path.splitext(n)[1].lower()
        print(f"[{i}/{len(perlu)}] {n} ...", end=' ', flush=True)
        try:
            s3.upload_file(j, bucket, n, Config=aturan,
                           ExtraArgs={'ContentType': JENIS[ext], 'CacheControl': CACHE_CONTROL})
            kepala = s3.head_object(Bucket=bucket, Key=n)
            etag = kepala['ETag'].strip('"')
            if etag != lokal[n][0]:
                gagal.append((n, f"etag {etag} bukan md5 lokal"))
                print('ETAG BEDA')
            else:
                print('ok')
        except Exception as e:  # noqa: BLE001
            gagal.append((n, str(e)[:120]))
            print('GAGAL', str(e)[:120])

    if arg.hapus_yatim and yatim:
        for k in yatim:
            s3.delete_object(Bucket=bucket, Key=k)
            print('  dihapus', k)

    if not arg.tanpa_periksa:
        if not asal:
            print('NEXT_PUBLIC_ASAL_VIDEO belum diisi di web/.env.production: alamat publik tidak diperiksa')
        else:
            salah = 0
            for n, (_, ukuran) in lokal.items():
                cocok, ket = periksa_publik(asal, n, ukuran)
                if not cocok:
                    salah += 1
                    print('  publik SALAH', n, ket)
            print(f"periksa publik {asal}: {len(lokal) - salah} cocok, {salah} salah")
            if salah:
                gagal.append(('publik', f'{salah} alamat tidak cocok'))

    if gagal:
        print('GAGAL:', len(gagal))
        for n, k in gagal:
            print('  ', n, k)
        sys.exit(1)
    print('selesai: semua video di bucket sama dengan yang di folder')


if __name__ == '__main__':
    utama()
