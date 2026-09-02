"""Vektor Materi 06, Menjumlah itu menyambung perjalanan. ManimGL, arah visual BARU.

Ditulis ulang 2 Sep sore setelah ARYA menolak versi 3D penuh. Rancangannya:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

PRINSIP POKOK
Matematika digambar di bidang datar bernomor, kamera TEGAK LURUS dari atas,
tidak pernah dimiringkan lagi. 3D hanya di babak pembuka.

STORYBOARD
  1. sapa      3D miring DEKAT: orang berdiri di lapangan berpetak. Judul, dan
               narasinya mengumumkan materinya.
  2. terbang   Satu gerakan turun ke tegak lurus; kisi 3D memudar, bidang
               koordinat bernomor muncul menggantikannya.
  3. jalan1    Orangnya BERJALAN (3, 1). Panah biru tumbuh mengikuti langkahnya.
  4. jalan2    Dari tempat ia berhenti, berjalan lagi (1, 2). Panah merah, dan
               pangkalnya menempel di ujung panah biru karena memang di situ
               perjalanan kedua berangkat.
  5. tanya     Pertanyaan, lalu diam.
  6. resultan  Panah ungu dari (0, 0) langsung ke (4, 3).
  7. aturan    Segitiganya disorot: ujung ke pangkal.
  8. keliru    Susunan yang SALAH: kedua pangkal ditempelkan. Panah hitam dari
               ujung ke ujung, jelas lebih pendek dan arahnya lain. Susunan yang
               benar diredupkan supaya yang salah menonjol.
  9. hitung    Komponen dijumlahkan: 3 + 1 = 4, dan 1 + 2 = 3.
 10. panjang   Jebakannya: 3,16 + 2,24 = 5,4, padahal resultannya tepat 5.
 11. tutup     Layar bersih, kalimat sorot Materi 06.

KENAPA BERANGKAT DARI (0, 0) BIDANG
Sama dengan Materi 01: koordinat di layar SAMA dengan komponen vektornya, jadi
siswa bisa memeriksa sendiri dengan menghitung petak, tanpa mengurangi apa pun.

KENAPA PANAHNYA DIBEKUKAN SETELAH BABAK 4
Selama orangnya berjalan, panah digambar ulang tiap frame (`always_redraw`)
supaya tumbuh mengikuti langkah. Sesudah berhenti, panah yang sama diganti
salinan diam. Sebabnya babak "keliru" perlu MEREDUPKAN susunan yang benar, dan
benda `always_redraw` mengembalikan kepekatannya sendiri tiap frame.

WARNA: biru perjalanan pertama, merah perjalanan kedua, ungu resultan,
hitam susunan yang keliru.
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

Z = 0.02                                   # tepat di atas bidang
ASAL = np.array([0.0, 0.0, Z])
V1 = np.array([3.0, 1.0, 0.0])             # perjalanan pertama
V2 = np.array([1.0, 2.0, 0.0])             # perjalanan kedua
SIMPANG = ASAL + V1                        # tempat ia berhenti lalu berangkat lagi
AKHIR = ASAL + V1 + V2

# Jangkauan dipilih dari daerah yang benar-benar dipakai: x sampai 4, y sampai 3,
# ditambah satu petak longgar untuk label koordinat. Batas bawah -1, bukan -2:
# angka "-2" jatuh persis di jalur keterangan layar dan keduanya bertindih
# (cacat yang tertangkap lembar kontak Materi 01).
BIDANG_X, BIDANG_Y = (-2.0, 7.0, 1.0), (-1.0, 4.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(2.5, 1.3, 0.0), tinggi=7.0)


def panah(a, b, warna, tebal=5):
    """Panah pendek pun tetap sah: panjang nol membuat Arrow gagal."""
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class SambungPerjalanan(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        # Hanya petaknya yang dipakai, indeks [0] dari VGroup(kisi, sumbu).
        # Sumbu 3D-nya dibuang: batang tegaknya menjulur ke langit tanpa guna,
        # dan `tinggi_z=0` bukan jalan keluarnya (jangkauan sumbu z jadi nol,
        # lalu ManimGL membagi dengan nol).
        alas = ilustrasi.tanah(11.0, 11.0, 0.0, z=-0.02)
        lapangan = VGroup(ilustrasi.lantai_kisi(9.0, 1.0)[0])
        pejalan = ilustrasi.orang(1.15)
        pusat0 = pejalan.get_center().copy()

        self.t1 = ValueTracker(0.0)
        self.t2 = ValueTracker(0.0)
        pejalan.add_updater(lambda m: m.move_to(pusat0 + self.langkah()))

        kamera.pasang_awal(frame, theta=-32, phi=68, pusat=(0.5, 0.1, 0.55), tinggi=4.6)
        self.add(alas, lapangan, pejalan)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Menyambung perjalanan", lama=3.2, y=2.4)
            b.catat(3.2)
            sinema.keterangan(self, "ia akan berjalan dua kali")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"pejalan": pejalan, "keterangan": self._matra_keterangan},
                          [("pejalan", "keterangan")])

        # ==============================================================
        # Babak 2: turun ke tegak lurus, lapangan jadi peta bernomor
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        self.bring_to_front(pejalan)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 2.2)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            b.main(FadeOut(lapangan), FadeOut(alas),
                   bidang.animate.set_opacity(1), run_time=1.4)
            sinema.keterangan(self, "sekarang langkahnya bisa dihitung")
            b.catat(0.6)
        qc.periksa_adegan(self, {"bidang": bidang, "keterangan": self._matra_keterangan})

        # ==============================================================
        # Babak 3: perjalanan pertama, panah tumbuh mengikuti langkah
        # ==============================================================
        p1 = always_redraw(lambda: panah(ASAL, ASAL + V1 * self.t1.get_value(), AKSEN2))
        panel_a = rumus(r"\vec{a} = (3,\ 1)", 34, AKSEN2).to_corner(UR, buff=0.45)

        with sinema.babak(self, "jalan1", DURASI) as b:
            self.add(p1)
            self.bring_to_front(pejalan)
            b.main(self.t1.animate.set_value(1.0), run_time=max(2.0, DURASI["jalan1"] - 2.4))
            self.hud_tambah(panel_a)
            panel_a.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "3 ke kanan, 1 ke atas: berhenti di (3, 1)", warna=AKSEN2)
            b.catat(0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"panah a": p1, "panel a": panel_a,
                                 "keterangan": self._matra_keterangan},
                          [("panel a", "keterangan")])

        # ==============================================================
        # Babak 4: perjalanan kedua, berangkat dari tempat ia berhenti
        # ==============================================================
        p2 = always_redraw(lambda: panah(SIMPANG, SIMPANG + V2 * self.t2.get_value(), AKSEN))
        panel_b = rumus(r"\vec{b} = (1,\ 2)", 34, AKSEN)
        panel_b.next_to(panel_a, DOWN, buff=0.25).align_to(panel_a, RIGHT)

        with sinema.babak(self, "jalan2", DURASI) as b:
            self.add(p2)
            self.bring_to_front(pejalan)
            b.main(self.t2.animate.set_value(1.0), run_time=max(2.0, DURASI["jalan2"] - 2.4))
            self.hud_tambah(panel_b)
            panel_b.set_opacity(0)
            b.main(panel_b.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "1 ke kanan, 2 ke atas: berhenti di (4, 3)", warna=AKSEN)
            b.catat(0.6)
            b.jeda(0.8)

        # Panah dan orangnya dibekukan. Alasannya di catatan kepala berkas.
        pejalan.clear_updaters()
        self.remove(p1, p2)
        pa = panah(ASAL, SIMPANG, AKSEN2)
        pb = panah(SIMPANG, AKHIR, AKSEN)
        la = teks("pertama", 24, AKSEN2).move_to(ASAL + V1 * 0.5 + 0.52 * UP + 0.30 * LEFT)
        lb = teks("kedua", 24, AKSEN).move_to(SIMPANG + V2 * 0.5 + 0.62 * RIGHT)
        self.add(pa, pb, la, lb)
        self.bring_to_front(pejalan)
        self.play(FadeIn(la), FadeIn(lb), run_time=0.4)
        qc.periksa_adegan(self, {"panah a": pa, "panah b": pb, "label a": la, "label b": lb,
                                 "panel a": panel_a, "panel b": panel_b},
                          [("label a", "label b"), ("panel a", "panel b")])

        # ==============================================================
        # Babak 5: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            sinema.keterangan(self, "dari titik berangkat, ke mana ia berpindah?", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panah a": pa, "keterangan": self._matra_keterangan})

        # ==============================================================
        # Babak 6: resultan
        # ==============================================================
        pr = panah(ASAL, AKHIR, SOROT, tebal=7)
        titik = Dot(radius=0.09).set_color(SOROT).move_to(AKHIR)
        koord = rumus(r"(4,\ 3)", 30, SOROT).move_to(AKHIR + np.array([0.85, 0.42, 0.0]))
        panel_r = rumus(r"\vec{a} + \vec{b} = (4,\ 3)", 34, SOROT)
        panel_r.next_to(panel_b, DOWN, buff=0.25).align_to(panel_b, RIGHT)

        with sinema.babak(self, "resultan", DURASI) as b:
            b.main(GrowArrow(pr), run_time=1.8)
            self.bring_to_front(pejalan)
            b.main(FadeIn(titik, scale=2.0), FadeIn(koord), run_time=0.7)
            self.hud_tambah(panel_r)
            panel_r.set_opacity(0)
            b.main(panel_r.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "panah ungu ini namanya resultan", warna=SOROT)
            b.catat(0.6)
        qc.periksa_adegan(self, {"resultan": pr, "koordinat": koord, "panel r": panel_r,
                                 "panel b": panel_b},
                          [("panel b", "panel r"), ("koordinat", "panel r")])

        # ==============================================================
        # Babak 7: aturannya, ujung ke pangkal
        # ==============================================================
        sambung = Dot(radius=0.11).set_color(TINTA).move_to(SIMPANG)
        l_sambung = teks("ujung a = pangkal b", 24, TINTA)
        l_sambung.move_to(SIMPANG + np.array([1.15, -0.55, 0.0]))

        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(FadeIn(sambung, scale=2.5), run_time=0.6)
            b.main(FadeIn(l_sambung), run_time=0.5)
            b.main(Indicate(pa, scale_factor=1.06), Indicate(pb, scale_factor=1.06), run_time=1.2)
            sinema.keterangan(self, "ujung ke pangkal, lalu resultan menutup segitiga")
            b.catat(0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"sambung": l_sambung, "koordinat": koord,
                                 "keterangan": self._matra_keterangan},
                          [("sambung", "koordinat"), ("sambung", "keterangan")])

        # ==============================================================
        # Babak 8: susunan yang keliru
        # ==============================================================
        pb_salah = panah(ASAL, ASAL + V2, AKSEN)
        pb_salah.set_opacity(0.55)
        p_salah = panah(ASAL + V1, ASAL + V2, TINTA, tebal=5)
        benar = VGroup(pa, pb, pr, la, lb, sambung, l_sambung, titik, koord)

        # Susunan yang salah TIDAK dikembalikan di dalam babak ini. `sinema.babak`
        # menambal sisa waktu narasinya SESUDAH blok selesai, jadi kalau gambarnya
        # dipulihkan di sini, empat detik terakhir narator masih menjelaskan
        # susunan yang salah sementara layar sudah menampilkan yang benar. Gambar
        # yang membantah narasinya lebih merusak daripada layar kosong.
        # (Cacat ini tertangkap lembar kontak render pertama.)
        with sinema.babak(self, "keliru", DURASI) as b:
            sinema.keterangan(self, "dua pangkal ditempelkan: hasilnya lain sama sekali",
                              warna=TINTA)
            b.catat(0.6)
            b.main(benar.animate.set_opacity(0.22), run_time=0.8)
            b.main(GrowArrow(pb_salah), run_time=0.9)
            b.main(GrowArrow(p_salah), run_time=1.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"salah": p_salah, "keterangan": self._matra_keterangan})

        # ==============================================================
        # Babak 9: komponen dijumlahkan
        # ==============================================================
        h1 = rumus(r"\mathrm{mendatar:}\ 3 + 1 = 4", 32, TINTA)
        h2 = rumus(r"\mathrm{tegak:}\ 1 + 2 = 3", 32, TINTA)
        hitung = VGroup(h1, h2).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        hitung.to_corner(UL, buff=0.45)

        with sinema.babak(self, "hitung", DURASI) as b:
            b.main(FadeOut(pb_salah), FadeOut(p_salah),
                   benar.animate.set_opacity(1.0), run_time=0.8)
            self.hud_tambah(hitung)
            hitung.set_opacity(0)
            b.main(hitung.animate.set_opacity(1), run_time=0.8)
            b.main(Indicate(panel_r, scale_factor=1.08), run_time=1.0)
            sinema.keterangan(self, "menggambar untuk paham, komponen untuk cepat")
            b.catat(0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"hitung": hitung, "panel a": panel_a,
                                 "keterangan": self._matra_keterangan},
                          [("hitung", "panel a")])

        # ==============================================================
        # Babak 10: jebakan panjang
        # ==============================================================
        jebak = rumus(r"3{,}16 + 2{,}24 = 5{,}4 \ne 5", 34, AKSEN)
        jebak.next_to(hitung, DOWN, buff=0.34).align_to(hitung, LEFT)

        with sinema.babak(self, "panjang", DURASI) as b:
            self.hud_tambah(jebak)
            jebak.set_opacity(0)
            b.main(jebak.animate.set_opacity(1), run_time=0.8)
            b.main(Indicate(pr, scale_factor=1.06), run_time=1.0)
            sinema.keterangan(self, "panjang resultan tepat 5, bukan 5,4", warna=AKSEN)
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"jebak": jebak, "hitung": hitung, "panel a": panel_a},
                          [("jebak", "hitung"), ("jebak", "panel a")])

        # ==============================================================
        # Babak 11: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Komponen boleh dijumlahkan.", 34, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Panjang tidak boleh.", 34, AKSEN)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        # Dunianya disingkirkan lebih dulu: benda dunia tetap tergambar di atas
        # teks HUD, berapa pun pekat alasnya. Aturan 4 STANDAR-ILUSTRASI-VIDEO
        # mengizinkan layar bersih untuk penutup, paling banyak satu babak.
        semua = Group(bidang, pejalan, benar)
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self, run_time=0.4)
            b.catat(0.4)
            b.main(FadeOut(semua), FadeOut(hitung), FadeOut(jebak),
                   FadeOut(panel_a), FadeOut(panel_b), FadeOut(panel_r), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})

    # ==================================================================
    def langkah(self):
        """Posisi pejalan: berangkat dari asal, dua perjalanan berurutan."""
        return V1 * self.t1.get_value() + V2 * self.t2.get_value()
