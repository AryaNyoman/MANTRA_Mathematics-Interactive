"""Percobaan terkendali: apa yang sebenarnya membuat `Indicate` tidak terlihat.

    manimgl alat/uji_indicate.py UjiIndicate -w -l
    python alat/uji_indicate.py --ukur media/gl/UjiIndicate.mp4

KENAPA ADA
Sesi Integral melaporkan ke MASTER bahwa "Indicate ke warna yang sudah dipakai
bendanya tidak mengubah satu piksel pun". Sesi Turunan mengujinya pada
videonya sendiri dan MEMBANTAH pernyataan umum itu: `Indicate` bawaan ManimGL
membesarkan 1,2 kali lalu mengecilkan, jadi terlihat walau warnanya sama.
Keduanya bisa benar sekaligus, sebab KETUJUH pemanggilan yang saya perbaiki
ternyata SEMUANYA juga memakai `scale_factor` dekat satu (1,02 atau 1,03):

    Indicate(satu,        color=AKSEN2, scale_factor=1.03)
    Indicate(bidang.angka, color=SOROT, scale_factor=1.02)
    Indicate(kanan7,      color=AKSEN2, scale_factor=1.02)
    Indicate(segitiga,    color=SOROT,  scale_factor=1.02)   (dua kali)
    Indicate(kiri7,       color=AKSEN2, scale_factor=1.02)
    Indicate(kanan60,     color=AKSEN2, scale_factor=1.02)
    Indicate(kiri4,       color=AKSEN2, scale_factor=1.03)
    Indicate(bayang_kiri, color=AKSEN2, scale_factor=1.03)
    Indicate(kanan4,      color=AKSEN,  scale_factor=1.03)

Dua pemanggilan yang memakai skala BAWAAN dan warna yang sudah sama
(`Indicate(l_dx, color=SOROT)` dan `Indicate(titik, color=AKSEN)`) tidak
pernah saya keluhkan. Itu sudah cocok dengan temuan Turunan.

Jadi warna dan skala bercampur di semua pemanggilan itu, dan videonya sendiri
TIDAK bisa memisahkan keduanya. Berkas ini memisahkannya: satu benda yang sama
disorot lima cara, lalu beda antarframenya diukur dengan METRIK YANG SAMA
seperti `alat/ukur_detik_pertama.py` (piksel yang berubah lebih dari 12
tingkat kelabu, cuplikan 8 per detik, lebar 320).

Bendanya sengaja persegi panjang setengah tembus pandang seperti kotak
jumlahan Riemann, BUKAN tulisan pejal: sesi Turunan mengujinya pada tulisan
TINTA, dan bisa jadi justru bahan bendanya yang membedakan. Karena itu
tulisan ikut diuji sebagai varian kelima.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "manim"))

# Tiap varian berjalan 1,2 detik, dipisah 0,8 detik diam supaya jendela
# pengukurannya jelas. Urutannya dipakai lagi oleh bagian --ukur di bawah.
LAMA = 1.2
JEDA = 0.8
MULAI = 0.6
VARIAN = [
    ("A kotak, warna SAMA, scale 1.02", "kotak"),
    ("B kotak, warna LAWAN, scale 1.02", "kotak"),
    ("C kotak, warna SAMA, scale bawaan", "kotak"),
    ("D kotak, warna LAWAN, scale 1.05", "kotak"),
    ("E tulisan, warna SAMA, scale bawaan", "tulisan"),
]


def jendela(i):
    """Detik mulai dan selesai varian ke-i."""
    awal = MULAI + i * (LAMA + JEDA)
    return awal, awal + LAMA


if "manimlib" in sys.modules or __name__ != "__main__":
    try:
        from gl import *  # noqa: F403
        from gl import sinema  # noqa: F401

        class UjiIndicate(AdeganMatra):  # noqa: F405
            def construct(self):
                kotak = Rectangle(width=4.0, height=2.6)  # noqa: F405
                kotak.set_fill(AKSEN2, 0.30).set_stroke(AKSEN2, 1.6)  # noqa: F405
                kotak.move_to([-2.6, 0.4, 0])
                tulisan = rumus(r"T' = 2x + 1", 40, TINTA)  # noqa: F405
                tulisan.move_to([3.0, 0.4, 0])
                self.add(kotak, tulisan)
                self.wait(MULAI)

                self.play(Indicate(kotak, color=AKSEN2, scale_factor=1.02),  # noqa: F405
                          run_time=LAMA)
                self.wait(JEDA)
                self.play(Indicate(kotak, color=SOROT, scale_factor=1.02),  # noqa: F405
                          run_time=LAMA)
                self.wait(JEDA)
                self.play(Indicate(kotak, color=AKSEN2), run_time=LAMA)  # noqa: F405
                self.wait(JEDA)
                self.play(Indicate(kotak, color=SOROT, scale_factor=1.05),  # noqa: F405
                          run_time=LAMA)
                self.wait(JEDA)
                self.play(Indicate(tulisan, color=TINTA), run_time=LAMA)  # noqa: F405
                self.wait(JEDA)
    except ImportError:
        pass


def ukur(video):
    """Beda antarframe per varian, metrik sama dengan ukur_detik_pertama.py."""
    import subprocess
    import tempfile

    import numpy as np
    from PIL import Image

    FPS = 8
    AMBANG_BAGIAN = 0.005     # 0,5 persen piksel berubah
    AMBANG_PIKSEL = 300       # piksel pada 854x480
    PIKSEL_ACUAN = 854 * 480
    JALUR_SUBTITLE = 0.82

    with tempfile.TemporaryDirectory() as d:
        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-i", str(video),
             "-vf", "fps=%d,scale=320:-1" % FPS, "-f", "image2",
             str(Path(d) / "f%04d.png")], check=True)
        berkas = sorted(Path(d).glob("f*.png"))
        gambar = [np.asarray(Image.open(p).convert("L"), dtype=np.int16) for p in berkas]

    batas = int(gambar[0].shape[0] * JALUR_SUBTITLE)
    luas = gambar[0][:batas].size
    ambang_mutlak = max(1.0, AMBANG_PIKSEL * luas / PIKSEL_ACUAN)
    beda = []
    for i in range(1, len(gambar)):
        d_ = np.abs(gambar[i] - gambar[i - 1])[:batas]
        beda.append(float((d_ > 12).sum()))

    print("metrik SAMA dengan ukur_detik_pertama.py: piksel berubah > 12 tingkat")
    print("kelabu, 8 cuplikan per detik, lebar 320. Dianggap BERGERAK kalau")
    print("melewati %.0f piksel (ambang mutlak) atau %.1f piksel (0,5 persen luas)."
          % (ambang_mutlak, AMBANG_BAGIAN * luas))
    print()
    print("%-38s %8s %8s %9s" % ("varian", "puncak", "rata", "vonis"))
    print("-" * 68)
    for i, (nama, _) in enumerate(VARIAN):
        awal, akhir = jendela(i)
        a, z = int(awal * FPS), int(akhir * FPS)
        potong = beda[max(0, a - 1):z]
        if not potong:
            continue
        puncak, rata = max(potong), sum(potong) / len(potong)
        bergerak = puncak > ambang_mutlak or puncak / luas > AMBANG_BAGIAN
        print("%-38s %8.0f %8.0f %9s"
              % (nama, puncak, rata, "BERGERAK" if bergerak else "diam"))
        print("      deret: " + " ".join("%.0f" % x for x in potong))
    return 0


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "--ukur":
        sys.exit(ukur(sys.argv[2]))
    print(__doc__)
    sys.exit(2)
