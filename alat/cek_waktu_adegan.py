"""Hitung waktu tiap babak SEBELUM render, tanpa menjalankan ManimGL.

KENAPA ADA ALAT INI
-------------------
Gerbang waktu di `gl/sinema.py` baru berbunyi saat render, dan render 480p
video 05 memakan tiga sampai lima menit. Setiap kali satu babak kelebihan
0,5 detik, render berhenti di situ, babak sesudahnya belum sempat diperiksa,
dan kesalahan berikutnya baru ketahuan pada render berikutnya. Render kelima
video 05 (7 Sep 2026) mati di babak 'tinggi' padahal 'contoh' dan 'hitung7'
juga sudah diubah pada suntingan yang sama.

Alat ini membaca kodenya sebagai teks dan menirukan pembukuan waktu `Babak`,
sehingga SEMUA babak dilaporkan sekaligus.

DUA HAL YANG DILAPORKAN
-----------------------
1. KELEBIHAN. Animasi melewati panjang narasi. Persis yang membuat render
   gagal. Di sini terlihat semuanya sekaligus, bukan satu per render.
2. JANGKAR HILANG. `sinema.mulai(jam, "awalan")` mengembalikan None diam-diam
   kalau tidak ada kalimat subtitle yang DIAWALI teks itu, dan `tunggu_sampai`
   lalu berjalan terus tanpa menunggu. Enam jangkar video 05 pernah patah
   begini selama empat render; akibatnya animasi menumpuk di awal babak dan
   layar diam 4 sampai 7 detik menunggu narator. Tidak ada yang menggagalkan
   render, jadi tidak ada yang memberi tahu.

BATASNYA, SUPAYA TIDAK DIPERCAYA BERLEBIHAN
-------------------------------------------
Ini pembaca teks, bukan penerjemah Python. Yang TIDAK terbaca:
- `run_time` yang nilainya peubah atau hitungan, bukan angka langsung;
- pemanggilan berwaktu di dalam `for`/`if` (jumlah putarannya tidak dihitung);
- `scene.wait(n)` telanjang yang tidak disertai `b.catat(n)`.
Baris seperti itu dilaporkan sebagai "tidak terbaca" dan babaknya ditandai,
supaya tidak ada yang mengira babak itu sudah bersih. Lolos di sini berarti
"tidak ada kelebihan yang bisa dilihat dari teks", BUKAN "render pasti jalan".
Rendernya tetap satu-satunya bukti.

Pakai:
    python alat/cek_waktu_adegan.py manim/scenes/integral05_riemann.py
"""

import io
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parents[1]

# Waktu bawaan tiap pembantu, disalin dari tanda tangan fungsinya di
# gl/sinema.py. Kalau angka di sana berubah, alat ini ikut salah: karena itu
# `periksa_bawaan()` di bawah membandingkannya dan berbunyi kalau bergeser.
BAWAAN = {
    "lahir_rumus": {"tahan": 0.6, "run_time": 1.2, "tetap": 0.5},
    "ganti_rumus": {"run_time": 1.2},
    "baris": {"run_time": 0.8},
    "main": {"run_time": 1.0},
    "jeda": {"lama": 0.8},
}
TOLERANSI_LEBIH = 0.15  # nilai di gl/sinema.py; diperiksa periksa_bawaan()


def periksa_bawaan():
    """Bandingkan angka bawaan di atas dengan gl/sinema.py yang sebenarnya."""
    src = io.open(AKAR / "manim" / "gl" / "sinema.py", encoding="utf-8").read()
    keluhan = []

    m = re.search(r"TOLERANSI_LEBIH\s*=\s*([\d.]+)", src)
    if m and abs(float(m.group(1)) - TOLERANSI_LEBIH) > 1e-9:
        keluhan.append("TOLERANSI_LEBIH sinema=%s, alat=%s" % (m.group(1), TOLERANSI_LEBIH))

    m = re.search(r"def lahir_rumus\((?:[^)]*)\)", src, re.S)
    if m:
        for kunci, nilai in (("tahan", 0.6), ("run_time", 1.2)):
            g = re.search(kunci + r":\s*float\s*=\s*([\d.]+)", m.group(0))
            if g and abs(float(g.group(1)) - nilai) > 1e-9:
                keluhan.append("lahir_rumus.%s sinema=%s, alat=%s" % (kunci, g.group(1), nilai))
    if keluhan:
        print("ANGKA BAWAAN SUDAH BERGESER, alat ini tidak lagi setara sinema.py:")
        for k in keluhan:
            print("  " + k)
        return False
    return True


