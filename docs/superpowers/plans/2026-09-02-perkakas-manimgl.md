# Perkakas ManimGL `manim/gl/` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Perkakas bersama ManimGL (`manim/gl/`) yang membuat 4 sesi bisa membuat video 3D bercahaya dengan kebiasaan lama (`babak`, `keterangan`, `periksa_adegan`), dibuktikan lewat satu video rujukan perahu yang melewati seluruh alur (narasi, render, qc, gabung audio dengan suara latar).

**Architecture:** Satu paket `manim/gl/` (tema, sinema, kamera, ilustrasi, qc) di atas `manimlib` 1.7.2; kelas dasar `AdeganMatra` memasang latar krem, font Constantia, dan tambalan MiKTeX. Perkakas lama Manim Community diarsipkan ke `manim/arsip-manim-ce/`. `cek_kode.py` dan `gabung_audio.py` disesuaikan; sisanya (`buat_narasi`, `buat_subtitle`, `cek_video`) tidak tersentuh.

**Tech Stack:** Python 3.11, ManimGL 1.7.2 (`manimlib`), MiKTeX (`latex` + `dvisvgm`), FFmpeg 8, edge-tts.

**Spec:** `docs/superpowers/specs/2026-09-02-pindah-manimgl-dan-standar-ilustrasi-design.md`

## Global Constraints

