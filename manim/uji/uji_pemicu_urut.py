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

# 5. HARUS GAGAL JUGA pada bentuk pembungkus `self.bagian('...')` berkutip
#    tunggal. Bentuk itu dipakai contoh rujukan turunan2 yang disetujui ARYA.
#    Sebelum 9 Sep 2026 pemeriksa hanya mengenali `sinema.babak(self, "...")`
#    berkutip ganda, jadi adegan seperti itu dilaporkan "0 pemicu di 0 babak"
#    dan LOLOS tanpa diperiksa sama sekali. Uji harus-gagal saja tidak cukup:
#    tanpa uji ini, regex yang dipersempit lagi tidak akan ketahuan.
p.write_text(f"TOPIK = '{TOPIK}'\n"
             f"with self.bagian('{seg}') as b:\n"
             f"    b.tunggu_kata('{f1}')\n"
             f"    b.main(FadeIn(x), run_time={jarak + 0.8:.2f})\n"
             f"    b.tunggu_kata('{f2}')\n", encoding="utf-8")
kode, keluar = jalankan(p)
print("5 pembungkus bagian() kutip tunggal:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "TERLAMBAT" in keluar, keluar

# 6. HARUS GAGAL: berkas ber-TOPIK yang babaknya tidak terbaca sama sekali.
#    Diam yang terbaca sebagai lulus lebih berbahaya daripada tidak memeriksa.
p.write_text(f"TOPIK = '{TOPIK}'\n"
             f"with self.entah_apa('{seg}') as b:\n"
             f"    b.tunggu_kata('{f1}')\n", encoding="utf-8")
kode, keluar = jalankan(p)
print("6 babak tak terbaca:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "TIDAK ADA babak" in keluar, keluar

# 7. Pembungkus `tunggu_kata_bergeser(b, frame, "frasa")` (Ruang 3D) WAJIB
#    terbaca: dua arah, lolos saat muat dan ditolak saat tidak muat. Tanpa ini
#    44 dari 62 pemicu Ruang 3D materi 01 sempat tidak terbaca (9 Sep 2026).
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
             f'    tunggu_kata_bergeser(b, frame, "{f1}")\n'
             f'    b.main(FadeIn(x), run_time=0.5)\n'
             f'    tunggu_kata_bergeser(b, frame, "{f2}")\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("7a pembungkus muat:", "LOLOS" if kode == 0 and "2 pemicu" in keluar else "GAGAL\n" + keluar)
assert kode == 0 and "2 pemicu" in keluar, keluar
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
             f'    tunggu_kata_bergeser(b, frame, "{f1}")\n'
             f'    b.main(FadeIn(x), run_time={jarak + 0.8:.2f})\n'
             f'    tunggu_kata_bergeser(b, frame, "{f2}")\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("7b pembungkus tidak muat:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "TERLAMBAT" in keluar, keluar

# 8. Penolong pemakan waktu tanpa run_time= (temuan Ruang 3D materi 01):
#    `sumbu_z_pamit(b, papan, detik)` harus ikut memajukan jam.
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
             f'    b.tunggu_kata("{f1}")\n'
             f'    sumbu_z_pamit(b, papan, {jarak + 0.8:.2f})\n'
             f'    b.tunggu_kata("{f2}")\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("8 penolong pemakan waktu:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "TERLAMBAT" in keluar, keluar

# 9. EKOR: animasi sesudah pemicu TERAKHIR melewati ujung segmen (temuan Ruang
#    3D materi 01, gagal di menit ke-22 render). Dua arah: muat lolos, lewat ditolak.
sisa = K.akhir(seg) - t2
assert sisa > 0.2, sisa
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
             f'    b.tunggu_kata("{f2}")\n'
             f'    b.main(FadeOut(x), run_time={sisa + 1.0:.2f})\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("9a ekor melewati segmen:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "EKOR" in keluar, keluar
p.write_text(f'TOPIK = "{TOPIK}"\n'
             f'with sinema.babak(self, "{seg}", DURASI, kata=KATA) as b:\n'
             f'    b.tunggu_kata("{f2}")\n'
             f'    b.main(FadeOut(x), run_time={max(sisa - 0.2, 0.05):.2f})\n', encoding="utf-8")
kode, keluar = jalankan(p)
print("9b ekor muat:", "LOLOS" if kode == 0 else "GAGAL\n" + keluar)
assert kode == 0, keluar

# 10. Babak terbaca tetapi NOL pemicu: bentuk pemicunya tidak dimengerti,
#     jangan dilaporkan lolos.
p.write_text(f"TOPIK = '{TOPIK}'\n"
             f"with self.bagian('{seg}') as b:\n"
             f"    b.tunggu_sampai(12.0)\n"
             f"    b.main(FadeIn(x), run_time=0.5)\n", encoding="utf-8")
kode, keluar = jalankan(p)
print("10 nol pemicu:", "DITOLAK" if kode != 0 else "LOLOS (SALAH)")
assert kode != 0 and "NOL pemicu" in keluar, keluar

p.unlink()
print("SEMUA UJI CEK PEMICU URUT LOLOS")
