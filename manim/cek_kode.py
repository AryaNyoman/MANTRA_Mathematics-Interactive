"""Pemeriksa adegan SEBELUM dirender. Menangkap cacat dalam hitungan detik.

    python manim/cek_kode.py manim/scenes/tahap8_grafik_sin.py
    python manim/cek_kode.py manim/scenes/tahap8_grafik_sin.py --dalam

Kenapa ada: render satu adegan MATRA makan 8-15 menit. Gagal di menit ke-9
karena satu kurung LaTeX kurang adalah pemborosan yang bisa dicegah. Berkas
ini membaca kodenya tanpa menjalankannya, dan melaporkan:

  1. `MathTex("\\theta")` tanpa awalan `r`, Python sudah mengubah `\\t` jadi TAB
     sebelum LaTeX sempat melihatnya. Cacat paling jahat karena diam-diam.
  2. Kurung kurawal, `\\left`/`\\right`, `\\begin`/`\\end` yang tidak berpasangan.
  3. `\\frac`, `\\sqrt`, `\\text` dan kawan-kawan yang kurang argumen.
  4. Kelas adegan yang tidak pernah memanggil `qc.periksa_adegan`, melanggar
     gerbang mutu di CLAUDE.md.
  5. Warna hex yang ditulis langsung di adegan, bukan diambil dari `matra_theme`
    , itu yang dulu memutus kaitan warna video dengan warna situs.

`--dalam` melangkah lebih jauh: tiap potongan LaTeX benar-benar dibangun lewat
Manim. Lebih lambat (memanggil MiKTeX), tapi memastikan, dan sekalian mengisi
cache LaTeX sehingga render sesudahnya lebih cepat.

Keluar dengan kode 1 kalau ada GALAT, 0 kalau hanya peringatan.
"""

from __future__ import annotations

import argparse
import ast
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent

# Pembuat yang isinya BENAR-BENAR LaTeX. Ini yang boleh dibangun lewat MiKTeX.
PEMBUAT_TEX = frozenset({"MathTex", "Tex", "SingleStringMathTex"})

# `Text` memakai Pango, BUKAN LaTeX. Isinya kalimat biasa dan tidak boleh
# dicoba dibangun sebagai rumus: kalimat Indonesia yang sah seperti
# "terkurung antara -1 dan 1" akan dilaporkan gagal padahal tidak ada apa-apa.
# Lapor palsu itu terjadi pada 1 Sep 2026 dan sempat menghentikan render.
#
# Isinya TETAP diperiksa untuk karakter kendali dan kewajiban color=, sebab
# TAB nyasar dan teks putih di latar krem sama merugikannya di Text maupun
# di MathTex.
PEMBUAT_TEKS = frozenset({"Text", "MarkupText", "Paragraph"})
PEMBUAT_SEMUA = PEMBUAT_TEX | PEMBUAT_TEKS

# Perintah LaTeX yang WAJIB diikuti sejumlah argumen berkurung.
ARITAS = {
    "frac": 2, "dfrac": 2, "tfrac": 2, "binom": 2, "overset": 2, "underset": 2,
    "sqrt": 1, "text": 1, "mathrm": 1, "mathbf": 1, "overline": 1, "underline": 1,
    "widehat": 1, "widetilde": 1, "hat": 1, "vec": 1, "bar": 1, "operatorname": 1,
}

# Karakter kendali yang tidak mungkin disengaja di dalam potongan LaTeX.
KENDALI = {"\t": r"\t", "\n": r"\n", "\r": r"\r", "\x08": r"\b", "\x0c": r"\f",
           "\x07": r"\a", "\v": r"\v"}

# Newline DIKECUALIKAN untuk pembuat teks biasa: di dalam Text() ia
# pemisah baris yang memang disengaja, bukan gejala string lupa awalan r.
# Di dalam MathTex ia tetap salah, jadi pengecualiannya hanya untuk Text.
# Lapor palsu ini muncul dua kali pada 1 Sep 2026 dan menghentikan render.
KENDALI_TEKS = {k: v for k, v in KENDALI.items() if k != "\n"}

HEX = re.compile(r"#[0-9A-Fa-f]{6}\b")


class Temuan:
    def __init__(self):
        self.galat: list[tuple[int, str]] = []
        self.ingat: list[tuple[int, str]] = []

    def salah(self, baris: int, pesan: str) -> None:
        self.galat.append((baris, pesan))

    def peringatan(self, baris: int, pesan: str) -> None:
        self.ingat.append((baris, pesan))


# ---------------------------------------------------------------------------
# 1-3. Potongan LaTeX
# ---------------------------------------------------------------------------

def _literal_mentah(sumber: str, simpul: ast.Constant) -> bool:
    potongan = ast.get_source_segment(sumber, simpul)
    if potongan is None:
        return True
    return potongan.lstrip().lower().startswith(("r'", 'r"', "rb", "br"))


