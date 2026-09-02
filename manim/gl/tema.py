"""Tema visual MATRA untuk ManimGL: palet Studio Teknis, font, kelas adegan dasar.

Semua adegan mewarisi `AdeganMatra`. Ia memasang latar krem, memuat tambalan
MiKTeX, dan menyediakan `self.t` (palet) serta `self.hud` (objek yang menempel
di layar walau kamera terbang).
"""

import sys
from pathlib import Path

from manimlib import *

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tambal_manimgl  # noqa: E402,F401  (MiKTeX menolak `latex -no-pdf`)

# Keputusan ARYA 2 Sep 2026 (siang): SEMUA huruf memakai LaTeX. Kata-kata lewat
# `teks()` (TexText, mode teks), angka dan rumus lewat `rumus()` (Tex, mode
# matematika). Constantia dicoba lalu dibatalkan ARYA pada hari yang sama.
FONT = "LaTeX (Computer Modern)"

# Karakter yang punya arti khusus di LaTeX. Diloloskan otomatis oleh `teks()`
# supaya kalimat biasa seperti "naik 25%" tidak menggagalkan kompilasi.
_KHUSUS = {"%": r"\%", "&": r"\&", "#": r"\#", "_": r"\_", "$": r"\$"}

# Palet Studio Teknis, sama dengan situs. Jangan menambah warna di luar ini.
LATAR = "#F7F3EE"   # krem kertas
TINTA = "#1F2430"   # teks dan garis utama
REDUP = "#8B8378"   # abu hangat: garis bantu, tanah, kayu
AKSEN = "#C25E4D"   # merah bata: besaran pertama yang disorot
AKSEN2 = "#3A6EA5"  # biru tinta: besaran kedua, air
SOROT = "#6A4C93"   # ungu tua: sudut, sorot, kesimpulan

UKURAN_JUDUL = 44
UKURAN_RUMUS = 40
UKURAN_KETERANGAN = 30
UKURAN_LABEL = 28


class Tema:
    """Wadah warna supaya adegan menulis `self.t.aksen`, bukan kode heksa."""
    latar, tinta, redup, aksen, aksen2, sorot = LATAR, TINTA, REDUP, AKSEN, AKSEN2, SOROT


def teks(s: str, ukuran: float = UKURAN_LABEL, warna: str = TINTA, mentah: bool = False) -> TexText:
    """Kata-kata dalam LaTeX (mode teks). Karakter khusus LaTeX diloloskan otomatis.

    `mentah=True` kalau kamu sengaja menulis perintah LaTeX di dalamnya
    (mis. `teks(r"jarak \\emph{selalu} positif", mentah=True)`).
    Warna lewat `.set_color()`: `color=` pada pembuat teks ManimGL tidak dapat diandalkan.
    """
    if not mentah:
        s = "".join(_KHUSUS.get(c, c) for c in s)
    return TexText(s, font_size=ukuran).set_color(warna)


def rumus(s: str, ukuran: float = UKURAN_RUMUS, warna: str = TINTA) -> Tex:
    """Angka berdiri sendiri dan rumus: LaTeX lewat MiKTeX. Tulis dengan awalan r."""
    return Tex(s, font_size=ukuran).set_color(warna)


class AdeganMatra(Scene):
    """Kelas dasar semua adegan MATRA."""

    default_camera_config = dict(background_color=LATAR)

    def setup(self):
        self.t = Tema()
        self.hud = Group()

    def hud_tambah(self, *mobs):
        """Tempelkan objek ke layar (tidak ikut kamera) dan tampilkan."""
        for m in mobs:
            m.fix_in_frame()
            self.hud.add(m)
        self.add(*mobs)
