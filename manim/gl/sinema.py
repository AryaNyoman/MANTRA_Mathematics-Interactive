"""Gerakan waktu dan tata teks bersama untuk SEMUA video MATRA (versi ManimGL).

Aturan yang dipaksakan di sini (warisan dari perkakas lama, 31 Agu 2026):
1. LEBAR DIBATASI SEJAK DIBUAT, bukan diperiksa belakangan.
2. PALING BANYAK DUA BLOK TEKS yang harus dibaca: judul pembuka memudar,
   keterangan mengganti dirinya sendiri.
3. WAKTU TIAP BABAK DIHITUNG MESIN dari `durasi.json`; `babak()` menutup sisa
   waktunya dengan `wait` (updater tetap hidup) dan MENGGAGALKAN render kalau
   animasi melewati narasi.
4. ANGKA MEMAKAI KOMA (`AngkaKoma`).
5. Teks yang harus dibaca MENEMPEL DI LAYAR (`fix_in_frame`) walau kamera terbang.
"""

from contextlib import contextmanager

from manimlib import *

from .tema import teks, LATAR, REDUP, SOROT, UKURAN_JUDUL, UKURAN_KETERANGAN

# Batas aman bingkai 14,22 x 8, sisakan margin supaya qc tidak menolak.
LEBAR_JUDUL = 11.0
LEBAR_KETERANGAN = 10.5
LEBAR_UMUM = 12.5

# Jeda sengaja: cukup untuk bernapas, tidak sampai terasa video menggantung.
JEDA_MIN, JEDA_MAKS = 0.6, 1.6

# Toleransi kelebihan waktu sebelum render digagalkan (detik).
TOLERANSI_LEBIH = 0.15


class WaktuTidakMuat(AssertionError):
    """Animasi satu babak melebihi durasi narasinya. Sengaja menggagalkan render."""


class AngkaKoma(DecimalNumber):
    """Angka desimal dengan koma (konvensi Indonesia). Digambar LaTeX per karakter.

    `edge_to_fix` bawaannya LEFT: tepi kiri tidak bergeser saat lebar berubah,
    jadi panel angka tidak bergoyang.
    """

    def get_num_string(self, number):
        return super().get_num_string(number).replace(".", ",")


# ---------------------------------------------------------------------------
# Teks
# ---------------------------------------------------------------------------

def batasi_lebar(mob, maks: float = LEBAR_UMUM):
    """Kecilkan objek kalau lebih lebar dari `maks`. Dipanggil sebelum tampil."""
    if mob.get_width() > maks:
        mob.set_width(maks)
    return mob


def alas_teks(mob, buff: float = 0.16, opacity: float = 0.82):
    """Alas krem tembus pandang di belakang teks supaya terbaca di atas dunia 3D apa pun."""
    alas = BackgroundRectangle(mob, color=LATAR, fill_opacity=opacity, buff=buff)
    return VGroup(alas, mob)


def judul_pembuka(scene, kalimat: str, lama: float, ukuran: float = UKURAN_JUDUL,
                  y: float = 0.0) -> None:
    """Pernyataan pembuka satu layar, lalu MEMUDAR. `lama` = muncul + tahan + memudar.

    Menempel di layar, jadi boleh dipakai walau kamera sedang di sudut 3D.
    `y` menggeser judul (mis. 2,4) supaya tidak menusuk benda di tengah layar.
    Catat waktunya ke babak dengan `b.catat(lama)`.
    """
    naik = min(1.0, lama * 0.30)
    turun = min(0.7, lama * 0.22)
    tahan = max(lama - naik - turun, 0.0)

    t = batasi_lebar(teks(kalimat, ukuran), LEBAR_JUDUL)
    garis = Line(LEFT * t.get_width() * 0.30, RIGHT * t.get_width() * 0.30)
    garis.set_stroke(SOROT, width=3)
    garis.next_to(t, DOWN, buff=0.42)
    gugus = alas_teks(VGroup(t, garis), buff=0.3).move_to([0, y, 0])
    gugus.fix_in_frame()

    scene.play(FadeIn(gugus, shift=UP * 0.25), run_time=naik)
    scene.wait(tahan)
    scene.play(FadeOut(gugus, shift=UP * 0.35), run_time=turun)


