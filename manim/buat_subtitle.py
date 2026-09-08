"""Membuat berkas subtitle WebVTT dari naskah narasi dan durasi yang terukur.

    python manim/buat_subtitle.py tahap8-grafik-sin
    python manim/buat_subtitle.py --semua

Keluaran: `web/public/anim/<topik>.vtt`, langsung dipakai oleh <track> di
pemutar video situs.

KENAPA BERKAS TERPISAH, BUKAN DIBAKAR KE VIDEO (permintaan ARYA 31 Agu):
  * Tidak mungkin menindih animasi, peramban menaruhnya di lapisan sendiri,
    di luar gambar, dan siswa bisa menggesernya.
  * Bisa dimatikan kalau mengganggu.
  * Naskah berubah cukup jalankan ulang skrip ini (2 detik), tanpa render
    ulang video yang makan belasan menit.
  * Bisa disalin, dicari, dan dibaca pembaca layar.

KENAPA TIDAK PERLU MENEBAK WAKTUNYA:
`buat_narasi.py` sudah mengukur durasi TIAP KALIMAT dan menyimpannya di
`audio/<topik>/durasi.json`. Waktu mulai tiap subtitle tinggal penjumlahan
berurutan dari situ, sama persis dengan waktu yang dipakai adegan Manim.
Jadi subtitle, suara, dan gambar dijalankan oleh satu sumber angka yang sama.

KALIMAT PANJANG DIPECAH: satu segmen narasi bisa 10 detik dan terlalu panjang
untuk sekali baca. Segmen dipecah pada tanda titik menjadi beberapa baris,
dengan waktu dibagi menurut panjang hurufnya.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
NASKAH = AKAR / "manim" / "narasi"
TUJUAN = AKAR / "web" / "public" / "anim"

# SATU BARIS, selalu (keputusan ARYA 2 Sep 2026 malam: huruf dikecilkan, kalimat
# dipecah). 56 huruf muat satu baris pada pemutar selebar 700 piksel ke atas
# dengan ukuran subtitle 90 persen; di layar HP tetap membungkus, itu diterima.
MAKS_HURUF = 56
MIN_DETIK = 1.2

# Kata bilangan yang menandakan segmen butuh medan `tulis` (angka, bukan ejaan).
KATA_BILANGAN = re.compile(
    r"\b(nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|"
    r"sebelas|belas|puluh|ratus|ribu|setengah|seperempat|koma|akar|pangkat|"
    r"kuadrat|derajat|dibagi|dikali|per)\b", re.I)


def jam(detik: float) -> str:
    j, sisa = divmod(max(detik, 0.0), 3600)
    m, d = divmod(sisa, 60)
    return f"{int(j):02d}:{int(m):02d}:{d:06.3f}"


def tebalkan(teks: str) -> str:
    """`*istilah*` menjadi `<b>istilah</b>`.

    Penanda yang sama dibuang oleh `buat_narasi.py` sebelum teks dikirim ke
    mesin suara, jadi satu naskah melayani dua keluaran: suara yang bersih dan
    subtitle yang menebalkan istilah pentingnya.

    Dipakai tebal, bukan warna: `::cue` untuk warna dukungannya masih
    tambal-sulam antar peramban, sedangkan <b> tampil sama di semuanya.
    """
    return re.sub(r"\*([^*]+)\*", r"<b>\1</b>", teks)


def seimbangkan_tebal(baris: list[str]) -> list[str]:
    """Tag <b> yang terbelah di antara dua baris ditutup dan dibuka lagi.

    `pecah` boleh memotong di tengah `<b>dua kata</b>`; tanpa ini baris
    pertama berakhir dengan tag terbuka dan baris kedua memuat tag tutup tanpa
    pembuka, dan peramban menampilkannya sesukanya.
    """
    hasil: list[str] = []
    terbuka = False
    for b in baris:
        if terbuka:
            b = "<b>" + b
        if b.count("<b>") > b.count("</b>"):
            b += "</b>"
            terbuka = True
        else:
            terbuka = False
        hasil.append(b)
    return hasil


def panjang_tampak(teks: str) -> int:
    """Panjang teks tanpa menghitung tag, dipakai membagi waktu baca."""
    return len(re.sub(r"<[^>]+>", "", teks))


def bentuk_tulis(seg: dict) -> str:
    """Teks yang DIBACA siswa: medan `tulis` (angka dan lambang), bukan ejaan ucapan.

    Keputusan ARYA 2 Sep 2026: yang diucapkan "tujuh puluh dua" ditulis 72, "akar dua"
    ditulis √2, "f dari x kurang satu" ditulis f(x-1). Nama lama `layar` dan `subtitle`
    (dipakai sesi sebelum disatukan) tetap diterima. Tanpa ketiganya: `teks` apa adanya.
    """
    return seg.get("tulis") or seg.get("layar") or seg.get("subtitle") or seg["teks"]


def _gabung_potongan(potongan: list[str]) -> list[str]:
    """Rangkai potongan berurutan selama muat MAKS_HURUF; yang tidak muat mulai baris baru."""
    hasil: list[str] = []
    gabung = ""
    for c in potongan:
        if gabung and panjang_tampak(gabung) + panjang_tampak(c) + 1 > MAKS_HURUF:
            hasil.append(gabung)
            gabung = c
        else:
            gabung = f"{gabung} {c}".strip()
    if gabung:
        hasil.append(gabung)
    return hasil


def _pecah_kata(b: str) -> list[str]:
    """Jalan terakhir: pecah di spasi kata, tiap baris paling banyak MAKS_HURUF.

    Dipilih titik potong yang paling dekat ke tengah supaya dua barisnya
    seimbang, bukan satu panjang satu pendek.
    """
    if panjang_tampak(b) <= MAKS_HURUF:
        return [b]
    kata = b.split(" ")
    # Coba dari tengah ke luar, cari pemotongan yang membuat kedua sisi muat
    # sebanyak mungkin; kalau sisi kanan masih panjang, ia dipecah lagi (rekursif).
    tengah = len(kata) // 2
    for jarak in range(0, len(kata)):
        for i in (tengah - jarak, tengah + jarak):
            if 0 < i < len(kata):
                kiri = " ".join(kata[:i])
                if panjang_tampak(kiri) <= MAKS_HURUF:
                    kanan = " ".join(kata[i:])
                    return [kiri] + _pecah_kata(kanan)
    return [b]


def pecah(teks: str) -> list[str]:
    """Pecah satu segmen jadi baris-baris yang MASING-MASING muat MAKS_HURUF.

    Urutan: batas kalimat (. ! ?), lalu tanda jeda (, ; :), lalu kalau masih
    panjang, di spasi kata. Temuan UI/UX 3 Sep 2026: versi lama hanya memotong
    di titik dan koma, sehingga 38 persen baris melewati 56 huruf dan yang
    terpanjang 101 huruf. Sekarang batasnya DITEGAKKAN, bukan diharapkan.
    """
    teks = " ".join(teks.split())
    if panjang_tampak(teks) <= MAKS_HURUF:
        return [teks]
    hasil: list[str] = []
    for b in (x.strip() for x in re.split(r"(?<=[.!?])\s+", teks) if x.strip()):
        if panjang_tampak(b) <= MAKS_HURUF:
            hasil.append(b)
            continue
        potong = [c.strip() for c in re.split(r"(?<=[,;:])\s+", b) if c.strip()]
        for baris in _gabung_potongan(potong):
            hasil.extend(_pecah_kata(baris))
    return hasil or [teks]


def buat(topik: str, diam: bool = False) -> Path:
    berkas_naskah = NASKAH / f"{topik}.json"
    berkas_durasi = AKAR / "audio" / topik / "durasi.json"
    if not berkas_naskah.exists():
        raise SystemExit(f"naskah tidak ada: {berkas_naskah}")
    if not berkas_durasi.exists():
        raise SystemExit(
            f"durasi belum diukur: {berkas_durasi}\n"
            f"Jalankan dulu: python manim/buat_narasi.py {topik}")

    naskah = json.loads(berkas_naskah.read_text(encoding="utf-8"))
    durasi = json.loads(berkas_durasi.read_text(encoding="utf-8"))["segmen"]

    baris = ["WEBVTT", "",
             f"NOTE Dibuat otomatis dari manim/narasi/{topik}.json", ""]
    jalan = 0.0
    nomor = 0
    tanpa_tulis = [seg["id"] for seg in naskah["segmen"]
                   if not (seg.get("tulis") or seg.get("layar") or seg.get("subtitle"))
                   and KATA_BILANGAN.search(seg["teks"])]
    if tanpa_tulis and not diam:
        print(f"  PERINGATAN {topik}: segmen {', '.join(tanpa_tulis)} menyebut bilangan atau "
              f"lambang tetapi tidak punya medan `tulis`. Subtitle akan MENGEJA ucapan "
              f"(aturan ARYA: tulis 72, √2, f(x-1)). Tambahkan `tulis` di naskahnya.")
    for seg in naskah["segmen"]:
        lama = durasi.get(seg["id"])
        if lama is None:
            raise SystemExit(
                f"segmen '{seg['id']}' ada di naskah tapi tidak di durasi.json. "
                f"Jalankan ulang buat_narasi.py {topik}.")
        # Bentuk TERTULIS subtitle (angka dan lambang) dibaca dari medan `tulis`;
        # `layar` dan `subtitle` diterima sebagai nama lama. Tanpa itu jatuh ke `teks`.
        # `tebalkan` DULU, baru `pecah`: versi lama memecah dulu, sehingga
        # `*istilah dua kata*` yang terpotong di tengah baris meninggalkan
        # bintangnya tercetak apa adanya di layar ("*gambar dulu," lalu "cari
        # titik potongnya*."). Ditemukan sesi Integral 8 Sep 2026; saat itu
        # empat video tayang (grafik6, ruang-3d-03, statistika10, tahap5)
        # mengidapnya. `pecah` sudah mengukur panjang tanpa tag, jadi urutan
        # ini tidak mengubah pemotongannya; tag yang terbelah di antara dua
        # baris diseimbangkan lagi oleh `seimbangkan_tebal`.
        potongan = seimbangkan_tebal(pecah(tebalkan(bentuk_tulis(seg))))
        sisa_bintang = [p for p in potongan if "*" in p]
        if sisa_bintang:
            raise SystemExit(
                f"segmen '{seg['id']}' masih memuat tanda * di subtitle: {sisa_bintang}. "
                f"Penanda tebal harus berpasangan di dalam satu segmen; periksa naskahnya.")
        total_huruf = sum(panjang_tampak(p) for p in potongan) or 1
        mulai = jalan
        for p in potongan:
            bagi = lama * panjang_tampak(p) / total_huruf
            # Baris yang sangat pendek tetap diberi waktu baca yang manusiawi,
            # selama tidak melewati akhir segmennya.
            selesai = min(mulai + max(bagi, MIN_DETIK), jalan + lama)
            if selesai <= mulai:
                selesai = mulai + 0.4
            nomor += 1
            baris += [str(nomor), f"{jam(mulai)} --> {jam(selesai)}", p, ""]
            mulai = selesai
        jalan += lama

    TUJUAN.mkdir(parents=True, exist_ok=True)
    keluar = TUJUAN / f"{topik}.vtt"
    keluar.write_text("\n".join(baris), encoding="utf-8")
    if not diam:
        print(f"  {topik:28s} {nomor:3d} baris  {jalan:6.2f} detik  -> "
              f"{keluar.relative_to(AKAR)}")
    return keluar


def main() -> int:
    for aliran in (sys.stdout, sys.stderr):
        try:
            aliran.reconfigure(encoding="utf-8")
        except (AttributeError, ValueError):                    # pragma: no cover
            pass
    p = argparse.ArgumentParser(description="Pembuat subtitle WebVTT MATRA")
    p.add_argument("topik", nargs="*", help="nama naskah tanpa .json")
    p.add_argument("--semua", action="store_true",
                   help="buat untuk semua naskah yang durasinya sudah diukur")
    a = p.parse_args()

    daftar = a.topik
    if a.semua:
        daftar = sorted(
            f.stem for f in NASKAH.glob("*.json")
            if (AKAR / "audio" / f.stem / "durasi.json").exists())
    if not daftar:
        print("tidak ada yang dibuat. Sebut topiknya, atau pakai --semua.")
        return 1

    print(f"membuat subtitle untuk {len(daftar)} naskah:")
    for t in daftar:
        buat(t)
    print("\n>>> Pemutar situs memuatnya lewat <track src=\"/anim/<topik>.vtt\">.")
    return 0


if __name__ == "__main__":
    sys.exit(main())