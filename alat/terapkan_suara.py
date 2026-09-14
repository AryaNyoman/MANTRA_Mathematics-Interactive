"""Menerapkan satu suara narasi ke banyak video sekaligus (14 Sep 2026, ARYA
memilih suara ElevenLabs "Bian - Neutral, Calm and Clear" untuk semua video).

    python alat/terapkan_suara.py rekam  <video ...>   tulis suara+napas ke naskah, rekam, jalankan gerbang pemicu
    python alat/terapkan_suara.py render <video ...>   render 1080p60 satu per satu, gabung audio, subtitle, lembar kontak
    python alat/terapkan_suara.py daftar <topik ...>   cetak nama video per topik (awalan nama naskah)

Tahap `rekam` murah (hanya kuota ElevenLabs) dan boleh diulang; tahap `render`
mahal (menit per video) dan HANYA dijalankan untuk video yang lolos gerbang.
Render tidak pernah paralel: dua render 1080p sekaligus pernah menghasilkan
video hitam dari tengah (11 Sep 2026).
"""

from __future__ import annotations

import glob
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

AKAR = Path(__file__).resolve().parent.parent
SUARA = "eleven:Bian - Neutral, Calm and Clear"
NAPAS = 0.6
PY = sys.executable


def naskah_dari(video: str) -> Path:
    p = AKAR / "manim" / "narasi" / f"{video}.json"
    if not p.exists():
        raise SystemExit(f"naskah tidak ada: {p}")
    return p


def adegan_dari(video: str) -> tuple[Path, str]:
    """Berkas adegan (dari TOPIK = "...") dan nama kelas adegan (dari naskah)."""
    naskah = json.loads(naskah_dari(video).read_text(encoding="utf-8"))
    for f in sorted(glob.glob(str(AKAR / "manim" / "scenes" / "*.py"))):
        if re.search(r'TOPIK\s*=\s*"%s"' % re.escape(video), Path(f).read_text(encoding="utf-8")):
            return Path(f), naskah["adegan"]
    raise SystemExit(f"adegan untuk {video} tidak ditemukan di manim/scenes")


def jalankan(perintah: list[str], log: Path | None = None) -> int:
    print("  $", " ".join(perintah[:6]), "..." if len(perintah) > 6 else "")
    if log:
        with log.open("w", encoding="utf-8", errors="replace") as f:
            return subprocess.run(perintah, cwd=AKAR, stdout=f, stderr=subprocess.STDOUT).returncode
    return subprocess.run(perintah, cwd=AKAR).returncode


def rekam(video: str) -> bool:
    p = naskah_dari(video)
    naskah = json.loads(p.read_text(encoding="utf-8"))
    if naskah.get("suara") != SUARA or naskah.get("napas") != NAPAS:
        naskah["suara"] = SUARA
        naskah["napas"] = NAPAS
        # simpan dengan urutan kunci semula; suara dan napas sudah ada di atas
        p.write_text(json.dumps(naskah, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"  naskah {p.name}: suara dan napas ditulis")
    if jalankan([PY, "manim/buat_narasi.py", video, "--diam"]) != 0:
        print(f"  GAGAL rekam {video}")
        return False
    berkas, _ = adegan_dari(video)
    hasil = subprocess.run([PY, "alat/cek_pemicu_urut.py", str(berkas.relative_to(AKAR))],
                           cwd=AKAR, capture_output=True, text=True, encoding="utf-8", errors="replace")
    keluaran = hasil.stdout + hasil.stderr
    lolos = "SEMUA LOLOS" in keluaran
    durasi = json.loads((AKAR / "audio" / video / "durasi.json").read_text(encoding="utf-8"))["total"]
    print(f"  {video}: {durasi:.1f} s, gerbang pemicu {'LOLOS' if lolos else 'BERMASALAH'}")
    if not lolos:
        for baris in keluaran.splitlines():
            if baris.strip().startswith(("TERLAMBAT", "EKOR", "HILANG")) or "bermasalah" in baris:
                print("   ", baris.strip()[:160])
    return lolos


def render(video: str) -> bool:
    berkas, adegan = adegan_dari(video)
    log = AKAR / f"log_hd_{video}.txt"
    mulai = time.time()
    kode = jalankan(["manimgl", str(berkas.relative_to(AKAR)), adegan, "-w", "--hd",
                     "--config_file", "manim/hd60.yml"], log)
    menit = (time.time() - mulai) / 60
    isi = log.read_text(encoding="utf-8", errors="replace")
    if kode != 0 or "WaktuTidakMuat" in isi or "Traceback" in isi:
        print(f"  GAGAL render {video} ({menit:.1f} menit), lihat {log.name}")
        return False
    m = re.search(r"terlambat terbesar ([0-9.]+) s", isi)
    print(f"  render {video}: {menit:.1f} menit, pemicu terlambat terbesar {m.group(1) if m else '?'} s")
    if jalankan([PY, "manim/gabung_audio.py", video, adegan, "--keluar", f"{video}.mp4"],
                AKAR / f"log_gabung_{video}.txt") != 0:
        print(f"  GAGAL gabung {video}, lihat log_gabung_{video}.txt")
        return False
    if jalankan([PY, "manim/buat_subtitle.py", video], AKAR / f"log_subtitle_{video}.txt") != 0:
        print(f"  GAGAL subtitle {video}")
        return False
    jalankan([PY, "manim/cek_video.py", f"web/public/anim/{video}.mp4", "--per-detik", "0.25"],
             AKAR / f"log_kontak_{video}.txt")
    print(f"  selesai {video}: web/public/anim/{video}.mp4 + .vtt, lembar kontak qc/{video}/kontak.png")
    return True


def daftar(awalan: list[str]) -> list[str]:
    semua = sorted(Path(f).stem for f in glob.glob(str(AKAR / "manim" / "narasi" / "*.json")))
    return [v for v in semua if any(v.startswith(a) for a in awalan)]


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    perintah, nama = sys.argv[1], sys.argv[2:]
    if perintah == "daftar":
        print("\n".join(daftar(nama)))
        return
    gagal = []
    for v in nama:
        print(f"\n== {v}")
        ok = rekam(v) if perintah == "rekam" else render(v)
        if not ok:
            gagal.append(v)
    print(f"\n{len(nama) - len(gagal)} beres, {len(gagal)} bermasalah" + (": " + ", ".join(gagal) if gagal else ""))


if __name__ == "__main__":
    main()