def jam_subtitle(topik):
    """Salinan sinema.jam_subtitle: daftar (detik, kalimat) dari berkas .vtt."""
    p = AKAR / "web" / "public" / "anim" / (topik + ".vtt")
    if not p.exists():
        return None
    hasil, baris = [], p.read_text(encoding="utf-8").splitlines()
    for i, bs in enumerate(baris):
        if "-->" not in bs or i + 1 >= len(baris):
            continue
        j, m, d = bs.split("-->")[0].strip().split(":")
        kalimat = re.sub(r"</?b>", "", baris[i + 1]).strip()
        hasil.append((int(j) * 3600 + int(m) * 60 + float(d), kalimat))
    return hasil


def potong_panggilan(teks, mulai):
    """Kembalikan (isi_dalam_kurung, indeks_setelah_kurung_tutup) dari `mulai`
    yang menunjuk ke kurung buka. Tanda kurung di dalam string diabaikan."""
    dalam, i, kutip = 0, mulai, None
    while i < len(teks):
        c = teks[i]
        if kutip:
            if c == "\\":
                i += 2
                continue
            if c == kutip:
                kutip = None
        elif c in "'\"":
            kutip = c
        elif c == "(":
            dalam += 1
        elif c == ")":
            dalam -= 1
            if dalam == 0:
                return teks[mulai + 1:i], i + 1
        i += 1
    return teks[mulai + 1:], len(teks)


def angka_kw(isi, nama, bawaan):
    """Nilai kata kunci `nama=<angka>` di tingkat terluar `isi`, atau bawaan.
    Kembalikan (nilai, terbaca) supaya nilai peubah bisa dibedakan dari absen."""
    for m in re.finditer(nama + r"\s*=\s*([^,)]+)", isi):
        nilai = m.group(1).strip()
        try:
            return float(nilai), True
        except ValueError:
            return bawaan, False  # ada, tapi bukan angka langsung
    return bawaan, True


def blok_babak(sumber):
    """Daftar (nama, teks_blok) untuk tiap `with sinema.babak(...) as b:`.

    Nama babak diterima apa adanya (huruf besar sekalipun). Versi pertama alat
    ini hanya menerima huruf kecil, dan babak bernama `plusC` di video Integral
    01 DILEWATI TANPA SEPATAH KATA: seluruh babak sesudahnya bergeser 12,67
    detik, dua di antaranya dilaporkan kelebihan padahal tidak, dan yang benar
    benar kelebihan bisa saja luput. Pemeriksa yang diam-diam melewati bagian
    yang tidak dipahaminya lebih berbahaya daripada tidak ada pemeriksa.
    """
    hasil = []
    baris = sumber.splitlines()
    for i, bs in enumerate(baris):
        m = re.match(r"(\s*)with sinema\.babak\(self,\s*\"(\w+)\"", bs)
        if not m:
            continue
        lekuk = len(m.group(1))
        isi = []
        for bt in baris[i + 1:]:
            if bt.strip() and len(bt) - len(bt.lstrip()) <= lekuk:
                break
            isi.append(bt)
        hasil.append((m.group(2), "\n".join(isi)))
    return hasil


AMAN = {"max": max, "min": min, "round": round, "abs": abs, "__builtins__": {}}


def nilai_ekspresi(teks, blok, durasi):
    """Angka dari `teks`, lewat peubah sederhana di `blok` kalau perlu.

    Pola yang benar-benar dipakai adegan MANTRA adalah
    `lama = max(3.0, DURASI["buka"] - 0.6)` lalu `b.catat(lama)`. Tanpa ini,
    babak 'buka' terbaca 0 detik dan tidak ada yang menjaganya. Hanya
    penjumlahan/pengurangan angka, `DURASI["..."]`, dan max/min/round/abs yang
    dihitung; selain itu None supaya babaknya ditandai "tidak terbaca", bukan
    diam-diam dianggap nol.
    """
    teks = teks.strip()
    if not teks:
        return None
    if re.fullmatch(r"[A-Za-z_]\w*", teks):
        m = re.search(r"^\s*" + re.escape(teks) + r"\s*=\s*(.+?)\s*$", blok, re.M)
        if not m:
            return None
        teks = m.group(1)
    if not re.fullmatch(r"[\w\s.,()\[\]\"'+\-*/]+", teks):
        return None
    ganti = re.sub(r"DURASI\[\"([a-z0-9_]+)\"\]",
                   lambda g: repr(float(durasi.get(g.group(1), float("nan")))), teks)
    if "DURASI" in ganti or "[" in ganti:
        return None
    try:
        nilai = eval(ganti, AMAN, {})  # noqa: S307 - ekspresi sudah disaring di atas
    except Exception:
        return None
    return float(nilai) if isinstance(nilai, (int, float)) else None


