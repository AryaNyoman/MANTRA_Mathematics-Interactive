"""Penyisir bahasa "AI banget" di teks yang dibaca siswa (ARYA, 21 Sep 2026).

    python alat/sapu_bahasa.py hitung            hitung kemunculan per pola per berkas
    python alat/sapu_bahasa.py daftar <pola>      cetak kalimatnya (berkas:baris) untuk disunting tangan
    python alat/sapu_bahasa.py ganti --coba       tampilkan penggantian otomatis yang akan dilakukan
    python alat/sapu_bahasa.py ganti              lakukan penggantian otomatis (kata sambung saja)

KENAPA ALAT INI ADA
ARYA menolak bahasa buku dan bahasa "cerita" di teks siswa: kata ganti "ia"
untuk benda, "sebab/melainkan/justru/sekadar/lazim/nyaris/kelak", pembuka
dramatis, rumus dan benda yang dihidupkan, cap penyemangat buatan, "Catatan
jujur", dan "menggoda/menipu/menyesatkan". Yang bisa diganti kata per kata
tanpa mengubah makna (kata sambung) dikerjakan alat ini; yang butuh kalimat
baru ("ia" harus diganti nama bendanya) dicetak `daftar` lalu disunting tangan.

Yang DISISIR: web/content/<bab>/tahap*.ts, kuis.ts, latihan.ts, istilah.ts,
dan teks antarmuka di web/components dan web/app. Naskah video (manim/narasi)
TIDAK disentuh: suaranya sudah direkam, subtitle wajib sama huruf demi huruf.
Komentar kode ikut tersisir kalau kebetulan memuat kata itu; tidak apa-apa.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]
WEB = AKAR / "web"

BERKAS = sorted(
    list((WEB / "content").glob("*/tahap*.ts"))
    + list((WEB / "content").glob("*/kuis.ts"))
    + list((WEB / "content").glob("*/latihan.ts"))
    + list((WEB / "content").glob("*/istilah.ts"))
    + list((WEB / "components").rglob("*.tsx"))
    + list((WEB / "app").rglob("*.tsx"))
)

# pola yang dihitung dan didaftar (nama -> regex, peka huruf besar kecil di awal kalimat)
POLA = {
    "ia": r"\b[Ii]a\b(?![-\w])",
    "sebab": r"\b[Ss]ebab\b(?!nya)",
    "melainkan": r"\b[Mm]elainkan\b",
    "justru": r"\b[Jj]ustru\b",
    "sekadar": r"\b[Ss]ekadar\b",
    "lazim": r"\b[Ll]azim\w*",
    "nyaris": r"\b[Nn]yaris\b",
    "kelak": r"\b[Kk]elak\b",
    "bukan-kebetulan": r"[Bb]ukan kebetulan",
    "bukan-hiasan": r"[Bb]ukan hiasan",
    "ceritanya": r"\b[Cc]eritanya\b|\b[Bb]ercerita\b|\b[Cc]erita\b",
    "menutup-perkara": r"menutup perkara|memancing",
    "bersaudara": r"\b[Bb]ersaudara\b|\b[Kk]embaran\b",
    "penyemangat": r"[Nn]yantol|sudah pegang|Sudah kuat|Separuh jalan",
    "catatan-jujur": r"[Cc]atatan jujur",
    "menggoda": r"\b[Mm]enggoda\b|\b[Tt]ergoda\b|\b[Gg]odaan\w*",
    "menipu": r"\b[Mm]enipu\b|\b[Tt]ertipu\b|\b[Pp]enipu\w*|\b[Tt]ipuan\b",
    "menyesatkan": r"\b[Mm]enyesatkan\b|\b[Tt]ersesat\b",
}

# penggantian otomatis: hanya kata sambung yang maknanya tidak bergeser
GANTI = [
    # sebab sebagai kata sambung; "sebabnya", "penyebab", "disebabkan" tidak disentuh
    (re.compile(r"(?<=[,;:] )sebab (?!itu)"), "karena "),
    (re.compile(r"(?<=[.!?] )Sebab (?!itu)"), "Karena "),
    (re.compile(r"(?<=[a-z\)]) sebab (?!itu)"), " karena "),
    (re.compile(r"(?<=[(\-] )sebab "), "karena "),
    (re.compile(r"\(sebab "), "(karena "),
    (re.compile(r"(?<=[A-Z]) sebab "), " karena "),
    (re.compile(r"\bSebab itu\b"), "Karena itu"),
    (re.compile(r"\bsebab itu\b"), "karena itu"),
    (re.compile(r"\bmelainkan\b"), "tetapi"),
    (re.compile(r"\bMelainkan\b"), "Tetapi"),
    (re.compile(r"\bjustru\b"), "malah"),
    (re.compile(r"\bJustru\b"), "Malah"),
    (re.compile(r"\bbukan sekadar\b"), "bukan cuma"),
    (re.compile(r"\bBukan sekadar\b"), "Bukan cuma"),
    (re.compile(r"\bsekadar\b"), "cuma"),
    (re.compile(r"\bSekadar\b"), "Cuma"),
    (re.compile(r"\blazimnya\b"), "biasanya"),
    (re.compile(r"\bLazimnya\b"), "Biasanya"),
    (re.compile(r"\blazim\b"), "biasa"),
    (re.compile(r"\bLazim\b"), "Biasa"),
    (re.compile(r"\bnyaris\b"), "hampir"),
    (re.compile(r"\bNyaris\b"), "Hampir"),
    (re.compile(r"\bkelak\b"), "nanti"),
    (re.compile(r"\bKelak\b"), "Nanti"),
    # pengecoh bank soal: "Pilihan B menggoda karena" -> "Pilihan B tampak benar karena"
    (re.compile(r"\bmenggoda karena\b"), "tampak benar karena"),
    (re.compile(r"\bmenggoda sebab\b"), "tampak benar karena"),
    (re.compile(r"\bCatatan jujur: "), ""),
    (re.compile(r"\bCatatan jujur\b"), "Catatan"),
]


def kalimat_di(baris: str, m: re.Match) -> str:
    """Potongan sekitar kemunculan, dipotong di batas kalimat terdekat."""
    awal = max(baris.rfind(". ", 0, m.start()), baris.rfind("'", 0, m.start()), baris.rfind("`", 0, m.start()))
    awal = awal + 1 if awal >= 0 else 0
    akhir_titik = baris.find(". ", m.end())
    akhir_kutip = baris.find("'", m.end())
    kandidat = [x for x in (akhir_titik, akhir_kutip) if x >= 0]
    akhir = min(kandidat) + 1 if kandidat else len(baris)
    return baris[awal:akhir].strip()


def hitung() -> None:
    total = {k: 0 for k in POLA}
    for berkas in BERKAS:
        isi = berkas.read_text(encoding="utf-8")
        baris_hitung = {}
        for nama, pola in POLA.items():
            n = len(re.findall(pola, isi))
            if n:
                baris_hitung[nama] = n
                total[nama] += n
        if baris_hitung:
            print(f"{berkas.relative_to(WEB)}: " + ", ".join(f"{k} {v}" for k, v in baris_hitung.items()))
    print("\nTOTAL: " + ", ".join(f"{k} {v}" for k, v in total.items() if v))


def daftar(nama: str) -> None:
    pola = re.compile(POLA[nama])
    n = 0
    for berkas in BERKAS:
        for no, baris in enumerate(berkas.read_text(encoding="utf-8").split("\n"), 1):
            for m in pola.finditer(baris):
                n += 1
                print(f"{berkas.relative_to(WEB)}:{no}: {kalimat_di(baris, m)}")
    print(f"\n{n} kemunculan '{nama}'")


def ganti(coba: bool) -> None:
    """Hanya berkas isi (content/): komentar kode di components tidak dibaca siswa."""
    jumlah = 0
    for berkas in [b for b in BERKAS if "content" in b.parts]:
        asli = berkas.read_text(encoding="utf-8")
        baru = asli
        for pola, pengganti in GANTI:
            baru = pola.sub(pengganti, baru)
        if baru != asli:
            for la, ba in zip(asli.split("\n"), baru.split("\n")):
                if la != ba:
                    jumlah += 1
                    if coba:
                        print(f"{berkas.relative_to(WEB)}:\n  - {la.strip()[:160]}\n  + {ba.strip()[:160]}")
            if not coba:
                berkas.write_text(baru, encoding="utf-8", newline="\n")
    print(f"\n{jumlah} baris {'akan ' if coba else ''}diubah")


if __name__ == "__main__":
    arg = sys.argv[1:]
    if not arg or arg[0] == "hitung":
        hitung()
    elif arg[0] == "daftar":
        daftar(arg[1])
    elif arg[0] == "ganti":
        ganti(coba="--coba" in arg)
    else:
        print(__doc__)
