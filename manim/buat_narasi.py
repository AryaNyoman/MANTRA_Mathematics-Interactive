"""Membuat suara narasi, mengukur durasinya, DAN mencatat waktu tiap kata.

    python manim/buat_narasi.py <nama-video>          contoh: turunan2-garis-singgung

Keluaran di audio/<nama-video>/:
    <nn>-<id>.mp3        potongan suara per segmen (untuk cek_aset_video dan arsip)
    narasi-penuh.mp3     gabungan, digabung ke video oleh gabung_audio.py
    durasi.json          {"total": ..., "segmen": {id: detik}}   dibaca adegan Manim
    kata.json            {id: {"mulai": detik absolut, "durasi": detik,
                               "kata": [{"kata", "mulai", "durasi"}, ...]}}
                         waktu tiap kata RELATIF terhadap awal segmennya,
                         dibaca `sinema.JamKata` untuk memicu animasi pada kata
    revisi/              cache per segmen (diabaikan git): rekaman ulang hanya
                         untuk segmen yang teksnya, suaranya, atau temponya berubah

STANDAR VIDEO v3 (8 Sep 2026): animasi dipicu pada detik KATA diucapkan, bukan
dibagi rata sepanjang kalimat. Waktu kata datang dari penanda WordBoundary
mesin suara (edge-tts), bukan ditebak dari panjang teks. Mesin ini diangkat
dari `alat/buat_suara_turunan2.py` milik sesi Turunan (video 02 yang disetujui
ARYA) menjadi perkakas bersama supaya delapan sesi tidak melahirkan delapan
salinan yang menyimpang.

Tempo bawaan -5% (lebih tenang, keputusan ARYA 8 Sep). Tiap segmen diberi
napas 0,35 detik di ujungnya, dan panjang tiap segmen dibulatkan ke kisi
1/30 detik supaya frame video (30 atau 60 fps) jatuh tepat di batas segmen;
tanpa pembulatan itu selisih frame menumpuk sampai satu detik di akhir video
(temuan Turunan 2).

Mesin suara: edge-tts, suara Indonesia asli id-ID-ArdiNeural. ElevenLabs
tidak dipakai: tingkat gratisnya mengunci semua suara Indonesia (31 Agu 2026).
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import math
import subprocess
import sys
import wave
from pathlib import Path

import edge_tts

AKAR = Path(__file__).resolve().parent.parent
LAJU = 48000                 # sampel per detik WAV antara
KISI = LAJU // 30            # 1600 sampel = satu frame 30 fps (juga kelipatan 60 fps)
NAPAS = 0.35                 # detik jeda di ujung tiap segmen
SUARA_BAWAAN = "id-ID-ArdiNeural"
TEMPO_BAWAAN = "-5%"


def teks_ucap(seg: dict) -> str:
    """Teks yang DIUCAPKAN: tanda tebal `*` untuk subtitle dibuang."""
    return " ".join(seg["teks"].replace("*", "").split())


async def rekam(teks: str, suara: str, tempo: str, mp3: Path, meta: Path) -> None:
    """Rekam satu segmen dan simpan waktu tiap katanya. Tiga kali coba."""
    for percobaan in range(3):
        try:
            kata, potongan = [], []
            kom = edge_tts.Communicate(teks, suara, rate=tempo, boundary="WordBoundary")
            async for bagian in kom.stream():
                if bagian["type"] == "audio":
                    potongan.append(bagian["data"])
                elif bagian["type"] == "WordBoundary":
                    kata.append({"kata": bagian["text"],
                                 "mulai": round(bagian["offset"] / 1e7, 6),
                                 "durasi": round(bagian["duration"] / 1e7, 6)})
            if not kata or not potongan:
                raise RuntimeError("mesin suara tidak mengembalikan suara atau penanda kata")
            mp3.write_bytes(b"".join(potongan))
            meta.write_text(json.dumps(kata, ensure_ascii=False, indent=2), encoding="utf-8")
            return
        except Exception:
            if percobaan == 2:
                raise
            await asyncio.sleep(2)


def pcm_dari(mp3: Path) -> bytes:
    return subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1", "-ar", str(LAJU), "-"],
        capture_output=True, check=True).stdout


def tulis_wav(jalur: Path, pcm: bytes) -> None:
    with wave.open(str(jalur), "wb") as w:
        w.setparams((1, 2, LAJU, 0, "NONE", "not compressed"))
        w.writeframes(pcm)


async def buat(topik: str, napas: float = NAPAS, diam: bool = False) -> None:
    berkas_naskah = AKAR / "manim" / "narasi" / f"{topik}.json"
    if not berkas_naskah.exists():
        raise SystemExit(f"naskah tidak ditemukan: {berkas_naskah}")
    naskah = json.loads(berkas_naskah.read_text(encoding="utf-8"))
    suara = naskah.get("suara", SUARA_BAWAAN)
    tempo = naskah.get("tempo", TEMPO_BAWAAN)
    keluar = AKAR / "audio" / topik
    cache = keluar / "revisi"
    cache.mkdir(parents=True, exist_ok=True)
    if not diam:
        print(f"naskah : {berkas_naskah.name}  ({len(naskah['segmen'])} segmen)")
        print(f"suara  : {suara}  (tempo {tempo}, napas {napas:.2f} s)\n")

    durasi: dict[str, float] = {}
    jam: dict[str, dict] = {}
    gabungan: list[bytes] = []
    sah: set[str] = {"narasi-penuh.mp3"}
    waktu = 0.0
    for i, seg in enumerate(naskah["segmen"], start=1):
        ident = seg["id"]
        teks = teks_ucap(seg)
        kunci = hashlib.sha256((teks + suara + tempo).encode("utf-8")).hexdigest()[:12]
        mentah = cache / f"{ident}-{kunci}.mp3"
        meta = mentah.with_suffix(".json")
        baru = not (mentah.exists() and meta.exists())
        if baru:
            await rekam(teks, suara, tempo, mentah, meta)
        kata = json.loads(meta.read_text(encoding="utf-8"))
        pcm = pcm_dari(mentah)
        # napas di ujung, lalu dibulatkan ke kisi frame
        n = math.ceil((len(pcm) // 2 + int(napas * LAJU)) / KISI) * KISI
        pcm += bytes(n * 2 - len(pcm))
        lama = n / LAJU
        # potongan per segmen dengan nama lama (nn-id.mp3), supaya cek_aset_video
        # dan pembaca folder lama tetap cocok
        potongan = keluar / f"{i:02d}-{ident}.mp3"
        tulis_wav(cache / f"{ident}.wav", pcm)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(cache / f"{ident}.wav"),
                        "-c:a", "libmp3lame", "-b:a", "128k", str(potongan)], check=True)
        sah.add(potongan.name)
        durasi[ident] = lama
        jam[ident] = {"mulai": waktu, "durasi": lama, "kata": kata}
        gabungan.append(pcm)
        waktu += lama
        if not diam:
            tanda = "rekam" if baru else "cache"
            print(f"  {i:02d} {ident:16s} {lama:6.2f} s  {len(kata):3d} kata  ({tanda})")

    penuh_wav = keluar / "narasi-penuh.wav"
    tulis_wav(penuh_wav, b"".join(gabungan))
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(penuh_wav),
                    "-c:a", "libmp3lame", "-b:a", "128k", str(keluar / "narasi-penuh.mp3")], check=True)
    (keluar / "durasi.json").write_text(
        json.dumps({"total": waktu, "segmen": durasi}, indent=2, ensure_ascii=False), encoding="utf-8")
    (keluar / "kata.json").write_text(
        json.dumps(jam, indent=2, ensure_ascii=False), encoding="utf-8")

    # potongan basi dari susunan naskah lama dibuang, supaya cek_aset_video tidak
    # menemukannya nanti (temuan Transformasi 7 Sep: tiga belas berkas hantu)
    basi = sorted(p.name for p in keluar.glob("*.mp3") if p.name not in sah)
    for nama in basi:
        (keluar / nama).unlink()

    if not diam:
        print(f"\n  total   : {waktu:.2f} detik ({waktu / 60:.1f} menit)")
        print(f"  keluaran: {keluar.relative_to(AKAR)}/  durasi.json, kata.json, narasi-penuh.mp3")
        if basi:
            print(f"  dibuang : {len(basi)} potongan basi ({', '.join(basi[:4])}{', ...' if len(basi) > 4 else ''})")
        # Rentang dilonggarkan ARYA 11 Sep 2026: 2 sampai 6 menit, jangan
        # memaksakan 6 menit; isi yang menentukan panjangnya.
        if not 120 <= waktu <= 360:
            print(f"  PERINGATAN: standar v3.1 meminta 2 sampai 6 menit; naskah ini {waktu / 60:.1f} menit.")
        print("\n>>> Adegan membaca durasi.json dan kata.json. Jalankan ulang skrip ini tiap naskah")
        print(">>> diubah (hanya segmen yang berubah yang direkam ulang), lalu render ulang.")


def main() -> None:
    p = argparse.ArgumentParser(description="Pembuat narasi MANTRA dengan waktu tiap kata")
    p.add_argument("topik", help="nama video, sama dengan nama berkas naskah tanpa .json")
    p.add_argument("--napas", type=float, default=NAPAS, help="jeda di ujung tiap segmen, detik")
    p.add_argument("--diam", action="store_true")
    a = p.parse_args()
    asyncio.run(buat(a.topik, a.napas, a.diam))


if __name__ == "__main__":
    sys.exit(main())
