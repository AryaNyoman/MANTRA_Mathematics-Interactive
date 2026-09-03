"""Gerakan waktu dan tata teks bersama untuk SEMUA video MATRA (ManimGL), versi 2.

Versi 2 lahir dari sepuluh keputusan ARYA pada 2 September 2026 malam, setelah
empat sesi mengulang kesalahan yang sama. Aturan yang DIPAKSAKAN di sini:

1. ZONA LAYAR dikunci untuk semua topik:
     kiri atas   = identitas benda (`identitas`), kecil, menetap
     kanan atas  = rumus dan hitungan (`PapanRumus`, `lahir_rumus`, `ganti_rumus`)
     kaki layar  = MILIK SUBTITLE, tidak boleh ada apa pun (`qc` menjaganya)
     dalam gambar= label MAKSIMAL DUA KATA yang menempel di bendanya (`label`)
   `keterangan` di kaki layar DIHAPUS: maknanya dobel dengan subtitle.
2. RUMUS BARU LAHIR DI TEMPAT MATA MENATAP: besar, dekat bendanya, dunia
   diredupkan sebentar, lalu terbang mengecil ke panel kanan atas (`lahir_rumus`).
3. RUMUS BERUBAH DENGAN MORPH LAMBANG PER LAMBANG (`ganti_rumus`,
   TransformMatchingStrings), bukan fade out lalu fade in, bukan
   ReplacementTransform mentah (coretan kembar kalau jumlah lambang beda).
4. WAKTU TIAP BABAK DIHITUNG MESIN dari `durasi.json`; `babak()` menutup sisa
   waktu dengan `wait` dan MENGGAGALKAN render kalau animasi melewati narasi.
   Untuk segmen yang menyebut beberapa hal berurutan, ikat animasinya ke JAM
   KALIMAT subtitle (`jam_subtitle`, `mulai`, `b.tunggu_sampai`).
5. ANGKA MEMAKAI KOMA (`AngkaKoma`). Teks HUD menempel di layar (`fix_in_frame`).
"""

import re
from contextlib import contextmanager
from pathlib import Path

from manimlib import *

from .tema import teks, rumus, TINTA, REDUP, SOROT, LATAR, UKURAN_JUDUL, UKURAN_LABEL

AKAR = Path(__file__).resolve().parents[2]

# Batas aman bingkai 14,22 x 8, sisakan margin supaya qc tidak menolak.
LEBAR_JUDUL = 11.0
LEBAR_UMUM = 12.5

# Jeda sengaja: cukup untuk bernapas, tidak sampai terasa video menggantung.
JEDA_MIN, JEDA_MAKS = 0.6, 1.6

# Toleransi kelebihan waktu sebelum render digagalkan (detik).
TOLERANSI_LEBIH = 0.15

# ---------------------------------------------------------------------------
# ZONA LAYAR (keputusan ARYA 2 Sep 2026 malam, berlaku SEMUA topik)
# ---------------------------------------------------------------------------
ZONA_IDENTITAS = (-6.85, -2.10, 2.40, 3.70)   # kiri, kanan, bawah, atas
ZONA_RUMUS = (2.10, 6.85, 1.10, 3.70)
ZONA_SUBTITLE = (-7.11, 7.11, -4.00, -2.55)   # jangan menaruh apa pun di sini
LABEL_MAKS_KATA = 2


class WaktuTidakMuat(AssertionError):
    """Animasi satu babak melebihi durasi narasinya. Sengaja menggagalkan render."""


class AturanDilanggar(AssertionError):
    """Adegan memakai sesuatu yang dilarang standar. Sengaja menggagalkan render."""


class AngkaKoma(DecimalNumber):
    """Angka desimal dengan koma (konvensi Indonesia). Digambar LaTeX per karakter.

    `edge_to_fix` bawaannya LEFT: tepi kiri tidak bergeser saat lebar berubah,
    jadi panel angka tidak bergoyang.
    """

    def get_num_string(self, number):
        return super().get_num_string(number).replace(".", ",")


# ---------------------------------------------------------------------------
# Proyeksi kecil: titik dunia ke koordinat layar (untuk menaruh HUD dekat benda)
# ---------------------------------------------------------------------------

