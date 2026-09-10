"""Peluncur ManimGL yang menambal `--fps`, supaya render 1080p60 bisa jalan.

    python alat/render_gl.py manim/scenes/vektor1_perahu.py PerahuVektor -w --hd --fps 60

KENAPA ALAT INI ADA
Pada 7 September 2026 render 1080p60 pertama topik Vektor MATI di detik-detik
awal dengan:

    TypeError: unsupported operand type(s) for /: 'int' and 'str'
    times = np.arange(0, run_time, 1 / self.camera.fps) + 1 / self.camera.fps

Sebabnya bukan adegannya. Parser ManimGL 1.7.2 mendaftarkan `--fps` TANPA
`type=int`, jadi argparse menyimpannya sebagai TEKS dan menyalinnya apa adanya
ke `manim_config.camera.fps`. Semua pembagian `1 / fps` sesudah itu meledak.
Bantuan ManimGL sendiri menjanjikan "Frame rate, as an integer", jadi ini cacat
ManimGL, bukan salah pakai.

Akibatnya SIAPA PUN yang mengikuti resep `manimgl ... --fps 60` akan gagal, dan
pada 7 September empat sesi diminta merender 1080p60 dengan resep itu. Karena
itu tambalannya ditaruh di alat bersama, bukan disembunyikan di satu sesi.

TAMBALAN PERTAMA SAYA GAGAL, DAN SEBABNYA LAYAK DICATAT
Mula-mula saya membungkus `config.update_camera_config`. Tidak ada gunanya:
ManimGL MEMBACA sys.argv dan membangun seluruh `manim_config` SAAT DIIMPOR,
jadi saat pembungkusnya terpasang, fps yang salah sudah lama tersimpan. Yang
benar adalah membetulkan nilai yang SUDAH jadi, sesudah impor. Dibuktikan
dengan mencetak `manim_config.camera.fps` tepat setelah impor: isinya '60'.

KENAPA BUKAN MENGUBAH `custom_config.yml`
Berkas itu menyetel `fps: 30` untuk SEMUA render, termasuk pratinjau 480p yang
memang sengaja murah. Menaikkannya ke 60 di situ membuat tiap pratinjau ikut
dua kali lebih berat, dan berkasnya terlacak git sehingga perubahannya menyebar
ke sesi lain lewat merge tanpa mereka minta.

Selain membetulkan satu nilai itu, alat ini tidak mengubah apa pun.
"""

import sys


def _betulkan_fps():
    """Ubah fps yang tersimpan sebagai teks jadi bilangan bulat.

    Kembalikan nilai akhirnya supaya pemanggil bisa memeriksanya.
    """
    from manimlib import config as _config

    kamera = _config.manim_config.camera
    fps = kamera.get("fps") if hasattr(kamera, "get") else getattr(kamera, "fps", None)
    if isinstance(fps, str):
        bersih = fps.strip()
        if not bersih.lstrip("+-").isdigit():
            raise SystemExit(
                "--fps harus bilangan bulat, bukan %r. ManimGL tidak "
                "memeriksanya sendiri, jadi diperiksa di sini." % (fps,))
        kamera["fps"] = int(bersih)
    return kamera["fps"]


if __name__ == "__main__":
    fps = _betulkan_fps()
    print("[render_gl] fps dipakai: %r (%s)" % (fps, type(fps).__name__))
    from manimlib.__main__ import main

    sys.exit(main())
