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

# Babak berbunyi kalau sisa waktunya yang akan diam lebih dari ini (detik) DAN
# animasinya kurang dari bagian ini dari narasinya. Dua syarat supaya babak
# pendek yang wajar diam sebentar tidak berisik.
DIAM_BERBUNYI = 3.0
BAGIAN_DIAM_BERBUNYI = 0.6

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


def nilai_hidup(label_mob, angka: DecimalNumber, di, buff: float = 0.18,
                tanda: str | None = "=") -> VGroup:
    """Rakit "label = angka berubah" supaya angkanya tidak melayang dari labelnya.

    Tanda "=" disisipkan sejak 4 Sep 2026: tanpa itu "BQ 5,160" terbaca seperti
    dua hal yang kebetulan berdampingan, bukan satu besaran dengan nilainya
    (temuan Ruang 3D materi 03). Beri `tanda=None` untuk tanpa tanda.
    Label SELALU elemen pertama gugus dan angka SELALU elemen terakhir.
    """
    bagian = [label_mob]
    if tanda:
        t = rumus(tanda, getattr(label_mob, "ukuran_matra", 28), label_mob.get_color())
        t.next_to(label_mob, RIGHT, buff=buff)
        bagian.append(t)
    angka.next_to(bagian[-1], RIGHT, buff=buff)
    angka.align_to(label_mob, DOWN)
    bagian.append(angka)
    gugus = VGroup(*bagian)
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

    def _kotak_target(self):
        """Ukuran alas yang seharusnya untuk isi papan sekarang."""
        isi = self._isi()
        if isi is None:
            return None
        return _kotak_alas(isi.get_left()[0] - 0.18, isi.get_right()[0] + 0.18,
                           isi.get_bottom()[1] - 0.14, isi.get_top()[1] + 0.14)

    def _ke_depan(self):
        """Alas dibuat SESUDAH baris pertama ada, jadi urutan gambarnya harus
        dibalik; kalau tidak, ia menutupi barisnya sendiri."""
        isi = self._isi()
        if isi is None:
            return
        self.alas.dekorasi = True
        for m in isi:
            # WAJIB. Tanpa penanda ini gerbang menolak "panel d menindih
            # bidang": pengecualian hud x dunia hanya berlaku bila HUD-nya
            # `beralas` DAN dunianya `latar`. Penanda ini sempat hilang saat
            # bentrok merge 4 Sep diselesaikan, dan render Materi 01 gagal.
            m.beralas = True
            self.scene.bring_to_front(m)

    def _anim_alas(self):
        """Animasi pelebaran alas, untuk dititipkan ke `scene.play` yang sama
        dengan kemunculan barisnya. Kembalikan daftar kosong kalau tanpa alas."""
        if not self.pakai_alas:
            return []
        baru = self._kotak_target()
        if baru is None:
            return []
        if self.alas is None:
            self.alas = baru
            self.alas.set_opacity(0)
            self.scene.hud_tambah(self.alas)
            self._ke_depan()
            return [self.alas.animate.set_opacity(1)]
        gerak = (self.alas.animate
                 .set_width(baru.get_width(), stretch=True)
                 .set_height(baru.get_height(), stretch=True)
                 .move_to(baru.get_center())
                 .set_opacity(1))
        self._ke_depan()
        return [gerak]

    def perbarui_alas(self):
        """Lebarkan alas kertas SEKETIKA. Dipakai di luar animasi (mis. saat
        baris luar didaftarkan lewat `ikut`, atau sesudah morph)."""
        if not self.pakai_alas:
            return
        isi = self._isi()
        if isi is None:
            # Panel kosong: kertasnya disembunyikan, bukan dibiarkan sebagai kotak
            # kosong melayang (terlihat di lembar kontak Integral 07, 12 Sep 2026).
            # `_anim_alas` memunculkannya lagi begitu ada baris baru.
            if self.alas is not None:
                self.alas.set_opacity(0)
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
            self.alas.set_opacity(1)
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
        # Ditumpuk dari BAWAH benda yang sudah ada di papan, bukan pada slot
        # berjarak tetap. Rumus pecahan dua tingkat lebih tinggi daripada satu
        # baris biasa, dan slot tetap 0,62 menjatuhkan baris berikutnya TEPAT DI
        # DALAM penyebutnya. Ruang 3D materi 09: "theta = 35,26 derajat" jatuh
        # menindih penyebut "6 akar 2" sampai keduanya tidak terbaca, dan qc
        # tidak menangkapnya sebab papan diserahkan ke qc sebagai SATU benda.
        sudah = ([self.utama] if self.utama is not None else []) + list(self.baris_lain[:ke_berapa])
        if sudah:
            batas_atas = min(m.get_bottom()[1] for m in sudah) - 0.16
        else:
            # Papan masih kosong: slot teratas tetap dipesan untuk rumus utama
            # yang akan datang, kecuali papan ini memang tanpa rumus utama.
            batas_atas = atas - 0.12 - (0 if self.tanpa_utama else 0.62)
        y = batas_atas - mob.get_height() / 2
        mob.move_to([kanan - mob.get_width() / 2 - 0.12, y, 0])
        return mob.fix_in_frame()

    # -- dipakai adegan ----------------------------------------------------
    def tumbuh(self, isi_baru: str, alasan: str | None = None, run_time: float = 1.2,
               key_map: dict | None = None, b=None):
        """Ganti rumus utama dengan MORPH: lambang lama berpindah, yang baru tumbuh.

        Waktu terpakai = run_time, ditambah waktu kata alasan kalau ada; dicatat
        otomatis ke `b` kalau diberi. Menghitungnya dengan tangan sudah pernah
        salah: adegan Ruang 3D 04 mencatat 1,7 detik padahal yang terpakai 3,2,
        dan videonya jadi 1,6 detik lebih panjang daripada narasinya. Babak
        tidak menolaknya sebab kelebihannya masuk lewat waktu yang TIDAK
        tercatat, jadi bacaan `b.sisa` ikut salah.
        """
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
        if b is not None:
            b.catat(run_time + (self.waktu_alasan() if alasan else 0.0))
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

    def baris(self, isi: str, warna: str | None = None, run_time: float = 0.8, b=None):
        """Tumpuk satu temuan baru di bawah yang sudah ada.

        Waktu terpakai = run_time; dicatat otomatis ke `b` kalau diberi.
        """
        m = rumus(isi, self.ukuran - 2, warna or self.warna)
        self.tempat_baris(m, len(self.baris_lain))
        self.scene.hud_tambah(m)
        self.baris_lain.append(m)
        # Alas melebar SEBARENG barisnya muncul, bukan sebelum. Kalau ia
        # melebar lebih dulu, penonton melihat bidang kertas kosong dulu.
        anim_alas = self._anim_alas()
        self.scene.play(FadeIn(m, shift=0.2 * LEFT), *anim_alas, run_time=run_time)
        if b is not None:
            b.catat(run_time)
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

    def isi(self):
        """Baris-baris panel TANPA alasnya: inilah yang boleh disorot.

        `Indicate(papan.semua())` mewarnai alas kertasnya ikut ungu, dan
        karena tulisannya ikut ungu, panel jadi kotak ungu polos tanpa rumus
        selama sorotan (ARYA menyebutnya glitch, Trigonometri 04, 11 Sep
        2026). Sorot isinya saja, alasnya jangan disentuh.
        """
        return self._isi()

    def sorot(self, warna: str = SOROT, run_time: float = 1.0):
        """Animasi menyorot isi panel tanpa menutup rumusnya. Pakai:
        `b.main(papan.sorot(), run_time=1.0)`."""
        isi = self.isi()
        if isi is None:
            raise AturanDilanggar("papan.sorot(): panel masih kosong, tidak ada yang disorot")
        return Indicate(isi, color=warna, scale_factor=1.0)

    def semua(self):
        """Semua yang tampil di panel, ALASNYA IKUT, supaya
        `FadeOut(papan.semua())` di babak penutup tidak meninggalkan kotak
        kertas melayang. JANGAN dipakai untuk `Indicate` (lihat `sorot`)."""
        isi = list(self.baris_lain)
        if self.utama is not None:
            isi.append(self.utama)
        if not isi:
            return None
        if self.alas is not None:
            isi = [self.alas] + isi
        g = VGroup(*isi)
        # Tanda untuk qc: baris-baris di dalam papan diperiksa satu sama lain.
        # Sebelum 4 Sep 2026 papan diserahkan ke qc sebagai satu benda, dan dua
        # baris yang bertindih persis lolos (temuan Ruang 3D dan Statistika).
        # Alasnya bertanda `dekorasi` dan dilewati pemeriksaan itu; ia memang
        # menindih semua barisnya, itu memang tugasnya.
        g._qc_isi = True
        return g


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
        # Waktu MENUNGGU (jeda, tunggu_sampai): layar diam. Dipisah dari
        # `terpakai` supaya peringatan diam tidak dibutakan oleh babak yang
        # mengikat kejadiannya ke jam kalimat (temuan Ruang 3D 4 Sep).
        self.menunggu = 0.0
        # Jam kata (STANDAR v3): diisi `babak(..., kata=JamKata)`; None berarti
        # adegan lama yang membagi waktu per babak, tetap didukung.
        self.kata = None

    def tunggu_kata(self, frasa: str, ke: int = 1, batas: float = 0.15) -> None:
        """Diam sampai detik KATA `frasa` diucapkan di segmen ini, lalu lanjut.

        Inilah inti standar v3: kejadian di layar dipicu oleh kata yang
        sedang diucapkan, bukan oleh pembagian waktu per babak. `frasa` boleh
        beberapa kata; yang dicocokkan kata pertamanya. Frasa yang muncul
        beberapa kali di satu segmen dipilih dengan `ke=2`, `ke=3`, dst.

        GAGAL SAAT ITU JUGA (bukan di akhir render) bila detik sasarannya
        sudah lewat lebih dari `batas`: animasi sebelumnya kelewat panjang,
        atau frasanya kemunculan pertama padahal yang dimaksud yang kedua
        (Transformasi 8 Sep 2026: sembilan menit render terbuang untuk
        kesalahan satu baris). Salah tulis frasa juga menggagalkan render
        dengan daftar kata segmen itu, bukan diam-diam memicu di waktu lain.
        """
        if self.kata is None:
            raise AturanDilanggar(
                f"babak '{self.nama}': tunggu_kata butuh jam kata; pakai "
                f"`with sinema.babak(self, nama, DURASI, kata=KATA) as b`.")
        sasaran = self.kata.jam(self.nama, frasa, ke=ke)
        if self.scene.time - sasaran > batas:
            raise WaktuTidakMuat(
                f"babak '{self.nama}': pemicu '{frasa}' (kemunculan ke-{ke}) jatuh di "
                f"detik {sasaran:.2f}, tetapi video sudah di detik {self.scene.time:.2f} "
                f"(terlambat {self.scene.time - sasaran:.2f}). Pendekkan animasi sebelumnya, "
                f"atau kalau frasa itu diucapkan lebih dari sekali, pilih kemunculannya dengan ke=.")
        self.tunggu_sampai(round(sasaran * 30) / 30)
        self.scene.pemicu = getattr(self.scene, "pemicu", [])
        self.scene.pemicu.append({"segmen": self.nama, "frasa": frasa,
                                  "audio": sasaran, "video": self.scene.time})

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
        self.menunggu += dipotong

    def tunggu_sampai(self, detik, cadangan: float = 0.0) -> None:
        """Diam sampai `detik` pada jam video (dari `jam_subtitle`), lalu lanjut."""
        if detik is None:
            detik = self.scene.time + cadangan
        sisa = detik - self.scene.time
        if sisa > 0.02:
            self.scene.wait(sisa)
            self.terpakai += sisa
            self.menunggu += sisa

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
        if True:
            # Gerbang ini menolak animasi yang MELEWATI narasi, tetapi dulu diam
            # saja kalau animasinya jauh lebih PENDEK: sisanya ditambal `wait`
            # tanpa sepatah kata, dan penulis adegan baru tahu layarnya beku dari
            # alat ukur dua hari kemudian (Statistika 4 Sep: 49 rentang beku di
            # 13 video, terpanjang 18,5 detik). Sekarang berbunyi. Bukan
            # menggagalkan render: diam yang disengaja sah menurut STANDAR butir
            # 3 selama narasi membahas yang tampil, tetapi angkanya harus
            # terlihat saat render, bukan ditemukan belakangan.
            # `animasi` = waktu yang benar-benar menggerakkan gambar; waktu menunggu
            # kalimat tidak dihitung, sebab selama itu layar diam juga.
            animasi = self.terpakai - self.menunggu
            diam = self.lama - animasi
            if diam > DIAM_BERBUNYI and animasi < BAGIAN_DIAM_BERBUNYI * self.lama:
                print(f"PERINGATAN babak '{self.nama}': animasi {animasi:.1f} detik dari "
                      f"narasi {self.lama:.1f} detik, {diam:.1f} detik DIAM (termasuk "
                      f"{self.menunggu:.1f} detik menunggu kalimat). Boleh hanya "
                      f"kalau narasi membahas yang tampil; kalau tidak, beri kejadian pada benda "
                      f"yang disebut narator (ikat ke jam kalimat).")
            if sisa > 0:
                self.scene.wait(sisa)


