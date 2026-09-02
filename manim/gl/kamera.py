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
