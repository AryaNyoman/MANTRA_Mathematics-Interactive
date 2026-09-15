# -*- coding: utf-8 -*-
"""Memindahkan "daftar isi" mp4 (atom moov) ke depan berkas untuk semua video di
web/public/anim, tanpa mengubah gambar dan suara (ffmpeg -c copy -movflags
+faststart).

Kenapa (15 Sep 2026): semua video MANTRA menaruh moov di ujung berkas
(ftyp, free, mdat, moov). Browser harus melompat ke ujung dulu, beberapa
permintaan bolak-balik ke server, sebelum bisa mulai memutar. Dengan moov di
depan, satu permintaan berurutan cukup, dan pemutaran mulai lebih cepat.
gabung_audio.py sudah memakai faststart untuk render berikutnya; alat ini
untuk yang sudah tayang.

Sesudah ini: node web/scripts/versi-anim.mjs, python alat/unggah_anim_r2.py.

Pemakaian: python alat/faststart_anim.py [--coba]
"""
import argparse
import os
import struct
import subprocess
import sys

AKAR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOLDER = os.path.join(AKAR, 'web', 'public', 'anim')


def urutan_atom(jalur, maks=6):
    urut = []
    ukuran = os.path.getsize(jalur)
    with open(jalur, 'rb') as f:
        pos = 0
        while pos < ukuran and len(urut) < maks:
            f.seek(pos)
            kepala = f.read(8)
            if len(kepala) < 8:
                break
            n, jenis = struct.unpack('>I4s', kepala)
            if n == 1:
                n = struct.unpack('>Q', f.read(8))[0]
            if n == 0:
                n = ukuran - pos
            urut.append(jenis.decode('latin1'))
            pos += n
    return urut


def moov_di_depan(jalur):
    u = urutan_atom(jalur)
    return 'moov' in u and 'mdat' in u and u.index('moov') < u.index('mdat')


def durasi(jalur):
    h = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                        '-of', 'csv=p=0', jalur], capture_output=True, text=True, check=True)
    return float(h.stdout.strip())


def utama():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--coba', action='store_true', help='hanya laporkan, jangan ubah')
    arg = ap.parse_args()
    nama = sorted(n for n in os.listdir(FOLDER) if n.lower().endswith('.mp4'))
    perlu = [n for n in nama if not moov_di_depan(os.path.join(FOLDER, n))]
    print(f'{len(nama)} mp4, {len(perlu)} moov-nya di belakang')
    if arg.coba or not perlu:
        return
    gagal = []
    for i, n in enumerate(perlu, 1):
        asal = os.path.join(FOLDER, n)
        sementara = os.path.join(FOLDER, n + '.faststart.tmp.mp4')
        try:
            subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', asal, '-map', '0', '-c', 'copy',
                            '-movflags', '+faststart', sementara], check=True)
            d0, d1 = durasi(asal), durasi(sementara)
            if abs(d0 - d1) > 0.05 or not moov_di_depan(sementara):
                raise RuntimeError(f'durasi {d0:.2f} jadi {d1:.2f}, atom {urutan_atom(sementara)}')
            os.replace(sementara, asal)
            print(f'[{i}/{len(perlu)}] {n}: {d1:.2f} s, atom {urutan_atom(asal)[:4]}')
        except Exception as e:  # noqa: BLE001
            gagal.append((n, str(e)[:120]))
            if os.path.exists(sementara):
                os.remove(sementara)
            print(f'[{i}/{len(perlu)}] {n}: GAGAL {str(e)[:120]}')
    sisa = [n for n in nama if not moov_di_depan(os.path.join(FOLDER, n))]
    print(f'selesai: {len(nama) - len(sisa)} moov di depan, {len(sisa)} belum, {len(gagal)} gagal')
    if gagal or sisa:
        sys.exit(1)


if __name__ == '__main__':
    utama()
