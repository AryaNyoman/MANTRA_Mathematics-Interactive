"""Uji dua arah cek_pemicu_urut versi ramalan jam: adegan buatan dari kata.json nyata."""
import importlib.util
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[2]
TMP = Path(__file__).resolve().parents[2] / "media"
TMP.mkdir(exist_ok=True)
sys.path.insert(0, str(AKAR / "manim"))
from gl import sinema  # noqa: E402

TOPIK = "turunan2-garis-singgung"
K = sinema.JamKata(TOPIK)

# dua frasa berurutan di satu segmen, dan jarak waktunya
seg = "bagi"
kata = [w["kata"] for w in K.segmen[seg]["kata"]]
f1, f2 = kata[1], kata[-2]
t1, t2 = K.jam(seg, f1), K.jam(seg, f2)
jarak = t2 - t1
assert jarak > 1.0, (f1, f2, jarak)


def adegan(isi_babak: str) -> Path:
    p = TMP / "adegan_uji.py"
    p.write_text(f'TOPIK = "{TOPIK}"\n'
                 f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
                 f'{isi_babak}\n', encoding="utf-8")
    return p


def jalankan(p: Path) -> tuple[int, str]:
    h = subprocess.run([sys.executable, str(AKAR / "alat/cek_pemicu_urut.py"), str(p)],
                       capture_output=True, text=True, cwd=AKAR)
    return h.returncode, h.stdout + h.stderr


# 1. HARUS LOLOS: animasi pendek, dua pemicu maju
kode, keluar = jalankan(adegan(
    f'    b.tunggu_kata("{f1}")\n'
    f'    b.main(FadeIn(x), run_time=0.5)\n'
    f'    b.tunggu_kata("{f2}")\n'))
print("1 lolos-seharusnya:", "LOLOS" if kode == 0 else "GAGAL\n" + keluar)
assert kode == 0, keluar

# 2. HARUS GAGAL: animasi lebih panjang daripada jarak kedua kata
kode, keluar = jalankan(adegan(
    f'    b.tunggu_kata("{f1}")\n'
    f'    b.main(FadeIn(x), run_time={jarak + 0.8:.2f})\n'
    f'    b.tunggu_kata("{f2}")\n'))
print("2 terlambat:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "TERLAMBAT" in keluar, keluar
print("   ", [b for b in keluar.splitlines() if "TERLAMBAT" in b][0].strip()[:110])

# 3. HARUS GAGAL: frasa sama dua kali tanpa ke=
segp = next(s for s in K.segmen
            if (lambda kk: any(kk.count(w) > 1 for w in kk))([w["kata"].lower() for w in K.segmen[s]["kata"]]))
kk = [w["kata"] for w in K.segmen[segp]["kata"]]
ulang = next(w for w in kk if [x.lower() for x in kk].count(w.lower()) > 1)
p = TMP / "adegan_uji.py"
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{segp}", DURASI, kata=KATA) as b:\n'
             f'    b.tunggu_kata("{ulang}")\n'
             f'    b.tunggu_kata("{ulang}")\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("3 frasa berulang tanpa ke=:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "MUNDUR" in keluar, keluar

# 4. HARUS LOLOS: frasa sama dengan ke=2
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{segp}", DURASI, kata=KATA) as b:\n'
             f'    b.tunggu_kata("{ulang}")\n'
             f'    b.tunggu_kata("{ulang}", ke=2)\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("4 dengan ke=2:", "LOLOS" if kode == 0 else "GAGAL\n" + keluar)
assert kode == 0, keluar

p.unlink()
print("SEMUA UJI CEK PEMICU URUT LOLOS")