def _banyak_putaran(iterable):
    """Berapa kali `for ... in <iterable>` berputar, atau None kalau tak terbaca."""
    s = iterable.strip()
    m = re.fullmatch(r"range\(\s*(-?\d+)\s*\)", s)
    if m:
        return max(0, int(m.group(1)))
    m = re.fullmatch(r"range\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)", s)
    if m:
        return max(0, int(m.group(2)) - int(m.group(1)))
    m = re.fullmatch(r"enumerate\(\s*([\(\[].*[\)\]])\s*\)", s, re.S)
    if m:
        s = m.group(1).strip()
    if s.startswith(("(", "[")) and s.endswith((")", "]")):
        dalam = s[1:-1].strip().rstrip(",")
        if not dalam:
            return 0
        # Hanya deretan datar tanpa kurung bersarang yang dihitung, supaya
        # tidak salah membaca `[(1, 2), (3, 4)]` sebagai empat putaran.
        if any(c in dalam for c in "()[]{}"):
            return None
        return len(dalam.split(","))
    return None


def bentang_perulangan(blok):
    """Salin badan `for` sebanyak putarannya, supaya waktunya ikut terhitung.

    Tanpa ini, `for i in (2, 3): b.main(..., run_time=1.4)` dihitung 1,4 detik
    padahal memakan 2,8. Persis itu yang membuat render kelima video 05 gagal
    di babak 'tinggi'. Perulangan yang jumlahnya tidak terbaca dibiarkan apa
    adanya dan tetap dicatat sebagai "tidak terbaca".
    """
    baris = blok.splitlines()
    keluar, i, ada_tak_terbaca = [], 0, False
    while i < len(baris):
        bs = baris[i]
        m = re.match(r"(\s*)for\s+[\w, ]+\s+in\s+(.+):\s*$", bs)
        if not m:
            keluar.append(bs)
            i += 1
            continue
        lekuk = len(m.group(1))
        badan = []
        j = i + 1
        while j < len(baris):
            bt = baris[j]
            if bt.strip() and len(bt) - len(bt.lstrip()) <= lekuk:
                break
            badan.append(bt)
            j += 1
        n = _banyak_putaran(m.group(2))
        if n is None:
            ada_tak_terbaca = True
            keluar.append(bs)
            keluar.extend(badan)
        else:
            isi_badan, dalam_tak_terbaca = bentang_perulangan("\n".join(badan))
            ada_tak_terbaca = ada_tak_terbaca or dalam_tak_terbaca
            for _ in range(n):
                keluar.extend(isi_badan.splitlines())
        i = j
    return "\n".join(keluar), ada_tak_terbaca


DIKENAL = ("b.main(", "b.jeda(", "b.catat(", "b.tunggu_sampai(",
           "sinema.lahir_rumus(", "sinema.ganti_rumus(", ".baris(")


def pembantu_setempat(sumber):
    """Fungsi pembantu di berkas adegan yang MEMAKAN waktu babak.

    Pola yang dipakai adegan MANTRA: `def bersihkan_panel(..., b=None,
    run_time: float = 0.9)` yang di dalamnya memanggil `b.catat(run_time)`.
    Waktunya nyata, tetapi namanya tidak dikenal alat ini, sehingga babak
    'turun' video 05 terbaca 12,50 detik padahal render melaporkan 13,40 dan
    GAGAL. Selisih 0,90 itu persis `bersihkan_panel`. Sekarang dibaca dari
    tanda tangannya.
    """
    hasil = {}
    for m in re.finditer(r"^def ([a-z_]\w*)\((.*?)\)\s*:", sumber, re.S | re.M):
        nama, arg = m.group(1), m.group(2)
        if "b=None" not in arg.replace(" ", "") and "b," not in arg.replace(" ", ""):
            continue
        badan = sumber[m.end():]
        potong = re.search(r"^def |^class ", badan, re.M)
        if potong:
            badan = badan[:potong.start()]
        if "b.catat(" not in badan:
            continue
        g = re.search(r"run_time\s*(?::\s*float\s*)?=\s*([\d.]+)", arg)
        hasil[nama] = float(g.group(1)) if g else None
    return hasil


