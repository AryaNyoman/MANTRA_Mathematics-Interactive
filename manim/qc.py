"""Gerbang mutu untuk animasi MATRA.

Dipakai DI DALAM adegan, sebelum dirender penuh. Tujuannya menangkap dua cacat
yang paling sering lolos dan paling merusak:

  1. objek keluar bingkai (terpotong tepi layar)
  2. dua objek saling menindih

Keduanya pernah lolos ke video jadi pada 31 Agu 2026 dan ditemukan ARYA, bukan
oleh Claude. Sejak itu pemeriksaan ini wajib.
"""

from manim import config


class CacatTataLetak(AssertionError):
    """Dilempar kalau tata letak melanggar aturan. Sengaja menggagalkan render."""


def _kotak(m):
    return m.get_left()[0], m.get_right()[0], m.get_bottom()[1], m.get_top()[1]


def muat_di_bingkai(*mobs, margin: float = 0.2, nama: str = ""):
    """Pastikan setiap objek berada di dalam layar, dengan jarak aman `margin`."""
    batas_x = config.frame_width / 2 - margin
    batas_y = config.frame_height / 2 - margin
    for i, m in enumerate(mobs):
        if m is None or not len(m.get_all_points()):
            continue
        kiri, kanan, bawah, atas = _kotak(m)
        keluar = []
        if kiri < -batas_x:
            keluar.append(f"kiri {kiri:.2f} < {-batas_x:.2f}")
        if kanan > batas_x:
            keluar.append(f"kanan {kanan:.2f} > {batas_x:.2f}")
        if bawah < -batas_y:
            keluar.append(f"bawah {bawah:.2f} < {-batas_y:.2f}")
        if atas > batas_y:
            keluar.append(f"atas {atas:.2f} > {batas_y:.2f}")
        if keluar:
            label = nama or f"objek#{i}"
            raise CacatTataLetak(f"{label} keluar bingkai: " + "; ".join(keluar))


def tidak_bertindih(a, b, nama_a: str = "A", nama_b: str = "B", toleransi: float = 0.05):
    """Pastikan kotak batas dua objek tidak beririsan."""
    if a is None or b is None:
        return
    ak, aka, ab, aa = _kotak(a)
    bk, bka, bb, ba = _kotak(b)
    tumpang_x = min(aka, bka) - max(ak, bk)
    tumpang_y = min(aa, ba) - max(ab, bb)
    if tumpang_x > toleransi and tumpang_y > toleransi:
        raise CacatTataLetak(
            f"{nama_a} menindih {nama_b} "
            f"(irisan {tumpang_x:.2f} x {tumpang_y:.2f} satuan)"
        )


def periksa_adegan(zona: dict, pasangan: list | None = None, margin: float = 0.2):
    """Pemeriksaan sekali jalan.

    zona     : {"nama": mobject}, semua diperiksa agar muat di bingkai
    pasangan : [("nama_a", "nama_b"), ...], pasangan yang tidak boleh bertindih
    """
    for nama, m in zona.items():
        muat_di_bingkai(m, margin=margin, nama=nama)
    for a, b in pasangan or []:
        tidak_bertindih(zona.get(a), zona.get(b), a, b)
