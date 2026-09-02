"""Perkakas video GRAFIK dua dimensi: sumbu, kurva, titik, label, panel rumus.

Dibuat 2 September 2026 dari adegan Grafik Fungsi tahap 6, setelah empat ronde
revisi ARYA. Semua yang ada di sini adalah aturan yang ia tetapkan, bukan
selera saya, jadi dipakai ulang apa adanya oleh video grafik berikutnya.

KENAPA MODUL INI ADA
Lima video grafik berikutnya membutuhkan hal yang sama persis: dua sumbu,
kurva, titik hasil hitungan, panel rumus, dan waktu yang terikat ke narasi.
Kalau disalin per adegan, satu perbaikan harus dikerjakan enam kali dan
kesalahan yang sudah dibayar mahal akan terulang di video lain.

ATURAN ARYA YANG DIJALANKAN MODUL INI

1. DUA SUMBU WAJIB. "grafik fungsi wajib banget menampilkan 2 sumbu x dan y".
   Tanpa sumbu tegak, kalimat "naik satu satuan" tidak punya alat ukur.

2. TIGA DIMENSI HANYA KALAU DIBUTUHKAN. "kalau grafiknya tidak menunjukkan
   tanda-tanda 3 dimensi, ya jangan dipaksakan". Grafik fungsi itu materi
   datar, jadi kameranya diam menghadap bidang xz sepanjang video.

3. RUMUS BARU LAHIR DI TEMPAT MATA MENATAP, LALU TERBANG KE PANEL. Rumus yang
   langsung terbit di pojok tidak pernah terlihat, karena mata sedang di
   grafik tengah layar. Lihat `rumus_terbang`.

4. JANGAN MENULIS APA YANG SUDAH DIUCAPKAN. Subtitle menampilkan seluruh
   narasi; pita kalimat di dasar layar tidak dipakai lagi.

5. TULISAN DI GAMBAR = LABEL, MAKSIMAL DUA KATA. Dijaga `label()`, yang
   menggagalkan render kalau dilanggar.

6. GAMBAR TIDAK BOLEH MENDAHULUI SUARA. Waktu animasi diikat ke jam subtitle,
   bukan disusun dari `run_time` dan `jeda`. Lihat bagian JAM SUBTITLE.

7. PITA PALING BAWAH LAYAR MILIK SUBTITLE. Peramban menaruh subtitle di sekitar
   piksel 448 sampai 478 dari 480 (diukur di Chrome, bukan dikira). Dunianya
   diatur supaya berhenti jauh di atas itu. Lihat `sudut_datar`.
"""

from pathlib import Path

from manimlib import *
from .tema import TINTA, REDUP, teks, rumus
from . import sinema

AKAR = Path(__file__).resolve().parents[2]


# ======================================================================
# JAM SUBTITLE
# ----------------------------------------------------------------------
# Bagian ini sebenarnya berguna untuk SEMUA topik, bukan cuma grafik.
# Ditaruh di sini supaya tidak menyentuh berkas bersama yang sedang dipakai
# sesi lain; MASTER boleh memindahkannya ke gl/sinema.py kapan saja.
# ======================================================================
def jam_subtitle(topik: str):
    """Detik mulai TIAP KALIMAT narasi, dibaca dari `web/public/anim/<topik>.vtt`.

    Kenapa ini ada. ARYA, 2 September 2026: "subtitle dan suaranya telat saat
    menyebutkan titik-titik itu". Terukur benar dan lebih parah dari
    kedengarannya: titik pertama mendarat 1,9 detik sebelum angkanya disebut,
    dan kurvanya ditarik 5,8 detik sebelum kalimatnya.

    Akarnya bukan angka yang meleset, tapi cara waktunya disusun. `run_time`
    dan `jeda` tidak pernah tahu kapan sebuah KALIMAT diucapkan; keduanya cuma
    tahu panjang seluruh segmen. Untuk segmen berisi satu gagasan itu cukup.
    Untuk segmen yang menyebut lima angka berurutan, tidak akan pernah cukup
    berapa kali pun ditebak ulang.

    `buat_subtitle.py` sudah memecah tiap segmen per kalimat dan membagi
    waktunya. Angka itu dibaca balik di sini, jadi gambar, subtitle, dan suara
    dijalankan satu sumber waktu yang sama.

    Kembalikan daftar (detik, kalimat). Kosong kalau .vtt belum dibuat, dan
    adegannya tetap jalan memakai waktu cadangan.

    URUTAN KERJANYA WAJIB: `buat_narasi.py` dulu, lalu `buat_subtitle.py`,
    BARU render. Kalau .vtt-nya basi, adegannya ikut basi tanpa memberi tahu.
    """
    p = AKAR / "web" / "public" / "anim" / f"{topik}.vtt"
    if not p.exists():
        return []
    hasil, baris = [], p.read_text(encoding="utf-8").splitlines()
    for i, b in enumerate(baris):
        if "-->" not in b or i + 1 >= len(baris):
            continue
        j, m, d = b.split("-->")[0].strip().split(":")
        kalimat = baris[i + 1].replace("<b>", "").replace("</b>", "").strip()
        hasil.append((int(j) * 3600 + int(m) * 60 + float(d), kalimat))
    return hasil