def periksa_kurung(teks: str) -> list[str]:
    """Kurung kurawal, \\left/\\right, dan \\begin/\\end harus berpasangan."""
    masalah = []
    dalam = 0
    i = 0
    while i < len(teks):
        c = teks[i]
        if c == "\\" and i + 1 < len(teks):
            i += 2                      # \{ dan \} bukan kurung struktural
            continue
        if c == "{":
            dalam += 1
        elif c == "}":
            dalam -= 1
            if dalam < 0:
                masalah.append("ada '}' tanpa '{' pembuka")
                dalam = 0
        i += 1
    if dalam > 0:
        masalah.append(f"kurang {dalam} tanda '}}' penutup")

    kiri, kanan = len(re.findall(r"\\left\b", teks)), len(re.findall(r"\\right\b", teks))
    if kiri != kanan:
        masalah.append(f"\\left ({kiri}) tidak sama banyak dengan \\right ({kanan})")

    buka = re.findall(r"\\begin\{(\w+\*?)\}", teks)
    tutup = re.findall(r"\\end\{(\w+\*?)\}", teks)
    if sorted(buka) != sorted(tutup):
        masalah.append(f"\\begin{buka} tidak cocok dengan \\end{tutup}")
    return masalah


def periksa_aritas(teks: str) -> list[str]:
    """Perintah seperti \\frac wajib langsung diikuti argumen berkurung."""
    masalah = []
    for m in re.finditer(r"\\([a-zA-Z]+)", teks):
        nama = m.group(1)
        butuh = ARITAS.get(nama)
        if not butuh:
            continue
        i = m.end()
        for ke in range(butuh):
            while i < len(teks) and teks[i] in " \t":
                i += 1
            if i < len(teks) and teks[i] == "[":       # \sqrt[3]{x}
                tutup = teks.find("]", i)
                if tutup == -1:
                    masalah.append(rf"\{nama}: '[' tidak ditutup")
                    break
                i = tutup + 1
                while i < len(teks) and teks[i] in " \t":
                    i += 1
            if i >= len(teks) or teks[i] != "{":
                masalah.append(
                    rf"\{nama} butuh {butuh} argumen berkurung, "
                    f"yang ke-{ke + 1} tidak ada")
                break
            dalam, i = 1, i + 1
            while i < len(teks) and dalam:
                if teks[i] == "\\":
                    i += 2
                    continue
                dalam += (teks[i] == "{") - (teks[i] == "}")
                i += 1
    return masalah


def kumpulkan_tex(sumber: str, pohon: ast.AST, t: Temuan) -> list[tuple[int, str]]:
    potongan: list[tuple[int, str]] = []
    for simpul in ast.walk(pohon):
        if not isinstance(simpul, ast.Call):
            continue
        f = simpul.func
        nama = f.attr if isinstance(f, ast.Attribute) else getattr(f, "id", None)
        if nama not in PEMBUAT_SEMUA:
            continue

        # Warna WAJIB disebut. Tanpa `color=`, Manim memakai putih, dan pada
        # latar krem MATRA putih praktis tidak terlihat. Pada tahap 5 (31 Agu)
        # itu membuat semua tanda "=", kurung, dan koma lenyap dari layar,
        # sehingga "(x, y) = (cos t, sin t)" tampil sebagai "x y   cos t sin t".
        # `qc.periksa_adegan` TIDAK bisa menangkap ini: ia memeriksa posisi,
        # bukan warna. Jadi gerbangnya harus di sini.
        if not any(k.arg == "color" for k in simpul.keywords):
            t.salah(simpul.lineno,
                    f"{nama}(...) tidak menyebut color=, Manim akan memakai "
                    f"putih, yang hilang di latar krem. Tulis color=t.tinta "
                    f"(atau warna tema lain), baru warnai bagiannya.")

        for arg in simpul.args:
            if not (isinstance(arg, ast.Constant) and isinstance(arg.value, str)):
                continue
            nilai, baris = arg.value, arg.lineno

            daftar = KENDALI_TEKS if nama in PEMBUAT_TEKS else KENDALI
            for ch, tampak in daftar.items():
                if ch in nilai:
                    t.salah(baris, f"{nama}(...) mengandung karakter kendali "
                                   f"'{tampak}', hampir pasti string lupa awalan "
                                   f"r. Tulis r\"...\"")
                    break
            else:
                if "\\" in (ast.get_source_segment(sumber, arg) or "") \
                        and not _literal_mentah(sumber, arg):
                    t.peringatan(baris, f"{nama}(...) memakai backslash tanpa "
                                        f"awalan r, rawan. Tulis r\"...\"")
            # Hanya isi LaTeX yang diteruskan. Kalimat di dalam Text() tidak
            # punya kurung kurawal maupun perintah LaTeX, jadi memeriksanya
            # dengan aturan LaTeX hanya menghasilkan lapor palsu.
            if nama in PEMBUAT_TEX:
                potongan.append((baris, nilai))
                for pesan in periksa_kurung(nilai) + periksa_aritas(nilai):
                    t.salah(baris, f"LaTeX: {pesan}  →  {nilai[:60]!r}")
    return potongan