def keterangan(scene, kalimat: str, y: float = -3.30, ukuran: float = UKURAN_KETERANGAN,
               warna: str = REDUP, run_time: float = 0.6):
    """Satu baris keterangan di bawah layar. Keterangan lama dihapus otomatis.

    Disimpan pada objek adegan (`scene._matra_keterangan`), satu-satunya cara
    mencegah teks menumpuk tanpa disadari. Catat waktunya: `b.catat(run_time)`.
    """
    baru = alas_teks(batasi_lebar(teks(kalimat, ukuran, warna), LEBAR_KETERANGAN))
    baru.move_to([0, y, 0]).fix_in_frame()

    lama = getattr(scene, "_matra_keterangan", None)
    if lama is not None:
        scene.play(FadeOut(lama), FadeIn(baru), run_time=run_time)
    else:
        scene.play(FadeIn(baru), run_time=run_time)
    scene._matra_keterangan = baru
    return baru


def hapus_keterangan(scene, run_time: float = 0.4) -> None:
    lama = getattr(scene, "_matra_keterangan", None)
    if lama is not None:
        scene.play(FadeOut(lama), run_time=run_time)
        scene._matra_keterangan = None


def nilai_hidup(label, angka: DecimalNumber, di, buff: float = 0.18) -> VGroup:
    """Rakit "label + angka berubah" supaya angkanya tidak melayang dari labelnya."""
    gugus = VGroup(label, angka)
    angka.next_to(label, RIGHT, buff=buff)
    angka.align_to(label, DOWN)
    gugus.move_to(di)
    return gugus


# ---------------------------------------------------------------------------
# Menyorot bagian rumus
# ---------------------------------------------------------------------------

def sorot_bagian(scene, rumus: Tex, bagian, warna: str = SOROT,
                 redup: float = 0.28, run_time: float = 0.8):
    """Redupkan seluruh rumus, nyalakan SATU bagian, beri kotak.

    Bagian diambil lewat `rumus.get_part_by_tex("...")`, BUKAN dengan mengiris
    karakter. Pengirisan karakter membuat kata tampil belang setengah warna.
    """
    lain = [m for m in rumus.family_members_with_points()
            if m not in bagian.family_members_with_points()]
    kotak = SurroundingRectangle(bagian, buff=0.12, color=warna)
    kotak.set_stroke(warna, width=2.5)
    if rumus.is_fixed_in_frame():
        kotak.fix_in_frame()
    scene.play(
        *[m.animate.set_opacity(redup) for m in lain],
        bagian.animate.set_color(warna).set_opacity(1.0),
        ShowCreation(kotak), run_time=run_time,
    )
    return kotak


def lepas_sorot(scene, rumus: Tex, kotak, run_time: float = 0.6) -> None:
    scene.play(rumus.animate.set_opacity(1.0), FadeOut(kotak), run_time=run_time)


# ---------------------------------------------------------------------------
# Waktu
# ---------------------------------------------------------------------------

class Babak:
    """Satu segmen narasi. Mencatat waktu terpakai dan menutup sisanya sendiri."""

    def __init__(self, scene, nama: str, lama: float):
        self.scene, self.nama, self.lama = scene, nama, lama
        self.terpakai = 0.0

    def main(self, *animasi, run_time: float = 1.0, **kw) -> None:
        self.scene.play(*animasi, run_time=run_time, **kw)
        self.terpakai += run_time

    def catat(self, lama: float) -> None:
        """Catat waktu yang dipakai di luar `main` (judul_pembuka, keterangan)."""
        self.terpakai += lama

    def jeda(self, lama: float = 0.8) -> None:
        """Diam yang disengaja, dibatasi supaya tidak jadi waktu mati. Updater tetap jalan."""
        lama = float(np.clip(lama, JEDA_MIN, JEDA_MAKS))
        self.scene.wait(lama)
        self.terpakai += lama

    @property
    def sisa(self) -> float:
        return self.lama - self.terpakai

    def tutup(self) -> None:
        sisa = self.sisa
        if sisa < -TOLERANSI_LEBIH:
            raise WaktuTidakMuat(
                f"babak '{self.nama}': animasi {self.terpakai:.2f} detik "
                f"melewati narasi {self.lama:.2f} detik (kelebihan {-sisa:.2f}). "
                f"Gambar akan mendahului suara: pendekkan animasinya atau "
                f"panjangkan kalimat narasinya."
            )
        if sisa > 0:
            self.scene.wait(sisa)


@contextmanager
def babak(scene, nama: str, durasi: dict):
    """Pakai: `with sinema.babak(self, "buka", DURASI) as b: b.main(...)`."""
    if nama not in durasi:
        raise KeyError(f"segmen '{nama}' tidak ada di durasi.json. Yang tersedia: {', '.join(durasi)}")
    b = Babak(scene, nama, durasi[nama])
    yield b
    b.tutup()