@contextmanager
def babak(scene, nama: str, durasi: dict, kata=None):
    """Pakai: `with sinema.babak(self, "buka", DURASI) as b: b.main(...)`.

    Dengan `kata=JamKata(...)` (standar v3) babak juga ditutup pada JAM AUDIO
    MUTLAK segmennya, bukan pada jumlah durasi animasinya: frame Manim
    dibulatkan ke atas, dan tanpa ini satu frame per babak menumpuk sampai
    satu detik di akhir video enam menit (temuan Turunan 2, 8 Sep 2026).
    """
    if nama not in durasi:
        raise KeyError(f"segmen '{nama}' tidak ada di durasi.json. Yang tersedia: {', '.join(durasi)}")
    b = Babak(scene, nama, durasi[nama])
    b.kata = kata
    if kata is not None:
        awal = kata.mulai(nama)
        if scene.time < awal - 0.02:
            # babak sebelumnya menutup lebih awal (mis. judul pembuka): sejajarkan
            scene.wait(awal - scene.time)
    yield b
    if kata is not None:
        b.terpakai = scene.time - kata.mulai(nama) + 1e-7
    b.tutup()


# ---------------------------------------------------------------------------
# STANDAR v3: jam kata. Waktu tiap kata datang dari `audio/<video>/kata.json`
# yang ditulis `manim/buat_narasi.py` (penanda WordBoundary mesin suara).
# ---------------------------------------------------------------------------