def ke_layar(frame, titik_atau_mob):
    """Koordinat layar (satuan bingkai) dari titik dunia atau pusat sebuah objek."""
    p = titik_atau_mob.get_center() if hasattr(titik_atau_mob, "get_center") else np.array(titik_atau_mob, dtype=float)
    if hasattr(titik_atau_mob, "is_fixed_in_frame") and titik_atau_mob.is_fixed_in_frame():
        return p
    rot = frame.get_inverse_camera_rotation_matrix()
    q = (p - frame.get_center()) @ rot.T
    q = q * (FRAME_HEIGHT / frame.get_height())
    return np.array([q[0], q[1], 0.0])


# ---------------------------------------------------------------------------
# Teks
# ---------------------------------------------------------------------------

def batasi_lebar(mob, maks: float = LEBAR_UMUM):
    """Kecilkan objek kalau lebih lebar dari `maks`. Dipanggil sebelum tampil."""
    if mob.get_width() > maks:
        mob.set_width(maks)
    return mob


def _jumlah_kata(kalimat: str) -> int:
    """Kata = potongan berhuruf. Angka dan lambang (`x = 1`, `3`, `km`?) tidak dihitung?

    Aturan ARYA: "maksimal dua kata; rumus seperti x = 1 dihitung satu lambang".
    Potongan yang tidak mengandung huruf (angka, tanda) tidak dihitung, jadi
    "naik 1" = 1 kata, "dayung 3 km" = 2 kata, "x = 1" = 0 kata (lolos).
    """
    bersih = re.sub(r"\\[A-Za-z]+", " ", kalimat.replace("*", ""))
    return sum(1 for p in bersih.split() if re.search(r"[A-Za-z]", p))


def label(kalimat: str, ukuran: float = UKURAN_LABEL, warna: str = TINTA):
    """Label pendek DI DALAM GAMBAR, maksimal dua kata, untuk ditempel ke benda.

    Render GAGAL kalau lebih dari dua kata (keputusan ARYA: "singkat, padat,
    2 kata maksimal", dijaga mesin bukan ingatan). Pakai lalu tempelkan:
    `sinema.label("naik 1").next_to(titik, UP, buff=0.15)`.
    """
    n = _jumlah_kata(kalimat)
    if n > LABEL_MAKS_KATA:
        raise AturanDilanggar(
            f"label '{kalimat}' berisi {n} kata; batasnya {LABEL_MAKS_KATA}. "
            f"Kalimat panjang milik narasi dan subtitle, bukan gambar.")
    return teks(kalimat, ukuran, warna)


_TEPI_X, _TEPI_Y = FRAME_WIDTH / 2, FRAME_HEIGHT / 2
# Sisi alas yang jaraknya kurang dari ini dari tepi layar DIRAPATKAN sampai
# tepi. Tanpa itu tersisa pita petak tipis di luar alas, dan alasnya terbaca
# sebagai stiker yang ditempel, bukan panel sudut. Terlihat di lembar kontak
# 4 Sep.
_RAPAT = 0.85


def _kotak_alas(kiri, kanan, bawah, atas):
    """Persegi panjang warna kertas, sisinya dirapatkan ke tepi layar.

    Ditandai `dekorasi` supaya `qc` tidak ikut mengukurnya: yang diukur
    gerbang adalah tulisannya, dan tulisan itu selalu di dalam zona HUD.
    """
    if kiri - (-_TEPI_X) < _RAPAT:
        kiri = -_TEPI_X
    if _TEPI_X - kanan < _RAPAT:
        kanan = _TEPI_X
    if bawah - (-_TEPI_Y) < _RAPAT:
        bawah = -_TEPI_Y
    if _TEPI_Y - atas < _RAPAT:
        atas = _TEPI_Y
    r = Rectangle(width=max(kanan - kiri, 0.05), height=max(atas - bawah, 0.05))
    r.set_stroke(width=0).set_fill(LATAR, 1.0)
    r.move_to([(kiri + kanan) / 2, (bawah + atas) / 2, 0])
    r.dekorasi = True
    return r


