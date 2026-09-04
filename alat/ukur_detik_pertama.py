"""Dua ukuran kekosongan video, satu alat.

1. "DETIK PERTAMA BERGERAK": jarak dari akhir kartu judul sampai benda pertama
   di layar bergerak atau berubah. Batas 5 detik.
2. "DIAM TERPANJANG": rentang terpanjang di SELURUH video yang layarnya
   praktis tidak berubah. Ini BUKAN vonis cacat, cuma calon yang harus dinilai
   sesi pemiliknya (lihat "Diam bukan otomatis cacat" di bawah).

    python alat/ukur_detik_pertama.py media/uji-480p/statistika6-pencilan.mp4
    python alat/ukur_detik_pertama.py --judul 3.2 media/uji-480p/*.mp4
    python alat/ukur_detik_pertama.py --diam 4 --ambang-piksel 500 <video>
    python alat/ukur_detik_pertama.py --uji-alatnya

Kenapa alat ini ada
-------------------
Aturan STANDAR 4 September 2026, lahir dari Vektor 06: sesudah pembuka 3D
dipotong, dua puluh lima detik pertama videonya jadi bidang kosong dengan satu
benda diam sementara narator bercerita. Kekosongan cuma pindah dimensi. Batasnya
sekarang LIMA DETIK, dan kartu judul TIDAK dihitung sebagai gerakan.

Cara mengukurnya
----------------
Panjang kartu judul TIDAK ditebak dari gambar. Versi pertama alat ini mencoba
mengenalinya dari pita atas layar, dan meleset di Materi 06: sesudah orangnya
dibesarkan, kepala mereka masuk pita judul, jadi pita itu tidak pernah kosong
dan alatnya melapor "judul selesai 19,50 detik". Sekarang panjangnya diberikan
(`--judul`, bawaan 3,2 detik = `sinema.judul_pembuka(lama=3.2)` yang dipakai
semua adegan Statistika), dan alat ini cuma mengukur SESUDAH itu.

Frame diambil 8 kali per detik. Jalur subtitle di kaki layar diabaikan sebab
subtitle tidak dibakar ke video. Selisih dihitung antar frame berurutan; frame
pertama yang berubah melebihi ambang adalah "benda pertama bergerak".

Ukuran kedua: diam terpanjang
-----------------------------
Ukuran pertama saja belum cukup. Ruang 3D materi 04 LOLOS ukuran pertama (gerak
pertama 0,3 detik sesudah judul) tetapi punya delapan detik beku sesudahnya:
kodenya memang menjalankan lima animasi di sana, hanya saja semuanya benda
kecil, dan dari detik 13,5 ke 17,5 cuma 0,25 persen piksel yang berubah. Lima
animasi yang tidak terlihat mata sama saja dengan layar berhenti.

DUA AMBANG, dan yang longgar yang menang. Sebuah frame dianggap BERGERAK kalau
bagian piksel yang berubah melewati `--ambang-bagian` (bawaan 0,5 persen) ATAU
jumlah piksel yang berubah melewati `--ambang-piksel` (bawaan 300 piksel pada
ukuran 854x480, dihitung ulang otomatis untuk gambar yang diperkecil). Ambang
mutlak itu permintaan Statistika dan memang perlu: babak yang gerakannya kecil
tetapi nyata, misalnya denyut beruntun pada beberapa titik, akan salah dilapor
beku kalau hanya ambang persentase yang dipakai.

Diam bukan otomatis cacat
-------------------------
STANDAR butir 3 membolehkan layar diam selama narasi masih membahas yang
tampil. Alat ini MENANDAI CALON, sesi pemiliknya yang menilai, dan tiap calon
ditulis di laporan berikut kalimat narasi yang sedang berjalan di situ.
"""

from __future__ import annotations

import argparse
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

FPS = 8
LAMA_UKUR = 25.0          # detik pertama yang diperiksa
AMBANG = 0.0008           # bagian piksel yang berubah, 0,08 persen
BATAS_STANDAR = 5.0       # detik, aturan STANDAR 4 Sep 2026
JALUR_SUBTITLE = 0.82     # bagian bawah gambar yang diabaikan