def mulai(jam, awalan: str):
    """Detik saat kalimat yang diawali `awalan` mulai diucapkan, atau None.

    Cocokkan dengan awalan yang PASTI ada di naskah tertulis (medan `layar`),
    bukan yang terucap: subtitle memakai notasi, jadi kalimatnya "x = -2
    memberi 4", bukan "x sama dengan minus dua memberi empat".
    """
    for t, kalimat in jam:
        if kalimat.startswith(awalan):
            return t
    return None


def tunggu_sampai(scene, b, detik, cadangan: float = 0.0):
    """Diam sampai detik `detik` pada jam video, lalu lanjut.

    `scene.wait` langsung, BUKAN `b.jeda`. `gl.sinema` membatasi `jeda` ke 1,6
    detik (JEDA_MAKS) TANPA PERINGATAN apa pun, dan pembatasan diam-diam itu
    sudah sekali meloloskan cacat ke video jadi: tulisan penutup sebuah babak
    menghilang sembilan detik sebelum babaknya habis. `b.catat` yang memberi
    tahu babak berapa waktu terpakai.
    """
    if detik is None:
        detik = scene.time + cadangan
    sisa = detik - scene.time
    if sisa > 0.02:
        scene.wait(sisa)
        b.catat(sisa)


# ======================================================================
# TATA LETAK
# ======================================================================
def sudut_datar(pusat_z: float = 2.35, tinggi: float = 9.6, x: float = 0.7):
    """Sudut kamera untuk grafik datar, menyisakan pita bawah untuk subtitle.

    Kameranya menghadap bidang xz (phi 90, theta 0), jadi tidak ada kesan tiga
    dimensi sama sekali. Itu disengaja: aturan 2 di kepala berkas ini.

    Angka bawaannya dipilih dari UKURAN lembar kontak 480p, bukan kira-kira:
    dengan nilai ini dunianya berhenti di sekitar piksel 389 dari 480,
    sedangkan Chrome menaruh subtitle di 448 sampai 478. Jarak 59 piksel.
    Kalau grafik topik lain lebih tinggi, naikkan `tinggi`, JANGAN turunkan
    `pusat_z`: menurunkan pusat menggeser dunianya ke bawah, masuk ke pita
    subtitle.
    """
    return dict(theta=0, phi=90, pusat=(x, 0.0, pusat_z), tinggi=tinggi)


def tegak(mob):
    """Putar teks supaya terbaca dari pandangan bidang xz."""
    return mob.rotate(PI / 2, RIGHT)


# ======================================================================
# BENDA DI BIDANG
# ======================================================================
def titik(pos, warna, r: float = 0.12):
    """Titik penanda. Bola kecil, BUKAN `Dot`.

    `Dot` ManimGL adalah cakram datar di bidang xy, jadi dari pandangan xz ia
    menipis jadi garis dan praktis hilang. `Dot3D` adalah nama Manim Community
    dan TIDAK ADA di ManimGL; render pertama tahap 6 gagal karenanya, dan
    `cek_kode.py` tidak menangkapnya sebab ia memeriksa LaTeX dan pola tulisan,
    bukan nama fungsi yang benar-benar ada.
    """
    b = Sphere(radius=r).set_color(warna)
    b.set_shading(0.4, 0.3, 0.5)
    return b.move_to(pos)


def kurva(f, dari, sampai, y=-1.72, warna=TINTA, tebal=5.0, langkah=0.02):
    """Kurva y = f(x) di lapisan `y`, digambar di bidang xz.

    `y` bukan sumbu grafik, itu KEDALAMAN. Semua benda tinggal di satu lapisan
    yang sedikit lebih dekat ke kamera daripada pusat bingkai, supaya
    perbandingan ukurannya tetap sama antar adegan.
    """
    k = ParametricCurve(
        lambda t: np.array([t, y, f(t)]),
        t_range=(dari, sampai, langkah),
    )
    k.set_stroke(warna, width=tebal)
    return k