def alas_hud(scene, mob, pad_x: float = 0.18, pad_y: float = 0.14):
    """Alas warna kertas di BELAKANG tulisan HUD, supaya ia tetap terbaca
    walaupun bidang koordinat lewat di bawahnya.

    Kenapa ada: tanpa ini, satu-satunya cara menjaga tulisan HUD dari garis
    petak adalah MEMESAN jalur layar lewat `kamera.muat_datar(sisa_atas=,
    sisa_kanan=)`, dan pesanan itu menyusutkan bidangnya 12 sampai 15
    persen. Dengan alas, bidang boleh kembali memenuhi layar dan tulisannya
    tetap bersih. Temuan Vektor 4 Sep.

    Kepekatannya PENUH, bukan setengah: yang setengah masih meloloskan garis
    petak samar di belakang angka, dan itu persis keluhan yang mau dihapus.
    Warnanya sama dengan latar, jadi di tempat kosong ia tak terlihat.
    """
    r = _kotak_alas(mob.get_left()[0] - pad_x, mob.get_right()[0] + pad_x,
                    mob.get_bottom()[1] - pad_y, mob.get_top()[1] + pad_y)
    scene.hud_tambah(r)
    scene.bring_to_front(mob)
    # Penanda untuk `qc.periksa_adegan`: yang beralas boleh berdiri di atas
    # benda dunia, sebab alasnya menutup petak di belakangnya.
    mob.beralas = True
    r.beralas = True
    return r


def identitas(scene, *baris: str, ukuran: float = 24, warna: str = REDUP,
              alas: bool = False):
    """Identitas benda di pojok KIRI ATAS, kecil, menetap sepanjang video.

    Contoh: `identitas(self, "p = l = t = 6 satuan")` atau
    `identitas(self, "sungai = 3 km", "1 petak = 1 km")`. Kembalikan VGroup
    yang sudah menempel di layar dan sudah ditambahkan ke adegan.
    """
    kiri, kanan, bawah, atas = ZONA_IDENTITAS
    g = VGroup(*[teks(b, ukuran, warna) for b in baris])
    g.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
    batasi_lebar(g, kanan - kiri - 0.2)
    g.move_to([kiri + g.get_width() / 2 + 0.1, atas - g.get_height() / 2 - 0.1, 0])
    scene.hud_tambah(g)
    if alas:
        # Dikembalikan sebagai SATU kelompok supaya `set_opacity` dan
        # `FadeOut` di adegan mengenai alas dan tulisannya sekaligus.
        kelompok = VGroup(alas_hud(scene, g), g)
        kelompok.beralas = True
        return kelompok
    return g


def judul_pembuka(scene, kalimat: str, lama: float, ukuran: float = UKURAN_JUDUL,
                  y: float = 2.4) -> None:
    """Judul materi ("Materi 03: Komponen vektor"), muncul lalu MEMUDAR.

    `lama` = muncul + tahan + memudar. Menempel di layar. Bawaannya di atas
    (y = 2,4) supaya tidak menusuk benda di tengah layar. Catat waktunya:
    `b.catat(lama)`. Babak pembuka sebaiknya HANYA judul (pola Trigonometri).
    """
    naik = min(1.0, lama * 0.30)
    turun = min(0.7, lama * 0.22)
    tahan = max(lama - naik - turun, 0.0)

    t = batasi_lebar(teks(kalimat, ukuran), LEBAR_JUDUL)
    garis = Line(LEFT * t.get_width() * 0.30, RIGHT * t.get_width() * 0.30)
    garis.set_stroke(SOROT, width=3)
    garis.next_to(t, DOWN, buff=0.42)
    gugus = VGroup(t, garis).move_to([0, y, 0])
    gugus.fix_in_frame()

    scene.play(FadeIn(gugus, shift=UP * 0.25), run_time=naik)
    scene.wait(tahan)
    scene.play(FadeOut(gugus, shift=UP * 0.35), run_time=turun)


def keterangan(*args, **kwargs):
    """DIHAPUS (ARYA 2 Sep malam). Kaki layar milik subtitle; maknanya dobel."""
    raise AturanDilanggar(
        "sinema.keterangan dihapus: kaki layar milik subtitle dan keterangan mengulang "
        "narasi. Pakai sinema.label (maks 2 kata, menempel di benda) atau "
        "sinema.identitas (pojok kiri atas), dan biarkan narasi + subtitle yang bicara.")