# Ukuran kedua: diam terpanjang.
DIAM_MINIMUM = 3.0        # detik, di bawah ini tidak dilaporkan
AMBANG_BAGIAN = 0.005     # 0,5 persen piksel berubah
AMBANG_PIKSEL = 300       # piksel berubah pada 854x480, ambang MUTLAK
PIKSEL_ACUAN = 854 * 480  # ukuran acuan untuk ambang mutlak di atas


def ambil_frame(video: Path, keluar: Path, lama: float | None = LAMA_UKUR) -> list[Path]:
    """`lama=None` berarti seluruh video (dipakai ukuran kedua)."""
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", str(video)]
    if lama is not None:
        cmd += ["-t", str(lama)]
    cmd += ["-vf", f"fps={FPS},scale=320:-1", "-f", "image2", str(keluar / "f%04d.png")]
    subprocess.run(cmd, check=True)
    return sorted(keluar.glob("f*.png"))


def ukur(video: Path, lama_judul: float) -> tuple[float | None, str]:
    """Kembalikan (detik sejak kartu judul selesai sampai ada yang berubah, catatan)."""
    with tempfile.TemporaryDirectory() as d:
        berkas = ambil_frame(video, Path(d))
        if len(berkas) < 3:
            return None, "video terlalu pendek"
        gambar = [np.asarray(Image.open(p).convert("L"), dtype=np.int16) for p in berkas]
        batas_bawah = int(gambar[0].shape[0] * JALUR_SUBTITLE)
        mulai = max(1, int(round(lama_judul * FPS)))
        for i in range(mulai + 1, len(gambar)):
            beda = np.abs(gambar[i] - gambar[i - 1])[:batas_bawah]
            if (beda > 12).sum() / beda.size > AMBANG:
                return (i - mulai) / FPS, "ok"
        return None, f"tidak ada gerakan dalam {LAMA_UKUR:.0f} detik"


def ukur_diam(video: Path, lama_judul: float = 3.2, diam_minimum: float = DIAM_MINIMUM,
              ambang_bagian: float = AMBANG_BAGIAN,
              ambang_piksel: int = AMBANG_PIKSEL) -> list[tuple[float, float]]:
    """Rentang yang layarnya praktis tidak berubah, urut dari yang terpanjang.

    Kembalikan daftar (detik mulai, lama). Frame dianggap BERGERAK kalau bagian
    piksel yang berubah melewati `ambang_bagian` ATAU jumlahnya melewati
    `ambang_piksel` (dihitung pada 854x480, diskalakan ke gambar yang dipakai).
    Yang longgar yang menang: gerakan kecil tetapi nyata tidak boleh dilapor
    beku.
    """
    with tempfile.TemporaryDirectory() as d:
        berkas = ambil_frame(video, Path(d), lama=None)
        if len(berkas) < 3:
            return []
        gambar = [np.asarray(Image.open(p).convert("L"), dtype=np.int16) for p in berkas]
        batas_bawah = int(gambar[0].shape[0] * JALUR_SUBTITLE)
        luas = gambar[0][:batas_bawah].size
        # Ambang mutlak diberikan dalam piksel 854x480; gambar di sini sudah
        # diperkecil, jadi angkanya dihitung ulang menurut perbandingan luas.
        ambang_mutlak = max(1.0, ambang_piksel * luas / PIKSEL_ACUAN)
        bergerak = []
        for i in range(1, len(gambar)):
            beda = np.abs(gambar[i] - gambar[i - 1])[:batas_bawah]
            n = float((beda > 12).sum())
            bergerak.append(n / luas > ambang_bagian or n > ambang_mutlak)
        # Kartu judul memang diam, dan itu bukan cacat: dilewati.
        mulai_ukur = max(0, int(round(lama_judul * FPS)))
        bergerak = bergerak[mulai_ukur:]
        rentang, jalan, awal = [], 0, 0
        for i, hidup in enumerate(bergerak + [True]):
            if hidup:
                if jalan / FPS >= diam_minimum:
                    rentang.append(((awal + mulai_ukur) / FPS, jalan / FPS))
                jalan = 0
            else:
                if jalan == 0:
                    awal = i
                jalan += 1
        return sorted(rentang, key=lambda r: -r[1])


