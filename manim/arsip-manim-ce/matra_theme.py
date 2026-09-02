"""Tema visual bersama untuk semua animasi MATRA.

Semua adegan WAJIB memakai warna dari sini supaya video menyatu dengan situs.
Kunci masalah "video jadi kotak hitam menempel": latar animasi diselaraskan
dengan latar halaman, atau dirender transparan (`-t`) dengan warna tinta
yang sesuai tema.
"""

from manim import *

# --- Palet: tema TERANG (kertas) ---
TERANG_LATAR = "#F7F3EE"   # krem kertas
TERANG_TINTA = "#1F2430"   # tinta gelap untuk teks & garis
TERANG_REDUP = "#8B8378"   # abu hangat, untuk garis bantu
TERANG_AKSEN = "#C25E4D"   # merah bata, sisi/nilai yang disorot
TERANG_AKSEN2 = "#3A6EA5"  # biru tinta, sudut & besaran kedua
TERANG_SOROT = "#6A4C93"   # ungu tua, sudut, sorot, kesimpulan
# Kuning #D9A441 dipakai sampai 31 Agu 2026 dan DIBUANG: di atas krem
# kontrasnya hanya 2,04:1, jauh di bawah batas layak 4,5:1. Pada video ia
# nyaris tidak terbaca, temuan ARYA setelah menonton tahap 4-9.
# Pengganti ini 6,20:1, dan hue-nya jelas terpisah dari biru (sisi samping)
# maupun merah (sisi depan), juga dari aksen situs hijau/oker/bata.

# --- Palet: tema GELAP (3Blue1Brown) ---
GELAP_LATAR = "#0E1016"
GELAP_TINTA = "#ECEAE4"
GELAP_REDUP = "#5C6270"
GELAP_AKSEN = "#FF6B5B"
GELAP_AKSEN2 = "#58C4DD"   # biru khas 3b1b
GELAP_SOROT = "#B9A0E8"   # ungu muda, pasangan gelap dari TERANG_SOROT

UKURAN_JUDUL = 44
UKURAN_RUMUS = 40
UKURAN_LABEL = 28


class Tema:
    """Satu wadah warna supaya adegan tidak perlu tahu tema mana yang dipakai."""

    def __init__(self, nama: str):
        self.nama = nama
        gelap = nama == "gelap"
        self.latar = GELAP_LATAR if gelap else TERANG_LATAR
        self.tinta = GELAP_TINTA if gelap else TERANG_TINTA
        self.redup = GELAP_REDUP if gelap else TERANG_REDUP
        self.aksen = GELAP_AKSEN if gelap else TERANG_AKSEN
        self.aksen2 = GELAP_AKSEN2 if gelap else TERANG_AKSEN2
        self.sorot = GELAP_SOROT if gelap else TERANG_SOROT

    def pasang(self, scene: Scene, transparan: bool = False) -> None:
        """Pasang warna latar. `transparan=True` untuk render dengan flag -t."""
        if not transparan:
            scene.camera.background_color = self.latar