def hapus_keterangan(*args, **kwargs):
    raise AturanDilanggar("sinema.keterangan sudah dihapus, tidak ada yang perlu dihapus.")


def nilai_hidup(label_mob, angka: DecimalNumber, di, buff: float = 0.18) -> VGroup:
    """Rakit "label + angka berubah" supaya angkanya tidak melayang dari labelnya."""
    gugus = VGroup(label_mob, angka)
    angka.next_to(label_mob, RIGHT, buff=buff)
    angka.align_to(label_mob, DOWN)
    gugus.move_to(di)
    return gugus


# ---------------------------------------------------------------------------
# Panel rumus KANAN ATAS: dibangun bertahap, lahir dekat benda, morph per lambang
# ---------------------------------------------------------------------------

def _tirai(opacity: float = 0.82):
    """Tirai krem menempel di layar untuk meredupkan dunia saat rumus lahir."""
    t = FullScreenRectangle().set_fill(LATAR, opacity).set_stroke(width=0)
    t.fix_in_frame()
    return t


class PapanRumus:
    """Rumus dan hitungan di KANAN ATAS, dibangun di depan mata, bukan muncul jadi.

    Dibuat sesi Statistika (2 Sep) untuk pola 3b1b, dipindah MASTER ke kanan atas
    sesuai keputusan ARYA (kiri atas milik identitas benda).

      papan.tumbuh(r"(x-\\bar{x})^2", "dikuadratkan")  rumus utama berubah (morph)
      papan.baris(r"\\bar{x} = 7")                     temuan ditumpuk di bawahnya
      papan.terima(mob)                                 rumus dari `lahir_rumus`
      papan.semua()                                     untuk diserahkan ke qc
    """

    def __init__(self, scene, ukuran: float = 34, warna: str = TINTA,
                 tanpa_utama: bool = False, alas: bool = False):
        self.scene = scene
        self.ukuran = ukuran
        self.warna = warna
        self.tanpa_utama = tanpa_utama
        self.pakai_alas = alas
        self.alas = None
        self.ikutan = []
        self.utama = None
        self.baris_lain = []

    def _isi(self):
        """Barisnya saja, TANPA alas. Dipakai untuk mengukur alasnya sendiri."""
        isi = list(self.baris_lain) + list(self.ikutan)
        if self.utama is not None:
            isi.append(self.utama)
        return VGroup(*isi) if isi else None

    def ikut(self, *mobs):
        """Baris HUD di LUAR papan yang ikut memakai alas papan.

        Dipakai untuk angka hidup seperti "panjang 5,00" yang letaknya di
        bawah papan. Kalau ia diberi alas sendiri, tersisa belang petak
        terjepit di antara dua alas, dan itu terlihat seperti cacat.
        """
        self.ikutan.extend(mobs)
        self.perbarui_alas()
        return mobs[0] if len(mobs) == 1 else mobs

    def perbarui_alas(self):
        """Lebarkan alas kertas mengikuti baris yang ada sekarang."""
        if not self.pakai_alas:
            return
        isi = self._isi()
        if isi is None:
            return
        baru = _kotak_alas(isi.get_left()[0] - 0.18, isi.get_right()[0] + 0.18,
                           isi.get_bottom()[1] - 0.14, isi.get_top()[1] + 0.14)
        if self.alas is None:
            self.alas = baru
            self.scene.hud_tambah(self.alas)
        else:
            self.alas.set_width(baru.get_width(), stretch=True)
            self.alas.set_height(baru.get_height(), stretch=True)
            self.alas.move_to(baru.get_center())
        self.alas.dekorasi = True
        # Alas dibuat SESUDAH baris pertama ada, jadi urutan gambarnya harus
        # dibalik secara eksplisit; kalau tidak, ia menutupi barisnya sendiri.
        self.alas.beralas = True
        for m in isi:
            m.beralas = True
            self.scene.bring_to_front(m)

    # -- letak -------------------------------------------------------------
    def tempat_utama(self, mob):
        kiri, kanan, bawah, atas = ZONA_RUMUS
        batasi_lebar(mob, kanan - kiri - 0.2)
        mob.move_to([kanan - mob.get_width() / 2 - 0.12, atas - mob.get_height() / 2 - 0.12, 0])
        return mob.fix_in_frame()

    def tempat_baris(self, mob, ke_berapa: int):
        """Slot 0 (paling atas) SELALU dipesan untuk rumus utama, baris mulai slot 1.

        Temuan Vektor dan Statistika 3 Sep: dulu baris pertama menempati slot
        teratas selama utama masih kosong, lalu `tumbuh()` menaruh utama di slot
        yang sama dan keduanya bertindih. Papan yang memang tanpa rumus utama
        boleh memakai `PapanRumus(scene, tanpa_utama=True)` supaya slot 0 dipakai.
        """
        kiri, kanan, bawah, atas = ZONA_RUMUS
        batasi_lebar(mob, kanan - kiri - 0.2)
        geser = 0 if self.tanpa_utama else 1
        y = atas - 0.12 - 0.62 * (ke_berapa + geser) - mob.get_height() / 2
        mob.move_to([kanan - mob.get_width() / 2 - 0.12, y, 0])
        return mob.fix_in_frame()

    # -- dipakai adegan ----------------------------------------------------
    def tumbuh(self, isi_baru: str, alasan: str | None = None, run_time: float = 1.2,
               key_map: dict | None = None):
        """Ganti rumus utama dengan MORPH: lambang lama berpindah, yang baru tumbuh."""
        baru = self.tempat_utama(rumus(isi_baru, self.ukuran, self.warna))
        if self.utama is None:
            self.scene.hud_tambah(baru)
            self.scene.play(FadeIn(baru, shift=0.2 * LEFT), run_time=run_time)
        else:
            self.scene.play(TransformMatchingStrings(self.utama, baru, key_map=key_map or {}),
                            run_time=run_time)
        self.utama = baru
        if alasan:
            self._alasan(alasan)
        return baru

    def _alasan(self, kalimat: str, run_time: float = 0.5, lama: float = 1.0):
        """Satu kata kecil (maks 2 kata) yang menyebut operasinya, lalu memudar."""
        t = label(kalimat, 22, REDUP)
        t.next_to(self.utama, DOWN, buff=0.18).align_to(self.utama, RIGHT)
        t.fix_in_frame()
        self.scene.hud_tambah(t)
        self.scene.play(FadeIn(t), run_time=run_time)
        self.scene.wait(lama)
        self.scene.play(FadeOut(t), run_time=run_time)

    def waktu_alasan(self, run_time: float = 0.5, lama: float = 1.0) -> float:
        return 2 * run_time + lama

    def baris(self, isi: str, warna: str | None = None, run_time: float = 0.8):
        """Tumpuk satu temuan baru di bawah yang sudah ada."""
        m = rumus(isi, self.ukuran - 2, warna or self.warna)
        self.tempat_baris(m, len(self.baris_lain))
        self.scene.hud_tambah(m)
        self.baris_lain.append(m)
        self.perbarui_alas()
        self.scene.play(FadeIn(m, shift=0.2 * LEFT), run_time=run_time)
        return m

    def terima(self, mob, sebagai_utama: bool = True):
        """Daftarkan rumus yang sudah ada di panel (hasil `lahir_rumus`)."""
        if sebagai_utama:
            self.utama = mob
        else:
            self.baris_lain.append(mob)
        return mob

    def ganti(self, lama, baru):
        """Catat bahwa `lama` di panel sudah diganti `baru` (dipanggil ganti_rumus)."""
        if self.utama is lama:
            self.utama = baru
        self.baris_lain = [baru if m is lama else m for m in self.baris_lain]
        self.perbarui_alas()
        return baru

    def semua(self):
        """Semua yang tampil di panel, alasnya IKUT, supaya `FadeOut(papan.semua())`
        di babak penutup tidak meninggalkan kotak kertas melayang."""
        isi = self._isi()
        if isi is None:
            return None
        return VGroup(self.alas, *isi) if self.alas is not None else isi


