"""Gerbang mutu tata letak untuk ManimGL, sadar kamera 3D.

Dipakai DI DALAM adegan, di akhir tiap babak. Menangkap dua cacat yang paling
sering lolos dan paling merusak: objek keluar bingkai, dan dua objek saling
menindih. Untuk babak berkamera bergerak, panggil di sudut awal DAN akhir.

Cara kerja 3D: titik-titik objek diputar ke sumbu kamera saat itu, lalu
diskalakan ke satuan layar (bingkai 14,22 x 8). Perspektif ManimGL diabaikan,
jadi ini perkiraan; margin dinaikkan dan lembar kontak `cek_video.py` tetap
gerbang akhir. Objek `fix_in_frame` sudah dalam satuan layar.
"""

import numpy as np
from manimlib import *


class CacatTataLetak(AssertionError):
    """Tata letak melanggar aturan. Sengaja menggagalkan render."""


def _titik(mob):
    fam = [m for m in mob.get_family() if len(m.get_points())]
    if not fam:
        return np.zeros((0, 3))
    return np.vstack([m.get_points() for m in fam])


def ke_layar(frame, mob):
    """Kotak batas objek (kiri, kanan, bawah, atas) dalam satuan layar dari kamera saat ini."""
    p = _titik(mob)
    if len(p) == 0:
        return None
    if mob.is_fixed_in_frame():
        q = p
    else:
        rot = frame.get_inverse_camera_rotation_matrix()
        q = (p - frame.get_center()) @ rot.T
        q = q * (FRAME_HEIGHT / frame.get_height())
    return q[:, 0].min(), q[:, 0].max(), q[:, 1].min(), q[:, 1].max()


def muat_di_bingkai(frame, *mobs, margin: float = 0.3, nama: str = ""):
    """Pastikan tiap objek berada di dalam layar, dengan jarak aman `margin`."""
    bx, by = FRAME_WIDTH / 2 - margin, FRAME_HEIGHT / 2 - margin
    for i, m in enumerate(mobs):
        k = ke_layar(frame, m)
        if k is None:
            continue
        kiri, kanan, bawah, atas = k
        keluar = []
        if kiri < -bx:
            keluar.append(f"kiri {kiri:.2f} < {-bx:.2f}")
        if kanan > bx:
            keluar.append(f"kanan {kanan:.2f} > {bx:.2f}")
        if bawah < -by:
            keluar.append(f"bawah {bawah:.2f} < {-by:.2f}")
        if atas > by:
            keluar.append(f"atas {atas:.2f} > {by:.2f}")
        if keluar:
            raise CacatTataLetak(f"{nama or f'objek#{i}'} keluar bingkai: " + "; ".join(keluar))


def tidak_bertindih(frame, a, b, nama_a: str = "A", nama_b: str = "B", toleransi: float = 0.05):
    """Pastikan kotak batas dua objek, dilihat dari kamera, tidak beririsan."""
    if a is None or b is None:
        return
    ka, kb = ke_layar(frame, a), ke_layar(frame, b)
    if ka is None or kb is None:
        return
    tx = min(ka[1], kb[1]) - max(ka[0], kb[0])
    ty = min(ka[3], kb[3]) - max(ka[2], kb[2])
    if tx > toleransi and ty > toleransi:
        raise CacatTataLetak(
            f"{nama_a} menindih {nama_b} (irisan {tx:.2f} x {ty:.2f} satuan layar)")


def jalur_bawah_kosong(frame, zona: dict, batas_atas: float = -2.55):
    """Jalur bawah layar dipesan untuk subtitle: tidak boleh ada apa pun di sana.

    Sejak video MATRA punya subtitle penuh, menulis keterangan di bawah layar
    berarti dua kalimat berbeda untuk satu maksud yang sama. Keputusan ARYA
    2 Sep 2026. Pemeriksaan ini yang menegakkannya, bukan ingatan penulis adegan.
    """
    for nama, m in zona.items():
        k = ke_layar(frame, m)
        if k is None:
            continue
        if k[2] < batas_atas:
            raise CacatTataLetak(
                f"{nama} masuk jalur subtitle di bawah layar "
                f"(bawah {k[2]:.2f} < {batas_atas:.2f}). Jalur itu milik subtitle; "
                f"pindahkan ke papan rumus kiri atas atau panel kanan atas.")


def periksa_adegan(scene, zona: dict, pasangan: list | None = None, margin: float = 0.3,
                   hud: dict | None = None, dunia: dict | None = None,
                   jaga_jalur_bawah: bool = False):
    """Pemeriksaan sekali jalan dari sudut kamera adegan saat ini.

    zona      : {"nama": mobject}, semua diperiksa agar muat di bingkai
    pasangan  : [("nama_a", "nama_b"), ...], pasangan yang tidak boleh bertindih
    hud       : {"nama": panel}, panel yang menempel di layar
    dunia     : {"nama": benda}, benda di dunia 3D
    jaga_jalur_bawah : gagalkan render kalau ada objek masuk jalur subtitle

    `hud` dan `dunia` diperiksa SILANG semuanya, tidak perlu disebut satu per
    satu. Itu sebabnya keduanya ada: pada 2 Sep 2026 sebuah panel menindih garis
    bilangan dan lolos, semata karena penulis adegan lupa menuliskan pasangan
    "panel B" dengan "garis B". Daftar pasangan manual selalu punya lubang;
    perkalian silang tidak.
    """
    frame = scene.frame
    semua = dict(zona)
    semua.update(hud or {})
    semua.update(dunia or {})
    for nama, m in semua.items():
        muat_di_bingkai(frame, m, margin=margin, nama=nama)
    for a, b in pasangan or []:
        tidak_bertindih(frame, semua.get(a), semua.get(b), a, b)
    for na, pa in (hud or {}).items():
        for nd, pd in (dunia or {}).items():
            tidak_bertindih(frame, pa, pd, na, nd)
    if jaga_jalur_bawah:
        jalur_bawah_kosong(frame, semua)