def uji_alatnya() -> int:
    """Tanam kerusakan sengaja: alat yang tidak bisa gagal tidak membuktikan apa pun."""
    with tempfile.TemporaryDirectory() as d:
        d = Path(d)
        latar = np.full((180, 320), 244, dtype=np.uint8)
        # 3,2 detik judul, lalu 9 detik BEKU, baru sebuah kotak muncul.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40            # kartu judul
            if t >= 3.2 + 9.0:
                g[80:120, 120:200] = 60          # benda pertama, telat 9 detik
            Image.fromarray(g).save(d / f"f{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "f%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "beku.mp4")], check=True)
        jeda, catatan = ukur(d / "beku.mp4", 3.2)
        print(f"  video beku bikinan  : jeda {jeda}  ({catatan})")
        if jeda is None or jeda < BATAS_STANDAR:
            print("  GAGAL: alatnya tidak menangkap kebekuan 9 detik yang sengaja ditanam")
            return 1

        # Kendali kedua: gerak langsung sesudah judul, harus dinyatakan ok.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40
            if t >= 3.4:
                lebar = min(200, int((t - 3.4) * 60) + 20)
                g[80:120, 120:120 + lebar] = 60
            Image.fromarray(g).save(d / f"g{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "g%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "hidup.mp4")], check=True)
        jeda2, catatan2 = ukur(d / "hidup.mp4", 3.2)
        print(f"  video hidup bikinan : jeda {jeda2}  ({catatan2})")
        if jeda2 is None or jeda2 > BATAS_STANDAR:
            print("  GAGAL: alatnya melapor cacat pada video yang sebenarnya bergerak")
            return 1
        # --- Ukuran kedua: tiga kasus, dan salah satunya HARUS tidak tertangkap.
        # (a) bergerak di awal, lalu beku 8 detik di tengah.
        for i in range(int(24 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40
            if 3.4 <= t < 8.0:
                g[80:120, 120:120 + min(180, int((t - 3.4) * 40) + 20)] = 60
            elif t >= 8.0:
                g[80:120, 120:300] = 60                    # BEKU dari 8,0 sampai 16,0
            if t >= 16.0:
                g[130:160, 60:260] = 90
            Image.fromarray(g).save(d / f"h{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "h%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "beku-tengah.mp4")], check=True)
        r = ukur_diam(d / "beku-tengah.mp4")
        print(f"  (a) beku 8 detik di tengah : {r[0] if r else 'TIDAK ADA'}")
        if not r or r[0][1] < 6.0:
            print("  GAGAL: kebekuan 8 detik yang sengaja ditanam tidak tertangkap")
            return 1

        # (b) gerakan KECIL beruntun: beberapa titik kecil berdenyut bergantian.
        # Ini pola `Indicate` beruntun milik Statistika Materi 05 babak `sapa`.
        # Alat yang cuma memakai ambang persentase akan salah melapor beku.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            t = i / FPS
            if t < 3.2:
                g[10:40, 90:230] = 40
            else:
                x = 40 + 30 * (int((t - 3.2) * 2) % 8)     # satu titik kecil berpindah
                g[95:105, x:x + 10] = 50
            Image.fromarray(g).save(d / f"k{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "k%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "kecil.mp4")], check=True)
        rk = ukur_diam(d / "kecil.mp4")
        panjang_kecil = rk[0][1] if rk else 0.0
        print(f"  (b) gerakan kecil beruntun : diam terpanjang {panjang_kecil:.2f} detik")
        if panjang_kecil >= 3.0:
            print("  GAGAL: gerakan kecil yang NYATA dilapor beku (ambang mutlak tidak bekerja)")
            return 1

        # (c) diam total sesudah judul.
        for i in range(int(20 * FPS)):
            g = latar.copy()
            if i / FPS < 3.2:
                g[10:40, 90:230] = 40
            g[80:120, 120:300] = 60
            Image.fromarray(g).save(d / f"m{i:04d}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS),
                        "-i", str(d / "m%04d.png"), "-pix_fmt", "yuv420p",
                        str(d / "mati.mp4")], check=True)
        rm = ukur_diam(d / "mati.mp4")
        print(f"  (c) diam total             : {rm[0] if rm else 'TIDAK ADA'}")
        if not rm or rm[0][1] < 10.0:
            print("  GAGAL: video yang diam total tidak tertangkap")
            return 1

    print("  UJI ALAT LOLOS: menangkap yang beku, membiarkan yang bergerak,")
    print("                  dan tidak salah menuduh gerakan kecil yang nyata")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="Ukur detik pertama bergerak dan diam terpanjang")
    p.add_argument("video", nargs="*", type=Path)
    p.add_argument("--judul", type=float, default=3.2, help="panjang kartu judul (detik)")
    p.add_argument("--uji-alatnya", action="store_true", help="uji alatnya sendiri")
    p.add_argument("--diam", type=float, default=DIAM_MINIMUM,
                   help=f"lama minimum calon diam yang dilaporkan (bawaan {DIAM_MINIMUM} detik)")
    p.add_argument("--ambang-bagian", type=float, default=AMBANG_BAGIAN,
                   help=f"bagian piksel berubah yang dianggap bergerak (bawaan {AMBANG_BAGIAN})")
    p.add_argument("--ambang-piksel", type=int, default=AMBANG_PIKSEL,
                   help=f"ambang MUTLAK piksel berubah pada 854x480 (bawaan {AMBANG_PIKSEL})")
    p.add_argument("--tanpa-diam", action="store_true", help="ukuran pertama saja, lebih cepat")
    a = p.parse_args()
    if a.uji_alatnya:
        return uji_alatnya()
    if not a.video:
        p.print_help()
        return 2

    buruk = 0
    calon_semua = []
    print(f"{'video':<32} {'gerak pertama':>14} {'diam terpanjang':>17}  vonis")
    for v in a.video:
        jeda, catatan = ukur(v, a.judul)
        rentang = ([] if a.tanpa_diam else
                   ukur_diam(v, a.judul, a.diam, a.ambang_bagian, a.ambang_piksel))
        diam = f"{rentang[0][1]:.1f}s @ {rentang[0][0]:.0f}s" if rentang else "-"
        if jeda is None:
            print(f"{v.stem:<32} {'-':>14} {diam:>17}  {catatan}")
            buruk += 1
        else:
            lewat = jeda > BATAS_STANDAR
            buruk += lewat
            print(f"{v.stem:<32} {jeda:>13.2f}s {diam:>17}  "
                  f"{'LEWAT BATAS' if lewat else 'ok'}")
        if rentang:
            calon_semua.append((v.stem, rentang))

    print(f"\n{len(a.video) - buruk} dari {len(a.video)} memenuhi batas "
          f"{BATAS_STANDAR} detik untuk gerak pertama")
    if calon_semua:
        print("\nCALON DIAM. Ini BUKAN vonis cacat: STANDAR butir 3 membolehkan layar")
        print("diam selama narasi masih membahas yang tampil. Nilai satu per satu, dan")
        print("tulis kalimat narasi yang sedang berjalan di situ ke laporan.")
        for nama, rentang in calon_semua:
            for mulai, lama in rentang[:4]:
                print(f"  {nama:<30} detik {mulai:6.1f} sampai {mulai + lama:6.1f}"
                      f"   ({lama:.1f} detik)")
    return 1 if buruk else 0


if __name__ == "__main__":
    raise SystemExit(main())
