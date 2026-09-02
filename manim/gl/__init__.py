"""Perkakas bersama ManimGL untuk semua video MATRA (sejak 2 Sep 2026).

Pakai dari adegan:
    import sys; from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))   # folder manim/
    from gl import *
    from gl import sinema, kamera, ilustrasi, qc
"""
from .tema import (AdeganMatra, Tema, teks, rumus, FONT, LATAR, TINTA, REDUP,  # noqa: F401
                   AKSEN, AKSEN2, SOROT, UKURAN_JUDUL, UKURAN_RUMUS, UKURAN_LABEL,
                   UKURAN_KETERANGAN)
from . import sinema, kamera, ilustrasi, qc  # noqa: F401