def bayangan(f, dari, sampai, y=-1.72, warna=REDUP, tebal=2.6, opacity=0.5):
    """Bekas bentuk sebelumnya, abu tipis, supaya perpindahannya terbaca."""
    k = kurva(f, dari, sampai, y, warna, tebal)
    k.set_stroke(opacity=opacity)
    return k


def sumbu_dua(x_angka=(-3, -2, -1, 1, 2, 3, 4), y_angka=(1, 2, 3, 4, 5),
              x_dari=-3.4, x_sampai=4.8, z_bawah=-0.20, z_atas=5.2,
              y=-1.72, ukuran=22, warna=REDUP, z_angka_x=-0.42):
    """DUA sumbu, lengkap dengan angka dan huruf x dan y.

    Aturan 1 ARYA. Videonya sempat cuma punya sumbu mendatar dan ARYA yang
    menemukannya; widget di situs sudah benar sejak awal, jadi videonya yang
    tertinggal dari widgetnya sendiri.

    `z_bawah` sengaja dangkal. Pada -1,3 ujung bawah sumbu tegak turun sampai
    piksel 452 dari 480 dan MEMOTONG tulisan di bawahnya. Tinggi dan mendatar
    tidak pernah bentrok di lembar kontak sampai salah satunya memanjang.

    Angka sumbu y ditaruh di KIRI garis. Di kanan, ia jatuh ke dalam cekungan
    parabola justru di tempat kurvanya lewat setelah digeser.
    """
    gx = Line([x_dari, y, 0], [x_sampai, y, 0])
    gy = Line([0, y, z_bawah], [0, y, z_atas])
    for g in (gx, gy):
        g.set_stroke(warna, width=2)

    angka = Group()
    for n in x_angka:
        # DI BAWAH garis mendatar, tempat lazimnya. Ia sempat ditaruh di ATAS
        # waktu pita keterangan masih ada di dasar layar; sejak pita itu
        # dihapus, di bawah aman lagi dan justru lebih baik. Di atas, kurva
        # yang memotong sumbu tepat di sebuah angka bulat akan MENCORET
        # angkanya, dan itu terlihat di lembar kontak tahap 3 pada x = -1 dan
        # x = 3. `z_angka_x` boleh dinaikkan kalau kurva topik lain justru
        # banyak berjalan di bawah sumbu.
        angka.add(tegak(rumus(str(n), ukuran, warna)).move_to([n, y, z_angka_x]))
    for n in y_angka:
        angka.add(tegak(rumus(str(n), ukuran, warna)).move_to([-0.34, y, n]))

    huruf = Group(
        tegak(rumus("x", ukuran + 2, warna)).move_to([x_sampai - 0.25, y, 0.40]),
        tegak(rumus("y", ukuran + 2, warna)).move_to([0.42, y, z_atas - 0.1]),
    )
    return Group(gx, gy, angka, huruf)


def label(kalimat, pos, warna=TINTA, ukuran=26, y=-1.72):
    """Label yang menempel di bendanya. MAKSIMAL DUA KATA.

    Aturan 5. ARYA: "singkat-singkat saja, dan padat, 2 kata maksimal".
    Kalimat panjang sudah jadi tugas subtitle, dan mengulangnya di layar cuma
    memecah fokus penonton.

    Batasnya dijaga DI SINI supaya render GAGAL kalau dilanggar, bukan lolos
    diam-diam lalu ketahuan ARYA lagi. RUMUS tidak lewat sini: "x = 1" itu satu
    lambang utuh, bukan tiga kata, jadi ia dibuat dengan `rumus()` langsung.
    """
    kata = kalimat.replace("$", "").split()
    if len(kata) > 2:
        raise ValueError(
            "label maksimal 2 kata (aturan ARYA), dapat %d: %r" % (len(kata), kalimat)
        )
    t = tegak(teks(kalimat, ukuran, warna))
    pos = list(pos)
    if len(pos) == 2:
        pos = [pos[0], y, pos[1]]
    return t.move_to(pos)


# ======================================================================
# PANEL RUMUS
# ======================================================================
def panel(potongan, warna_akhir=None, ukuran=34, lebar=5.2):
    """Tumpukan rumus di pojok KIRI atas layar, menempel walau kamera bergerak.

    Kiri, bukan kanan: kurva topik grafik hampir selalu naik ke kanan, dan pada
    render pertama tahap 6 rumus `f(x) = 2 akar x` tertimpa kurvanya sendiri di
    pojok kanan atas.
    """
    baris = VGroup(*[rumus(p, ukuran) for p in potongan])
    baris.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
    if warna_akhir is not None:
        baris[-1].set_color(warna_akhir)
    sinema.batasi_lebar(baris, lebar)
    baris.to_corner(UL, buff=0.45)
    return baris


