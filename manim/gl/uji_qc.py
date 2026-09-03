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

# ---- 4 Sep 2026: dua lubang yang ditutup ---------------------------------
class _Adegan:
    pass

sc = _Adegan()
sc.frame = frame
frame.reorient(0, 0, 0, center=(0, 0, 0), height=8)

# 1. Tulisan lawan tulisan di dunia HARUS gagal; terpisah HARUS lolos.
t1 = Text("sembilan karyawan").move_to([0, 0, 0])
t2 = Text("x-bar").move_to([0.2, 0, 0])
try:
    qc.periksa_adegan(sc, {}, tulisan={"karyawan": t1, "xbar": t2}, jaga_jalur_bawah=False)
    raise SystemExit("GAGAL: tulisan bertindih lolos")
except qc.CacatTataLetak:
    print("ok: tulisan lawan tulisan tertangkap")
t2.move_to([4, 0, 0])
qc.periksa_adegan(sc, {}, tulisan={"karyawan": t1, "xbar": t2}, jaga_jalur_bawah=False)
print("ok: tulisan terpisah lolos")

# 2. Isi kelompok HUD bertanda _qc_isi: dua baris papan bertindih HARUS gagal.
r1 = Text("baris satu").fix_in_frame().move_to([4, 2, 0])
r2 = Text("baris dua").fix_in_frame().move_to([4, 2.1, 0])
papan = VGroup(r1, r2)
papan._qc_isi = True
try:
    qc.periksa_adegan(sc, {}, hud={"panel": papan}, jaga_jalur_bawah=False)
    raise SystemExit("GAGAL: baris papan bertindih lolos")
except qc.CacatTataLetak:
    print("ok: tindihan di dalam papan tertangkap")
r2.move_to([4, 0.8, 0])
qc.periksa_adegan(sc, {}, hud={"panel": papan}, jaga_jalur_bawah=False)
print("ok: papan rapi lolos")
# Kelompok TANPA tanda tidak diperiksa isinya (label + kotaknya boleh bertumpuk).
bebas = VGroup(r1.copy(), r1.copy())
qc.periksa_adegan(sc, {}, hud={"legenda": bebas}, jaga_jalur_bawah=False)
print("ok: kelompok tanpa tanda dibiarkan")

# 3. Panel beralas di atas LATAR harus lolos; di atas benda biasa harus gagal.
#    Pengecualian ini sengaja sempit: alas kertas boleh menutupi garis petak,
#    TIDAK boleh menutupi panah, titik, atau label.
panel = Text("panjang 5,00").fix_in_frame().move_to([4.4, 2.0, 0])
panel.beralas = True
latar = Rectangle(width=12, height=7).move_to([0, 0, 0])
latar.latar = True
qc.periksa_adegan(sc, {}, hud={"panel": panel}, dunia={"bidang": latar},
                  jaga_jalur_bawah=False)
print("ok: panel beralas di atas latar lolos")

titik = Dot(radius=0.12).move_to([4.4, 2.0, 0])
try:
    qc.periksa_adegan(sc, {}, hud={"panel": panel}, dunia={"titik": titik},
                      jaga_jalur_bawah=False)
    raise SystemExit("GAGAL: titik tertutup panel beralas lolos")
except qc.CacatTataLetak:
    print("ok: titik tanpa tanda latar di bawah panel tertangkap")

print("SEMUA UJI QC LOLOS")
