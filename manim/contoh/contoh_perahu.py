"""KERANGKA contoh alur video ManimGL MATRA, versi standar 2 (2 Sep 2026 malam).

Bukan video materi. Rujukan resmi yang lengkap adalah:
- bidang datar: `manim/scenes/vektor1_perahu.py` (Vektor Materi 01, disetujui ARYA),
- 3D: `manim/scenes/ruang_3d_01.py` + `ruang_3d_umum.py` (Ruang 3D Materi 01).
Kerangka ini hanya memperlihatkan URUTAN yang benar dalam 20 detik:

  buka   : judul materi saja (nomor + nama, sama dengan yang diucapkan)
  dunia  : benda nyata 3D dekat (perahu di air), hanya di video PERTAMA topik
  peta   : satu gerakan kamera turun ke bidang BERNOMOR, lalu tidak miring lagi
  panah  : matematika di atas gambar: panah + label maks 2 kata; rumus LAHIR
           dekat perahu lalu terbang ke panel kanan atas; identitas di kiri atas
  tutup  : rumus berubah lewat MORPH lambang (bukan fade), pertanyaan penutup

Alur berkas: naskah (teks + tulis) -> buat_narasi.py -> buat_subtitle.py -> adegan
-> cek_kode.py -> manimgl -w -l -> cek_video.py (BUKA lembar kontak)
-> gabung_audio.py contoh-perahu ContohPerahu --uji (membuat salinan -bersubtitle).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "contoh-perahu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# Sungai menempati petak y = 0 sampai 3 (lebar 3 km, 1 petak = 1 km); x searah arus.
X0, Y0 = 0.0, 0.0
Z_PANAH = 0.05


class ContohPerahu(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        # --- buka: HANYA judul, layar bersih (pola Trigonometri).
        with sinema.babak(self, "buka", DURASI) as b:
            lama_judul = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 01: Angka saja tidak cukup", lama=lama_judul)
            b.catat(lama_judul)

        # --- dunia: perahu 3D di air, kamera miring dan dekat. Hanya video pertama topik.
        air = ilustrasi.air_hidup(self, panjang=12.0, lebar=3.0, pusat=(0.0, 1.5))
        tepi_jauh = ilustrasi.tanah(12.0, 2.0, 4.0)
        tepi_dekat = ilustrasi.tanah(12.0, 2.0, -1.0)
        asli = ilustrasi.perahu(1.2)
        perahu = asli.copy()
        ilustrasi.ayunkan(asli, perahu, X0, Y0 + 0.4, 0.0)
        perahu.add_updater(lambda m: ilustrasi.ayunkan(asli, m, X0, Y0 + 0.4, self.time))
        kamera.pasang_awal(frame, theta=-30, phi=70, pusat=(X0 + 0.3, Y0 + 0.9, 0.3), tinggi=4.6)
        with sinema.babak(self, "dunia", DURASI) as b:
            b.main(FadeIn(tepi_jauh), FadeIn(tepi_dekat), FadeIn(air), FadeIn(perahu), run_time=0.8)
        qc.periksa_adegan(self, {"perahu": perahu})

        # --- peta: satu gerakan turun ke tegak lurus; bidang bernomor muncul; air jadi pita samar.
        # y mulai 0: baris di bawah sungai tidak dipakai, dan qc menolak bidang yang masuk jalur subtitle.
        bidang = ilustrasi.bidang_bernomor((-2.0, 6.0, 1.0), (0.0, 4.0, 1.0))
        with sinema.babak(self, "peta", DURASI) as b:
            b.main(kamera.dunia_ke_peta(frame, pusat=(2.0, 2.0, 0), tinggi=8.0), run_time=max(2.0, DURASI["peta"] - 1.2))
            perahu.clear_updaters()
            b.main(FadeOut(air), FadeOut(tepi_jauh), FadeOut(tepi_dekat), FadeIn(bidang), run_time=0.8)
            ident = sinema.identitas(self, "sungai = 3 km", "1 petak = 1 km")
        qc.periksa_adegan(self, {"perahu": perahu, "identitas": ident}, dunia={"bidang": bidang})

        # --- panah: dayung (biru) melintang 3, arus (merah) searah sungai 4; label maks 2 kata.
        asal = np.array([X0, Y0, Z_PANAH])
        p_dayung = Arrow(asal, asal + 3.0 * UP, buff=0, thickness=5).set_color(AKSEN2)
        p_arus = Arrow(asal + 3.0 * UP, asal + 3.0 * UP + 4.0 * RIGHT, buff=0, thickness=5).set_color(AKSEN)
        l_dayung = sinema.label("dayung 3", warna=AKSEN2).next_to(p_dayung, LEFT, buff=0.15)
        l_arus = sinema.label("arus 4", warna=AKSEN).next_to(p_arus, UP, buff=0.15)
        with sinema.babak(self, "panah", DURASI) as b:
            b.main(GrowArrow(p_dayung), FadeIn(l_dayung), run_time=1.0)
            b.main(GrowArrow(p_arus), FadeIn(l_arus), run_time=1.0)
            rum = sinema.lahir_rumus(self, r"\vec{d} = (0,\ 3)", dekat=p_dayung, papan=papan, b=b, warna=AKSEN2)
        qc.periksa_adegan(self, {"perahu": perahu, "label dayung": l_dayung, "label arus": l_arus},
                          [("label dayung", "label arus")], hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- tutup: resultan (ungu) menutup segitiga; rumus di panel BERUBAH lewat morph.
        p_hasil = Arrow(asal, asal + 3.0 * UP + 4.0 * RIGHT, buff=0, thickness=6).set_color(SOROT)
        l_hasil = sinema.label("hasil 5", warna=SOROT).next_to(p_hasil.get_center(), DR, buff=0.2)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(GrowArrow(p_hasil), FadeIn(l_hasil), run_time=1.0)
            rum = sinema.ganti_rumus(self, rum, r"\vec{d} + \vec{a} = (4,\ 3)", b=b, warna=SOROT, papan=papan)
            papan.baris(r"|\vec{d} + \vec{a}| = 5", warna=SOROT)
            b.catat(0.8)
        qc.periksa_adegan(self, {"perahu": perahu, "label hasil": l_hasil, "label dayung": l_dayung},
                          [("label hasil", "label dayung")], hud={"papan": papan.semua()},
                          dunia={"bidang": bidang})