def rumus_terbang(scene, b, potongan, warna_akhir=None, bareng=None, redup=(),
                  lahir=0.9, tahan=0.5, terbang=1.2, ukuran_besar=66):
    """Rumus baru LAHIR BESAR di tempat mata menatap, lalu terbang ke panel.

    Pedoman tetap ARYA (2 September 2026), berlaku untuk SEMUA topik, dengan
    kata-katanya sendiri: "wajib kita ingat selamanya, jadikan ini sebagai
    pedomanmu untuk membuat grafik yang lain".

    Rumus yang langsung terbit di pojok kiri atas TIDAK TERLIHAT, karena mata
    penonton sedang di grafik tengah layar. Narasi sesudahnya lalu terasa tidak
    nyambung. ARYA sendiri mengusulkan kotak merah berkedip; cara ini dipilih
    karena kedipan memutus perhatian secara kasar sedangkan gerak menuntunnya,
    dan sekalian mengajari mata di mana rumus disimpan.

    `redup` = benda yang DIREDUPKAN selama rumusnya besar. Tanpa itu rumus
    besar bertumpuk dengan kurva dan angka sumbu, dan angka sumbu mengintip
    dari sela hurufnya sehingga terbaca seperti salah cetak. Meredupkan lebih
    baik daripada memberi alas: alas dilarang ARYA, dan redup mengerjakan
    tugasnya lebih baik dengan menyisakan SATU benda terang di layar.

    `bareng` = animasi yang jalan BERSAMAAN dengan terbangnya, mis. perubahan
    bentuk kurvanya, supaya rumus dan gambar tidak pernah saling membantah
    walau sekejap.

    Rumus lamanya DIKELUARKAN, tidak pernah di-morph jadi rumus baru: peralihan
    antara dua rumus yang jumlah lambangnya berbeda menghasilkan coretan kembar
    tak terbaca.
    """
    tujuan = panel(potongan, warna_akhir)
    # Panel dikunci ke layar LEBIH DULU, baru sasaran terbangnya disalin dan
    # ikut dikunci. Kalau tidak, salinan besar yang terkunci ke layar
    # diterbangkan menuju sasaran yang koordinatnya masih koordinat DUNIA, dan
    # ia melenceng ke tepi selama seluruh terbangnya. Keadaan akhirnya tetap
    # benar, jadi cacat itu HANYA terlihat kalau frame diambil di tengah
    # animasi 1,2 detik. Lembar kontak berjarak sepuluh detik melewatkannya
    # tiga ronde berturut-turut di tahap 6.
    scene.hud_tambah(tujuan)
    tujuan.set_opacity(0)
    sasaran = tujuan[-1].copy()
    sasaran.fix_in_frame()

    besar = rumus(potongan[-1], ukuran_besar, warna_akhir or TINTA)
    sinema.batasi_lebar(besar, 9.0)
    besar.move_to([0, 0.9, 0])
    besar.fix_in_frame()
    scene.add(besar)

    # Benda yang SEDANG dipakai animasi lain tidak boleh ikut diredupkan: dua
    # animasi pada satu objek saling menimpa datanya dan rendernya gagal dengan
    # "could not broadcast input array".
    sibuk = {id(getattr(a, "mobject", None)) for a in (bareng or [])}
    gelapkan = [m for m in redup
                if m is not None and m in scene.mobjects and id(m) not in sibuk]

    def atur(m, nilai):
        # Kurva diredupkan lewat STROKE saja. `set_opacity` pada
        # ParametricCurve ikut menyalakan ISIAN, sehingga bagian dalam kurva
        # tertutup tampak berwarna abu, bukan sekadar redup.
        if isinstance(m, ParametricCurve):
            return m.animate.set_stroke(opacity=nilai)
        return m.animate.set_opacity(nilai)

    b.main(FadeIn(besar, scale=0.72),
           *[atur(m, 0.18) for m in gelapkan], run_time=lahir)
    b.jeda(tahan)

    gerak = [Transform(besar, sasaran)]
    gerak += [atur(m, 1.0) for m in gelapkan]
    lama = getattr(scene, "pnl", None)
    if lama is not None:
        gerak.append(FadeOut(lama))
    if len(tujuan) > 1:
        gerak.append(VGroup(*tujuan[:-1]).animate.set_opacity(1))
    b.main(*gerak, *(bareng or []), run_time=terbang)

    tujuan.set_opacity(1)
    if warna_akhir is not None:
        tujuan[-1].set_color(warna_akhir)
    scene.remove(besar)
    scene.pnl = tujuan
    return tujuan
