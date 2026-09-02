"""Vektor Materi 06, Menjumlah itu menyambung perjalanan. ManimGL.

STORYBOARD
  1. sapa      Pandangan miring: lapangan berpetak, seorang berdiri di titik
               berangkat. Judul pembuka.
  2. jalan1    SATU gerakan kamera ke pandangan peta, lalu orangnya BERJALAN
               perjalanan pertama. Panah biru tumbuh mengikuti langkahnya.
  3. jalan2    Dari tempat ia berhenti, ia berjalan lagi. Panah merah tumbuh.
  4. tanya     Pertanyaan, lalu diam. Orangnya tetap bernapas (updater).
  5. resultan  Panah ungu menutup dari titik berangkat ke titik akhir.
  6. aturan    Segitiganya disorot: ujung ke pangkal.
  7. keliru    Susunan yang SALAH digambar putus-putus: kedua pangkal
               ditempelkan, lalu ditarik ujung ke ujung. Hasilnya jelas lebih
               pendek dan arahnya berbeda.
  8. komponen  Rumus kedua vektor masuk HUD.
  9. hitung    Penjumlahan komponennya, mendatar dan tegak.
 10. panjang   Perbandingan panjang: 3,16 tambah 2,24 sama dengan 5,40,
               padahal resultannya tepat 5.
 11. tutup     Kalimat sorot Materi 06, kata per kata.

KENAPA ORANGNYA BENAR-BENAR BERJALAN
Aturan "ujung ke pangkal" gampang dihafal dan gampang salah. Ia jadi masuk akal
hanya kalau siswa melihat bahwa vektor kedua memang BERANGKAT dari tempat
vektor pertama berhenti. Karena itu panah tidak muncul jadi, melainkan tumbuh
mengikuti langkah orangnya, dan babak 7 memperlihatkan apa yang terjadi kalau
aturan itu dilanggar.

KENAPA PANAH DIGAMBAR DI LANTAI, BUKAN MELAYANG
Di video perahu, panah melayang di atas air karena yang digambarkan kecepatan.
Di sini yang digambarkan JEJAK KAKI, jadi tempatnya memang di tanah. Orangnya
sengaja dibuat setinggi 1 satuan supaya tidak menutupi jejaknya sendiri.

WARNA, SATU MAKNA SEPANJANG VIDEO
  AKSEN2 biru = perjalanan pertama    AKSEN merah = perjalanan kedua
  SOROT ungu  = resultan dan kesimpulan   REDUP = susunan yang keliru
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor6-sambung"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.10                                  # jejak digambar tepat di atas lantai
S = np.array([-2.5, -1.5, Z])             # titik berangkat
A = np.array([3.0, 1.0, 0.0])             # perjalanan pertama
B = np.array([1.0, 2.0, 0.0])             # perjalanan kedua
TINGGI_ORANG = 1.0

# Dirapatkan dari 7,2: pada 7,2 seluruh kejadian cuma mengisi sepertiga bingkai
# dan sisanya lantai kosong. Marginnya tetap dilebihkan dari hitungan karena
# qc.ke_layar memproyeksikan tanpa perspektif (lihat laporan sesi).
PETA = dict(theta=0, phi=20, pusat=(-0.5, 0.15, 0.0), tinggi=6.0)


class SambungPerjalanan(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Dunia
        # ==============================================================
        # Hanya bidang petaknya, sumbu tegaknya dibuang. Pelajaran ini terjadi
        # di atas tanah, jadi sumbu z menjulur ke langit tidak memperlihatkan
        # apa pun dan hanya jadi garis nyasar di babak pembuka.
        lantai = ilustrasi.lantai_kisi(ukuran=10.0, langkah=1.0)[0]
        orang = ilustrasi.orang(TINGGI_ORANG)
        self.pusat0 = orang.get_center().copy()
        self.px = ValueTracker(S[0])
        self.py = ValueTracker(S[1])
        # Napas kecil supaya dunia tidak membeku saat narator diam.
        orang.add_updater(lambda m: m.move_to(
            self.pusat0 + np.array([self.px.get_value(), self.py.get_value(),
                                    0.03 * np.sin(3.0 * self.time)])))

        kamera.pasang_awal(frame, theta=-38, phi=68, pusat=(S[0] + 0.6, S[1] + 0.4, 0.4), tinggi=4.4)
        self.add(lantai, orang)

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Menjumlah itu menyambung perjalanan", lama=3.2, y=2.5)
            b.catat(3.2)
            sinema.keterangan(self, "satu orang, dua kali berjalan")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"orang": orang, "keterangan": self._matra_keterangan},
                          [("orang", "keterangan")])

        # ==============================================================
        # Babak 2: terbang ke peta, lalu berjalan yang pertama
        # ==============================================================
        p_a = Arrow(S, S + A, buff=0, thickness=5).set_color(AKSEN2)
        l_a = teks("perjalanan pertama", 24, AKSEN2)
        l_a.move_to(S + A * 0.5 + np.array([0.0, -0.62, 0.0]))

        with sinema.babak(self, "jalan1", DURASI) as b:
            b.main(kamera.sudut(frame, **PETA), run_time=max(2.0, DURASI["jalan1"] - 6.0))
            b.main(GrowArrow(p_a),
                   self.px.animate.set_value(S[0] + A[0]),
                   self.py.animate.set_value(S[1] + A[1]),
                   run_time=3.2)
            b.main(FadeIn(l_a), run_time=0.6)
            sinema.keterangan(self, "3 petak ke kanan, 1 petak ke atas")
            b.catat(0.6)
        qc.periksa_adegan(self, {"orang": orang, "a": p_a, "label a": l_a,
                                 "keterangan": self._matra_keterangan},
                          [("label a", "keterangan")])

        # ==============================================================
        # Babak 3: berjalan yang kedua, berangkat dari tempat berhenti
        # ==============================================================
        p_b = Arrow(S + A, S + A + B, buff=0, thickness=5).set_color(AKSEN)
        l_b = teks("perjalanan kedua", 24, AKSEN)
        l_b.move_to(S + A + B * 0.5 + np.array([0.95, 0.0, 0.0]))

        with sinema.babak(self, "jalan2", DURASI) as b:
            b.main(GrowArrow(p_b),
                   self.px.animate.set_value(S[0] + A[0] + B[0]),
                   self.py.animate.set_value(S[1] + A[1] + B[1]),
                   run_time=3.4)
            b.main(FadeIn(l_b), run_time=0.6)
            sinema.keterangan(self, "1 petak ke kanan, 2 petak ke atas")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"orang": orang, "a": p_a, "b": p_b,
                                 "label a": l_a, "label b": l_b},
                          [("label a", "label b"), ("a", "label b")])

        # ==============================================================
        # Babak 4: pertanyaan, lalu diam
        # ==============================================================
        titik_awal = Dot(S, radius=0.09).set_color(SOROT)
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeIn(titik_awal, scale=2.0), run_time=0.8)
            sinema.keterangan(self, "dari titik berangkat, ke mana ia berpindah?", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"titik awal": titik_awal, "keterangan": self._matra_keterangan},
                          [("titik awal", "keterangan")])

        # ==============================================================
        # Babak 5: resultan
        # ==============================================================
        p_r = Arrow(S, S + A + B, buff=0, thickness=7).set_color(SOROT)
        l_r = teks("resultan", 26, SOROT)
        l_r.move_to(S + (A + B) * 0.55 + np.array([-0.30, 0.55, 0.0]))

        with sinema.babak(self, "resultan", DURASI) as b:
            b.main(GrowArrow(p_r), run_time=2.0)
            b.main(FadeIn(l_r), run_time=0.6)
            sinema.keterangan(self, "dari titik berangkat langsung ke titik akhir", warna=SOROT)
            b.catat(0.6)
        qc.periksa_adegan(self, {"resultan": p_r, "label r": l_r, "label a": l_a, "label b": l_b},
                          [("label r", "label a"), ("label r", "label b")])

        # ==============================================================
        # Babak 6: aturan ujung ke pangkal
        # ==============================================================
        sambung = Dot(S + A, radius=0.10).set_color(TINTA)
        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(FadeIn(sambung, scale=2.2), run_time=0.7)
            b.main(Indicate(p_a, color=SOROT, scale_factor=1.04), run_time=1.0)
            b.main(Indicate(p_b, color=SOROT, scale_factor=1.04), run_time=1.0)
            sinema.keterangan(self, "ujung panah biru menempel di pangkal panah merah")
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"sambung": sambung, "resultan": p_r,
                                 "keterangan": self._matra_keterangan},
                          [("sambung", "keterangan")])

        # ==============================================================
        # Babak 7: susunan yang KELIRU, digambar putus-putus
        # ==============================================================
        b_salah = DashedLine(S, S + B, stroke_width=6).set_color(AKSEN)
        panah_salah = Arrow(S + A, S + B, buff=0, thickness=7).set_color(TINTA)
        l_salah = teks("bukan resultan", 26, TINTA)
        l_salah.move_to((S + A + S + B) / 2 + np.array([0.0, -0.55, 0.0]))
        salah = VGroup(b_salah, panah_salah, l_salah)

        benar = VGroup(p_a, p_b, p_r, l_a, l_b, l_r, sambung)
        with sinema.babak(self, "keliru", DURASI) as b:
            sinema.keterangan(self, "kalau kedua pangkalnya yang ditempelkan")
            b.catat(0.6)
            # Susunan yang benar diredupkan dulu. Tanpa ini, susunan yang keliru
            # tenggelam di antara tiga panah terang dan babak yang justru paling
            # mengajarkan kesalahan malah jadi yang paling sulit dilihat.
            b.main(benar.animate.set_opacity(0.22), run_time=0.8)
            b.main(ShowCreation(b_salah), run_time=1.2)
            b.main(GrowArrow(panah_salah), FadeIn(l_salah), run_time=1.4)
            b.jeda(1.2)
            b.main(FadeOut(salah), benar.animate.set_opacity(1.0), run_time=1.0)
        qc.periksa_adegan(self, {"resultan": p_r, "keterangan": self._matra_keterangan})

        # ==============================================================
        # Babak 8 dan 9: komponennya, di HUD
        # ==============================================================
        panel_a = rumus(r"\vec{a} = (3,\ 1)", 34, AKSEN2).to_corner(UR, buff=0.45)
        panel_b = rumus(r"\vec{b} = (1,\ 2)", 34, AKSEN).next_to(panel_a, DOWN, buff=0.25)
        panel_b.align_to(panel_a, RIGHT)

        with sinema.babak(self, "komponen", DURASI) as b:
            for panel in (panel_a, panel_b):
                self.hud_tambah(panel)
                panel.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), run_time=0.8)
            b.main(panel_b.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "dengan komponen, pekerjaannya jauh lebih singkat")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"panel a": panel_a, "panel b": panel_b,
                                 "keterangan": self._matra_keterangan},
                          [("panel a", "panel b"), ("panel b", "keterangan")])

        panel_r = rumus(r"\vec{a} + \vec{b} = (4,\ 3)", 34, SOROT)
        panel_r.next_to(panel_b, DOWN, buff=0.25).align_to(panel_b, RIGHT)
        with sinema.babak(self, "hitung", DURASI) as b:
            sinema.keterangan(self, "mendatar: 3 tambah 1 sama dengan 4")
            b.catat(0.6)
            b.jeda(1.4)
            sinema.keterangan(self, "tegak: 1 tambah 2 sama dengan 3")
            b.catat(0.6)
            b.jeda(1.4)
            self.hud_tambah(panel_r)
            panel_r.set_opacity(0)
            b.main(panel_r.animate.set_opacity(1), run_time=1.0)
        qc.periksa_adegan(self, {"panel b": panel_b, "panel r": panel_r,
                                 "keterangan": self._matra_keterangan},
                          [("panel b", "panel r"), ("panel r", "keterangan")])

        # ==============================================================
        # Babak 10: panjang tidak boleh dijumlahkan
        # ==============================================================
        baris1 = rumus(r"|\vec{a}| = 3{,}16", 30, AKSEN2)
        baris2 = rumus(r"|\vec{b}| = 2{,}24", 30, AKSEN)
        baris3 = rumus(r"3{,}16 + 2{,}24 = 5{,}40", 30, REDUP)
        baris4 = rumus(r"|\vec{a} + \vec{b}| = 5", 32, SOROT)
        banding = VGroup(baris1, baris2, baris3, baris4)
        banding.arrange(DOWN, buff=0.22, aligned_edge=LEFT).to_corner(UL, buff=0.45)

        with sinema.babak(self, "panjang", DURASI) as b:
            self.hud_tambah(banding)
            banding.set_opacity(0)
            for baris in (baris1, baris2, baris3):
                b.main(baris.animate.set_opacity(1), run_time=0.9)
            b.jeda(1.0)
            b.main(baris4.animate.set_opacity(1), run_time=1.2)
            sinema.keterangan(self, "5,40 bukan 5: panjangnya tidak ikut dijumlahkan", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"banding": banding, "panel a": panel_a,
                                 "keterangan": self._matra_keterangan},
                          [("banding", "panel a"), ("banding", "keterangan")])

        # ==============================================================
        # Babak 11: penutup
        # ==============================================================
        tutup1 = teks("Komponen boleh dijumlahkan.", 32, TINTA)
        tutup2 = teks("Panjang tidak boleh.", 32, SOROT)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.32).move_to([0, 0.3, 0])
        # Kepekatan 0,96, bukan 0,82 bawaannya. Pada video perahu alas 0,82
        # membuat panah resultan masih terlihat samar menembus kalimat penutup.
        sinema.alas_teks(tutup, opacity=0.96)

        # Dunianya disingkirkan lebih dulu. Alas teks TIDAK cukup: benda dunia
        # tetap tergambar di atas teks HUD, dan pada video perahu panah ungu
        # terlihat menembus kalimat penutup walau alasnya sudah dipekatkan.
        # Aturan 4 STANDAR-ILUSTRASI-VIDEO memang mengizinkan layar bersih untuk
        # penutup, paling banyak satu babak, dan inilah babak itu.
        # Orangnya ikut disingkirkan. Kalau hanya lantainya yang hilang, ia
        # tertinggal melayang tanpa pijakan dan itu terlihat seperti kerusakan.
        dunia = Group(p_a, p_b, p_r, l_a, l_b, l_r, sambung, titik_awal, lantai, orang)
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self, run_time=0.4)
            b.catat(0.4)
            b.main(FadeOut(dunia), FadeOut(banding),
                   FadeOut(panel_a), FadeOut(panel_b), FadeOut(panel_r), run_time=1.2)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"tutup": tutup})
