"""Uji gerbang mutu: yang salah HARUS gagal, yang benar HARUS lolos.
    python manim/gl/uji_qc.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from manimlib import *  # noqa: E402
from gl import qc  # noqa: E402

frame = CameraFrame()
frame.reorient(0, 0, 0)
hud = Text("layar").fix_in_frame().to_corner(UL)
jauh = Square(side_length=1).move_to([20, 0, 0])
a = Square(side_length=2).move_to([0, 0, 0])
b = Square(side_length=2).move_to([1, 0, 0])
c = Square(side_length=2).move_to([5, 0, 0])

qc.muat_di_bingkai(frame, hud, nama="hud")
print("ok: hud di pojok lolos")
try:
    qc.muat_di_bingkai(frame, jauh, nama="jauh")
    raise SystemExit("GAGAL: objek jauh lolos")
except qc.CacatTataLetak:
    print("ok: keluar bingkai tertangkap")
try:
    qc.tidak_bertindih(frame, a, b, "a", "b")
    raise SystemExit("GAGAL: tindihan lolos")
except qc.CacatTataLetak:
    print("ok: tindihan tertangkap")
qc.tidak_bertindih(frame, a, c, "a", "c")
print("ok: terpisah lolos")

# Kamera hampir datar dari samping (phi 85): dua kubus bertumpuk di sumbu z
# harus terpisah di layar; dari atas (phi 0) harus bertindih.
atas = Cube(side_length=1).move_to([0, 0, 2.5])
bawah = Cube(side_length=1).move_to([0, 0, 0])
frame.reorient(0, 85, 0)
try:
    qc.tidak_bertindih(frame, atas, bawah, "atas", "bawah")
    print("ok: dari samping, bertumpuk z terpisah di layar")
except qc.CacatTataLetak as e:
    raise SystemExit(f"GAGAL: {e}")
frame.reorient(0, 0, 0)
try:
    qc.tidak_bertindih(frame, atas, bawah, "atas", "bawah")
    raise SystemExit("GAGAL: dari atas mestinya bertindih")
except qc.CacatTataLetak:
    print("ok: dari atas, bertumpuk z terdeteksi bertindih")

# Kamera diperbesar (height 4): kotak di x=5 keluar layar; height 16: masuk.
frame.reorient(0, 0, 0, center=(0, 0, 0), height=4)
try:
    qc.muat_di_bingkai(frame, c, nama="c")
    raise SystemExit("GAGAL: kamera sempit, c mestinya keluar")
except qc.CacatTataLetak:
    print("ok: kamera sempit, c keluar tertangkap")
frame.reorient(0, 0, 0, center=(0, 0, 0), height=16)
qc.muat_di_bingkai(frame, c, nama="c")
print("ok: kamera lebar, c muat")
print("SEMUA UJI QC LOLOS")
