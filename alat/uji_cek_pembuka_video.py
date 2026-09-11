"""Uji dua arah cek_pembuka_video: yang benar lolos, tiap cacat tertangkap."""
import json
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import cek_pembuka_video as c  # noqa: E402

PETA = c.baca_subbab()
assert PETA["grafik-fungsi"][0][1] == "Pengenalan Fungsi dan Grafik", PETA["grafik-fungsi"][0]
assert c.judul_ucap(PETA, "grafik-fungsi", 2) == "Pengenalan Fungsi dan Grafik, Bagian 2"
assert c.judul_ucap(PETA, "grafik-fungsi", 4) == "Fungsi Kuadrat, Bagian 2"
assert c.judul_ucap(PETA, "vektor", 10) == "Penerapan Vektor"          # satu materi: tanpa Bagian
assert c.judul_ucap(PETA, "vektor", 12) == "Perkalian Titik dan Proyeksi, Bagian 2"
assert c.judul_ucap(PETA, "integral", 11) == "Penerapan Integral, Bagian 3"
assert c.petakan("tahap2-perbandingan-tetap") == ("trigonometri", 2)
assert c.petakan("ruang-3d-04") == ("ruang-3d", 4)
assert c.petakan("contoh-perahu") is None
print("1 pemetaan subbab.ts dan nama naskah: ok")

tmp = Path(tempfile.mkdtemp())


def naskah(*segmen):
    p = tmp / "uji.json"
    p.write_text(json.dumps({"segmen": [
        {"id": f"s{i}", "teks": t, "tulis": t} for i, t in enumerate(segmen)]}),
        encoding="utf-8")
    return p


# 2. HARUS LOLOS: pembuka benar, segar-ingat menyebut sub-bab, tanpa "tahap"
t = c.periksa(naskah(
    "Fungsi Kuadrat, Bagian 2. Kenapa puncaknya selalu di tengah?",
    "Di materi sebelumnya, Fungsi Kuadrat, Bagian 1, kita melihat parabola."),
    "grafik-fungsi", 4, PETA)
print("2 naskah benar:", "LOLOS" if not t else "GAGAL " + str(t))
assert not t, t

# 3. HARUS GAGAL: pembuka menyebut judul materi, bukan sub-bab
t = c.periksa(naskah("Materi 04, Puncak Parabola. Kenapa puncaknya di tengah?",
                     "Mari kita lihat."), "grafik-fungsi", 4, PETA)
print("3 pembuka judul materi:", "DITOLAK" if any(x.startswith("PEMBUKA") for x in t) else "LOLOS (SALAH)")
assert any(x.startswith("PEMBUKA") for x in t), t

# 4. HARUS GAGAL: kata "tahap"
t = c.periksa(naskah("Fungsi Kuadrat, Bagian 2. Di tahap sebelumnya kita lihat parabola.",
                     "Lanjut."), "grafik-fungsi", 4, PETA)
print("4 kata tahap:", "DITOLAK" if any(x.startswith("TAHAP") for x in t) else "LOLOS (SALAH)")
assert any(x.startswith("TAHAP") for x in t), t
# "tahapan" bukan "tahap": jangan dituduh
t = c.periksa(naskah("Fungsi Kuadrat, Bagian 2. Tahapan hitungnya tiga langkah.",
                     "Lanjut."), "grafik-fungsi", 4, PETA)
assert not any(x.startswith("TAHAP") for x in t), t

# 5. HARUS GAGAL: "materi sebelumnya" tanpa nama sub-bab
t = c.periksa(naskah("Fungsi Kuadrat, Bagian 2. Kenapa?",
                     "Di materi sebelumnya kita melihat parabola."), "grafik-fungsi", 4, PETA)
print("5 segar-ingat tanpa nama sub-bab:", "DITOLAK" if any(x.startswith("SEGAR") for x in t) else "LOLOS (SALAH)")
assert any(x.startswith("SEGAR") for x in t), t

# 6. Naskah sungguhan bergaya lama (Turunan 2, disetujui sebelum v3.1) harus
#    ditandai PEMBUKA: buktinya alat ini membaca berkas nyata, bukan cuma contoh.
t = c.periksa(c.NASKAH / "turunan2-garis-singgung.json", "turunan", 2, PETA)
print("6 naskah lama sungguhan:", "DITOLAK" if any(x.startswith("PEMBUKA") for x in t) else "LOLOS (SALAH)")
assert any(x.startswith("PEMBUKA") for x in t), t

print("SEMUA UJI CEK PEMBUKA VIDEO LOLOS")