- Pustaka: `from manimlib import *` saja. `manim` (Community) sudah dicabut; impor apa pun darinya = salah.
- Tiap adegan mengimpor `tambal_manimgl` (lewat `AdeganMatra`), tanpa itu `Tex` gagal di MiKTeX.
- `Text(color=...)` DIABAIKAN ManimGL: warna teks selalu lewat `.set_color()`.
- Font kata: `Constantia`. Angka berdiri sendiri, nilai hidup, rumus: `Tex`.
- Latar `#F7F3EE`; warna hanya dari palet tema (tinta `#1F2430`, redup `#8B8378`, aksen `#C25E4D`, aksen2 `#3A6EA5`, sorot `#6A4C93`).
- Tanpa tanda pisah panjang (em-dash) di teks maupun komentar.
- Keluaran render ke `media/gl/` (diabaikan git). Render: `manimgl <berkas> <Adegan> -w -l --video_dir media/gl`.
- Gerbang video CLAUDE.md berlaku: `cek_video.py` dan lembar kontak DIBUKA sebelum apa pun disebut selesai.
- Commit tiap task selesai, pesan commit Bahasa Indonesia, diakhiri `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

---

## Peta berkas

| Berkas | Tanggung jawab |
|---|---|
| `custom_config.yml` (akar) | keluaran, latar, font, fps bawaan ManimGL untuk proyek ini |
| `manim/gl/__init__.py` | mengekspor `AdeganMatra`, `tema`, `sinema`, `kamera`, `ilustrasi`, `qc` |
| `manim/gl/tema.py` | palet, `FONT`, `teks()`, `rumus()`, `AdeganMatra` |
| `manim/gl/qc.py` | proyeksi ke layar, `muat_di_bingkai`, `tidak_bertindih`, `periksa_adegan` |
| `manim/gl/uji_qc.py` | uji qc: kasus salah harus gagal, kasus benar lolos |
| `manim/gl/sinema.py` | `babak`, `keterangan`, `judul_pembuka`, `AngkaKoma`, `nilai_hidup`, `batasi_lebar` |
| `manim/gl/kamera.py` | `sudut`, `dunia_ke_peta`, `dekati`, `putar_pelan` |
| `manim/gl/ilustrasi.py` | `air`, `tanah`, `lantai_kisi`, `perahu`, `ayunkan`, `bola`, `balok`, `silinder`, `mobil`, `orang` |
| `manim/uji/uji_ilustrasi_gl.py` | etalase semua benda `ilustrasi`, kamera berputar |
| `manim/contoh/contoh_perahu.py` + `manim/narasi/contoh-perahu.json` | video rujukan lengkap dengan narasi |
| `manim/cek_kode.py` | disesuaikan ke nama ManimGL |
| `manim/gabung_audio.py` | cari di `media/gl/`, `--latar`, ducking |
| `manim/suara/air.ogg` | suara latar (sementara sintetis, ditandai) |
| `manim/arsip-manim-ce/` | kode lama + README |

---

### Task 1: Kerangka paket, config, arsip kode lama

**Files:**
- Create: `custom_config.yml`, `manim/gl/__init__.py`, `manim/arsip-manim-ce/README.md`
- Move (git mv): `manim/scenes/*.py` → `manim/arsip-manim-ce/scenes/`; `manim/sinema.py`, `manim/qc.py`, `manim/matra_theme.py` → `manim/arsip-manim-ce/`
- Modify: `.gitignore` (tambah `media/gl/` tidak perlu, `media/` sudah diabaikan)

**Interfaces:**
- Produces: paket `gl` bisa diimpor dari `manim/` (`sys.path.insert(0, "manim")`), folder `manim/scenes/` kosong untuk adegan baru.

- [ ] **Step 1: Tulis `custom_config.yml`**

```yaml
# Konfigurasi ManimGL untuk MATRA. Dibaca otomatis saat manimgl dijalankan dari akar proyek.
directories:
  base: ""
  subdirs:
    output: "media/gl"
camera:
  background_color: "#F7F3EE"
  fps: 30
text:
  font: "Constantia"
  alignment: "LEFT"
```

- [ ] **Step 2: Buat `manim/gl/__init__.py`**

```python
"""Perkakas bersama ManimGL untuk semua video MATRA (sejak 2 Sep 2026).

Pakai:  sys.path.insert(0, "<akar>/manim");  from gl import *
"""
from .tema import AdeganMatra, Tema, teks, rumus, FONT  # noqa: F401
from . import sinema, kamera, ilustrasi, qc  # noqa: F401
```
(Modul-modulnya dibuat di task berikut; sampai itu ada, buat berkas kosong `sinema.py`, `kamera.py`, `ilustrasi.py`, `qc.py`, `tema.py` dengan docstring satu baris supaya impor tidak gagal.)

- [ ] **Step 3: Arsipkan kode lama**

```bash
mkdir -p manim/arsip-manim-ce/scenes
git mv manim/scenes/*.py manim/arsip-manim-ce/scenes/
git mv manim/sinema.py manim/qc.py manim/matra_theme.py manim/arsip-manim-ce/
```
README isi: "Kode Manim Community 0.21. Sejak 2 Sep 2026 pustaka itu dicabut (keputusan ARYA), berkas di sini TIDAK BISA dijalankan dan JANGAN dicontoh. Video hasilnya tetap tayang di `web/public/anim/`. Perkakas baru: `manim/gl/`."

- [ ] **Step 4: Verifikasi impor**

Run: `python -c "import sys; sys.path.insert(0,'manim'); import gl; print('gl OK')"`
Expected: `gl OK` (setelah tema.py minimal ada).

- [ ] **Step 5: Commit** `Kerangka manim/gl, custom_config.yml, arsip kode Manim CE`

---

### Task 2: `tema.py` dan `AdeganMatra`

**Files:**
- Create: `manim/gl/tema.py`, `manim/uji/uji_tema_gl.py`

**Interfaces:**
- Produces: `FONT="Constantia"`, `class Tema` (atribut `latar, tinta, redup, aksen, aksen2, sorot`), `teks(s, ukuran=32, warna=None) -> Text`, `rumus(s, ukuran=40, warna=None) -> Tex`, `class AdeganMatra(Scene)` dengan `self.t: Tema`, `self.hud: Group`, metode `hud_tambah(*mobs)` (fix_in_frame + add).

- [ ] **Step 1: Tulis `tema.py`**

```python
"""Tema visual MATRA untuk ManimGL: palet Studio Teknis, font, kelas adegan dasar."""
import sys
from pathlib import Path
from manimlib import *

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import tambal_manimgl  # noqa: E402,F401  (MiKTeX menolak `latex -no-pdf`)

FONT = "Constantia"
LATAR, TINTA, REDUP = "#F7F3EE", "#1F2430", "#8B8378"
AKSEN, AKSEN2, SOROT = "#C25E4D", "#3A6EA5", "#6A4C93"
UKURAN_JUDUL, UKURAN_RUMUS, UKURAN_LABEL, UKURAN_KETERANGAN = 44, 40, 28, 30


class Tema:
    latar, tinta, redup, aksen, aksen2, sorot = LATAR, TINTA, REDUP, AKSEN, AKSEN2, SOROT


def teks(s: str, ukuran: float = UKURAN_LABEL, warna: str = TINTA) -> Text:
    """Kata-kata: Constantia. `Text(color=)` diabaikan ManimGL, maka set_color."""
    return Text(s, font=FONT, font_size=ukuran).set_color(warna)


def rumus(s: str, ukuran: float = UKURAN_RUMUS, warna: str = TINTA) -> Tex:
    """Angka berdiri sendiri dan rumus: LaTeX lewat MiKTeX."""
    return Tex(s, font_size=ukuran).set_color(warna)


class AdeganMatra(Scene):
    default_camera_config = dict(background_color=LATAR)

    def setup(self):
        self.t = Tema()
        self.hud = Group()

    def hud_tambah(self, *mobs):
        for m in mobs:
            m.fix_in_frame()
            self.hud.add(m)
        self.add(*mobs)
```

- [ ] **Step 2: Adegan uji** `manim/uji/uji_tema_gl.py`: `class UjiTema(AdeganMatra)` menaruh `teks("Angka saja tidak cukup")` di kiri atas lewat `hud_tambah`, `rumus(r"3 + 4 = 7\ \text{km}")` di kanan atas, lalu `self.wait(1)`.

- [ ] **Step 3: Render dan lihat**

Run: `manimgl manim/uji/uji_tema_gl.py UjiTema -w -l --video_dir media/uji-gl && ffmpeg -y -v error -ss 0.5 -i media/uji-gl/UjiTema.mp4 -frames:v 1 qc/uji-tema.png`
Expected: latar krem, kata dalam Constantia (serif), rumus LaTeX. BUKA `qc/uji-tema.png`.

- [ ] **Step 4: Commit** `gl/tema.py: palet, Constantia, AdeganMatra`

---

### Task 3: `qc.py` dengan proyeksi kamera 3D

**Files:**
- Create: `manim/gl/qc.py`, `manim/gl/uji_qc.py`

**Interfaces:**
- Produces: `CacatTataLetak(AssertionError)`, `ke_layar(frame, mob) -> (kiri, kanan, bawah, atas)` dalam satuan layar (bingkai 14,22 x 8), `muat_di_bingkai(frame, *mobs, margin=0.3, nama="")`, `tidak_bertindih(frame, a, b, nama_a, nama_b, toleransi=0.05)`, `periksa_adegan(scene, zona: dict, pasangan: list | None = None, margin=0.3)`.

- [ ] **Step 1: Tulis uji dulu** `manim/gl/uji_qc.py` (skrip biasa, dijalankan `python manim/gl/uji_qc.py`):

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from manimlib import *
from gl import qc

frame = CameraFrame()
frame.reorient(0, 0, 0)               # pandangan atas datar
hud = Text("layar").fix_in_frame().to_corner(UL)
jauh = Square(side_length=1).move_to([20, 0, 0])
a = Square(side_length=2).move_to([0, 0, 0])
b = Square(side_length=2).move_to([1, 0, 0])          # menindih a
c = Square(side_length=2).move_to([5, 0, 0])          # terpisah

qc.muat_di_bingkai(frame, hud, nama="hud")             # lolos
try:
    qc.muat_di_bingkai(frame, jauh, nama="jauh"); raise SystemExit("GAGAL: objek jauh lolos")
except qc.CacatTataLetak: print("ok: keluar bingkai tertangkap")
try:
    qc.tidak_bertindih(frame, a, b, "a", "b"); raise SystemExit("GAGAL: tindihan lolos")
except qc.CacatTataLetak: print("ok: tindihan tertangkap")
qc.tidak_bertindih(frame, a, c, "a", "c"); print("ok: terpisah lolos")

# Kamera miring: objek yang sama diproyeksikan ulang, dua kubus bertumpuk di z
frame.reorient(0, 70, 0)
atas = Cube(side_length=1).move_to([0, 0, 2]); bawah = Cube(side_length=1).move_to([0, 0, 0])
try:
    qc.tidak_bertindih(frame, atas, bawah, "atas", "bawah"); print("ok: dari samping, bertumpuk z terpisah di layar")
except qc.CacatTataLetak as e: raise SystemExit(f"GAGAL: {e}")
frame.reorient(0, 0, 0)
try:
    qc.tidak_bertindih(frame, atas, bawah, "atas", "bawah"); raise SystemExit("GAGAL: dari atas mestinya bertindih")
except qc.CacatTataLetak: print("ok: dari atas, bertumpuk z terdeteksi bertindih")
print("SEMUA UJI QC LOLOS")
```

- [ ] **Step 2: Jalankan, harus gagal** (`ImportError`/`AttributeError` karena qc kosong).

- [ ] **Step 3: Tulis `qc.py`**

```python
"""Gerbang mutu tata letak untuk ManimGL, sadar kamera 3D."""
import numpy as np
from manimlib import *


class CacatTataLetak(AssertionError):
    """Tata letak melanggar aturan. Sengaja menggagalkan render."""


def _titik(mob):
    fam = [m for m in mob.get_family() if len(m.get_points())]
    if not fam:
        return np.zeros((0, 3))
    return np.vstack([m.get_points() for m in fam])


def ke_layar(frame, mob):
    """Kotak batas objek dalam satuan layar (bingkai 14,22 x 8) dilihat dari kamera saat ini.

    Objek `fix_in_frame` sudah dalam satuan layar. Objek dunia diputar ke sumbu
    kamera lalu diskalakan; perspektif diabaikan (perkiraan, margin dinaikkan).
    """
    p = _titik(mob)
    if len(p) == 0:
        return None
    if mob.is_fixed_in_frame():
        q = p
    else:
        rot = frame.get_inverse_camera_rotation_matrix()
        q = (p - frame.get_center()) @ rot.T
        q = q * (FRAME_HEIGHT / frame.get_height())
    return q[:, 0].min(), q[:, 0].max(), q[:, 1].min(), q[:, 1].max()


def muat_di_bingkai(frame, *mobs, margin: float = 0.3, nama: str = ""):
    bx, by = FRAME_WIDTH / 2 - margin, FRAME_HEIGHT / 2 - margin
    for i, m in enumerate(mobs):
        k = ke_layar(frame, m)
        if k is None:
            continue
        kiri, kanan, bawah, atas = k
        keluar = []
        if kiri < -bx: keluar.append(f"kiri {kiri:.2f} < {-bx:.2f}")
        if kanan > bx: keluar.append(f"kanan {kanan:.2f} > {bx:.2f}")
        if bawah < -by: keluar.append(f"bawah {bawah:.2f} < {-by:.2f}")
        if atas > by: keluar.append(f"atas {atas:.2f} > {by:.2f}")
        if keluar:
            raise CacatTataLetak(f"{nama or f'objek#{i}'} keluar bingkai: " + "; ".join(keluar))


def tidak_bertindih(frame, a, b, nama_a="A", nama_b="B", toleransi: float = 0.05):
    ka, kb = ke_layar(frame, a), ke_layar(frame, b)
    if ka is None or kb is None:
        return
    tx = min(ka[1], kb[1]) - max(ka[0], kb[0])
    ty = min(ka[3], kb[3]) - max(ka[2], kb[2])
    if tx > toleransi and ty > toleransi:
        raise CacatTataLetak(f"{nama_a} menindih {nama_b} (irisan {tx:.2f} x {ty:.2f} satuan layar)")


def periksa_adegan(scene, zona: dict, pasangan=None, margin: float = 0.3):
    """Panggil di AKHIR tiap babak; untuk babak berkamera bergerak: di sudut awal DAN akhir."""
    frame = scene.frame
    for nama, m in zona.items():
        muat_di_bingkai(frame, m, margin=margin, nama=nama)
    for a, b in pasangan or []:
        tidak_bertindih(frame, zona.get(a), zona.get(b), a, b)
```

- [ ] **Step 4: Jalankan uji** → `SEMUA UJI QC LOLOS`. Kalau kasus kubus dari samping gagal, periksa arah `rot` (coba `@ rot` vs `@ rot.T`) sampai kedua kasus kubus benar.

- [ ] **Step 5: Commit** `gl/qc.py: gerbang mutu sadar kamera 3D + uji`

---

### Task 4: `sinema.py`

**Files:**
- Create: `manim/gl/sinema.py`, `manim/uji/uji_sinema_gl.py`

**Interfaces:**
- Consumes: `tema.teks`, `tema.rumus`, `AdeganMatra.hud_tambah`.
- Produces: `LEBAR_JUDUL=11.0, LEBAR_KETERANGAN=10.5, LEBAR_UMUM=12.5`, `WaktuTidakMuat`, `batasi_lebar(mob, maks)`, `AngkaKoma(DecimalNumber)`, `judul_pembuka(scene, teks, lama)`, `keterangan(scene, teks, y=-3.3, run_time=0.5)`, `hapus_keterangan(scene)`, `nilai_hidup(label, angka, di=RIGHT, buff=0.18)`, `class Babak` (`main`, `catat`, `jeda`, `sisa`, `tutup`), `babak(scene, nama, durasi)` contextmanager.

- [ ] **Step 1: Uji** `uji_sinema_gl.py`: dua adegan. `SinemaPas(AdeganMatra)`: `DURASI={"a": 2.0}`; `with babak(self,"a",DURASI) as b: b.main(FadeIn(teks("halo")), run_time=1.0)`; lalu `keterangan(self, "satu")`, `keterangan(self, "dua")` (yang pertama harus hilang), `AngkaKoma(2.5)` tampil "2,5". `SinemaLebih(AdeganMatra)`: `b.main(..., run_time=3.0)` dengan durasi 2.0 → harus melempar `WaktuTidakMuat`.

- [ ] **Step 2: Tulis `sinema.py`** dengan salinan logika lama (`manim/arsip-manim-ce/sinema.py`) diterjemahkan:
  - `AngkaKoma`: `def get_num_string(self, number): return super().get_num_string(number).replace(".", ",")`; `edge_to_fix=LEFT` bawaan.
  - `keterangan`: `teks(s, UKURAN_KETERANGAN)` → `batasi_lebar(LEBAR_KETERANGAN)` → `.move_to([0, y, 0])` → `fix_in_frame()`; simpan di `scene._keterangan`; ganti dengan `FadeOut` lama + `FadeIn` baru dalam satu `play`.
  - `judul_pembuka`: `teks(s, UKURAN_JUDUL)` fix_in_frame, `FadeIn` 0.6, tahan `lama-1.2`, `FadeOut` 0.6.
  - `Babak.tutup`: kalau `sisa < -TOLERANSI_LEBIH` → `raise WaktuTidakMuat`; kalau sisa > 0 → `scene.wait(sisa)` (updater tetap jalan).
  - `babak()` contextmanager: `yield Babak(...)`, lalu `tutup()`.

- [ ] **Step 3: Render** `manimgl manim/uji/uji_sinema_gl.py SinemaPas -w -l --video_dir media/uji-gl` → sukses; `... SinemaLebih ...` → keluar dengan `WaktuTidakMuat`. Buka frame `SinemaPas` di detik 3: hanya "dua" yang tampil, angka "2,5".

- [ ] **Step 4: Commit** `gl/sinema.py: babak, keterangan, AngkaKoma untuk ManimGL`

---

### Task 5: `kamera.py`

**Files:**
- Create: `manim/gl/kamera.py`

**Interfaces:**
- Produces (semua mengembalikan animasi untuk `b.main(...)`): `sudut(frame, theta, phi, gamma=0, pusat=(0,0,0), tinggi=8)`, `dunia_ke_peta(frame, pusat=(0,0,0), tinggi=10)`, `dekati(frame, target, tinggi)`, `putar_pelan(frame, derajat=15)`; plus `pasang_awal(frame, theta, phi, pusat, tinggi)` (tanpa animasi, untuk babak pertama).

```python
"""Gerakan kamera siap pakai. Semua mengembalikan animasi; durasinya diberi lewat b.main(run_time=)."""
from manimlib import *


def pasang_awal(frame, theta, phi, gamma=0, pusat=(0, 0, 0), tinggi=8):
    frame.reorient(theta, phi, gamma, center=tuple(pusat), height=tinggi)


def sudut(frame, theta, phi, gamma=0, pusat=(0, 0, 0), tinggi=8):
    return frame.animate.reorient(theta, phi, gamma, center=tuple(pusat), height=tinggi)


def dunia_ke_peta(frame, pusat=(0, 0, 0), tinggi=10):
    """Dari pandangan miring ke tegak lurus atas: tempat matematikanya terbaca."""
    return frame.animate.reorient(0, 0, 0, center=tuple(pusat), height=tinggi)


def dekati(frame, target, tinggi):
    p = target.get_center() if hasattr(target, "get_center") else target
    return frame.animate.move_to(p).set_height(tinggi)


def putar_pelan(frame, derajat=15):
    return frame.animate.increment_theta(derajat * DEGREES)
```
(Kalau `increment_theta` tidak ada di 1.7.2, pakai `frame.animate.set_theta(frame.get_theta() + derajat*DEGREES)`; cek dengan `grep -n "def increment_theta" manimlib/camera/camera_frame.py`.)

- [ ] **Step: Uji** dipakai di Task 6 dan 7 (etalase dan perahu). Commit bersama Task 6.

---

### Task 6: `ilustrasi.py` dan etalase

**Files:**
- Create: `manim/gl/ilustrasi.py`, `manim/uji/uji_ilustrasi_gl.py`

**Interfaces:**
- Produces: `tinggi_air(x, y, t) -> float`; `air(panjang, lebar, t, warna=AKSEN2) -> Surface`; `tanah(panjang, lebar, y_tengah, z=0.18) -> Surface`; `lantai_kisi(ukuran=8, langkah=1) -> Group`; `perahu(panjang=2.0) -> Group` (titik asal = garis air, haluan +x); `ayunkan(perahu_asli, perahu, x, y, t)` (bangun ulang dari salinan asli, tanpa penumpukan rotasi); `bola(r, warna)`, `balok(p, l, t, warna)`, `silinder(r, t, warna)` → Surface/Group dengan alas di z=0; `mobil(panjang=2.0) -> Group` (badan balok + 4 roda silinder, alas di z=0, depan +x); `orang(tinggi=1.7) -> Group` (kepala bola, badan silinder, kaki dua silinder; alas z=0).
- Semua `set_shading` (0.4, 0.3, 0.5) kecuali air (0.5, 0.5, 0.3) dan tanah (0,0,0).

- [ ] **Step 1: Pindahkan** `tinggi_air`, `buat_perahu`, air, tepi dari `manim/uji/uji_perahu_gl.py` ke `ilustrasi.py` dengan nama di atas; tambah `bola/balok/silinder/mobil/orang` dari primitif `Sphere`, `Cube`/`Prism`, `Cylinder` ManimGL (`grep -n "^class Prism\|^class Sphere" manimlib/mobject/three_dimensions.py` untuk tanda tangan).

- [ ] **Step 2: Etalase** `uji_ilustrasi_gl.py`: `class Etalase(AdeganMatra)`: lantai_kisi, lalu berjajar di sumbu x: perahu di atas air kecil (4x3), mobil, orang, bola, balok, silinder; label Constantia di atas tiap benda (`fix_in_frame` TIDAK dipakai, label ikut dunia); kamera `pasang_awal(-30, 65)` lalu `b.main(putar_pelan(frame, 40), run_time=6)`; `periksa_adegan` di awal dan akhir.

- [ ] **Step 3: Render, cek_video, BUKA lembar kontak.** Nilai: tiap benda dikenali tanpa label? Ada yang tembus lantai? Warna di luar palet?

- [ ] **Step 4: Commit** `gl/ilustrasi.py + gl/kamera.py: benda nyata bercahaya dan kamera siap pakai`

---

### Task 7: Video rujukan perahu lengkap (narasi + babak + qc + audio)

**Files:**
- Create: `manim/narasi/contoh-perahu.json`, `manim/contoh/contoh_perahu.py`
- Run: `buat_narasi.py`, render, `cek_video.py`, `gabung_audio.py --uji --latar air` (Task 9 dulu untuk `--latar`)

**Interfaces:**
- Consumes: semua modul `gl`.

- [ ] **Step 1: Naskah** 4 segmen (`id`: `sapa`, `terbang`, `dayung`, `arus`), bahasa guru sesuai STANDAR-MENGAJAR bagian 5, `"latar": "air"` di tingkat atas. `python manim/buat_narasi.py contoh-perahu` → `audio/contoh-perahu/durasi.json`.

- [ ] **Step 2: Adegan** `contoh_perahu.py`: `class ContohPerahu(AdeganMatra)`; `DURASI` dari durasi.json; babak `sapa` (pandangan samping, `judul_pembuka`), `terbang` (`dunia_ke_peta`), `dayung` (`GrowArrow` + `keterangan`), `arus`. `periksa_adegan` di akhir tiap babak; babak `terbang` diperiksa di awal dan akhir.

- [ ] **Step 3:** `python manim/cek_kode.py manim/contoh/contoh_perahu.py` lolos (Task 8 dulu). Render `-w -l`, `cek_video.py`, BUKA lembar kontak, nilai per aturan CLAUDE.md.

- [ ] **Step 4:** `python manim/gabung_audio.py contoh-perahu ContohPerahu --uji --latar air` → `media/uji-480p/contoh-perahu.mp4`. Kirim ke ARYA (SendUserFile) untuk didengar.

- [ ] **Step 5: Commit** `Contoh rujukan perahu: alur ManimGL lengkap dari narasi sampai audio`

---

### Task 8: `cek_kode.py` untuk ManimGL

**Files:**
- Modify: `manim/cek_kode.py` baris 37 (`PEMBUAT_TEX`), 213-233 (`periksa_aturan_matra`), 242-260 (`periksa_dalam`)

- [ ] **Step 1:** `PEMBUAT_TEX = frozenset({"Tex", "TexText"})`; di `periksa_aturan_matra` tambah: panggilan bernama `MathTex` → salah "MathTex adalah Manim Community, pakai Tex"; `Text(...)` dengan kata kunci `color=` → salah "Text(color=) diabaikan ManimGL, pakai .set_color()"; impor `from manim import` → salah. Pesan warna langsung: rujuk `gl.tema`, bukan `matra_theme`.
- [ ] **Step 2:** `periksa_dalam`: `import tambal_manimgl`; `from manimlib import Tex`; bangun `Tex(teks)`.
- [ ] **Step 3: Uji:** jalankan pada `manim/contoh/contoh_perahu.py` (lolos) dan pada berkas sementara di scratchpad yang berisi `MathTex("x")` dan `Text("a", color=RED)` (dua temuan salah).
- [ ] **Step 4: Commit** `cek_kode.py: nama ManimGL, larang MathTex dan Text(color=)`

---

### Task 9: `gabung_audio.py`: lokasi baru dan suara latar dengan ducking

**Files:**
- Modify: `manim/gabung_audio.py` (`cari_video`, argumen, perintah ffmpeg)
- Create: `manim/suara/air.ogg` (sementara sintetis), `manim/suara/README.md`

- [ ] **Step 1:** `cari_video`: cari `media/gl/**/<adegan>.mp4` dulu, lalu jalur lama sebagai cadangan.
- [ ] **Step 2:** Argumen `--latar NAMA` (bawaan: baca `manim/narasi/<topik>.json` kunci `latar`, boleh kosong). Kalau ada latar, perintah ffmpeg:

```
ffmpeg -y -v error -i VIDEO -i NARASI -stream_loop -1 -i manim/suara/NAMA.ogg
  -filter_complex "[2:a]volume=0.12,atrim=0:DURASI_VIDEO[bg];[bg][1:a]sidechaincompress=threshold=0.015:ratio=6:attack=40:release=700[duck];[1:a][duck]amix=inputs=2:duration=first:normalize=0[a]"
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 96k -shortest HASIL
```
(`normalize=0` menjaga narasi tidak dikecilkan oleh amix.)
- [ ] **Step 3:** Suara sementara: `ffmpeg -f lavfi -i "anoisesrc=color=brown:duration=30" -af "lowpass=f=900,tremolo=f=0.25:d=0.5,volume=0.8" manim/suara/air.ogg`; README: "sintetis, ganti dengan rekaman CC0 setelah ARYA menyetujui unduhan".
- [ ] **Step 4: Uji:** jalankan pada contoh perahu (Task 7 step 4); pastikan `ffprobe` melaporkan 1 jalur audio, durasi sama dengan video.
- [ ] **Step 5: Commit** `gabung_audio.py: media/gl, --latar dengan ducking; suara air sementara`

---

### Task 10: Dokumen dan ingatan (Bagian 2 spec)

**Files:**
- Create: `docs/tugas/ILMU-3B1B.md`, `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`
- Modify: `docs/tugas/ATURAN-SEMUA-SESI.md`, `docs/tugas/MATRA-{VEKTOR,GRAFIK-FUNGSI,STATISTIKA,RUANG-TIGA-DIMENSI}.md` bagian "Video", `docs/tugas/PROMPT-SIAP-TEMPEL.md`, `PROGRESS.md` (Resep lengkap + MULAI DARI SINI), `CLAUDE.md` (Cara menjalankan, aturan Text/Tex)
- Create: `~/.claude/projects/D--MANIM-MATRA--claude-worktrees-matra-{vektor,grafik-fungsi,statistika,ruang-3d}/memory/manimgl-standar-ilustrasi.md` + `MEMORY.md` masing-masing

- [ ] ILMU-3B1B: enam prinsip (gerak menyambung; satu warna satu makna; kamera bercerita; permukaan bercahaya + bayangan tipuan + jala; angka terikat gambar; bidang pengiris) tiap prinsip: bukti berkas 3b1b, padanan `gl`, contoh 5 baris.
- [ ] STANDAR-ILUSTRASI: 8 aturan ya/tidak + daftar periksa per adegan + rujukan `manim/contoh/contoh_perahu.py`.
- [ ] Pembaruan dokumen lain sesuai spec bagian 6. Prompt baru "E. Gelombang 2 versi ManimGL".
- [ ] Commit `Dokumen ManimGL: ilmu 3b1b, standar ilustrasi, aturan sesi, prompt`

---

### Task 11: Kirim pesan ke sesi (Bagian 3 spec)

- [ ] Cari mekanisme kirim: `ListAgents`, `mcp__ccd_session_mgmt__list_sessions` + `send_message`. Kalau tidak ada jalur, laporkan ke ARYA dan sediakan prompt di PROMPT-SIAP-TEMPEL.
- [ ] Pesan ke 4 sesi topik: tarik master, baca dua dokumen baru, jalankan etalase sebagai pemanasan, mulai video pertama. Pesan ke UI/UX: tidak ada perubahan, kecuali tautan video mp4/webm tetap.
- [ ] Catat di PROGRESS.md siapa sudah dikirimi.
