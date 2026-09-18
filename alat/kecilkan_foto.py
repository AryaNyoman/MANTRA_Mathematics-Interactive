"""
Mengecilkan foto galeri: lebar paling besar 1000 px, JPEG di bawah 150 KB
(mutu diturunkan bertahap sampai muat). Dipakai sesudah
`node alat/cari_foto_commons.mjs ambil ...`.

    python alat/kecilkan_foto.py web/public/gambar/limit/*.jpg
    python alat/kecilkan_foto.py --batas 120 web/public/gambar/turunan/kaleng.jpg
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

argv = sys.argv[1:]
batas_kb = 150
if '--batas' in argv:
    i = argv.index('--batas')
    batas_kb = int(argv[i + 1])
    del argv[i:i + 2]

for nama in argv:
    p = Path(nama)
    im = Image.open(p)
    im = ImageOps.exif_transpose(im).convert('RGB')
    if im.width > 1000:
        im = im.resize((1000, round(im.height * 1000 / im.width)), Image.LANCZOS)
    awal = p.stat().st_size
    for mutu in (85, 80, 76, 72, 68, 64, 60, 55, 50):
        im.save(p, 'JPEG', quality=mutu, optimize=True, progressive=True)
        if p.stat().st_size <= batas_kb * 1024:
            break
    print(f'{p.name}: {im.width}x{im.height}  {awal // 1024} KB -> {p.stat().st_size // 1024} KB (mutu {mutu})')
