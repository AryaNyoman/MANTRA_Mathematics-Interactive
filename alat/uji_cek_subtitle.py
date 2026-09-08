"""Uji dua arah untuk alat/cek_subtitle.py.

    python alat/uji_cek_subtitle.py

Yang dibuktikan:
1. vtt yang persis sama dengan `tulis` LOLOS;
2. operator yang hilang ("2x + h" jadi "2xh") DITOLAK, walau pembanding lama
   menganggapnya sama (celah yang ditemukan sesi Turunan 8 Sep 2026);
3. tanda minus yang hilang ("−1" jadi "1") DITOLAK;
4. tanda * yang bocor DITOLAK;
5. cue yang tumpang tindih DITOLAK.
Bahannya naskah dan vtt buatan di folder sementara, bukan aset proyek.
"""
import json
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import cek_subtitle  # noqa: E402


def tulis_vtt(jalur: Path, cue: list[tuple[float, float, str]]) -> None:
    baris = ["WEBVTT", ""]
    for i, (a, b, t) in enumerate(cue, 1):
        baris += [str(i), f"{cek_subtitle_jam(a)} --> {cek_subtitle_jam(b)}", t, ""]
    jalur.write_text("\n".join(baris), encoding="utf-8")


def cek_subtitle_jam(d: float) -> str:
    j, s = divmod(d, 3600)
    m, s = divmod(s, 60)
    return f"{int(j):02d}:{int(m):02d}:{s:06.3f}"


def main() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        (tmp / "naskah").mkdir()
        (tmp / "anim").mkdir()
        cek_subtitle.NASKAH = tmp / "naskah"
        cek_subtitle.ANIM = tmp / "anim"
        naskah = {"segmen": [
            {"id": "a", "teks": "Kemiringannya dua eks tambah ha.", "tulis": "Kemiringannya 2x + h."},
            {"id": "b", "teks": "Dari kiri hasilnya negatif satu.", "tulis": "Dari kiri hasilnya −1."},
        ]}
        (tmp / "naskah" / "uji.json").write_text(json.dumps(naskah, ensure_ascii=False), encoding="utf-8")

        def periksa(cue):
            tulis_vtt(tmp / "anim" / "uji.vtt", cue)
            return cek_subtitle.periksa("uji")

        benar = [(0.0, 2.0, "Kemiringannya <b>2x + h</b>."), (2.5, 4.0, "Dari kiri hasilnya −1.")]
        assert periksa(benar) == [], periksa(benar)
        print("ok: vtt yang sama dengan tulis lolos (tag <b> diabaikan)")

        salah_operator = [(0.0, 2.0, "Kemiringannya 2xh."), (2.5, 4.0, "Dari kiri hasilnya −1.")]
        assert periksa(salah_operator), "GAGAL: 2xh lolos padahal tulis 2x + h"
        print("ok: operator yang hilang ditolak (2xh bukan 2x + h)")

        salah_minus = [(0.0, 2.0, "Kemiringannya 2x + h."), (2.5, 4.0, "Dari kiri hasilnya 1.")]
        assert periksa(salah_minus), "GAGAL: minus yang hilang lolos"
        print("ok: tanda minus yang hilang ditolak")

        bintang = [(0.0, 2.0, "Kemiringannya *2x + h."), (2.5, 4.0, "Dari kiri hasilnya −1.")]
        assert any("*" in t for t in periksa(bintang)), "GAGAL: bintang bocor lolos"
        print("ok: tanda * yang bocor ditolak")

        tindih = [(0.0, 3.0, "Kemiringannya 2x + h."), (2.5, 4.0, "Dari kiri hasilnya −1.")]
        assert any("sebelum" in t for t in periksa(tindih)), "GAGAL: cue tumpang tindih lolos"
        print("ok: cue tumpang tindih ditolak")
    print("SEMUA UJI CEK SUBTITLE LOLOS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
