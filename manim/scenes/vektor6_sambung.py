"""Vektor Materi 06, Menjumlah itu menyambung perjalanan. ManimGL.

Rancangan arah visual:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

PRINSIP POKOK
Matematika digambar di bidang datar bernomor, kamera TEGAK LURUS dari atas,
tidak pernah dimiringkan lagi. 3D hanya di babak pembuka.

REVISI 2 SEPTEMBER MALAM, dua catatan ARYA setelah menonton:

1. PITA BAWAH MILIK SUBTITLE SENDIRIAN. Semua `sinema.keterangan` dibuang.
   Isinya memang mengulang ucapan narator, dan aturan proyek melarang itu.
   Gantinya satu baris tetap di pojok kiri atas sebagai satuan cerita, karena
   begitu pindah ke 2D tidak ada lagi yang memberi tahu satu petak itu apa.

2. ASAL RUMUS DIPERLIHATKAN DULU. Babak `komponen` baru: garis putus-putus
   dijatuhkan dari tiap ujung panah ke sumbu mendatar, lalu ruas yang terbentuk
   di sumbu itu diwarnai. Siswa MELIHAT petak 0 sampai 3 disambung petak 3
   sampai 4 sebelum ditulis 3 + 1 = 4. Babak `hitung` melakukan hal yang sama
   pada sumbu tegak.

STORYBOARD
   1. sapa       3D miring DEKAT: orang berdiri di lapangan berpetak.
   2. terbang    Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. jalan1     Orangnya BERJALAN (3, 1). Panah biru tumbuh mengikuti langkah.
   4. jalan2     Dari tempat ia berhenti, berjalan lagi (1, 2). Panah merah.
   5. tanya      Pertanyaan, lalu diam.
   6. resultan   Panah ungu dari (0, 0) langsung ke (4, 3).
   7. aturan     Segitiganya disorot: ujung ke pangkal.
   8. keliru     Susunan yang SALAH: kedua pangkal ditempelkan.
   9. komponen   Garis bantu ke sumbu mendatar; ruas 0-3 dan 3-4 diwarnai.
  10. hitung     Hal yang sama di sumbu tegak, lalu 3 + 1 = 4 dan 1 + 2 = 3.
  11. panjang    Jebakannya: 3,16 + 2,24 = 5,4, padahal resultannya tepat 5.
  12. tutup      Layar bersih, kalimat sorot Materi 06.

KENAPA BERANGKAT DARI (0, 0) BIDANG
Sama dengan Materi 01: koordinat di layar SAMA dengan komponen vektornya, jadi
siswa bisa memeriksa sendiri dengan menghitung petak, tanpa mengurangi apa pun.

KENAPA PANAHNYA DIBEKUKAN SETELAH BABAK 4
Selama orangnya berjalan, panah digambar ulang tiap frame (`always_redraw`)
supaya tumbuh mengikuti langkah. Sesudah berhenti, panah yang sama diganti
salinan diam. Sebabnya babak `keliru` perlu MEREDUPKAN susunan yang benar, dan
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
# angka "-2" jatuh persis di pita subtitle.
BIDANG_X, BIDANG_Y = (-2.0, 7.0, 1.0), (-1.0, 4.0, 1.0)
# Pusat y 1,12, bukan 1,30: pada 1,30 baris paling bawah bidang jatuh di
# -2,63 pada bingkai, masuk jalur subtitle yang dipesan v2 (batas -2,55),
# dan `qc.jalur_bawah_kosong` menggagalkan rendernya. Pada 1,12 baris itu
# ada di -2,42 dan baris teratas di 3,29, keduanya aman.
# Pada tinggi 7,0 bidangnya TIDAK MUAT di pita yang tersisa setelah jalur
# subtitle dipesan: enam baris petak plus angka sumbunya memakan 6,33
# satuan bingkai, sedangkan yang tersedia 6,25. Tingginya dinaikkan ke
# 7,6 (sama dengan Materi 01) supaya muat, dan pusatnya diletakkan di
# tengah pita itu. Diukur, bukan dihitung di kepala.
# Pusat dan tinggi kamera peta dihitung `kamera.muat_datar`, tidak ditulis
# tangan: bidang setinggi enam baris tidak selalu muat berapa pun pusatnya.


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
            sinema.judul_pembuka(self, "Materi 06: Menyambung perjalanan",
                                 lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"pejalan": pejalan})

        # ==============================================================
        # Babak 2: turun ke tegak lurus, lapangan jadi peta bernomor
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        self.bring_to_front(pejalan)

        # `tanpa_utama=True`: semua isinya baris, tidak ada rumus utama.
        papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            # Pusat dan tinggi dari kotak batas bidang yang sebenarnya.
            pusat, tinggi = kamera.muat_datar(bidang)
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat,
                                tinggi=tinggi), run_time=lama)
            b.main(FadeOut(lapangan), FadeOut(alas),
                   bidang.animate.set_opacity(1), run_time=1.4)
            identitas = sinema.identitas(self, "1 petak = 1 langkah")
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        qc.periksa_adegan(self, {"bidang": bidang, "identitas": identitas})

        # ==============================================================
        # Babak 3: perjalanan pertama, panah tumbuh mengikuti langkah
        # ==============================================================
        p1 = always_redraw(lambda: panah(ASAL, ASAL + V1 * self.t1.get_value(), AKSEN2))
        with sinema.babak(self, "jalan1", DURASI) as b:
            self.add(p1)
            self.bring_to_front(pejalan)
            b.main(self.t1.animate.set_value(1.0), run_time=max(2.0, DURASI["jalan1"] - 1.8))
            panel_a = papan.baris(r"\vec{a} = (3,\ 1)", AKSEN2)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"panah a": p1},
                          hud={"panel a": panel_a, "identitas": identitas})

        # ==============================================================
        # Babak 4: perjalanan kedua, berangkat dari tempat ia berhenti
        # ==============================================================
        p2 = always_redraw(lambda: panah(SIMPANG, SIMPANG + V2 * self.t2.get_value(), AKSEN))
        with sinema.babak(self, "jalan2", DURASI) as b:
            self.add(p2)
            self.bring_to_front(pejalan)
            b.main(self.t2.animate.set_value(1.0), run_time=max(2.0, DURASI["jalan2"] - 1.8))
            panel_b = papan.baris(r"\vec{b} = (1,\ 2)", AKSEN)
            b.catat(0.8)
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
        qc.periksa_adegan(self, {"panah a": pa, "panah b": pb, "label a": la, "label b": lb},
                          [("label a", "label b")],
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "identitas": identitas})

        # ==============================================================
        # Babak 5: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
        # `Indicate` bawaan ManimGL berkedip KUNING (#FFFF00), warna yang tidak ada
        # di palet MATRA dan terlihat seperti kerusakan gambar. Warnanya diganti
        # warna palet, dan `scale_factor` dibuat 1.0: membesarkan panah walau
        # sekejap membuat ujungnya melewati petaknya sendiri, dan di bidang
        # bernomor itu berarti gambar membantah angkanya.
            b.main(Indicate(pa, scale_factor=1.0, color=SOROT), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"panah a": pa, "identitas": identitas})

        # ==============================================================
        # Babak 6: resultan
        # ==============================================================
        pr = panah(ASAL, AKHIR, SOROT, tebal=7)
        titik = Dot(radius=0.09).set_color(SOROT).move_to(AKHIR)
        koord = rumus(r"(4,\ 3)", 30, SOROT).move_to(AKHIR + np.array([0.85, 0.42, 0.0]))
        with sinema.babak(self, "resultan", DURASI) as b:
            b.main(GrowArrow(pr), run_time=1.8)
            self.bring_to_front(pejalan)
            b.main(FadeIn(titik, scale=2.0), FadeIn(koord), run_time=0.7)
            panel_r = papan.baris(r"\vec{a} + \vec{b} = (4,\ 3)", SOROT)
            b.catat(0.8)
            b.jeda(0.6)
        qc.periksa_adegan(self, {"resultan": pr, "koordinat": koord},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel r": panel_r, "identitas": identitas})

        # ==============================================================
        # Babak 7: aturannya, ujung ke pangkal
        # ==============================================================
        sambung = Dot(radius=0.11).set_color(TINTA).move_to(SIMPANG)
        # "ujung a = pangkal b" berisi empat kata dan `sinema.label`
        # menggagalkan render. Dipendekkan; tanda sama dengan tidak dihitung.
        l_sambung = sinema.label("ujung = pangkal", 24, TINTA)
        l_sambung.move_to(SIMPANG + np.array([1.15, -0.55, 0.0]))

        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(FadeIn(sambung, scale=2.5), run_time=0.6)
            b.main(FadeIn(l_sambung), run_time=0.5)
            b.main(Indicate(pa, scale_factor=1.0, color=SOROT),
                   Indicate(pb, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"sambung": l_sambung, "koordinat": koord},
                          [("sambung", "koordinat")])

        # ==============================================================
        # Babak 8: susunan yang keliru
        # ==============================================================
        pb_salah = panah(ASAL, ASAL + V2, AKSEN)
        pb_salah.set_opacity(0.55)
        p_salah = panah(ASAL + V1, ASAL + V2, TINTA, tebal=5)
        benar = VGroup(pa, pb, pr, la, lb, sambung, l_sambung, titik, koord)

        # Susunan yang salah TIDAK dikembalikan di dalam babak ini. `sinema.babak`
        # menambal sisa waktu narasinya SESUDAH blok selesai, jadi kalau gambarnya
        # dipulihkan di sini, detik-detik terakhir narator masih menjelaskan
        # susunan yang salah sementara layar sudah menampilkan yang benar. Gambar
        # yang membantah narasinya lebih merusak daripada layar kosong.
        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(benar.animate.set_opacity(0.22), run_time=0.8)
            b.main(GrowArrow(pb_salah), run_time=0.9)
            b.main(GrowArrow(p_salah), run_time=1.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"salah": p_salah, "identitas": identitas})

        # ==============================================================
        # Babak 9: dari mana angka mendatarnya datang
        # ==============================================================
        # Garis bantu dijatuhkan ke sumbu mendatar, lalu ruas yang terbentuk di
        # sumbu itu diwarnai. Angkanya ditaruh di y = -0,72: di bawah deretan
        # angka sumbu (yang berhenti di sekitar -0,42) tetapi masih di dalam
        # petak (batas bawah -1), jadi tidak menabrak apa pun.
        Y_LABEL = -0.72
        bantu_x = VGroup(
            DashedLine(SIMPANG, [SIMPANG[0], 0, Z]).set_stroke(AKSEN2, 2),
            DashedLine(AKHIR, [AKHIR[0], 0, Z]).set_stroke(SOROT, 2),
        )
        ruas_a = Line([0, 0, Z], [3, 0, Z]).set_stroke(AKSEN2, 7)
        ruas_b = Line([3, 0, Z], [4, 0, Z]).set_stroke(AKSEN, 7)
        n_a = rumus("3", 30, AKSEN2).move_to([1.5, Y_LABEL, 0])
        n_b = rumus("1", 30, AKSEN).move_to([3.5, Y_LABEL, 0])

        with sinema.babak(self, "komponen", DURASI) as b:
            b.main(FadeOut(pb_salah), FadeOut(p_salah),
                   benar.animate.set_opacity(1.0), run_time=0.8)
            b.main(ShowCreation(bantu_x), run_time=1.0)
            b.main(ShowCreation(ruas_a), run_time=0.7)
            b.main(FadeIn(n_a), run_time=0.4)
            b.main(ShowCreation(ruas_b), run_time=0.5)
            b.main(FadeIn(n_b), run_time=0.4)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"angka a": n_a, "angka b": n_b, "identitas": identitas},
                          [("angka a", "angka b")])

        # ==============================================================
        # Babak 10: hal yang sama di sumbu tegak, lalu angkanya ditulis
        # ==============================================================
        X_LABEL = -0.95
        bantu_y = VGroup(
            DashedLine(SIMPANG, [0, SIMPANG[1], Z]).set_stroke(AKSEN2, 2),
            DashedLine(AKHIR, [0, AKHIR[1], Z]).set_stroke(SOROT, 2),
        )
        ruas_c = Line([0, 0, Z], [0, 1, Z]).set_stroke(AKSEN2, 7)
        ruas_d = Line([0, 1, Z], [0, 3, Z]).set_stroke(AKSEN, 7)
        n_c = rumus("1", 30, AKSEN2).move_to([X_LABEL, 0.5, 0])
        n_d = rumus("2", 30, AKSEN).move_to([X_LABEL, 2.0, 0])

        # Hitungan pindah ke papan rumus kanan atas (zona v2), dan barisnya
        # BERUBAH DENGAN MORPH, bukan dua baris yang muncul memudar.
        with sinema.babak(self, "hitung", DURASI) as b:
            hitung = papan.baris(r"3 + 1 = 4", TINTA)
            b.catat(0.8)
            b.main(ShowCreation(bantu_y), run_time=0.9)
            b.main(ShowCreation(ruas_c), FadeIn(n_c), run_time=0.6)
            b.main(ShowCreation(ruas_d), FadeIn(n_d), run_time=0.6)
            hitung = sinema.ganti_rumus(self, hitung, r"1 + 2 = 3", b=b,
                                        papan=papan)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"angka c": n_c, "angka d": n_d},
                          [("angka c", "angka d")],
                          hud={"hitung": hitung, "identitas": identitas,
                               "panel r": panel_r})

        # ==============================================================
        # Babak 11: jebakan panjang
        # ==============================================================
        bantu = VGroup(bantu_x, bantu_y, ruas_a, ruas_b, ruas_c, ruas_d, n_a, n_b, n_c, n_d)

        with sinema.babak(self, "panjang", DURASI) as b:
            # Garis bantu disingkirkan: mulai sekarang yang dibicarakan panjang
            # panahnya, bukan komponennya, dan garis komponen yang tertinggal
            # akan menarik mata ke tempat yang salah.
            b.main(FadeOut(bantu), run_time=0.6)
            # Barisnya PENDEK, hanya kesimpulannya. `ganti_rumus` memorf di
            # tempat memakai titik tengah rumus lama, jadi rumus baru yang lebih
            # panjang melar ke kanan sampai keluar bingkai (qc menolaknya dengan
            # "kanan 7.45 > 6.82"). Angka lengkap "3,16 + 2,24 = 5,4" dibawa
            # narasi dan subtitle; versi 2 memang menetapkan kalimat panjang
            # milik subtitle, bukan gambar.
            jebak = sinema.ganti_rumus(self, hitung, r"5{,}4 \ne 5", b=b,
                                       warna=AKSEN, papan=papan)
            # Resultannya sendiri sudah ungu, jadi disorot dengan tinta.
            b.main(Indicate(pr, scale_factor=1.0, color=TINTA), run_time=1.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {},
                          hud={"jebak": jebak, "panel a": panel_a,
                               "panel r": panel_r, "identitas": identitas})

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
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
            # `papan.semua()` aman lagi sejak `ganti_rumus` diberi `papan=papan`:
            # papan mencatat penggantinya, jadi yang disingkirkan objek yang
            # benar-benar tampil. Sebelum itu baris LAMA yang sudah dilebur
            # ikut di-FadeOut dan hidup lagi menimpa yang baru.
            b.main(FadeOut(semua), FadeOut(papan.semua()), FadeOut(identitas),
                   run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})

    # ==================================================================
    def langkah(self):
        """Posisi pejalan: berangkat dari asal, dua perjalanan berurutan."""
        return V1 * self.t1.get_value() + V2 * self.t2.get_value()