def hitung_babak(nama, blok, mulai_abs, lama, jam, durasi, pembantu=None):
    """Tirukan pembukuan Babak. Kembalikan (terpakai, catatan)."""
    t = mulai_abs
    catatan = []
    pembantu = pembantu or {}
    blok, perulangan_tak_terbaca = bentang_perulangan(blok)
    i = 0
    while i < len(blok):
        pola = "|".join(re.escape(k) for k in DIKENAL)
        if pembantu:
            pola += "|" + "|".join(re.escape(k + "(") for k in pembantu)
        # Panggilan APA PUN yang menitipkan `b=b` juga ditangkap, supaya
        # pembantu yang tidak terbaca berbunyi, bukan hilang diam-diam.
        pola += r"|[A-Za-z_][\w.]*\((?=[^()]*b=b)"
        m = re.compile(pola).search(blok, i)
        if not m:
            break
        # Nama panggilan dibaca dari NAMA LENGKAP yang berakhir di kurung buka,
        # bukan dari potongan yang kebetulan cocok duluan. Tanpa ini
        # `papan.baris(...)` tertangkap aturan umum "ada b=b" karena namanya
        # mulai lebih kiri daripada potongan `.baris(`, dan waktunya hilang.
        g = re.search(r"[A-Za-z_][\w.]*$", blok[:m.end() - 1])
        nama_penuh = g.group(0) if g else m.group(0).rstrip("(")
        panggil = nama_penuh + "("
        if panggil not in DIKENAL and nama_penuh.endswith(".baris"):
            panggil = ".baris("
        isi, sesudah = potong_panggilan(blok, m.end() - 1)
        i = sesudah

        if panggil == "b.main(":
            nilai, terbaca = angka_kw(isi, "run_time", BAWAAN["main"]["run_time"])
            if not terbaca:
                catatan.append("run_time b.main bukan angka langsung, dipakai %.2f" % nilai)
            t += nilai
        elif panggil == "b.jeda(":
            arg = isi.strip().split(",")[0]
            try:
                t += float(arg) if arg else BAWAAN["jeda"]["lama"]
            except ValueError:
                t += BAWAAN["jeda"]["lama"]
                catatan.append("b.jeda bukan angka langsung, dipakai 0.80")
        elif panggil == "b.catat(":
            nilai = nilai_ekspresi(isi.split(",")[0], blok, durasi)
            if nilai is None:
                catatan.append("b.catat tidak terbaca, waktunya TIDAK dihitung")
            else:
                t += nilai
        elif panggil == "b.tunggu_sampai(":
            g = re.search(r"sinema\.mulai\(jam,\s*\"((?:[^\"\\]|\\.)*)\"", isi)
            cadangan, _ = angka_kw(isi, "cadangan", 0.0)
            if not g:
                catatan.append("tunggu_sampai tanpa sinema.mulai, waktunya tidak dihitung")
            elif jam is None:
                catatan.append("berkas .vtt belum ada, jangkar tidak bisa diperiksa")
            else:
                awalan = g.group(1)
                titik = next((d for d, k in jam if k.startswith(awalan)), None)
                if titik is None:
                    catatan.append("JANGKAR HILANG: tidak ada subtitle diawali \"%s\"" % awalan)
                    t += cadangan
                else:
                    if titik < t - 0.02:
                        catatan.append(
                            "jangkar \"%s\" pada %.2f d sudah terlewat (animasi baru "
                            "sampai %.2f d), jadi tidak menunggu" % (awalan, titik, t))
                    t = max(t, titik)
        elif panggil == "sinema.lahir_rumus(":
            if "b=b" not in isi.replace(" ", ""):
                catatan.append("lahir_rumus tanpa b=b, waktunya tidak masuk buku babak")
            else:
                tahan, _ = angka_kw(isi, "tahan", BAWAAN["lahir_rumus"]["tahan"])
                rt, _ = angka_kw(isi, "run_time", BAWAAN["lahir_rumus"]["run_time"])
                t += BAWAAN["lahir_rumus"]["tetap"] + tahan + rt
        elif panggil == "sinema.ganti_rumus(":
            if "b=b" in isi.replace(" ", ""):
                rt, _ = angka_kw(isi, "run_time", BAWAAN["ganti_rumus"]["run_time"])
                t += rt
        elif panggil == ".baris(":
            if "b=b" in isi.replace(" ", ""):
                rt, _ = angka_kw(isi, "run_time", BAWAAN["baris"]["run_time"])
                t += rt
        elif nama_penuh in pembantu:
            nama_p = nama_penuh
            bawaan_p = pembantu[nama_p]
            rt, terbaca = angka_kw(isi, "run_time", bawaan_p)
            if rt is None or not terbaca:
                catatan.append("run_time %s tidak terbaca, waktunya TIDAK dihitung" % nama_p)
            else:
                t += rt
        else:
            # Panggilan yang menitipkan `b=b` tetapi tidak dikenal sama sekali.
            catatan.append("panggilan %s memakai b=b tetapi tidak terbaca, "
                           "waktunya TIDAK dihitung" % panggil.rstrip("("))

    if perulangan_tak_terbaca:
        catatan.append("ada perulangan yang jumlah putarannya tidak terbaca: "
                       "angka di atas adalah batas bawah")
    if re.search(r"scene\.wait\(", blok):
        catatan.append("ada scene.wait telanjang, waktunya tidak dihitung")
    return t - mulai_abs, catatan


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    berkas = Path(sys.argv[1])
    if not berkas.is_absolute():
        berkas = AKAR / berkas
    sumber = io.open(berkas, encoding="utf-8").read()

    setara = periksa_bawaan()
    pembantu = pembantu_setempat(sumber)

    m = re.search(r"TOPIK\s*=\s*\"([^\"]+)\"", sumber)
    if not m:
        print("TOPIK tidak ketemu di " + str(berkas))
        return 2
    topik = m.group(1)
    durasi = json.loads(
        (AKAR / "audio" / topik / "durasi.json").read_text(encoding="utf-8"))["segmen"]
    jam = jam_subtitle(topik)
    if jam is None:
        print("PERINGATAN: web/public/anim/%s.vtt belum ada, jangkar tidak diperiksa" % topik)

    babak = blok_babak(sumber)
    # Jumlah dan URUTAN babak harus sama persis dengan durasi.json. Kalau satu
    # babak terlewat, waktu mulai semua babak sesudahnya bergeser sebesar
    # durasi babak yang hilang, dan angka "sisa" di bawah jadi karangan.
    # Itu benar-benar terjadi pada video Integral 01 sebelum pemeriksaan ini
    # ada: satu babak terlewat, dua babak lain dilaporkan kelebihan padahal
    # tidak. Karena itu ketidakcocokan di sini MENGGAGALKAN, bukan sekadar
    # dicatat.
    nama_adegan = [n for n, _ in babak]
    nama_narasi = list(durasi.keys())
    if nama_adegan != nama_narasi:
        print("SUSUNAN BABAK TIDAK COCOK, angka waktunya tidak bisa dipercaya:")
        print("  di adegan : " + ", ".join(nama_adegan))
        print("  di narasi : " + ", ".join(nama_narasi))
        hilang = [n for n in nama_narasi if n not in nama_adegan]
        lebih = [n for n in nama_adegan if n not in nama_narasi]
        if hilang:
            print("  ada di narasi tapi TIDAK ditemukan di adegan: " + ", ".join(hilang))
        if lebih:
            print("  ada di adegan tapi tidak ada di narasi: " + ", ".join(lebih))
        if not hilang and not lebih:
            print("  namanya sama tetapi URUTANNYA berbeda")
        return 1

    print("%-12s %7s %7s %8s" % ("babak", "narasi", "animasi", "sisa"))
    print("-" * 40)
    gagal, bercatatan = [], []
    mulai_abs = 0.0
    for nama, blok in babak:
        lama = durasi.get(nama)
        if lama is None:
            print("%-12s  tidak ada di durasi.json" % nama)
            gagal.append(nama)
            continue
        terpakai, catatan = hitung_babak(nama, blok, mulai_abs, lama, jam, durasi, pembantu)
        sisa = lama - terpakai
        tanda = ""
        if sisa < -TOLERANSI_LEBIH:
            tanda = "  <-- KELEBIHAN %.2f, render akan GAGAL" % (-sisa)
            gagal.append(nama)
        print("%-12s %7.2f %7.2f %8.2f%s" % (nama, lama, terpakai, sisa, tanda))
        for c in catatan:
            print("             . " + c)
            if "JANGKAR HILANG" in c:
                gagal.append(nama)
            else:
                bercatatan.append(nama)
        mulai_abs += lama

    print()
    if gagal:
        print("TIDAK LOLOS: " + ", ".join(sorted(set(gagal))))
        return 1
    if bercatatan:
        print("Tidak ada kelebihan yang terbaca, TAPI ada babak yang tidak "
              "terbaca penuh: " + ", ".join(sorted(set(bercatatan))))
    else:
        print("Tidak ada kelebihan dan tidak ada jangkar hilang.")
    if not setara:
        print("(angka bawaan sudah bergeser, lihat peringatan di atas)")
        return 1
    print("Ini BUKAN pengganti render. Render tetap satu-satunya bukti.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
