"""Gerakan kamera dan tata teks bersama untuk SEMUA video MATRA.

Ditulis sekali, dipakai tujuh kali. Tanpa berkas ini tiap adegan menulis ulang
hal yang sama — dan mengulang cacat yang sama.

Aturan yang dipaksakan di sini (dipungut dari membedah dua repo rujukan pada
31 Agu 2026: Elteoremadebeethoven/AnimationsWithManim dan HarleyCoops/Math-To-Manim):

1. LEBAR DIBATASI, BUKAN DIPERIKSA BELAKANGAN.
   `qc.py` menangkap teks yang sudah terlanjur keluar bingkai. Di sini teks
   dipaksa muat sejak dibuat. Mencegah lebih murah daripada mengulang render.

2. PALING BANYAK DUA BLOK TEKS YANG HARUS DIBACA.
   Judul pembuka muncul lalu MEMUDAR, jadi ia tidak ikut menghitung setelah
   detik-detik awal. Label sumbu dan nama sisi bukan "blok teks" — itu bagian
   dari gambar; yang dibatasi adalah kalimat yang menuntut dibaca.

3. KETERANGAN MENGGANTI DIRINYA SENDIRI.
   `keterangan()` menghapus keterangan sebelumnya secara otomatis. Tanpa itu
   teks menumpuk diam-diam dan baru ketahuan saat menonton hasil render.

4. WAKTU TIAP BABAK DIHITUNG MESIN, BUKAN DIJUMLAH TANGAN.
   `babak()` menutup sendiri sisa waktunya agar gambar dan suara tetap sejajar,
   dan MENGGAGALKAN render kalau animasi melewati durasi narasinya.

5. ANGKA MEMAKAI KOMA.
   Konvensi Indonesia. `AngkaKoma` menggantikan `DecimalNumber` di mana pun.
"""

from __future__ import annotations

from contextlib import contextmanager

from manim import *

# Batas aman bingkai 14,22 x 8 — sisakan margin supaya qc.py tidak menolak.
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
    """Angka dengan koma desimal — konvensi Indonesia, bukan titik.

    `edge_to_fix` bawaannya LEFT, jadi tepi kirinya tidak bergeser saat lebar
    angkanya berubah. Itu yang membuat panel angka tidak bergoyang.

    JANGAN mengganti titik dengan `{,}` walaupun itu cara LaTeX yang "benar"
    untuk membuang spasi setelah koma. `DecimalNumber` menghitung posisi tiap
    glyph dari PANJANG STRING-nya: `"+0{,}42"` dibaca sebagai 7 glyph padahal
    LaTeX hanya menggambar 5, jadi ketujuh posisi dijejalkan ke lima bentuk dan
    angkanya bertumpuk. Terlihat di lembar kontak render uji 31 Agu 2026 —
    lebarnya terjepit 0,68 satuan dari seharusnya 1,20.

    Koma biasa aman: satu karakter, satu glyph. Spasi tipis bawaan LaTeX tidak
    berpengaruh karena `DecimalNumber` menata ulang jarak glyphnya sendiri.
    """

    def _get_num_string(self, value):
        return super()._get_num_string(value).replace(".", ",")


# ---------------------------------------------------------------------------
# Teks
# ---------------------------------------------------------------------------

def batasi_lebar(mob: Mobject, maks: float = LEBAR_UMUM) -> Mobject:
    """Kecilkan objek kalau lebih lebar dari `maks`. Dipanggil sebelum tampil."""
    if mob.width > maks:
        mob.set(width=maks)
    return mob


def judul_pembuka(scene: Scene, teks: str, tema, lama: float,
                  ukuran: int = 54) -> None:
    """Pernyataan pembuka satu layar: gagasannya dulu, lambangnya belakangan.

    Judul ini MEMUDAR setelah selesai. Panggung ditinggalkan bersih supaya
    sisa video hanya berisi gambar dan satu panel angka.
    `lama` = seluruh jatah waktu (muncul + tahan + memudar).
    """
    naik = min(1.0, lama * 0.30)
    turun = min(0.7, lama * 0.22)
    tahan = max(lama - naik - turun, 0.0)

    t = Text(teks, font_size=ukuran, color=tema.tinta)
    batasi_lebar(t, LEBAR_JUDUL)
    garis = Line(LEFT * t.width * 0.30, RIGHT * t.width * 0.30,
                 color=tema.sorot, stroke_width=3)
    garis.next_to(t, DOWN, buff=0.42)
    gugus = VGroup(t, garis).move_to(ORIGIN)

    scene.play(FadeIn(gugus, shift=UP * 0.25), run_time=naik)
    scene.wait(tahan)
    scene.play(FadeOut(gugus, shift=UP * 0.35), run_time=turun)


