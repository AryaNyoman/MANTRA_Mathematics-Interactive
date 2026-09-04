"""Uji SATU FRAME: memastikan ketiga muka balok yang terlihat tetap berbeda terang.

Kenapa ada: pada 4 Sep 2026 keenam video Ruang 3D dinilai "kubusnya seperti
balok gelap datar". Sebabnya bukan kurang cahaya. `set_shading` ManimGL lemah
arah, jadi memindahkan sumber cahaya saja tidak menolong: dengan cahaya saja
atap 200, muka kanan 190, muka kiri 124 pada skala terang 0 sampai 255, dan
atap dengan muka kanan cuma beda 10. Yang menyelesaikannya adalah terang tiap
muka yang ditentukan sendiri di `ilustrasi.balok`.

Uji ini menjaga hasil itu supaya tidak diam-diam rata lagi. Jalankan:

    manimgl manim/uji/uji_balok_tiga_terang.py UjiBalokTigaTerang -w -l
    python manim/uji/uji_balok_tiga_terang.py          (menilai frame terakhir)

Yang kedua mencetak terang ketiga muka dan GAGAL kalau jarak antar tingkatnya
kurang dari 20. Angka pastinya boleh bergeser; yang dijaga adalah ketiganya
tetap terbaca sebagai tiga tingkat.
"""
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[2]
VIDEO = AKAR / "media" / "gl" / "UjiBalokTigaTerang.mp4"
FRAME = AKAR / "qc" / "uji-balok-tiga-terang.png"
# Titik contoh di ketiga muka, pada frame 854 x 480.
TITIK = {"atap": (430, 130), "muka kiri": (340, 240), "muka kanan": (500, 250)}
JARAK_MINIMAL = 20.0

if __name__ != "__main__":
    sys.path.insert(0, str(AKAR / "manim"))
    sys.path.insert(0, str(AKAR / "manim" / "scenes"))
    from gl import *  # noqa: F403
    from gl import ilustrasi, kamera, qc
    from ruang_3d_umum import PUSAT, TINGGI_BINGKAI, bayangan_kubus, kubus_pejal, lantai, pasang_cahaya

    class UjiBalokTigaTerang(AdeganMatra):
        def construct(self):
            kamera.pasang_awal(self.frame, theta=-40, phi=74,
                               pusat=PUSAT, tinggi=TINGGI_BINGKAI)
            pasang_cahaya(self)
            kubus = kubus_pejal()
            self.add(lantai(), bayangan_kubus(), kubus)
            self.wait(0.1)
            qc.periksa_adegan(self, {"kubus": kubus})


def nilai() -> int:
    from PIL import Image
    if not VIDEO.exists():
        print(f"GAGAL: {VIDEO} belum ada. Render dulu adegannya.")
        return 1
    FRAME.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(VIDEO),
                    "-frames:v", "1", str(FRAME)], check=True)
    im = Image.open(FRAME).convert("RGB")
    terang = {}
    for nama, (x, y) in TITIK.items():
        r, g, b = im.getpixel((x, y))
        terang[nama] = 0.299 * r + 0.587 * g + 0.114 * b
        print(f"  {nama:11s} terang {terang[nama]:6.1f}")
    urut = sorted(terang.values(), reverse=True)
    jarak = [urut[i] - urut[i + 1] for i in range(len(urut) - 1)]
    print(f"  jarak antar tingkat: {', '.join(f'{j:.1f}' for j in jarak)}")
    if min(jarak) < JARAK_MINIMAL:
        print(f"GAGAL: ada dua muka yang cuma beda {min(jarak):.1f}, "
              f"batasnya {JARAK_MINIMAL}. Baloknya kembali rata.")
        return 1
    print("LOLOS: ketiga muka masih tiga tingkat yang berbeda.")
    return 0


if __name__ == "__main__":
    raise SystemExit(nilai())