# ---------------------------------------------------------------------------
# 4-5. Aturan proyek MATRA
# ---------------------------------------------------------------------------

def periksa_aturan_matra(sumber: str, pohon: ast.AST, t: Temuan) -> None:
    for simpul in ast.walk(pohon):
        if not isinstance(simpul, ast.ClassDef):
            continue
        induk = {b.attr if isinstance(b, ast.Attribute) else getattr(b, "id", "")
                 for b in simpul.bases}
        if not any("Scene" in n for n in induk):
            continue
        panggil = {
            (n.func.attr if isinstance(n.func, ast.Attribute) else getattr(n.func, "id", ""))
            for n in ast.walk(simpul) if isinstance(n, ast.Call)
        }
        if "periksa_adegan" not in panggil:
            t.salah(simpul.lineno,
                    f"kelas {simpul.name} tidak pernah memanggil "
                    f"qc.periksa_adegan, gerbang mutu CLAUDE.md dilanggar")

    for i, baris in enumerate(sumber.splitlines(), start=1):
        if baris.lstrip().startswith("#"):
            continue
        for w in HEX.findall(baris):
            t.peringatan(i, f"warna ditulis langsung ({w}). Ambil dari "
                            f"matra_theme.Tema supaya video dan situs tidak berbeda")


# ---------------------------------------------------------------------------
# Pemeriksaan dalam: benar-benar bangun tiap potongan lewat Manim
# ---------------------------------------------------------------------------

def periksa_dalam(potongan: list[tuple[int, str]], t: Temuan) -> None:
    try:
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        import lingkungan  # noqa: F401  -- menambal PATH MiKTeX
        from manim import MathTex
    except ImportError as e:                                    # pragma: no cover
        t.peringatan(0, f"tidak bisa memuat Manim untuk pemeriksaan dalam: {e}")
        return
    unik = {teks: baris for baris, teks in potongan}
    print(f"  membangun {len(unik)} potongan LaTeX lewat MiKTeX ...")
    for teks, baris in unik.items():
        try:
            MathTex(teks)
        except Exception as e:
            ringkas = str(e).strip().splitlines()
            t.salah(baris, f"LaTeX gagal dibangun: {ringkas[-1] if ringkas else e}"
                           f"  →  {teks[:60]!r}")


# ---------------------------------------------------------------------------

def main() -> int:
    # Konsol Windows bawaannya cp1252 dan mati kena tanda panah atau em-dash.
    # Laporan yang terpotong di tengah lebih buruk daripada tidak ada laporan.
    for aliran in (sys.stdout, sys.stderr):
        try:
            aliran.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):                    # pragma: no cover
            pass

    p = argparse.ArgumentParser(description="Pemeriksa adegan MATRA sebelum render")
    p.add_argument("berkas", type=Path, nargs="+")
    p.add_argument("--dalam", action="store_true",
                   help="bangun tiap potongan LaTeX sungguhan (lebih lambat, pasti)")
    a = p.parse_args()

    total_galat = 0
    for berkas in a.berkas:
        if not berkas.exists():
            print(f"tidak ditemukan: {berkas}", file=sys.stderr)
            return 2
        sumber = berkas.read_text(encoding="utf-8")
        try:
            pohon = ast.parse(sumber, filename=str(berkas))
        except SyntaxError as e:
            print(f"{berkas}: baris {e.lineno}: sintaks Python salah, {e.msg}")
            total_galat += 1
            continue

        t = Temuan()
        potongan = kumpulkan_tex(sumber, pohon, t)
        periksa_aturan_matra(sumber, pohon, t)
        print(f"\n{berkas}  ({len(potongan)} potongan LaTeX)")
        if a.dalam:
            periksa_dalam(potongan, t)

        for baris, pesan in sorted(t.galat):
            print(f"  GALAT      baris {baris:4d}  {pesan}")
        for baris, pesan in sorted(t.ingat):
            print(f"  peringatan baris {baris:4d}  {pesan}")
        if not t.galat and not t.ingat:
            print("  bersih.")
        total_galat += len(t.galat)

    print()
    if total_galat:
        print(f">>> {total_galat} galat. JANGAN dirender dulu, perbaiki dahulu.")
        return 1
    print(">>> tidak ada galat. Boleh dirender.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
