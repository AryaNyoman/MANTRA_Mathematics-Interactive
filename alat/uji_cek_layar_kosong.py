"""Uji `cek_layar_kosong.py`: yang kosong HARUS ditandai, yang wajar HARUS lolos.

    python alat/uji_cek_layar_kosong.py

KENAPA UJI INI ADA
Alat yang menandai SEMUA video sama tidak bergunanya dengan alat yang tidak
menandai apa pun, dan keduanya sama-sama "lulus" kalau yang diuji cuma satu
arah. Karena itu uji ini memakai empat bahan:

1. video buatan dengan 3 detik SENGAJA dikosongkan       -> harus ditandai
2. video buatan dengan pudaran 1 detik saja               -> harus lolos
3. video Materi 07 Turunan yang sudah dibetulkan          -> harus lolos
4. batas jalur HUD sengaja dihilangkan                    -> alat harus BERHENTI

Bahan nomor 2 yang menjaga alatnya tidak menjadi galak: pudaran antarbabak
adalah hal biasa di setiap video MANTRA, dan alat yang menandainya akan
diabaikan orang dalam seminggu.

Bahan nomor 1 juga memasang isi di jalur identitas dan panel selama detik yang
dikosongkan. Kalau jalur itu lupa dikeluarkan dari hitungan, frame yang kosong
melompong akan terlihat berisi, dan uji ini gagal seperti seharusnya.

Bahan nomor 4 menguji janji yang paling mudah cuma jadi tulisan di docstring:
alat yang diam-diam mengukur kotak yang salah akan melaporkan "SEMUA LOLOS"
dengan yakin pada video yang cacat.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw

AKAR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(AKAR / "alat"))
import cek_layar_kosong as alat  # noqa: E402

LATAR = (250, 249, 245)
TINTA = (32, 38, 52)
FPS = 10
LEBAR, TINGGI = 854, 480


def buat_video(tujuan: Path, kosong_dari: float, kosong_sampai: float, lama: float = 10.0):
    """Video uji: isi di area kerja, KECUALI pada rentang yang diminta.

    Identitas dan panel digambar SEPANJANG video, termasuk saat area kerjanya
    dikosongkan, persis seperti video sungguhan.
    """
    kerja = Path(tempfile.mkdtemp(prefix="uji_kosong_"))
    try:
        for k in range(int(lama * FPS)):
            t = k / FPS
            img = Image.new("RGB", (LEBAR, TINGGI), LATAR)
            g = ImageDraw.Draw(img)
            # Jalur identitas (kiri atas) dan panel rumus (kanan atas): SELALU ada.
            g.rectangle([20, 20, 180, 45], fill=TINTA)
            g.rectangle([620, 25, 830, 150], fill=TINTA)
            if not (kosong_dari <= t < kosong_sampai):
                # Isi area kerja: kotak besar di tengah bawah.
                g.rectangle([200, 220, 600, 330], fill=TINTA)
            img.save(kerja / f"f{k:05d}.png")
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
             "-i", str(kerja / "f%05d.png"), "-pix_fmt", "yuv420p", str(tujuan)],
            check=True,
        )
    finally:
        shutil.rmtree(kerja, ignore_errors=True)


def jumlah_temuan(video: Path) -> int:
    zona = alat.zona_dari_sinema()
    persen = alat.isi_tiap_cuplikan(video, zona)
    return len(alat.rentang_kosong(persen))


def main() -> int:
    tmp = Path(tempfile.mkdtemp(prefix="uji_layar_"))
    try:
        # 1. HARUS GAGAL: 3 detik kosong yang disengaja.
        buruk = tmp / "sengaja-kosong.mp4"
        buat_video(buruk, kosong_dari=3.0, kosong_sampai=6.0)
        n = jumlah_temuan(buruk)
        if n == 0:
            raise SystemExit("GAGAL: 3 detik kosong yang disengaja TIDAK ditandai")
        print(f"ok: 3 detik kosong ditandai ({n} rentang)")

        # 2. HARUS LOLOS: pudaran 1 detik, hal biasa antarbabak.
        wajar = tmp / "pudaran-sedetik.mp4"
        buat_video(wajar, kosong_dari=3.0, kosong_sampai=4.0)
        n = jumlah_temuan(wajar)
        if n != 0:
            raise SystemExit(f"GAGAL: pudaran 1 detik ikut ditandai ({n} rentang). "
                             f"Alat yang menandai pudaran biasa akan diabaikan orang.")
        print("ok: pudaran 1 detik tidak ditandai")

        # 3. HARUS LOLOS: video Materi 07 yang sudah dibetulkan.
        asli = AKAR / "web" / "public" / "anim" / "turunan7-aturan-rantai.webm"
        if not asli.exists():
            raise SystemExit(f"GAGAL: {asli} tidak ada, uji nomor 3 tidak bisa dijalankan")
        n = jumlah_temuan(asli)
        if n != 0:
            raise SystemExit(f"GAGAL: video Materi 07 yang sudah dibetulkan masih "
                             f"ditandai {n} rentang")
        print("ok: video Materi 07 yang sudah dibetulkan lolos")

        # 4. Kalau batas jalur HUD tidak ketemu, alat WAJIB berhenti, bukan
        #    memakai tebakan. Tanpa uji ini, janji itu cuma tulisan di
        #    docstring: alat yang diam-diam mengukur kotak yang salah akan
        #    melaporkan "SEMUA LOLOS" dengan yakin pada video yang cacat.
        palsu = tmp / "sinema_tanpa_zona"
        (palsu / "manim" / "gl").mkdir(parents=True)
        (palsu / "manim" / "gl" / "sinema.py").write_text(
            "# sengaja tanpa ZONA_IDENTITAS\n", encoding="utf-8")
        asli_akar = alat.AKAR
        alat.AKAR = palsu
        try:
            alat.zona_dari_sinema()
            raise SystemExit("GAGAL: batas zona hilang tapi alat tetap jalan")
        except SystemExit as e:
            if "GAGAL: batas zona hilang" in str(e):
                raise
            print("ok: batas zona hilang membuat alat berhenti, bukan menebak")
        finally:
            alat.AKAR = asli_akar
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    print("SEMUA UJI CEK LAYAR KOSONG LOLOS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
