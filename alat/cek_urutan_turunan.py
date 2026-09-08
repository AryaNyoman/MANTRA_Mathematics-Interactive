"""Memeriksa tidak ada ISTILAH Turunan yang dipakai sebelum materi yang mengajarkannya.

    python alat/cek_urutan_turunan.py
    python alat/cek_urutan_turunan.py --rinci     tampilkan kalimatnya

KENAPA ALAT INI ADA
Aturan ARYA 5 September 2026: jangan sebut istilah yang belum dipelajari siswa.
Topik ini 12 materi dan puluhan kilobita teks, jadi menjaganya dengan mata
mustahil. Pada topik Transformasi Geometri, satu istilah yang bocor ke materi
sebelumnya ditemukan ARYA sendiri, bukan oleh sesi yang menulisnya.

Bahayanya khas topik ini: kata "turunan" adalah nama topiknya, jadi ia sangat
mudah tertulis di Materi 01 padahal Materi 01 justru bertugas membangun
gagasannya TANPA menyebut namanya. Aturan proyek: nama diberikan setelah
bendanya dilihat.

CARA MENILAINYA
Tiap istilah didaftarkan bersama nomor materi yang MENGAJARKANNYA. Istilah
boleh muncul di materi itu sendiri dan sesudahnya, tidak boleh sebelumnya.
Rujukan "Materi NN" juga diperiksa: materi tidak boleh menunjuk ke materi yang
belum dilewati siswa.

YANG SENGAJA TIDAK DIPERIKSA
Kata di dalam komentar kode dan di kepala berkas. Itu dibaca pembuat situs,
bukan siswa. Yang diperiksa hanya teks yang benar-benar tampil di layar.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]

# Nomor materi yang MENGAJARKAN tiap istilah, mengikuti urutan buku
# Matematika Tingkat Lanjut Kelas XII Bab 2 dan rancangan
# docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md.
ISTILAH: dict[str, tuple[int, str]] = {
    r"laju perubahan rata-rata": (1, "laju perubahan rata-rata"),
    r"garis potong|garis sekan|\bsekan\b": (1, "garis potong, garis sekan"),
    r"garis singgung": (2, "garis singgung"),
    r"turunan": (2, "turunan"),
    r"kemiringan sesaat": (2, "kemiringan sesaat"),
    r"f′|f aksen": (2, "lambang f aksen"),
    r"fungsi turunan": (3, "fungsi turunan"),
    r"leibniz|newton|dy/dx": (3, "notasi Newton dan Leibniz"),
    r"aturan pangkat": (4, "aturan pangkat"),
    r"aturan hasil kali|aturan hasil bagi": (6, "aturan hasil kali, aturan hasil bagi"),
    r"aturan rantai": (7, "aturan rantai"),
    r"komposisi": (7, "komposisi fungsi"),
    # Batas kata DAN pengecualian "domain". "Bagian dalam" milik Materi 07
    # berarti fungsi yang duduk di dalam kurung; "titik bagian dalam domain" di
    # definisi turunan Materi 02 berarti titik yang bukan tepi daerah asal. Dua
    # arti, satu ejaan. Tanpa `(?! domain)` alat ini menuduh definisi turunan
    # memakai istilah aturan rantai, dan perbaikan yang diarahkannya adalah
    # mengubah kalimat yang sudah benar.
    r"bagian dalam(?! domain)|bagian luar": (7, "bagian dalam, bagian luar"),
    r"bilangan e\b": (8, "bilangan e"),
    r"persamaan garis singgung|gradien garis singgung": (9, "persamaan garis singgung"),
    r"garis normal": (9, "garis normal"),
    # Batas kata WAJIB di sini. Tanpanya, "fungsi turunan" ikut tertangkap oleh
    # "fungsi turun", dan Materi 03 yang justru bertugas memperkenalkan fungsi
    # turunan dilaporkan melanggar. Pemeriksa yang terlalu galak sama
    # merugikannya dengan yang terlalu longgar: keduanya mengarahkan perbaikan
    # ke tempat yang salah.
    r"fungsi naik\b|fungsi turun\b|stasioner": (10, "fungsi naik, fungsi turun, stasioner"),
    r"titik ekstrem|titik balik|uji turunan pertama": (11, "titik ekstrem, uji turunan pertama"),
    r"percepatan|turunan kedua|nilai optimum|biaya marginal": (12, "percepatan, turunan kedua, nilai optimum"),
}

# YANG SENGAJA TIDAK MASUK DAFTAR, DAN KENAPA
#
# "kemiringan", "curam", "landai", "menanjak", "menurun", "naik", "turun":
# semuanya kata Indonesia sehari-hari. Materi 01 memang HARUS memakainya untuk
# membangun gagasannya sebelum ada nama apa pun, dan Materi 03 memakainya untuk
# menggambarkan bentuk grafik. Yang dilarang menyebut NAMA RESMINYA lebih awal
# ("turunan", "fungsi naik"), bukan memperagakan idenya.
#
# "gradien" sendirian juga dikeluarkan: itu pengetahuan SMP yang justru wajib
# dipanggil ulang di Materi 01. Yang didaftarkan hanya "gradien garis singgung".
#
# "limit" tidak didaftarkan sama sekali: itu topik yang SUDAH dipelajari siswa
# sebelum topik ini, jadi menyebutnya di Materi 01 bukan pelanggaran melainkan
# sambungan yang memang diminta rancangan.

# Materi yang memang bertugas MEMPERKENALKAN daftar boleh menyebut istilah yang
# belum diajarkan. Sejauh ini tidak ada. Begitu ada, tulis di sini dengan
# alasannya, jangan didiamkan.
PENGECUALIAN: dict[int, set[str]] = {}


def ambil_teks_tahap() -> list[tuple[int, str, list[str]]]:
    """Nomor materi, slugnya, dan semua kalimat yang tampil di layar.

    Diambil dengan regex, bukan dengan menjalankan TypeScript-nya: berkasnya
    hanya berisi data, dan menjalankan bundler untuk membaca data adalah harga
    yang tidak perlu dibayar.
    """
    berkas = AKAR / "web" / "content" / "turunan" / "tahap.ts"
    isi = berkas.read_text(encoding="utf-8")
    asli = isi

    # Komentar dibuang lebih dulu: isinya untuk pembuat situs, bukan siswa.
    isi = re.sub(r"/\*.*?\*/", "", isi, flags=re.S)
    isi = re.sub(r"^\s*//.*$", "", isi, flags=re.M)

    # PENANDA, BUKAN KALIMAT. Nama berkas video, penanda widget, dan slug tidak
    # pernah dibaca siswa sebagai kalimat; ketiganya nama teknis. Tanpa
    # pembuangan ini, memasang video di Materi 01 langsung dilaporkan melanggar
    # semata karena berkasnya bernama "turunan1-laju-rata-rata.mp4" (terjadi
    # 8 Sep 2026). Pemeriksa yang menuduh nama berkas mengarahkan perbaikan ke
    # tempat yang salah, persis seperti pemeriksa yang terlalu longgar.
    isi = re.sub(r"video:\s*\{[^}]*\}", "", isi)
    isi = re.sub(r"^\s*(?:widget|slug):\s*'[^']*',?$", "", isi, flags=re.M)

    # Slug diambil dari teks ASLI, sebelum baris penanda dibuang di atas.
    # Kalau diambil sesudahnya, laporannya menampilkan "?" untuk semua materi
    # dan pembacanya kehilangan satu-satunya cara mengenali materi mana yang
    # dimaksud (terjadi 8 Sep 2026, akibat pembuangan baris `slug:` itu sendiri).
    slug_per_nomor = {}
    for bagian in re.split(r"\n  \{\n    no: ", asli)[1:]:
        nomor = int(bagian.split(",", 1)[0].strip())
        m = re.search(r"slug: '([a-z-]+)'", bagian)
        if m:
            slug_per_nomor[nomor] = m.group(1)

    potongan = re.split(r"\n  \{\n    no: ", isi)
    hasil = []
    for bagian in potongan[1:]:
        nomor = int(bagian.split(",", 1)[0].strip())
        kalimat = re.findall(r"'((?:[^'\\]|\\.)*)'", bagian)
        hasil.append((nomor, slug_per_nomor.get(nomor, "?"), kalimat))
    return hasil


def ambil_teks_narasi() -> list[tuple[str, int, list[str]]]:
    """Nama naskah video, materi yang ditempatinya, dan kalimat narasinya.

    Kosong sampai ARYA memerintahkan video Turunan dibuat. Petanya sudah
    disiapkan sesuai urutan prioritas di rancangan, tinggal dibuka satu per satu
    begitu naskahnya ada.
    """
    peta: dict[str, int] = {
        "turunan1-laju-rata-rata": 1,
        "turunan2-garis-singgung": 2,
        "turunan3-fungsi-turunan": 3,
        "turunan4-aturan-pangkat": 4,
        "turunan6-hasil-kali": 6,
        "turunan7-aturan-rantai": 7,
    }
    hasil = []
    for nama, materi in peta.items():
        berkas = AKAR / "manim" / "narasi" / f"{nama}.json"
        if not berkas.exists():
            continue
        data = json.loads(berkas.read_text(encoding="utf-8"))
        kalimat = []
        for s in data["segmen"]:
            kalimat.append(s["teks"])
            kalimat.append(s.get("tulis", ""))
        hasil.append((nama, materi, kalimat))
    return hasil


# Kalimat yang MENJANJIKAN sesuatu untuk nanti boleh menyebut istilah yang
# belum diajarkan. Menyebut istilah sebagai sesuatu yang akan datang tidak
# membingungkan siswa; yang membingungkan adalah memakainya SEOLAH sudah
# dipahami. Syaratnya ketat: kata penunjuk masa depannya harus ada di kalimat
# yang SAMA, supaya satu kata "nanti" tidak memutihkan seluruh paragraf.
# Topik MANTRA lain yang boleh dirujuk beserta nomor materinya. Semuanya sudah
# tayang sebelum Turunan, jadi menyebutnya bukan rujukan ke depan.
TOPIK_LAIN = r"(?:Limit|Trigonometri|Vektor|Grafik Fungsi|Statistika|Ruang 3D|Transformasi Geometri)"

JANJI = re.compile(
    r"nanti|akan kita|akan dibahas|dibahas|kita buktikan|kita periksa|"
    r"belum kita|baru akan|kita kenal|kita pakai lagi|kita bahas|kita singgung|"
    r"kita lihat|kita temui|menyusul|materi berikutnya|belakangan",
    re.I,
)


def periksa(nomor: int, kalimat: list[str]) -> list[tuple[str, str]]:
    """Istilah yang dipakai terlalu dini di satu materi."""
    temuan = []
    diizinkan = PENGECUALIAN.get(nomor, set())
    for baris in kalimat:
        if JANJI.search(baris):
            continue
        rendah = baris.lower()

        for pola, (materi_ajar, nama) in ISTILAH.items():
            if materi_ajar <= nomor or nama in diizinkan:
                continue
            if re.search(pola, rendah):
                temuan.append((f"{nama} (diajarkan Materi {materi_ajar:02d})", baris))

        # Rujukan ke materi TOPIK LAIN dibuang lebih dulu. "topik Limit,
        # Materi 04" menunjuk materi keempat topik Limit, yang sudah dipelajari
        # siswa jauh sebelum topik ini, jadi ia bukan rujukan ke depan. Tanpa
        # penyaringan ini, sambungan antartopik yang justru diminta rancangan
        # akan dilaporkan sebagai pelanggaran.
        tanpa_topik_lain = re.sub(rf"topik {TOPIK_LAIN},? Materi \d{{2}}", "", baris)
        tanpa_topik_lain = re.sub(rf"{TOPIK_LAIN} Materi \d{{2}}", "", tanpa_topik_lain)
        for rujuk in re.findall(r"Materi (\d{2})", tanpa_topik_lain):
            if int(rujuk) > nomor:
                temuan.append((f"rujukan ke Materi {rujuk}", baris))
    return temuan


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--rinci", action="store_true", help="tampilkan kalimatnya")
    a = p.parse_args()

    total = 0
    print("=== HALAMAN MATERI ===")
    for nomor, slug, kalimat in ambil_teks_tahap():
        temuan = periksa(nomor, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  Materi {nomor:02d} {slug:26s} {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    naskah = ambil_teks_narasi()
    print("\n=== NASKAH VIDEO ===")
    if not naskah:
        print("  belum ada naskah video Turunan")
    for nama, materi, kalimat in naskah:
        temuan = periksa(materi, kalimat)
        tanda = "ok" if not temuan else f"{len(temuan)} DINI"
        print(f"  {nama:28s} (Materi {materi:02d}) {tanda}")
        total += len(temuan)
        if a.rinci:
            for apa, baris in temuan:
                print(f"      {apa}")
                print(f"        {baris[:110]}")

    print(f"\n{'SEMUA LOLOS' if total == 0 else f'{total} pemakaian istilah terlalu dini'}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