def keterangan(scene: Scene, teks: str, tema, y: float = -3.30,
               ukuran: int = 26, warna=None, run_time: float = 0.6) -> Text:
    """Satu baris keterangan di bawah. Keterangan lama dihapus otomatis.

    Referensi menyimpan keterangan aktif pada objek adegan; pola itu ditiru
    karena ia satu-satunya cara mencegah teks menumpuk tanpa disadari.
    """
    baru = Text(teks, font_size=ukuran, color=warna or tema.redup)
    batasi_lebar(baru, LEBAR_KETERANGAN)
    baru.move_to([0, y, 0])
    baru.set_opacity(0)

    lama = getattr(scene, "_matra_keterangan", None)
    if lama is not None:
        scene.play(FadeOut(lama), baru.animate.set_opacity(1), run_time=run_time)
    else:
        scene.play(baru.animate.set_opacity(1), run_time=run_time)
    scene._matra_keterangan = baru
    return baru


def hapus_keterangan(scene: Scene, run_time: float = 0.4) -> None:
    lama = getattr(scene, "_matra_keterangan", None)
    if lama is not None:
        scene.play(FadeOut(lama), run_time=run_time)
        scene._matra_keterangan = None


def nilai_hidup(label: Mobject, angka: DecimalNumber, di, buff: float = 0.18) -> VGroup:
    """Rakit "label + angka berubah" supaya angkanya tidak melayang.

    `align_to(..., DOWN)` menyamakan garis dasar keduanya. Tanpa itu angka
    tampak naik-turun terhadap labelnya — cacat kecil yang terlihat mahal.
    """
    gugus = VGroup(label, angka)
    angka.next_to(label, RIGHT, buff=buff)
    angka.align_to(label, DOWN)
    gugus.move_to(di)
    return gugus


# ---------------------------------------------------------------------------
# Menyorot bagian rumus
# ---------------------------------------------------------------------------

def sorot_bagian(scene: Scene, rumus: MathTex, bagian: Mobject, tema,
                 warna=None, redup: float = 0.28, run_time: float = 0.8):
    """Redupkan seluruh rumus, nyalakan SATU bagian, beri kotak.

    Bagian diambil lewat `rumus.get_part_by_tex(...)` atau indeks argumen —
    JANGAN dengan mengiris karakter (`rumus[0][3:8]`). Pengirisan karakter
    itulah yang dulu membuat kata tampil belang setengah warna.
    """
    warna = warna or tema.sorot
    lain = [m for m in rumus.family_members_with_points()
            if m not in bagian.family_members_with_points()]
    kotak = SurroundingRectangle(bagian, color=warna, buff=0.12,
                                 stroke_width=2.5, corner_radius=0.06)
    scene.play(
        *[m.animate.set_opacity(redup) for m in lain],
        bagian.animate.set_color(warna).set_opacity(1.0),
        Create(kotak), run_time=run_time,
    )
    return kotak


def lepas_sorot(scene: Scene, rumus: MathTex, kotak: Mobject,
                run_time: float = 0.6) -> None:
    scene.play(rumus.animate.set_opacity(1.0), FadeOut(kotak), run_time=run_time)


# ---------------------------------------------------------------------------
# Waktu
# ---------------------------------------------------------------------------

class Babak:
    """Satu segmen narasi. Mencatat waktu terpakai dan menutup sisanya sendiri."""

    def __init__(self, scene: Scene, nama: str, lama: float):
        self.scene, self.nama, self.lama = scene, nama, lama
        self.terpakai = 0.0

    def main(self, *animasi, run_time: float = 1.0, **kw) -> None:
        self.scene.play(*animasi, run_time=run_time, **kw)
        self.terpakai += run_time

    def catat(self, lama: float) -> None:
        """Catat waktu yang dipakai di luar `main` — misalnya `judul_pembuka`,
        yang menjalankan play-wait-play sendiri."""
        self.terpakai += lama

    def jeda(self, lama: float = 0.8) -> None:
        """Diam yang disengaja — dibatasi supaya tidak jadi waktu mati."""
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
                f"melewati narasi {self.lama:.2f} detik "
                f"(kelebihan {-sisa:.2f}). Gambar akan mendahului suara — "
                f"pendekkan animasinya atau panjangkan kalimat narasinya."
            )
        if sisa > 0:
            self.scene.wait(sisa)


@contextmanager
def babak(scene: Scene, nama: str, durasi: dict[str, float]):
    """Pakai: `with sinema.babak(self, "buka", DURASI) as b: b.main(...)`."""
    if nama not in durasi:
        raise KeyError(
            f"segmen '{nama}' tidak ada di durasi.json. "
            f"Yang tersedia: {', '.join(durasi)}"
        )
    b = Babak(scene, nama, durasi[nama])
    yield b
    b.tutup()
