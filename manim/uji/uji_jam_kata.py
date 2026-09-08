"""Uji JamKata, tunggu_kata, dan penutupan babak pada jam audio mutlak.

    python manim/uji/uji_jam_kata.py

Tanpa ManimGL: adegan palsu yang hanya punya `time`, `wait`, `play`.
Dua arah: yang benar lolos, frasa salah ditolak, pemicu terlambat ditolak.
Bahannya kata.json sungguhan milik Turunan 2 (video yang disetujui ARYA).
"""
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(AKAR / "manim"))
from gl import sinema  # noqa: E402

TOPIK = "turunan2-garis-singgung"


class AdeganPalsu:
    def __init__(self):
        self.time = 0.0
        self.pemicu = []

    def wait(self, lama):
        self.time += lama

    def play(self, *animasi, run_time=1.0, **kw):
        self.time += run_time


def main() -> int:
    K = sinema.JamKata(TOPIK)
    import json
    durasi = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

    # 1. frasa benar memberi detik absolut di dalam segmennya
    t = K.jam("bagi", "segitiga")
    assert K.mulai("bagi") <= t <= K.akhir("bagi"), t
    print("ok: jam kata di dalam rentang segmennya")

    # 2. frasa salah DITOLAK, bukan diam-diam memicu di waktu lain
    try:
        K.jam("bagi", "kata yang tidak pernah diucapkan")
        raise SystemExit("GAGAL: frasa palsu lolos")
    except ValueError:
        print("ok: frasa salah ditolak dengan daftar kata segmennya")

    # 3. tunggu_kata menunggu sampai kata itu, lalu babak menutup di akhir audio segmen
    s = AdeganPalsu()
    s.time = K.mulai("bagi")
    with sinema.babak(s, "bagi", durasi, kata=K) as b:
        b.tunggu_kata("segitiga")
        assert abs(s.time - round(t * 30) / 30) < 1e-6, (s.time, t)
        b.main(None, run_time=1.0)
    assert abs(s.time - K.akhir("bagi")) < 1 / 30 + 1e-6, (s.time, K.akhir("bagi"))
    print("ok: babak ditutup tepat di akhir audio segmen, bukan di jumlah animasi")

    # 4. babak berikutnya yang dimulai lebih awal disejajarkan ke awal audionya
    s.time -= 0.5
    with sinema.babak(s, "h", durasi, kata=K) as b:
        assert abs(s.time - K.mulai("h")) < 1e-6
    print("ok: babak disejajarkan ke awal audio segmennya")

    # 5. pemicu yang sudah lewat GAGAL SAAT ITU JUGA, bukan di akhir render
    s2 = AdeganPalsu()
    s2.time = K.mulai("bagi")
    try:
        with sinema.babak(s2, "bagi", durasi, kata=K) as b:
            b.main(None, run_time=(t - K.mulai("bagi")) + 0.6)   # animasi kelewat panjang
            b.tunggu_kata("segitiga")                             # sudah lewat 0,6 detik
        raise SystemExit("GAGAL: pemicu terlambat lolos")
    except sinema.WaktuTidakMuat:
        print("ok: pemicu terlambat 0,6 detik ditolak SAAT tunggu_kata dipanggil")

    # 6. frasa yang diucapkan dua kali: ke=2 memilih kemunculan kedua, dan maju
    def dua_kali(s):
        try:
            return K.jam(s, "nol", ke=2) > K.jam(s, "nol", ke=1)
        except ValueError:
            return False
    seg = next(s for s in K.segmen if dua_kali(s))
    t1, t2 = K.jam(seg, "nol", ke=1), K.jam(seg, "nol", ke=2)
    assert t2 > t1, (seg, t1, t2)
    s4 = AdeganPalsu()
    s4.time = K.mulai(seg)
    with sinema.babak(s4, seg, durasi, kata=K) as b:
        b.tunggu_kata("nol")
        b.tunggu_kata("nol", ke=2)
        assert abs(s4.time - round(t2 * 30) / 30) < 1e-6
    print(f"ok: frasa berulang dipilih dengan ke=2 (segmen '{seg}', {t1:.2f} lalu {t2:.2f} detik)")

    # 6. babak tanpa jam kata tetap bekerja seperti dulu, dan tunggu_kata menolak
    s3 = AdeganPalsu()
    with sinema.babak(s3, "bagi", durasi) as b:
        try:
            b.tunggu_kata("segitiga")
            raise SystemExit("GAGAL: tunggu_kata tanpa jam kata lolos")
        except sinema.AturanDilanggar:
            pass
        b.main(None, run_time=1.0)
    print("ok: babak lama tanpa jam kata tetap jalan; tunggu_kata tanpa jam ditolak")
    print("SEMUA UJI JAM KATA LOLOS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
