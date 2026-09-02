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

from .tema import teks, LATAR, TINTA, REDUP, SOROT, UKURAN_JUDUL, UKURAN_KETERANGAN

# Batas aman bingkai 14,22 x 8, sisakan margin supaya qc tidak menolak.
LEBAR_JUDUL = 11.0
LEBAR_KETERANGAN = 10.5
LEBAR_UMUM = 12.5

# Jeda sengaja: cukup untuk bernapas, tidak sampai terasa video menggantung.
JEDA_MIN, JEDA_MAKS = 0.6, 1.6

# Toleransi kelebihan waktu sebelum render digagalkan (detik).
TOLERANSI_LEBIH = 0.15

# ---------------------------------------------------------------------------
# ZONA LAYAR (keputusan ARYA 2 Sep 2026 malam)
# ---------------------------------------------------------------------------
# Bingkai 14,22 x 8. Tiga jalur dipesan supaya teks tidak pernah lagi jatuh di
# atas animasinya:
#
#   kiri atas   PapanRumus, rumus yang dibangun bertahap
#   kanan atas  panel nilai (angka hidup, hasil hitungan)
#   bawah       TERLARANG. Itu jalur subtitle, dan menulis keterangan di sana
#               berarti dua kalimat berbeda untuk satu maksud yang sama.
#
# Sebabnya: sejak video punya subtitle penuh, `keterangan` di bawah layar
# mengulang apa yang sudah dibaca siswa di subtitle. ARYA: "jangan sampai anda
# menulis ulang keterangan tambahan lagi di bawah objeknya, karena akan menjadi
# double makna, membuat siswa bingung."
ZONA_RUMUS = (-6.85, -2.10, 1.25, 3.70)      # kiri, kanan, bawah, atas
ZONA_ANGKA = (2.10, 6.85, 1.25, 3.70)
ZONA_SUBTITLE = (-7.11, 7.11, -4.00, -2.55)   # jangan menaruh apa pun di sini


def pojok_rumus(mob, dalam: float = 0.12):
    """Tempelkan objek di pojok kiri atas ZONA_RUMUS, lalu kunci ke layar."""
    kiri, _, _, atas = ZONA_RUMUS
    mob.move_to([kiri + mob.get_width() / 2 + dalam,
                 atas - mob.get_height() / 2 - dalam, 0])
    return mob.fix_in_frame()


class PapanRumus:
    """Rumus yang DIBANGUN di depan mata, bukan muncul sudah jadi.

    Pola 3b1b yang diminta ARYA: sebelum sebuah pernyataan matematika muncul,
    penonton diberi tahu dari mana ia datang. Karena itu tiap langkah memakai
    `TransformMatchingTex`: potongan yang sudah ada BERPINDAH ke tempat barunya,
    dan yang benar-benar baru saja yang tumbuh. Mata tidak pernah kehilangan
    jejak "yang tadi itu yang mana".

    Dipakai dua cara:
      papan.tumbuh(r"(x-ar{x})^2", "dikuadratkan")   satu rumus membungkus
      papan.baris(r"median = 7")                       temuan ditumpuk
    """

    def __init__(self, scene, ukuran: float = 34, warna: str = TINTA):
        self.scene = scene
        self.ukuran = ukuran
        self.warna = warna
        self.utama = None          # rumus yang sedang tumbuh
        self.baris_lain = []       # temuan yang ditumpuk di bawahnya
        self.alasan = None

    # -- letak -------------------------------------------------------------
    def _taruh_utama(self, mob):
        return pojok_rumus(mob)

    def _taruh_baris(self, mob, ke_berapa):
        kiri, _, _, atas = ZONA_RUMUS
        y = atas - 0.12 - 0.62 * ke_berapa - mob.get_height() / 2
        mob.move_to([kiri + mob.get_width() / 2 + 0.12, y, 0])
        return mob.fix_in_frame()

    # -- dipakai adegan ----------------------------------------------------
    def tumbuh(self, isi_baru: str, alasan: str | None = None, run_time: float = 1.2):
        """Ganti rumus utama, potongan lama dipindahkan bukan dihapus."""
        from .tema import rumus as buat_rumus
        baru = self._taruh_utama(buat_rumus(isi_baru, self.ukuran, self.warna))
        if self.utama is None:
            self.scene.hud_tambah(baru)
            self.scene.play(FadeIn(baru, shift=0.2 * RIGHT), run_time=run_time)
        else:
            baru.fix_in_frame()
            self.scene.play(TransformMatchingTex(self.utama, baru), run_time=run_time)
        self.utama = baru
        if alasan:
            self._alasan(alasan)
        return baru

    def _alasan(self, kalimat: str, run_time: float = 0.5, lama: float = 1.0):
        """Satu kata kecil yang menyebut operasinya, lalu memudar sendiri."""
        t = teks(kalimat, 22, REDUP)
        t.next_to(self.utama, DOWN, buff=0.18).align_to(self.utama, LEFT)
        t.fix_in_frame()
        self.scene.hud_tambah(t)
        self.scene.play(FadeIn(t), run_time=run_time)
        self.scene.wait(lama)
        self.scene.play(FadeOut(t), run_time=run_time)
        self.alasan = None

    def waktu_alasan(self, run_time: float = 0.5, lama: float = 1.0) -> float:
        """Berapa detik `_alasan` memakan waktu, untuk dicatat ke babak."""
        return 2 * run_time + lama

    def baris(self, isi: str, warna: str | None = None, run_time: float = 0.8):
        """Tumpuk satu temuan baru di bawah temuan sebelumnya."""
        from .tema import rumus as buat_rumus
        m = buat_rumus(isi, self.ukuran - 2, warna or self.warna)
        self._taruh_baris(m, len(self.baris_lain))
        self.scene.hud_tambah(m)
        self.scene.play(FadeIn(m, shift=0.2 * RIGHT), run_time=run_time)
        self.baris_lain.append(m)
        return m

    def semua(self):
        """Semua objek papan, untuk diserahkan ke qc."""
        isi = list(self.baris_lain)
        if self.utama is not None:
            isi.append(self.utama)
        return VGroup(*isi) if isi else None


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
    # Tanpa alas (keputusan ARYA 2 Sep sore: tulisan saja, seperti Trigonometri).
    gugus = VGroup(t, garis).move_to([0, y, 0])
    gugus.fix_in_frame()

    scene.play(FadeIn(gugus, shift=UP * 0.25), run_time=naik)
    scene.wait(tahan)
    scene.play(FadeOut(gugus, shift=UP * 0.35), run_time=turun)


def keterangan(scene, kalimat: str, y: float = -3.30, ukuran: float = UKURAN_KETERANGAN,
               warna: str = TINTA, run_time: float = 0.6):
    """Satu baris keterangan di bawah layar, tulisan saja tanpa alas (seperti Trigonometri).

    Kata yang dipertegas ditandai `*kata*` di kalimatnya, tampil TEBAL (sama
    dengan penanda subtitle di naskah). Warna bawaan tinta gelap supaya tetap
    terbaca di atas tepi sungai atau lantai. Keterangan lama dihapus otomatis:
    disimpan pada objek adegan (`scene._matra_keterangan`). Catat waktunya:
    `b.catat(run_time)`.
    """
    baru = batasi_lebar(teks(kalimat, ukuran, warna), LEBAR_KETERANGAN)
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
