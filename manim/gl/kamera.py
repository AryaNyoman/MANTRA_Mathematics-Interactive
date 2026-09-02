"""Gerakan kamera siap pakai untuk ManimGL.

Semua fungsi MENGEMBALIKAN animasi; durasinya diberi lewat `b.main(..., run_time=)`
supaya tetap terikat pada narasi. Sudut memakai derajat: theta = putaran
mendatar, phi = kemiringan (0 = tepat dari atas, 90 = sejajar tanah).
"""

from manimlib import *


def pasang_awal(frame, theta, phi, gamma=0, pusat=(0, 0, 0), tinggi=8):
    """Sudut awal babak, tanpa animasi."""
    frame.reorient(theta, phi, gamma, center=tuple(pusat), height=tinggi)


def sudut(frame, theta, phi, gamma=0, pusat=(0, 0, 0), tinggi=8):
    """Terbang ke sudut tertentu, satu gerakan panjang, bukan potongan."""
    return frame.animate.reorient(theta, phi, gamma, center=tuple(pusat), height=tinggi)


def dunia_ke_peta(frame, pusat=(0, 0, 0), tinggi=10):
    """Dari pandangan miring (dunia nyata) ke tegak lurus atas (tempat matematikanya terbaca)."""
    return frame.animate.reorient(0, 0, 0, center=tuple(pusat), height=tinggi)


def dekati(frame, target, tinggi):
    """Mendekat ke objek atau titik tanpa mengubah sudut pandang."""
    p = target.get_center() if hasattr(target, "get_center") else np.array(target)
    return frame.animate.move_to(p).set_height(tinggi)


def putar_pelan(frame, derajat=15):
    """Putaran mendatar halus, untuk memberi rasa ruang saat kamera 'diam'."""
    return frame.animate.increment_theta(derajat * DEGREES)


# Jalur layar yang boleh dipakai gambar pada pandangan tegak lurus: di atas
# jalur subtitle (y > -2,55) dan di bawah tepi atas (y < 4,0), dengan sisa.
_LAYAR_BAWAH, _LAYAR_ATAS = -2.55 + 0.20, 4.0 - 0.30
_LAYAR_KIRI, _LAYAR_KANAN = -7.11 + 0.45, 7.11 - 0.45


def muat_datar(mob, margin: float = 0.25):
    """Hitung (pusat, tinggi) kamera tegak lurus supaya `mob` MUAT di jalur layar
    yang bebas subtitle. Kembalikan (pusat, tinggi), pakai untuk `pasang_awal`
    atau `dunia_ke_peta`.

    Temuan Vektor 3 Sep: tepi bawah `bidang_bernomor` adalah ANGKA sumbunya,
    sekitar 0,30 satuan di bawah garis petak terbawah, dan bidang setinggi
    6,3 satuan tidak muat pada bingkai 7,0 berapa pun pusatnya digeser. Fungsi
    ini menghitung keduanya dari kotak batas objek yang sebenarnya, bukan dari
    garis petak.
    """
    kiri, kanan = mob.get_left()[0] - margin, mob.get_right()[0] + margin
    bawah, atas = mob.get_bottom()[1] - margin, mob.get_top()[1] + margin
    ruang_y = _LAYAR_ATAS - _LAYAR_BAWAH          # satuan layar yang tersedia tegak
    ruang_x = _LAYAR_KANAN - _LAYAR_KIRI          # dan mendatar
    tinggi = max((atas - bawah) * FRAME_HEIGHT / ruang_y,
                 (kanan - kiri) * FRAME_HEIGHT / ruang_x)
    skala = tinggi / FRAME_HEIGHT                 # satuan dunia per satuan layar
    # Pusat kamera: titik dunia yang jatuh di tengah jalur bebas subtitle.
    tengah_layar_y = (_LAYAR_ATAS + _LAYAR_BAWAH) / 2
    tengah_layar_x = (_LAYAR_KIRI + _LAYAR_KANAN) / 2
    pusat = (float((kiri + kanan) / 2 - tengah_layar_x * skala),
             float((bawah + atas) / 2 - tengah_layar_y * skala), 0.0)
    return pusat, float(tinggi)


def dunia_ke_peta_muat(frame, mob, margin: float = 0.25):
    """`dunia_ke_peta` yang pusat dan tingginya dihitung dari `muat_datar(mob)`."""
    pusat, tinggi = muat_datar(mob, margin)
    return dunia_ke_peta(frame, pusat=pusat, tinggi=tinggi)
