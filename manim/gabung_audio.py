"""Menggabungkan narasi ke video Manim, lalu memeriksa hasilnya.

    python manim/gabung_audio.py trigonometri UkuranBedaRasioSama

Yang dilakukan:
  1. Mencari video hasil render dan berkas `narasi-penuh.mp3`
  2. Memeriksa selisih durasi keduanya, kalau melenceng > 1,5 detik, BERHENTI
     dan memberi tahu, bukan diam-diam menghasilkan video yang tidak sinkron
  3. Menggabungkan jadi satu berkas WebM (video disalin, audio diubah ke Opus)
  4. Menyalin hasilnya ke `web/public/anim/` supaya langsung dipakai situs
  5. Melaporkan ukuran berkas, kalau > 4 MB, memperingatkan

Setelah ini WAJIB jalankan `manim/cek_video.py` dan LIHAT lembar kontaknya.
Berhasil digabung bukan berarti videonya benar.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
BATAS_SELISIH = 1.5   # detik
BATAS_UKURAN_MB = 4.0


def durasi(berkas: Path) -> float:
    h = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(berkas)],
        capture_output=True, text=True,
    )
    if h.returncode != 0:
        raise SystemExit(f"ffprobe gagal: {berkas}")
    return float(h.stdout.strip())


def cari_video(adegan: str, uji: bool = False) -> Path:
    """Cari hasil render adegan. Mode `uji` mencari versi 480p bikinan `-ql`.

    Versi uji dirender sebagai mp4, versi tayang sebagai webm, jadi kedua
    akhiran dicari. Aturan ARYA: semua video dibuat 480p dulu untuk direvisi,
    baru dirender 1080p sekaligus di akhir.
    """
    # ManimGL (sejak 2 Sep 2026) menulis ke media/gl/<Adegan>.mp4, satu mutu per render.
    calon_gl = list((AKAR / "media" / "gl").rglob(f"{adegan}.mp4"))
    if calon_gl:
        return max(calon_gl, key=lambda p: p.stat().st_mtime)
    calon = []
    for akhiran in ("webm", "mp4"):
        calon += list((AKAR / "media" / "videos").rglob(f"{adegan}.{akhiran}"))
    calon = [p for p in calon if "partial_movie_files" not in p.parts]
    if uji:
        calon = [p for p in calon if any("480p" in b for b in p.parts)]
    else:
        calon = [p for p in calon if not any("480p" in b for b in p.parts)]
    if not calon:
        mutu = "480p (versi uji)" if uji else "mutu tayang"
        raise SystemExit(
            f"video adegan '{adegan}' {mutu} tidak ditemukan di media/videos/")
    return max(calon, key=lambda p: p.stat().st_mtime)


def periksa_kesegaran(video: Path, adegan: str) -> None:
    """BERHENTI kalau videonya lebih tua daripada berkas adegannya.

    Temuan Vektor 3 Sep malam: `manimgl` keluar dengan kode 0 WALAUPUN
    `qc.periksa_adegan` menggagalkan render. Video lama tetap tergeletak di
    `media/gl/`, dan alat ini dulu menggabungnya tanpa protes, sehingga
    lembar kontak yang diperiksa adalah lembar kontak video LAMA. Dua dari
    empat render malam itu lolos pemeriksaan dengan cara ini.
    """
    sumber = [p for p in (AKAR / "manim" / "scenes").glob("*.py")
              if ("class %s(" % adegan) in p.read_text(encoding="utf-8")]
    if not sumber:
        return
    berkas = sumber[0]
    if video.stat().st_mtime < berkas.stat().st_mtime:
        raise SystemExit(
            "\nBERHENTI: video lebih TUA daripada adegannya.\n"
            "  video  : %s\n"
            "  adegan : %s\n"
            "Rendernya gagal, kemungkinan besar ditolak qc, dan `manimgl`\n"
            "tetap keluar dengan kode 0. Baca log rendernya, cari\n"
            "CacatTataLetak, perbaiki, lalu render ulang."
            % (video.relative_to(AKAR), berkas.relative_to(AKAR)))


def main() -> None:
    p = argparse.ArgumentParser(description="Penggabung narasi + video MATRA")
    p.add_argument("topik")
    p.add_argument("adegan")
    p.add_argument("--keluar", default=None, help="nama berkas hasil (tanpa folder)")
    p.add_argument("--uji", action="store_true",
                   help="gabungkan versi 480p untuk ditinjau ARYA, "
                        "hasilnya ke media/uji-480p/ dan TIDAK disalin ke situs")
    p.add_argument("--latar", default=None,
                   help="suara latar dari manim/suara/<nama>.ogg, tipis dan merendah saat narasi. "
                        "Kalau kosong, dibaca dari kunci \"latar\" di naskah narasi")
    a = p.parse_args()

    video = cari_video(a.adegan, uji=a.uji)
    periksa_kesegaran(video, a.adegan)
    latar = a.latar
    if latar is None:
        naskah = AKAR / "manim" / "narasi" / f"{a.topik}.json"
        if naskah.exists():
            latar = json.loads(naskah.read_text(encoding="utf-8")).get("latar")
    berkas_latar = (AKAR / "manim" / "suara" / f"{latar}.ogg") if latar else None
    if berkas_latar is not None and not berkas_latar.exists():
        raise SystemExit(f"suara latar '{latar}' tidak ada: {berkas_latar}. Lihat manim/suara/README.md")
    suara = AKAR / "audio" / a.topik / "narasi-penuh.mp3"
    if not suara.exists():
        raise SystemExit(f"narasi belum dibuat: {suara}\nJalankan dulu: python manim/buat_narasi.py {a.topik}")

    dv, ds = durasi(video), durasi(suara)
    print(f"video  : {video.relative_to(AKAR)}  {dv:.2f} detik")
    print(f"narasi : {suara.relative_to(AKAR)}  {ds:.2f} detik")
    selisih = abs(dv - ds)
    print(f"selisih: {selisih:.2f} detik")
    if selisih > BATAS_SELISIH:
        raise SystemExit(
            f"\nBERHENTI: selisih {selisih:.2f} detik melebihi batas {BATAS_SELISIH} detik.\n"
            "Gambar dan suara akan berjalan sendiri-sendiri. Perbaiki dulu:\n"
            "  - naskah berubah?  -> python manim/buat_narasi.py <topik>, lalu render ulang\n"
            "  - adegan berubah?  -> pastikan tiap tahap memakai DURASI[...] dari durasi.json"
        )

    if a.uji:
        nama = a.keluar or f"{a.topik}.mp4"
        hasil = AKAR / "media" / "uji-480p" / nama
        hasil.parent.mkdir(parents=True, exist_ok=True)
        suara_kode = ["-c:a", "aac", "-b:a", "96k"]
        gambar_kode = ["-c:v", "copy"]      # mp4 menerima H.264 apa adanya
    else:
        nama = a.keluar or f"{a.topik}.webm"
        hasil = AKAR / "media" / nama
        suara_kode = ["-c:a", "libopus", "-b:a", "72k"]
        # WebM TIDAK menerima video H.264, dan ManimGL menghasilkan H.264.
        # `-c:v copy` karena itu mati dengan "Could not write header (incorrect
        # codec parameters?)" dan meninggalkan berkas 264 bita. Sampai 7 Sep 2026
        # jalur ini tidak pernah dijalankan di bawah ManimGL: kelima belas webm
        # yang sudah tayang semuanya VP9 buatan Manim Community, yang memang bisa
        # menulis webm langsung. Jadi videonya disandikan ulang ke VP9 di sini.
        # `-row-mt 1` dan `-cpu-used 3` menjaga waktu sandi tetap masuk akal di
        # laptop yang dipakai bergiliran empat sesi.
        gambar_kode = ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "32",
                       "-row-mt", "1", "-deadline", "good", "-cpu-used", "3",
                       "-pix_fmt", "yuv420p"]
    if berkas_latar is None:
        perintah = ["ffmpeg", "-y", "-v", "error", "-i", str(video), "-i", str(suara),
                    ] + gambar_kode + suara_kode + ["-shortest", str(hasil)]
    else:
        # Latar dikecilkan (0,12), lalu DITEKAN lagi tiap kali narasi berbunyi
        # (sidechaincompress: narasi = pengendali). amix normalize=0 supaya
        # narasinya tidak ikut dikecilkan. Hasilnya: pemanis, bukan pesaing.
        saring = (
            f"[2:a]volume=0.12,atrim=0:{dv:.3f}[bg];"
            "[bg][1:a]sidechaincompress=threshold=0.015:ratio=6:attack=40:release=700[duck];"
            "[1:a][duck]amix=inputs=2:duration=first:normalize=0[a]"
        )
        perintah = ["ffmpeg", "-y", "-v", "error", "-i", str(video), "-i", str(suara),
                    "-stream_loop", "-1", "-i", str(berkas_latar),
                    "-filter_complex", saring, "-map", "0:v", "-map", "[a]",
                    ] + gambar_kode + suara_kode + ["-shortest", str(hasil)]
        print(f"latar  : {berkas_latar.relative_to(AKAR)}  (tipis, merendah saat narasi)")
    subprocess.run(perintah, check=True)

    mb = hasil.stat().st_size / 1024 / 1024
    print(f"\nhasil  : {hasil.relative_to(AKAR)}  {mb:.2f} MB  {durasi(hasil):.2f} detik")
    if mb > BATAS_UKURAN_MB and not a.uji:
        print(f"PERINGATAN: > {BATAS_UKURAN_MB} MB. Pertimbangkan turunkan bitrate atau resolusi.")

    if a.uji:
        # Versi uji SENGAJA tidak disalin ke web/public/anim. Kalau disalin,
        # situs akan menayangkan video 480p yang belum disetujui ARYA.
        print("versi uji: tidak disalin ke situs, memang begitu")
        # Salinan TINJAUAN bersubtitle (keputusan ARYA 2 Sep malam): mp4 polos
        # tidak membawa .vtt, jadi peninjau mengira subtitlenya tidak ada. Subtitle
        # dibakar HANYA ke salinan ini; versi tayang tetap memakai .vtt terpisah.
        vtt = AKAR / "web" / "public" / "anim" / f"{a.topik}.vtt"
        if not vtt.exists():
            subprocess.run([sys.executable, str(AKAR / "manim" / "buat_subtitle.py"), a.topik], check=False)
        if vtt.exists():
            tinjau = hasil.with_name(hasil.stem + "-bersubtitle.mp4")
            vtt_rel = vtt.relative_to(AKAR).as_posix()
            gaya = "FontName=DejaVu Sans,FontSize=15,PrimaryColour=&H00302421,OutlineColour=&H00EEF3F7,Outline=1,Shadow=0,MarginV=6,Alignment=2"
            subprocess.run(
                ["ffmpeg", "-y", "-v", "error", "-i", str(hasil),
                 "-vf", f"subtitles={vtt_rel}:force_style='{gaya}'",
                 "-c:a", "copy", str(tinjau)],
                cwd=str(AKAR), check=True,
            )
            print(f"tinjau : {tinjau.relative_to(AKAR)}  (subtitle dibakar, untuk ditonton ARYA)")
        else:
            print("PERINGATAN: .vtt tidak ada, salinan bersubtitle tidak dibuat. Jalankan buat_subtitle.py.")
    else:
        tujuan = AKAR / "web" / "public" / "anim" / nama
        tujuan.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(hasil, tujuan)
        print(f"disalin: {tujuan.relative_to(AKAR)}")

    print("\n>>> WAJIB berikutnya:")
    print(f">>>   python manim/cek_video.py {hasil.relative_to(AKAR)} --per-detik 0.25")
    print(">>> lalu BUKA lembar kontaknya dan nilai tiap frame.")


if __name__ == "__main__":
    sys.exit(main())
