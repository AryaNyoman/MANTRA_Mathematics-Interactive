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

Mesin suara: edge-tts, suara Indonesia asli id-ID-ArdiNeural (bawaan).

ELEVENLABS (14 Sep 2026, ARYA berlangganan paket Creator): suara bernama
`eleven:<nama atau id suara>` di naskah, atau `--suara "eleven:Adam - American,
Dark and Tough"` di baris perintah, merekam lewat ElevenLabs. Waktu tiap kata
dihitung dari penjajaran huruf yang dikembalikan endpoint `with-timestamps`
(model `eleven_multilingual_v2`, yang berbahasa Indonesia DAN memberi
penjajaran). Kunci dibaca dari `.env.local` (ELEVENLABS_API_KEY), tidak pernah
dicetak. Tempo "-5%" diterjemahkan ke `speed` 0,95.

Uji tanpa menimpa narasi produksi: `--varian -eleven` menulis ke
`audio/<video>-eleven/`; adegan dan penggabung membaca folder itu bila
peubah lingkungan NARASI_VARIAN=-eleven diisi (lihat `sinema.folder_audio`).
"""

from __future__ import annotations

import argparse
import asyncio
import base64
import hashlib
import json
import math
import subprocess
import sys
import time
import urllib.error
import urllib.request
import wave
from pathlib import Path

import edge_tts

AKAR = Path(__file__).resolve().parent.parent
LAJU = 48000                 # sampel per detik WAV antara
KISI = LAJU // 30            # 1600 sampel = satu frame 30 fps (juga kelipatan 60 fps)
NAPAS = 0.35                 # detik jeda di ujung tiap segmen
SUARA_BAWAAN = "id-ID-ArdiNeural"
TEMPO_BAWAAN = "-5%"
AWALAN_ELEVEN = "eleven:"
MODEL_ELEVEN = "eleven_multilingual_v2"


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


# ---------------------------------------------------------------- ElevenLabs

def kunci_eleven() -> str:
    berkas = AKAR / ".env.local"
    if berkas.exists():
        for baris in berkas.read_text(encoding="utf-8").splitlines():
            if baris.startswith("ELEVENLABS_API_KEY="):
                nilai = baris.split("=", 1)[1].strip().strip('"').strip("'")
                if nilai:
                    return nilai
    raise SystemExit("ELEVENLABS_API_KEY tidak ada di .env.local")


def _minta_eleven(jalur: str, kunci: str, badan: dict | None = None) -> dict:
    data = json.dumps(badan).encode("utf-8") if badan is not None else None
    req = urllib.request.Request(
        "https://api.elevenlabs.io" + jalur, data=data,
        headers={"xi-api-key": kunci, "Content-Type": "application/json", "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        pesan = e.read().decode("utf-8", "replace")[:400]
        raise RuntimeError(f"ElevenLabs {e.code} pada {jalur}: {pesan}") from None


def id_suara_eleven(nama: str, kunci: str) -> str:
    """Nama suara di pustaka akun (persis, atau awalan tanpa peduli huruf besar) menjadi voice_id."""
    if len(nama) == 20 and nama.isalnum():
        return nama                     # sudah voice_id
    daftar = _minta_eleven("/v1/voices", kunci)["voices"]
    cocok = [v for v in daftar if v["name"].lower() == nama.lower()]
    if not cocok:
        cocok = [v for v in daftar if v["name"].lower().startswith(nama.lower())]
    if len(cocok) != 1:
        ada = ", ".join(v["name"] for v in daftar)
        keterangan = "tidak ada" if not cocok else "ganda"
        raise SystemExit(f"suara ElevenLabs '{nama}' {keterangan}. Yang ada: {ada}")
    return cocok[0]["voice_id"]


def kecepatan_dari_tempo(tempo: str) -> float:
    """Tempo gaya edge-tts ("-5%", "+10%") menjadi pengali kecepatan ElevenLabs (0,7 sampai 1,2)."""
    try:
        persen = float(tempo.replace("%", "").replace("+", ""))
    except ValueError:
        persen = 0.0
    return max(0.7, min(1.2, round(1 + persen / 100, 2)))


def kata_dari_penjajaran(pj: dict) -> list[dict]:
    """Penjajaran per huruf ElevenLabs menjadi daftar kata {kata, mulai, durasi} seperti WordBoundary."""
    huruf = pj["characters"]
    mulai = pj["character_start_times_seconds"]
    akhir = pj["character_end_times_seconds"]
    kata: list[dict] = []
    buf, t0, t1 = "", None, None
    for h, a, b in zip(huruf, mulai, akhir):
        if h.isspace():
            if buf:
                kata.append({"kata": buf, "mulai": round(t0, 6), "durasi": round(max(t1 - t0, 0.01), 6)})
            buf, t0, t1 = "", None, None
            continue
        if not buf:
            t0 = a
        buf += h
        t1 = b
    if buf:
        kata.append({"kata": buf, "mulai": round(t0, 6), "durasi": round(max(t1 - t0, 0.01), 6)})
    # tanda baca yang berdiri sendiri (mis. "-") bukan kata
    return [k for k in kata if any(c.isalnum() for c in k["kata"])]


def rekam_eleven(teks: str, voice_id: str, tempo: str, kunci: str, mp3: Path, meta: Path,
                 model: str = MODEL_ELEVEN) -> None:
    badan = {
        "text": teks,
        "model_id": model,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.0,
                           "use_speaker_boost": True, "speed": kecepatan_dari_tempo(tempo)},
    }
    for percobaan in range(3):
        try:
            hasil = _minta_eleven(f"/v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128",
                                  kunci, badan)
            pj = hasil.get("alignment") or hasil.get("normalized_alignment")
            if not hasil.get("audio_base64") or not pj:
                raise RuntimeError("ElevenLabs tidak mengembalikan suara atau penjajaran kata")
            kata = kata_dari_penjajaran(pj)
            if not kata:
                raise RuntimeError("penjajaran ElevenLabs kosong")
            mp3.write_bytes(base64.b64decode(hasil["audio_base64"]))
            meta.write_text(json.dumps(kata, ensure_ascii=False, indent=2), encoding="utf-8")
            return
        except RuntimeError as e:
            # galat 4xx (kunci, kuota, suara) tidak akan sembuh dengan mengulang
            if percobaan == 2 or "ElevenLabs 4" in str(e):
                raise
            time.sleep(3)


def pcm_dari(mp3: Path) -> bytes:
    return subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1", "-ar", str(LAJU), "-"],
        capture_output=True, check=True).stdout


def tulis_wav(jalur: Path, pcm: bytes) -> None:
    with wave.open(str(jalur), "wb") as w:
        w.setparams((1, 2, LAJU, 0, "NONE", "not compressed"))
        w.writeframes(pcm)


async def buat(topik: str, napas: float = NAPAS, diam: bool = False,
               suara_paksa: str | None = None, varian: str = "", model: str = MODEL_ELEVEN) -> None:
    berkas_naskah = AKAR / "manim" / "narasi" / f"{topik}.json"
    if not berkas_naskah.exists():
        raise SystemExit(f"naskah tidak ditemukan: {berkas_naskah}")
    naskah = json.loads(berkas_naskah.read_text(encoding="utf-8"))
    suara = suara_paksa or naskah.get("suara", SUARA_BAWAAN)
    tempo = naskah.get("tempo", TEMPO_BAWAAN)
    pakai_eleven = suara.startswith(AWALAN_ELEVEN)
    kunci = voice_id = None
    if pakai_eleven:
        kunci = kunci_eleven()
        voice_id = id_suara_eleven(suara[len(AWALAN_ELEVEN):].strip(), kunci)
    keluar = AKAR / "audio" / (topik + varian)
    cache = keluar / "revisi"
    cache.mkdir(parents=True, exist_ok=True)
    if not diam:
        print(f"naskah : {berkas_naskah.name}  ({len(naskah['segmen'])} segmen)")
        mesin = f"ElevenLabs {model}, voice {voice_id}" if pakai_eleven else "edge-tts"
        print(f"suara  : {suara}  [{mesin}]  (tempo {tempo}, napas {napas:.2f} s)")
        print(f"keluar : {keluar.relative_to(AKAR)}/\n")

    durasi: dict[str, float] = {}
    jam: dict[str, dict] = {}
    gabungan: list[bytes] = []
    sah: set[str] = {"narasi-penuh.mp3"}
    waktu = 0.0
    for i, seg in enumerate(naskah["segmen"], start=1):
        ident = seg["id"]
        teks = teks_ucap(seg)
        sidik = hashlib.sha256((teks + suara + tempo + (model if pakai_eleven else "")).encode("utf-8")).hexdigest()[:12]
        mentah = cache / f"{ident}-{sidik}.mp3"
        meta = mentah.with_suffix(".json")
        baru = not (mentah.exists() and meta.exists())
        if baru:
            if pakai_eleven:
                rekam_eleven(teks, voice_id, tempo, kunci, mentah, meta, model)
            else:
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
    p.add_argument("--suara", default=None,
                   help='menimpa suara di naskah; "eleven:<nama suara>" memakai ElevenLabs')
    p.add_argument("--varian", default="",
                   help='akhiran folder keluaran, mis. "-eleven": ditulis ke audio/<video>-eleven/ '
                        "dan dibaca adegan bila NARASI_VARIAN diisi akhiran yang sama")
    p.add_argument("--model", default=MODEL_ELEVEN, help="model ElevenLabs (bawaan eleven_multilingual_v2)")
    a = p.parse_args()
    asyncio.run(buat(a.topik, a.napas, a.diam, a.suara, a.varian, a.model))


if __name__ == "__main__":
    sys.exit(main())