def lahir_rumus(scene, isi: str, dekat, papan: PapanRumus, b=None,
                warna: str = TINTA, ukuran_lahir: float = 56, tahan: float = 0.6,
                run_time: float = 1.2, sebagai_utama: bool = True, geser=UP * 1.1):
    """Rumus baru LAHIR besar di dekat `dekat` (benda/titik dunia), dunia diredupkan
    sebentar, lalu terbang mengecil ke panel kanan atas. Pedoman tetap ARYA.

    Waktu terpakai = 0,5 + tahan + run_time; dicatat otomatis ke `b` kalau diberi.
    Kembalikan rumus yang kini duduk di panel (sudah terdaftar di `papan`).
    """
    frame = scene.frame
    pusat = ke_layar(frame, dekat) + np.array(geser, dtype=float)
    besar = rumus(isi, ukuran_lahir, warna).move_to(pusat)
    batasi_lebar(besar, LEBAR_UMUM)
    # Jaga tetap di dalam layar.
    bx, by = FRAME_WIDTH / 2 - 0.4, FRAME_HEIGHT / 2 - 0.4
    dx = min(0, bx - besar.get_right()[0]) + max(0, -bx - besar.get_left()[0])
    dy = min(0, by - besar.get_top()[1]) + max(0, -by - besar.get_bottom()[1])
    besar.shift([dx, dy, 0]).fix_in_frame()
    tirai = _tirai()
    scene.add(tirai, besar)
    scene.play(FadeIn(tirai), FadeIn(besar, scale=0.8), run_time=0.5)
    scene.wait(tahan)
    kecil = rumus(isi, papan.ukuran if sebagai_utama else papan.ukuran - 2, warna)
    if sebagai_utama:
        papan.tempat_utama(kecil)
    else:
        papan.tempat_baris(kecil, len(papan.baris_lain))
    # ReplacementTransform, BUKAN Transform: yang duduk di panel harus rumus yang
    # bersih (ukuran dan metadata LaTeX-nya benar), sebab morph berikutnya
    # (`ganti_rumus`) mencocokkan lambang lewat metadata itu. Uji 2 Sep malam:
    # dengan Transform, morph berikutnya menyisakan coretan dan rumusnya hilang.
    scene.play(ReplacementTransform(besar, kecil), FadeOut(tirai), run_time=run_time)
    scene.remove(tirai)
    scene.hud.add(kecil)
    papan.terima(kecil, sebagai_utama)
    if b is not None:
        b.catat(0.5 + tahan + run_time)
    return kecil


