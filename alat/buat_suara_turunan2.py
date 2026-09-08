"""Narasi Turunan 2 dengan jam kata TTS dan jeda pada kisi 30/60 fps.

Jalankan: python alat/buat_suara_turunan2.py
Cache per teks menghindari perekaman ulang bagian yang sudah cocok.
"""
import asyncio
import hashlib
import json
import math
import subprocess
import wave
from pathlib import Path

import edge_tts

AKAR = Path(__file__).resolve().parents[1]
TOPIK = "turunan2-garis-singgung"
SUARA = AKAR / "audio" / TOPIK


async def main():
    naskah = json.loads((AKAR / "manim/narasi" / f"{TOPIK}.json").read_text(encoding="utf-8"))
    cache = SUARA / "revisi"
    cache.mkdir(parents=True, exist_ok=True)
    jam, durasi, gabungan = {}, {}, []
    waktu = 0.0
    for i, seg in enumerate(naskah["segmen"], 1):
        ident = seg["id"]
        key = hashlib.sha256((seg["teks"] + naskah["suara"] + naskah["tempo"]).encode()).hexdigest()[:12]
        mentah = cache / f"{ident}-{key}.mp3"
        metadata = mentah.with_suffix(".json")
        if not (mentah.exists() and metadata.exists()):
            for attempt in range(3):
                try:
                    kata, chunks = [], []
                    komunikasi = edge_tts.Communicate(seg["teks"], naskah["suara"],
                                                     rate=naskah["tempo"], boundary="WordBoundary")
                    async for chunk in komunikasi.stream():
                        if chunk["type"] == "audio":
                            chunks.append(chunk["data"])
                        elif chunk["type"] == "WordBoundary":
                            kata.append({"kata": chunk["text"], "mulai": chunk["offset"] / 1e7,
                                         "durasi": chunk["duration"] / 1e7})
                    if not kata or not chunks:
                        raise RuntimeError("Suara atau penanda kata kosong")
                    mentah.write_bytes(b"".join(chunks))
                    metadata.write_text(json.dumps(kata, ensure_ascii=False, indent=2), encoding="utf-8")
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    await asyncio.sleep(2)
        kata = json.loads(metadata.read_text(encoding="utf-8"))
        pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(mentah), "-f", "s16le",
                              "-ac", "1", "-ar", "48000", "-"], capture_output=True, check=True).stdout
        # Jeda napas 0,35 detik, dibulatkan ke 1600 sampel = satu frame 30 fps.
        n = math.ceil((len(pcm) // 2 + 16800) / 1600) * 1600
        pcm += bytes(n * 2 - len(pcm))
        wav = cache / f"{ident}.wav"
        with wave.open(str(wav), "wb") as w:
            w.setparams((1, 2, 48000, 0, "NONE", "not compressed"))
            w.writeframes(pcm)
        lama = n / 48000
        durasi[ident] = lama
        jam[ident] = {"mulai": waktu, "durasi": lama, "kata": kata}
        gabungan.append(pcm)
        waktu += lama
        print(f"{i:02d} {ident:18} {lama:6.2f}s ({len(kata)} kata)", flush=True)
    penuh = SUARA / "narasi-penuh.wav"
    with wave.open(str(penuh), "wb") as w:
        w.setparams((1, 2, 48000, 0, "NONE", "not compressed"))
        for pcm in gabungan:
            w.writeframes(pcm)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(penuh), "-c:a", "libmp3lame",
                    "-b:a", "128k", str(SUARA / "narasi-penuh.mp3")], check=True)
    (SUARA / "durasi.json").write_text(json.dumps({"total": waktu, "segmen": durasi}, indent=2), encoding="utf-8")
    (SUARA / "kata.json").write_text(json.dumps(jam, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"TOTAL {waktu:.2f}s", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