def _kata_polos(teks: str) -> str:
    return "".join(c for c in teks.lower() if c.isalnum())


class JamKata:
    """Detik absolut tiap kata narasi, untuk memicu animasi pada kata itu.

    Pakai di adegan:
        KATA = sinema.JamKata("turunan2-garis-singgung")
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("segitiga")
            b.main(Indicate(segitiga), run_time=1)
    """

    def __init__(self, topik: str):
        berkas = AKAR / "audio" / topik / "kata.json"
        if not berkas.exists():
            raise FileNotFoundError(
                f"{berkas} tidak ada. Jalankan: python manim/buat_narasi.py {topik}")
        import json
        self.topik = topik
        self.segmen = json.loads(berkas.read_text(encoding="utf-8"))

    def mulai(self, segmen: str) -> float:
        return self.segmen[segmen]["mulai"]

    def akhir(self, segmen: str) -> float:
        s = self.segmen[segmen]
        return s["mulai"] + s["durasi"]

    def jam(self, segmen: str, frasa: str, ke: int = 1) -> float:
        """Detik absolut kata pertama `frasa` (kemunculan ke-`ke`) di `segmen`."""
        if segmen not in self.segmen:
            raise KeyError(f"segmen '{segmen}' tidak ada di kata.json {self.topik}")
        cari = [_kata_polos(k) for k in frasa.split()]
        kata = self.segmen[segmen]["kata"]
        polos = [_kata_polos(w["kata"]) for w in kata]
        hitung = 0
        for i in range(len(polos) - len(cari) + 1):
            if polos[i:i + len(cari)] == cari:
                hitung += 1
                if hitung == ke:
                    return self.segmen[segmen]["mulai"] + kata[i]["mulai"]
        raise ValueError(
            f"frasa '{frasa}' tidak ada di segmen '{segmen}'. Kata segmen itu: "
            + " ".join(w["kata"] for w in kata))


def laporkan_pemicu(scene, batas: float = 0.15) -> float:
    """Selisih terbesar antara jam kata dan detik video saat animasinya mulai.

    Dipanggil di akhir `construct`. Render GAGAL bila ada pemicu yang
    terlambat lebih dari `batas` detik: biasanya animasi sebelumnya memakan
    terlalu banyak waktu sehingga `tunggu_kata` sudah lewat saat dipanggil.
    """
    pemicu = getattr(scene, "pemicu", [])
    if not pemicu:
        return 0.0
    terburuk = max(pemicu, key=lambda p: p["video"] - p["audio"])
    selisih = terburuk["video"] - terburuk["audio"]
    print(f"  pemicu kata: {len(pemicu)} buah, terlambat terbesar {selisih:.3f} s "
          f"(segmen '{terburuk['segmen']}', '{terburuk['frasa']}')")
    if selisih > batas:
        raise WaktuTidakMuat(
            f"pemicu '{terburuk['frasa']}' di segmen '{terburuk['segmen']}' terlambat "
            f"{selisih:.2f} detik: animasi sebelum tunggu_kata terlalu panjang.")
    return selisih