def ganti_rumus(scene, lama, isi_baru: str, b=None, run_time: float = 1.2,
                key_map: dict | None = None, warna: str | None = None, ukuran: float | None = None,
                papan: "PapanRumus | None" = None):
    """Ubah rumus DI TEMPATNYA dengan morph lambang per lambang (gaya 3b1b).

    `sin x` jadi `cos x`: huruf yang sama diam, `sin` melebur jadi `cos`.
    Beri `key_map={r"\\sin": r"\\cos"}` kalau ingin dua potongan berbeda
    dianggap padanan. Kembalikan rumus baru (objek lama sudah diganti).
    """
    # `lama.font_size` di ManimGL adalah FAKTOR SKALA (mis. 1,156), bukan poin;
    # membacanya sebagai ukuran huruf membuat rumus baru setinggi satu titik
    # (terbukti 2 Sep malam). Ukuran diambil dari catatan `rumus()` sendiri.
    ukuran = ukuran or getattr(lama, "ukuran_matra", 36)
    baru = rumus(isi_baru, ukuran, warna or lama.get_color())
    baru.move_to(lama)
    if lama.is_fixed_in_frame():
        # Di panel kanan atas yang dijaga adalah TEPI KANAN, bukan pusat: rumus
        # yang lebih lebar dari yang lama pernah melebar keluar layar (qc menolak).
        kiri_z, kanan_z, _, _ = ZONA_RUMUS
        batasi_lebar(baru, kanan_z - kiri_z - 0.2)
        baru.align_to(lama, RIGHT).align_to(lama, UP)
        baru.fix_in_frame()
    scene.play(TransformMatchingStrings(lama, baru, key_map=key_map or {}), run_time=run_time)
    # Pastikan yang tinggal di adegan hanya rumus baru, apa pun cara ManimGL
    # membersihkan animasinya, dan ia tetap menempel di layar.
    scene.remove(lama)
    if baru not in scene.mobjects:
        scene.add(baru)
    if lama in scene.hud:
        scene.hud.remove(lama)
    scene.hud.add(baru)
    if papan is not None:
        papan.ganti(lama, baru)
    if b is not None:
        b.catat(run_time)
    return baru


