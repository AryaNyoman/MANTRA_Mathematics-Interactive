"""Video 01 topik Transformasi Geometri, Materi 01 "Setiap titik ikut pindah".

Standar ilustrasi v2. Rujukan: `manim/contoh/contoh_perahu.py` (urutan babak),
`manim/scenes/vektor1_perahu.py` (bidang datar), `manim/gl/` (perkakas).

TUGAS VIDEO INI
Meruntuhkan satu dugaan, bukan mengajarkan satu rumus: bahwa yang dipindahkan
sebuah transformasi adalah GAMBARNYA. Karena itu bagian terpenting bukan bentuk
petanya, melainkan enam garis yang menghubungkan tiap sudut ke pasangannya, dan
babak "bukti" yang memperlihatkan jarak antartitik BERUBAH. Benda utuh yang
diangkat tangan tidak bisa berubah jarak antarbagiannya.

KENAPA PEMBUKANYA LAPANGAN YANG DILIPAT
Topik ini termasuk yang boleh memakai 3D di luar pembuka (keputusan ARYA,
STANDAR-ILUSTRASI-VIDEO butir 2). Yang ditampilkan sebuah lapangan dengan garis
lipatan, dan seorang yang mendarat di seberang garis itu. Melipat bidang pada
sebuah garis adalah DEFINISI pencerminan, bukan perumpamaan yang mirip-mirip:
garis lipatannya benar-benar garis cermin, dan nanti benar-benar menjadi sumbu
X. Jadi gambar pembukanya sudah menjadi materinya.

VERSI PERTAMA MEMAKAI PANTULAN ORANG DI AIR, DAN DIBUANG 4 SEPTEMBER 2026.
Dua sebabnya, keduanya baru terlihat saat frame diperiksa satu per satu, bukan
dari lembar kontak dan bukan dari log:

1. Pantulannya ditaruh di bawah permukaan air, dan permukaan air ManimGL
   MENELAN benda di bawahnya. Selama 13 detik narasi berbicara tentang
   pantulan sementara layar tidak menampilkan pantulan apa pun. Jebakan ini
   bahkan sudah tertulis di STANDAR-ILUSTRASI-VIDEO ("Surface DI DALAM benda
   tembus pandang hilang") dan tetap terlewat.
2. Label "pantulan" tergambar TERBALIK dan tercermin, sebab teks yang ditaruh
   di ruang 3D ikut dimiringkan kameranya. Karena itu babak pembuka sekarang
   tidak memakai tulisan sama sekali.

ANGKA YANG DIKLAIM DI VIDEO INI DIPERIKSA MESIN
    python alat/cek_transformasi.py alat/materi-transformasi-geometri.json
Klaimnya berawalan `V01-`.

JANGAN MEMAKAI `b.catat()` SEBAGAI PENGGANTI JEDA
Pelajaran mahal dari render keempat video ini, dicatat supaya lima video
berikutnya tidak mengulanginya. `b.catat(n)` hanya MENGAKU bahwa n detik sudah
terpakai; ia tidak menjalankan `wait` apa pun. Ia disediakan untuk pembantu yang
memang menggerakkan jam adegan sendiri, seperti `judul_pembuka` dan
`lahir_rumus`.

Memanggilnya untuk "menahan layar sebentar" justru MEMENDEKKAN videonya, sebab
`Babak.tutup()` menutup sisa waktu tiap babak dengan `wait(sisa)`, dan `catat`
palsu mengecilkan sisa itu. Enam panggilan seperti itu membuat video ini
berdurasi 63,3 detik padahal narasinya 73,7 detik: sepuluh detik terakhir
narasi akan berbunyi di atas layar yang sudah habis.

Cara yang benar menahan layar: TIDAK MELAKUKAN APA-APA. `tutup()` sudah
menutup sisanya sendiri sampai pas dengan narasi. Kalau memang butuh diam di
tengah babak, pakai `scene.wait(n)` DAN `b.catat(n)` berpasangan, atau
`b.tunggu_sampai(...)`.

Alur berkas:
    python manim/buat_narasi.py transformasi1-setiap-titik
    python manim/buat_subtitle.py transformasi1-setiap-titik
    python manim/cek_kode.py manim/scenes/transformasi1_setiap_titik.py
    manimgl manim/scenes/transformasi1_setiap_titik.py TransformasiSetiapTitik -w -l
    python manim/cek_video.py media/gl/TransformasiSetiapTitik.mp4 --detik ...
    python manim/gabung_audio.py transformasi1-setiap-titik TransformasiSetiapTitik --uji
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi1-setiap-titik"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# Bentuk huruf L, SAMA PERSIS dengan yang dipakai kedua belas widget topik ini
# (`web/components/widget/transformasi-geometri/matriks.ts`). Sengaja sama:
# siswa yang menonton video lalu membuka halamannya harus bertemu benda yang
# sama, bukan dua benda yang mirip.
L = [(1.0, 1.0), (6.0, 1.0), (6.0, 2.0), (2.0, 2.0), (2.0, 3.0), (1.0, 3.0)]
NAMA_SUDUT = {0: "A", 1: "B", 2: "C"}
Z = 0.02

# Letak orang di pembuka 3D, dipilih supaya kamera tidak perlu melompat jauh
# saat turun ke bidang matematikanya.
ORANG_X, ORANG_Y = 3.5, 1.4


def titik3(p, z=Z):
    return np.array([p[0], p[1], z])


def cermin_sumbu_x(p):
    return (p[0], -p[1])


def dilatasi(p, k):
    return (k * p[0], k * p[1])


def poligon(titik, warna, tebal=3.0, isian=0.0, putus=False):
    pts = [titik3(t) for t in titik]
    g = Polygon(*pts).set_stroke(warna, tebal).set_fill(warna, isian)
    if putus:
        g = DashedVMobject(g, num_dashes=48).set_stroke(warna, tebal)
    return g


class TransformasiSetiapTitik(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta_cermin = [cermin_sumbu_x(p) for p in L]
        peta_dilatasi = [dilatasi(p, 2.0) for p in L]

        # ---------------------------------------------------------------- #
        # buka: HANYA judul materi, layar bersih.                           #
        # ---------------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 01: Setiap titik ikut pindah", lama=lama)
            b.catat(lama)

        # ---------------------------------------------------------------- #
        # dunia: lapangan dan garis lipatannya. Kamera miring.              #
        # ---------------------------------------------------------------- #
        # VERSI PERTAMA MEMAKAI PANTULAN ORANG DI AIR, DAN ITU GAGAL TOTAL.
        #
        # Pantulannya ditaruh di bawah permukaan air pada z negatif, dan
        # permukaan air ManimGL MENELAN benda di bawahnya. Jebakan itu bahkan
        # sudah tertulis di STANDAR-ILUSTRASI-VIDEO ("Surface DI DALAM benda
        # tembus pandang hilang"), dan tetap terlewat. Hasilnya: selama 13
        # detik narasi berbicara tentang pantulan sementara layar tidak
        # menampilkan pantulan apa pun. Terlihat pada pemeriksaan frame
        # 4 September 2026, bukan pada lembar kontak dan bukan pada log.
        #
        # Penggantinya lebih jujur SEKALIGUS lebih aman dirender. Melipat
        # bidang pada sebuah garis adalah definisi pencerminan, bukan
        # perumpamaan yang mirip-mirip: garis lipatannya benar-benar garis
        # cermin, dan nanti benar-benar menjadi sumbu X. Kedua orangnya
        # berdiri di atas tanah yang sama, jadi tidak ada yang bisa tertelan
        # permukaan apa pun.
        lapangan = ilustrasi.tanah(panjang=15.0, lebar=11.0, y_tengah=0.0, z=0.0)

        garis_lipat = DashedLine(
            np.array([-4.0, 0.0, 0.03]), np.array([11.0, 0.0, 0.03]),
        ).set_stroke(SOROT, 3.0)

        orang = ilustrasi.orang(tinggi=1.7)
        orang.shift(np.array([ORANG_X, ORANG_Y, 0.0]))

        # Orang seberangnya: salinan yang dicerminkan pada garis y = 0, yaitu
        # transformasi yang sama persis dengan yang dikerjakan matematikanya
        # nanti. Dibuat samar supaya terbaca sebagai hasil, bukan orang kedua.
        seberang = ilustrasi.orang(tinggi=1.7)
        seberang.shift(np.array([ORANG_X, -ORANG_Y, 0.0]))
        seberang.set_opacity(0.34)

        kamera.pasang_awal(frame, theta=-24, phi=62,
                           pusat=(ORANG_X, 0.0, 0.7), tinggi=8.2)

        with sinema.babak(self, "dunia", DURASI) as b:
            # Lapangan dan orangnya muncul BERSAMAAN, dalam satu panggilan.
            #
            # Penggabungan ini semula dikira obat untuk selisih durasi video
            # terhadap narasi. DUGAAN ITU SALAH, dan dibuktikan salah: dua
            # puluh panggilan dipangkas jadi tiga belas, dan durasinya tidak
            # bergerak sama sekali (75,43 jadi 75,47 detik). Penyebab
            # sebenarnya `papan.baris` yang tidak mencatat waktunya, lihat
            # catatan di babak "peta2".
            #
            # Penggabungannya tetap dipertahankan, tetapi dengan alasan yang
            # jujur: geraknya jadi lebih tenang. Muncul berbarengan lebih enak
            # ditonton daripada tiga hal yang menyala bergantian tanpa sebab.
            b.main(FadeIn(lapangan), FadeIn(orang), run_time=1.2)
            b.main(ShowCreation(garis_lipat), run_time=1.2)
        qc.periksa_adegan(self, {"orang": orang}, margin=0.45)

        # ---------------------------------------------------------------- #
        # sama: orangnya mendarat di seberang garis lipatan.                #
        # ---------------------------------------------------------------- #
        # Tidak ada tulisan apa pun di babak ini, dan itu disengaja. Teks
        # ManimGL yang ditaruh di ruang 3D ikut dimiringkan kameranya: pada
        # versi pertama label "pantulan" tergambar TERBALIK dan tercermin,
        # sehingga tidak terbaca sama sekali. Narasi sudah menyebutkan apa
        # yang terjadi, dan standar proyek memang mengizinkan layar diam
        # selama narasinya masih membahas yang tampil.
        # Garis pasangan dari kepala ke kepala, TANPA tulisan.
        #
        # Kalimat kedua babak ini berbunyi "aturannya berlaku untuk tiap
        # titik", dan versi pertama tidak menggambarkan apa pun untuk kalimat
        # itu: layarnya diam 7,6 detik, terukur `alat/ukur_detik_pertama.py`.
        # Garis yang menghubungkan orangnya dengan hasilnya adalah gambar
        # untuk kalimat itu, dan ia juga benih seluruh topik: transformasi
        # memasangkan titik dengan titik.
        #
        # Tanpa label, sengaja. Teks di ruang 3D ikut dimiringkan kameranya
        # dan pernah tergambar terbalik di video ini juga.
        pasangan = DashedLine(
            np.array([ORANG_X, ORANG_Y, 1.7]),
            np.array([ORANG_X, -ORANG_Y, 1.7]),
        ).set_stroke(SOROT, 2.5)

        with sinema.babak(self, "sama", DURASI) as b:
            b.main(FadeIn(seberang), run_time=1.4)
            b.main(ShowCreation(pasangan), run_time=1.6)
        qc.periksa_adegan(self, {"orang": orang, "seberang": seberang}, margin=0.45)

        # ---------------------------------------------------------------- #
        # peta: satu gerakan turun ke tegak lurus. Air jadi sumbu X.        #
        # ---------------------------------------------------------------- #
        bidang = ilustrasi.bidang_bernomor((-1.0, 6.0, 1.0), (-3.0, 3.0, 1.0))

        # LETAK DAN SKALA KAMERA DIHITUNG DARI ZONA HUD, BUKAN DIKIRA-KIRA.
        #
        # Dua percobaan pertama gagal di gerbang qc, dan keduanya karena angka
        # ini ditebak. Nilai zonanya ada di `manim/gl/sinema.py`:
        #
        #     ZONA_RUMUS     = (2.10, 6.85, 1.10, 3.70)   panel kanan atas
        #     ZONA_IDENTITAS = (-6.85, -2.10, 2.40, 3.70) identitas kiri atas
        #     ZONA_SUBTITLE  = (-7.11, 7.11, -4.00, -2.55) haram diisi
        #
        # Artinya di atas garis layar y = 1,10 gambar hanya boleh memakai
        # x < 2,10, dan di atas y = 2,40 juga harus menghindari sisi kiri.
        # Percobaan pertama (tinggi 9,0) menabrak jalur subtitle; percobaan
        # kedua (tinggi 9,6) lolos itu tetapi bidangnya menindih panel rumus.
        #
        # Angka di bawah menyelesaikan ketiganya sekaligus:
        #   tinggi 11,0  -> satu satuan dunia = 0,727 satuan layar
        #   pusat y -0,2 -> seluruh isi jatuh di bawah y = 2,40, jadi identitas
        #                   di kiri atas tidak mungkin tertabrak
        #   pusat x 3,5  -> tepi kanan bidang di 1,82 dan label C di 2,11,
        #                   keduanya di kiri panel rumus yang mulai di 2,10
        #   bidang -3..3 -> baris angka terbawah jatuh di -2,14, di atas -2,55
        #
        # Harganya bentuknya mengecil jadi kira-kira 26 persen lebar layar.
        # Itu pertukaran yang benar: subtitle yang terbaca lebih penting
        # daripada bentuk yang besar.
        with sinema.babak(self, "peta", DURASI) as b:
            b.main(
                kamera.dunia_ke_peta(frame, pusat=(3.5, -0.2, 0), tinggi=11.0),
                run_time=max(2.2, DURASI["peta"] - 2.0),
            )
            b.main(
                FadeOut(lapangan), FadeOut(orang), FadeOut(seberang),
                FadeOut(garis_lipat), FadeOut(pasangan), FadeIn(bidang),
                run_time=1.0,
            )
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # bentuk: prapeta digambar, tiga sudutnya diberi nama.              #
        # ---------------------------------------------------------------- #
        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        titik_asal = [Dot(titik3(p), radius=0.07).set_color(TINTA) for p in L]
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            # A dan B di BAWAH titiknya, C di ATAS. Tidak ada satu pun yang
            # ditaruh di sebelah kanan: C berada di x = 6, sudut paling kanan
            # bentuknya, dan label di kanannya akan menjorok ke lorong panel
            # rumus yang mulai di layar x = 2,10.
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        l_prapeta = sinema.label("prapeta", warna=TINTA)
        l_prapeta.next_to(titik3((3.5, 3.0)), UP, buff=0.28)

        with sinema.babak(self, "bentuk", DURASI) as b:
            b.main(ShowCreation(prapeta), run_time=1.4)
            b.main(
                *[FadeIn(d, scale=0.5) for d in titik_asal],
                *[FadeIn(nama_pra[h]) for h in nama_pra],
                FadeIn(l_prapeta),
                run_time=1.2,
            )
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "label prapeta": l_prapeta, "nama A": nama_pra["A"]},
            [("label prapeta", "nama A")],
            hud={"identitas": ident},
            dunia={"bidang": bidang},
        )

        # ---------------------------------------------------------------- #
        # pindah: TIAP TITIK berjalan sendiri. Inti video ini.              #
        # ---------------------------------------------------------------- #
        titik_jalan = [Dot(titik3(p), radius=0.07).set_color(AKSEN2) for p in L]
        for d in titik_jalan:
            self.add(d)

        with sinema.babak(self, "pindah", DURASI) as b:
            # Keenam titik berangkat BERSAMAAN tetapi menempuh jarak yang
            # berbeda-beda, sebab masing-masing punya tujuannya sendiri. Kalau
            # digerakkan berurutan, siswa akan mengira ada urutan yang penting.
            b.main(
                *[
                    d.animate.move_to(titik3(peta_cermin[i]))
                    for i, d in enumerate(titik_jalan)
                ],
                run_time=max(2.0, DURASI["pindah"] - 4.6),
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident},
                          dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # enam: keenam garis pasangan, lalu rumus lahir dekat titik A.      #
        # ---------------------------------------------------------------- #
        garis = VGroup(*[
            DashedLine(titik3(L[i]), titik3(peta_cermin[i])).set_stroke(REDUP, 1.8)
            for i in range(len(L))
        ])

        with sinema.babak(self, "enam", DURASI) as b:
            b.main(
                *[ShowCreation(g) for g in garis],
                Indicate(titik_jalan[0], color=SOROT),
                run_time=1.6,
            )
            rum = sinema.lahir_rumus(
                self, r"A(1,\ 1) \to A'(1,\ -1)",
                dekat=titik_jalan[0], papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "garis": garis})

        # ---------------------------------------------------------------- #
        # peta2: petanya menjadi bentuk utuh, diberi nama.                  #
        # ---------------------------------------------------------------- #
        peta_bentuk = poligon(peta_cermin, AKSEN2, tebal=3.2, isian=0.12)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_cermin[i]), UP if i < 2 else RIGHT, buff=0.22)
            nama_peta[huruf] = t
        # Label "peta" ditaruh di SAMPING, bukan di bawah bentuknya. Di bawah
        # sana sudah ada baris terakhir angka sumbu, dan di bawahnya lagi jalur
        # subtitle. Menaruh label di situ berarti menumpuk tiga hal di pita yang
        # paling sempit di layar.
        l_peta = sinema.label("peta", warna=AKSEN2)
        l_peta.next_to(titik3((6.0, -1.5)), RIGHT, buff=0.3)

        with sinema.babak(self, "peta2", DURASI) as b:
            b.main(
                ShowCreation(peta_bentuk),
                *[FadeIn(nama_peta[h]) for h in nama_peta],
                FadeIn(l_peta),
                run_time=1.6,
            )
            # Nama transformasinya ikut ditulis di depan angkanya.
            #
            # Versi tanpa nama menulis "AB = 5 -> A'B' = 5" di sini dan
            # "AB = 5 -> A'B' = 10" di babak dilatasi, lalu KEDUANYA tampil
            # bersamaan di panel pada detik terakhir video. Dua pernyataan yang
            # saling membantah di layar yang sama, dan tak satu pun menyebut
            # sedang membicarakan transformasi yang mana. Terlihat pada
            # pemeriksaan frame 4 September 2026.
            #
            # Dengan namanya ditulis, keduanya berhenti bertengkar dan justru
            # menjadi perbandingan: cermin tidak mengubah jarak, dilatasi
            # mengubahnya. Itu persis pelajaran Materi 08.
            # `b=b` WAJIB. Tanpanya waktu 0,8 detik animasi baris ini tidak
            # tercatat, `tutup()` menambal terlalu banyak, dan videonya jadi
            # lebih panjang daripada narasinya. Dua panggilan yang terlewat
            # membuat video ini meleset 1,6 detik dan ditolak `gabung_audio.py`.
            # Parameter `b=` ditambahkan MASTER 4 Sep 2026; sebelum itu waktunya
            # harus dicatat tangan dengan `b.catat(0.8)`.
            papan.baris(r"\text{cermin: } AB = 5 \to A'B' = 5", warna=AKSEN2, b=b)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_bentuk, "label peta": l_peta},
            [("label peta", "peta")],
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang},
        )

        # ---------------------------------------------------------------- #
        # bukti: aturannya diganti dilatasi; JARAK antartitik berubah.      #
        # ---------------------------------------------------------------- #
        # Kamera mundur, sebab peta dilatasi 2 menjangkau x = 12 dan y = 6.
        # Bingkai yang dipatok akan memotongnya, dan aturan proyek melarang
        # gambar yang terpotong. Mundurnya kamera juga bercerita: bendanya
        # membesar sampai bingkainya harus ikut membesar.
        # Bidang luasnya mulai dari y = 0, bukan y = -1. Peta dilatasi berada
        # seluruhnya di atas sumbu X, jadi baris di bawahnya tidak dipakai, dan
        # baris yang tidak dipakai hanya mendorong angka sumbu turun ke jalur
        # subtitle. Titik asal tetap terlihat, dan itu yang penting: seluruh
        # sinar dilatasi berpangkal di sana.
        # Bidang luasnya mulai dari y = 0 dan berhenti di y = 6, bukan 7.
        #
        # Peta dilatasi berada seluruhnya di atas sumbu X dan berhenti tepat di
        # y = 6, jadi baris di luar itu tidak dipakai. Baris yang tidak dipakai
        # bukan cuma mubazir: baris di bawah mendorong angka sumbu turun ke
        # jalur subtitle, dan baris di atas mendorong tepi kiri bidang naik ke
        # kotak identitas di kiri atas. Keduanya menggagalkan render.
        bidang_luas = ilustrasi.bidang_bernomor((0.0, 12.0, 1.0), (0.0, 6.0, 1.0))
        peta_besar = poligon(peta_dilatasi, SOROT, tebal=3.2, isian=0.12)
        garis_besar = VGroup(*[
            DashedLine(titik3(L[i]), titik3(peta_dilatasi[i])).set_stroke(REDUP, 1.8)
            for i in range(len(L))
        ])

        with sinema.babak(self, "bukti", DURASI) as b:
            # Label "prapeta" ikut dipadamkan di sini, bukan dibiarkan.
            #
            # Kamera babak ini mundur dan bergeser, dan peta dilatasi TUMBUH
            # menutupi daerah tempat label itu berdiri. Hasilnya label
            # "prapeta" jatuh di dalam bentuk ungu dan seolah menamai bentuk
            # yang salah. Terlihat pada pemeriksaan frame 4 September 2026.
            # Pada titik ini siswa sudah mengenal bentuk hitamnya, jadi
            # labelnya memang sudah selesai tugasnya.
            b.main(
                FadeOut(peta_bentuk), FadeOut(garis), FadeOut(l_peta),
                FadeOut(l_prapeta),
                *[FadeOut(nama_peta[h]) for h in nama_peta],
                *[FadeOut(d) for d in titik_jalan],
                run_time=0.7,
            )
            b.main(
                # Sama seperti babak "peta", angka ini dihitung dari zona HUD,
                # bukan ditebak. Tinggi 12,0 memberi 1 satuan dunia = 0,667
                # satuan layar. Dengan pusat (9,0; 2,9): tepi kanan bidang
                # jatuh di layar 2,00 (panel rumus mulai 2,10), tepi atas di
                # 2,07 (identitas mulai 2,40), tepi bawah di -2,03 (subtitle
                # mulai -2,55). Ketiganya aman dengan sisa yang wajar.
                kamera.dunia_ke_peta(frame, pusat=(9.0, 2.9, 0), tinggi=12.0),
                FadeOut(bidang), FadeIn(bidang_luas),
                run_time=max(1.6, DURASI["bukti"] - 5.2),
            )
            b.main(ShowCreation(garis_besar), ShowCreation(peta_besar), run_time=1.6)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta besar": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_luas})

        # ---------------------------------------------------------------- #
        # tutup: rumus BERUBAH lewat morph lambang, bukan fade.             #
        # ---------------------------------------------------------------- #
        with sinema.babak(self, "tutup", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"A(1,\ 1) \to A'(2,\ 2)", b=b, warna=SOROT, papan=papan,
            )
            papan.baris(r"\text{dilatasi: } AB = 5 \to A'B' = 10", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta besar": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_luas})