# ---------------------------------------------------------------------------
# Menyorot bagian rumus
# ---------------------------------------------------------------------------

def sorot_bagian(scene, rumus_mob, bagian, warna: str = SOROT,
                 redup: float = 0.28, run_time: float = 0.8):
    """Redupkan seluruh rumus, nyalakan SATU bagian, beri kotak.

    Bagian diambil lewat `rumus_mob.get_part_by_tex("...")`, BUKAN mengiris karakter.
    """
    lain = [m for m in rumus_mob.family_members_with_points()
            if m not in bagian.family_members_with_points()]
    kotak = SurroundingRectangle(bagian, buff=0.12, color=warna)
    kotak.set_stroke(warna, width=2.5)
    if rumus_mob.is_fixed_in_frame():
        kotak.fix_in_frame()
    scene.play(
        *[m.animate.set_opacity(redup) for m in lain],
        bagian.animate.set_color(warna).set_opacity(1.0),
        ShowCreation(kotak), run_time=run_time,
    )
    return kotak


def lepas_sorot(scene, rumus_mob, kotak, run_time: float = 0.6) -> None:
    scene.play(rumus_mob.animate.set_opacity(1.0), FadeOut(kotak), run_time=run_time)


# ---------------------------------------------------------------------------
# Jam kalimat subtitle: animasi diikat ke detik kalimat diucapkan
# ---------------------------------------------------------------------------

def jam_subtitle(topik: str):
    """Daftar (detik_mulai, kalimat) dari `web/public/anim/<topik>.vtt`.

    Dibuat sesi Grafik Fungsi (2 Sep) setelah ARYA menemukan titik mendarat 2
    detik sebelum angkanya disebut. `run_time` dan `jeda` hanya tahu panjang
    segmen; untuk segmen yang menyebut beberapa hal berurutan, animasinya harus
    membaca jam kalimat. URUTAN WAJIB: buat_narasi.py, buat_subtitle.py, BARU
    render. Kosong kalau .vtt belum ada.
    """
    p = AKAR / "web" / "public" / "anim" / f"{topik}.vtt"
    if not p.exists():
        return []
    hasil, baris = [], p.read_text(encoding="utf-8").splitlines()
    for i, bs in enumerate(baris):
        if "-->" not in bs or i + 1 >= len(baris):
            continue
        j, m, d = bs.split("-->")[0].strip().split(":")
        kalimat = re.sub(r"</?b>", "", baris[i + 1]).strip()
        hasil.append((int(j) * 3600 + int(m) * 60 + float(d), kalimat))
    return hasil


def mulai(jam, awalan: str):
    """Detik saat kalimat yang diawali `awalan` (bentuk TERTULIS) mulai diucapkan, atau None."""
    for t, kalimat in jam:
        if kalimat.startswith(awalan):
            return t
    return None


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
        """Catat waktu yang dipakai di luar `main` (judul_pembuka, lahir_rumus, wait)."""
        self.terpakai += lama

    def jeda(self, lama: float = 0.8) -> None:
        """Jeda PENDEK yang disengaja (0,6 sampai 1,6 detik). Untuk tunggu panjang
        pakai `tunggu_sampai` atau `scene.wait(n)` + `catat(n)`. Berbunyi kalau dipotong."""
        dipotong = float(np.clip(lama, JEDA_MIN, JEDA_MAKS))
        if abs(dipotong - lama) > 1e-6:
            print(f"  PERINGATAN babak '{self.nama}': jeda {lama:.2f} dipotong jadi {dipotong:.2f} detik. "
                  f"Untuk tunggu panjang pakai b.tunggu_sampai(...) atau scene.wait(n) + b.catat(n).")
        self.scene.wait(dipotong)
        self.terpakai += dipotong

    def tunggu_sampai(self, detik, cadangan: float = 0.0) -> None:
        """Diam sampai `detik` pada jam video (dari `jam_subtitle`), lalu lanjut."""
        if detik is None:
            detik = self.scene.time + cadangan
        sisa = detik - self.scene.time
        if sisa > 0.02:
            self.scene.wait(sisa)
            self.terpakai += sisa

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
