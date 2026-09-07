"""Benda dunia nyata bercahaya, dibuat sekali dan dipakai semua sesi.

Aturan bentuk (dari uji perahu 2 Sep 2026):
- Setiap benda mengembalikan Group dengan alas di z = 0 dan pusat di x = y = 0
  (perahu: garis air di z = 0, haluan menghadap +x). Geser dengan `.shift()`.
- Benda apung punya badan DI ATAS garis air, kalau tidak ia tertutup permukaan air.
- Bidang tipis (layar, kertas) dilihat dari atas jadi garis: dimiringkan sedikit.
- Jangan menumpuk rotasi tiap frame: `ayunkan()` membangun ulang dari salinan asli.
- Warna hanya dari palet tema. Cahaya lewat `set_shading(pantulan, kilap, bayangan)`.
"""

from manimlib import *

from .tema import TINTA, REDUP, AKSEN, AKSEN2, SOROT, LATAR

BAYANG = (0.4, 0.3, 0.5)       # benda padat
BAYANG_AIR = (0.5, 0.5, 0.3)   # air lebih berkilap
BAYANG_DATAR = (0.0, 0.0, 0.0)  # tanah, kertas

# Cahaya bawaan ManimGL ada di (-10, 10, 10), yaitu di BELAKANG benda untuk
# kamera yang biasa dipakai topik ruang (theta sekitar -40). Titik ini di sisi
# kamera dan cukup rendah, supaya bayangan lantainya punya panjang yang wajar.
CAHAYA_BAKU = np.array([-2.0, -12.0, 12.0])


# ---------------------------------------------------------------------------
# Latar: air, tanah, lantai
# ---------------------------------------------------------------------------

def tinggi_air(x, y, t):
    """Tiga riak kecil yang saling silang, semuanya hanyut ke arah +x (arus)."""
    return (0.06 * np.sin(1.4 * x - 1.6 * t) * np.cos(0.9 * y + 0.5 * t)
            + 0.035 * np.sin(2.3 * x - 1.1 * y - 2.2 * t)
            + 0.025 * np.sin(0.8 * x + 1.7 * y - 1.3 * t))


def air(panjang=16.0, lebar=6.0, t=0.0, warna=AKSEN2, resolusi=(121, 61), pusat=(0.0, 0.0)):
    """Permukaan air pada saat `t`, berpusat di `pusat` (x, y). Untuk air bergerak pakai `air_hidup`.

    Posisi diberikan lewat `pusat`, BUKAN `.shift()` setelahnya: `always_redraw`
    membangun ulang permukaan tiap frame dan membuang pergeseran luar.
    """
    x0, y0 = pusat
    s = ParametricSurface(
        lambda u, v: np.array([x0 + u, y0 + v, tinggi_air(x0 + u, y0 + v, t)]),
        u_range=(-panjang / 2, panjang / 2), v_range=(-lebar / 2, lebar / 2),
        resolution=resolusi,
    )
    s.set_color(warna, opacity=0.95)
    s.set_shading(*BAYANG_AIR)
    return s


def air_hidup(scene, panjang=16.0, lebar=6.0, warna=AKSEN2, resolusi=(121, 61), pusat=(0.0, 0.0)):
    """Air yang digambar ulang tiap frame mengikuti waktu adegan (`scene.time`)."""
    return always_redraw(lambda: air(panjang, lebar, scene.time, warna, resolusi, pusat))


def tanah(panjang=16.0, lebar=2.4, y_tengah=0.0, z=0.12, warna=None, opacity=1.0):
    """Bidang pasir/tanah datar, sedikit di atas muka air.

    PEJAL, bukan 35 persen tembus pandang seperti versi pertama. Tanah yang
    tembus pandang memperlihatkan latar krem di baliknya, dan di video perahu
    itu terbaca sebagai CELAH PUTIH antara air dan tepian (temuan ARYA 5 Sep
    2026). Warna bawaannya REDUP dicampur LATAR: pasir hangat, bukan abu.
    """
    if warna is None:
        # 0,22, bukan 0,45: atap lempengan masih dicerahkan lagi oleh `balok`,
        # dan pada 0,45 tepiannya nyaris sewarna latar krem (render 5 Sep).
        warna = interpolate_color(Color(REDUP), Color(LATAR), 0.22)
    # LEMPENGAN bertebal, bukan lembaran melayang. Lembaran setinggi z di atas
    # air memperlihatkan latar krem di celah antara tepi air dan tepi lembaran
    # (garis putih di sepanjang tepian, render 5 Sep). Dinding sisi lempengan
    # menutup celah itu. Atapnya di z, alasnya di bawah muka air.
    tebal = z + 0.14
    b = balok(panjang, lebar, tebal, warna, tiga_terang=True)
    b.shift([0, y_tengah, z - tebal])
    b.set_opacity(opacity)
    return b


def lantai_kisi(ukuran=8.0, langkah=1.0, warna=REDUP, tinggi_z=3.0):
    """Bidang koordinat tipis plus sumbu 3D: memberi rasa ruang pada adegan 3D."""
    r = ukuran / 2
    kisi = NumberPlane(
        x_range=(-r, r, langkah), y_range=(-r, r, langkah),
        background_line_style=dict(stroke_color=warna, stroke_width=1, stroke_opacity=0.35),
        faded_line_style=dict(stroke_color=warna, stroke_width=0.5, stroke_opacity=0.12),
    )
    # `tinggi_z <= 0` = tanpa sumbu tegak. Dulu `ThreeDAxes(z_range=(0, 0, 1))`
    # membagi nol dan render MATI dengan kode keluar 0 (temuan Vektor dan
    # Statistika, 2 Sep 2026). Sekarang dipilih sumbu datar saja.
    if tinggi_z <= 0:
        sumbu = Axes(x_range=(-r, r, langkah), y_range=(-r, r, langkah))
    else:
        sumbu = ThreeDAxes(x_range=(-r, r, langkah), y_range=(-r, r, langkah), z_range=(0, tinggi_z, langkah))
    sumbu.set_stroke(warna, width=2)
    return VGroup(kisi, sumbu)


# ---------------------------------------------------------------------------
# Primitif padat berpalet, alas di z = 0
# ---------------------------------------------------------------------------

def bola(r=0.5, warna=AKSEN):
    b = Sphere(radius=r).set_color(warna)
    b.set_shading(*BAYANG)
    return b.shift(OUT * r)


def balok(p=1.0, l=1.0, t=1.0, warna=AKSEN2, tiga_terang=True):
    """Balok: p sepanjang x, l sepanjang y, t sepanjang z.

    `tiga_terang` menentukan terang tiap muka SENDIRI, tidak menyerahkannya ke
    pencahayaan ManimGL. Alasannya diukur, bukan dikira-kira (Ruang 3D, 4 Sep
    2026): `set_shading` lemah arah, jadi memindahkan sumber cahaya saja tidak
    cukup. Pada satu frame uji, dengan cahaya saja ketiganya nyaris sewarna
    (atap 200, muka -y 190, muka +x 124 pada skala terang 0 sampai 255) dan
    baloknya terbaca sebagai kotak gelap datar. Dengan tiga terang ini: 200,
    173, 122, tiga tingkat yang jelas berbeda.

    Kamera topik ruang selalu di theta sekitar -40, dan pada sudut itu muka +x
    jatuh di kiri layar, muka -y di kanan. Matikan dengan `tiga_terang=False`
    kalau baloknya dipakai sebagai pelat tipis yang memang harus rata.
    """
    b = Prism(width=p, height=l, depth=t).set_color(warna)
    b.set_shading(*BAYANG)
    if tiga_terang:
        pusat = b.get_center()
        for muka in b.submobjects:
            arah = muka.get_center() - pusat
            sumbu = int(np.argmax(np.abs(arah)))
            naik = arah[sumbu] > 0
            if sumbu == 2 and naik:            # atap: paling terang
                campur, kuat = LATAR, 0.42
            elif sumbu == 1 and not naik:      # muka -y, di kanan layar: sedang
                campur, kuat = TINTA, 0.15
            elif sumbu == 0 and naik:          # muka +x, di kiri layar: gelap
                campur, kuat = TINTA, 0.34
            else:                              # muka yang membelakangi kamera
                campur, kuat = TINTA, 0.20
            muka.set_color(interpolate_color(Color(warna), Color(campur), kuat))
    return b.shift(OUT * t / 2)


def _lambung_cembung(titik):
    """Lambung cembung sekumpulan titik di bidang datar (rantai monoton Andrew)."""
    q = sorted({(round(float(x), 6), round(float(y), 6)) for x, y in titik})
    if len(q) < 3:
        return q

    def putar(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    bawah = []
    for r in q:
        while len(bawah) >= 2 and putar(bawah[-2], bawah[-1], r) <= 0:
            bawah.pop()
        bawah.append(r)
    atas = []
    for r in reversed(q):
        while len(atas) >= 2 and putar(atas[-2], atas[-1], r) <= 0:
            atas.pop()
        atas.append(r)
    return bawah[:-1] + atas[:-1]


def bayangan_lantai(titik_sudut, cahaya=None, warna=TINTA, opacity=0.20, z=0.01):
    """Bayangan sebuah bangun di lantai z = 0, DIHITUNG dari titik cahaya.

    Tiap titik sudut diproyeksikan dari `cahaya` ke bidang z = 0, lalu diambil
    lambung cembungnya. Jadi kalau cahayanya digeser, bayangannya ikut bergeser,
    dan bangun apa pun boleh dipakai, bukan cuma kubus.

    Tanpa bayangan, benda 3D tampak melayang: mata memakai bayangan untuk
    memutuskan sebuah benda menyentuh lantai atau tidak. Pudarkan bayangannya
    begitu bendanya jadi tembus pandang; benda kaca tidak menjatuhkan bayangan
    pekat, dan bayangan yang tertinggal terbaca sebagai lembar kertas nyasar
    (cacat nyata di Ruang 3D materi 04, 4 Sep 2026).
    """
    L = np.array(CAHAYA_BAKU if cahaya is None else cahaya, dtype=float)
    datar = []
    for titik in titik_sudut:
        P = np.array(titik, dtype=float)
        if abs(L[2] - P[2]) < 1e-6:
            continue
        s = L + (L[2] / (L[2] - P[2])) * (P - L)
        datar.append((s[0], s[1]))
    tepi = _lambung_cembung(datar)
    if len(tepi) < 3:
        return VGroup()
    poli = Polygon(*[np.array([x, y, z]) for x, y in tepi])
    return poli.set_fill(warna, opacity).set_stroke(width=0)


def silinder(r=0.5, t=1.0, warna=SOROT, sumbu=OUT):
    s = Cylinder(height=t, radius=r, axis=sumbu).set_color(warna)
    s.set_shading(*BAYANG)
    if np.allclose(sumbu, OUT):
        s.shift(OUT * t / 2)
    return s


# ---------------------------------------------------------------------------
# Benda dunia nyata
# ---------------------------------------------------------------------------

def _lambung(L, W, D, F, u_range, v_range, warna, resolusi=(41, 13)):
    def uv(u, v):
        g = max(0.0, 1 - u * u) ** 0.6        # lebar mengecil ke ujung, ujungnya lancip
        h = 1 - u ** 4                        # kedalaman mengecil ke ujung
        return np.array([L * u, W * g * v, F - (D + F) * h * (1 - v * v)])
    m = ParametricSurface(uv, u_range=u_range, v_range=v_range, resolution=resolusi)
    m.set_color(warna, opacity=1.0)
    # Tanpa pencahayaan ManimGL: normal permukaan cekung ini menghadap
    # menjauhi cahaya dan seluruh lambung jadi hitam (render pertama). Terangnya
    # sudah ditentukan per belahan oleh pemanggil.
    m.set_shading(0.0, 0.0, 0.0)
    return m


def perahu(panjang=2.0, warna_kayu=REDUP):
    """Perahu dayung di titik asal: garis air di z = 0, haluan menghadap +x.

    VERSI 2 (5 Sep 2026). Versi pertama, cakram gelap bertiang dengan segitiga
    putih, ditolak ARYA: "gambar perahunya kurang bagus". Yang diubah:
    1. Lambung dibelah dua memanjang dan tiap belahan diberi terang sendiri
       (dekat kamera terang, jauh gelap). `set_shading` ManimGL lemah arah,
       jadi bentuk cembungnya baru terbaca kalau terangnya ditentukan sendiri,
       cara yang sama dengan `balok`.
    2. Bibir lambung (gunwale) berupa pita gelap tipis, dan lantai dalam yang
       lebih terang, jadi dari atas pun terlihat sebagai perahu berongga.
    3. Dua bangku melintang dan SEPASANG DAYUNG. Ceritanya perahu didayung,
       bukan berlayar; tiang dan layar dibuang.
    """
    L, W = panjang, 0.36 * panjang
    D, F = 0.20 * panjang, 0.16 * panjang            # kedalaman di bawah air, tinggi di atas air
    kayu = Color(warna_kayu)
    terang = interpolate_color(kayu, Color(LATAR), 0.32)
    gelap = interpolate_color(kayu, Color(TINTA), 0.38)
    lantai = interpolate_color(kayu, Color(LATAR), 0.55)
    tepi = interpolate_color(kayu, Color(TINTA), 0.6)

    # belahan -y menghadap kamera (theta negatif), jadi ia yang terang
    lambung = Group(
        _lambung(L, W, D, F, (-1, 1), (-1, 0), terang),
        _lambung(L, W, D, F, (-1, 1), (0, 1), gelap),
    )
    lantai_dalam = ParametricSurface(
        lambda u, v: np.array([L * u, 0.86 * W * max(0.0, 1 - u * u) ** 0.6 * v, F - 0.06 * L]),
        u_range=(-1, 1), v_range=(-1, 1), resolution=(41, 7),
    )
    lantai_dalam.set_color(lantai, opacity=1.0)
    lantai_dalam.set_shading(0.0, 0.0, 0.0)
    # Bibir = CINCIN tipis di sepanjang tepi (v dari 0,84 ke 1 di kedua sisi).
    # Render pertama memakai cakram penuh dan cakram gelap itu menutup seluruh
    # bagian dalam perahu: yang terlihat cuma elips gelap lagi.
    def bibir_uv(u, v):
        return np.array([L * u, W * max(0.0, 1 - u * u) ** 0.6 * v, F + 0.012 * L])
    bibir = Group(
        ParametricSurface(bibir_uv, u_range=(-1, 1), v_range=(0.84, 1.0), resolution=(41, 3)),
        ParametricSurface(bibir_uv, u_range=(-1, 1), v_range=(-1.0, -0.84), resolution=(41, 3)),
    )
    for m in bibir:
        m.set_color(tepi, opacity=1.0)
        m.set_shading(0.0, 0.0, 0.0)

    bangku = Group()
    for u in (-0.3, 0.3):
        lebar_b = 2 * 0.86 * W * (1 - u * u) ** 0.6
        b = balok(0.09 * L, lebar_b, 0.03 * L, tepi, tiga_terang=False)
        b.move_to([L * u, 0, F - 0.01 * L])
        bangku.add(b)

    dayung = Group()
    for sisi in (-1, 1):
        r = 0.014 * L
        gagang = Cylinder(height=0.95 * L, radius=r, axis=UP).set_color(tepi)
        gagang.set_shading(*BAYANG)
        bilah = balok(0.07 * L, 0.20 * L, 0.012 * L, tepi, tiga_terang=False)
        bilah.move_to([0, 0.47 * L, 0])
        satu = Group(gagang, bilah)
        # dari bibir lambung menjulur keluar dan turun ke air
        satu.rotate(-22 * DEGREES, axis=RIGHT, about_point=ORIGIN)
        satu.rotate(-28 * DEGREES, axis=OUT, about_point=ORIGIN)
        if sisi < 0:
            satu.stretch(-1, 1, about_point=ORIGIN)   # cerminkan ke sisi seberang
        satu.shift([0.02 * L, sisi * 0.55 * W, F + 0.02 * L])
        dayung.add(satu)

    return Group(lambung, lantai_dalam, bibir, bangku, dayung)


def perahu_atas(panjang=2.0, warna_kayu=REDUP):
    """Perahu yang sama dilihat TEPAT dari atas, sebagai gambar 2D (VGroup).

    Dipakai begitu kamera sudah tegak lurus: lambung 3D yang dilihat dari
    atas cuma jadi elips abu (temuan ARYA 5 Sep 2026), sedangkan ikon ini
    tetap terbaca sebagai perahu di peta bernomor. Haluan menghadap +y,
    searah seberang sungai, sebab di cerita perahunya didayung lurus.
    """
    L, W = panjang, 0.36 * panjang
    kayu = Color(warna_kayu)
    tepi = interpolate_color(kayu, Color(TINTA), 0.6)
    badan = interpolate_color(kayu, Color(LATAR), 0.30)
    lantai = interpolate_color(kayu, Color(LATAR), 0.58)

    def garis_luar(skala):
        titik = []
        for k in range(0, 41):
            t = -1 + 2 * k / 40
            titik.append([skala * W * max(0.0, 1 - t * t) ** 0.6, L * t, 0])
        for k in range(40, -1, -1):
            t = -1 + 2 * k / 40
            titik.append([-skala * W * max(0.0, 1 - t * t) ** 0.6, L * t, 0])
        return titik

    lambung = Polygon(*garis_luar(1.0)).set_fill(badan, 1.0).set_stroke(tepi, 2.4)
    dalam = Polygon(*garis_luar(0.8)).set_fill(lantai, 1.0).set_stroke(tepi, 0.8)
    bangku = VGroup(*[
        Line([-0.8 * W * (1 - t * t) ** 0.6, L * t, 0], [0.8 * W * (1 - t * t) ** 0.6, L * t, 0])
        .set_stroke(tepi, 2.2)
        for t in (-0.3, 0.3)
    ])
    dayung = VGroup()
    for sisi in (-1, 1):
        pangkal = np.array([sisi * 0.9 * W, 0.05 * L, 0])
        ujung = pangkal + np.array([sisi * 0.42 * L, -0.30 * L, 0])
        gagang = Line(pangkal, ujung).set_stroke(tepi, 2.6)
        arah = (ujung - pangkal) / np.linalg.norm(ujung - pangkal)
        tegak = np.array([-arah[1], arah[0], 0])
        bilah = Polygon(ujung - 0.035 * L * tegak, ujung + 0.035 * L * tegak,
                        ujung + 0.16 * L * arah + 0.03 * L * tegak,
                        ujung + 0.16 * L * arah - 0.03 * L * tegak)
        bilah.set_fill(tepi, 1.0).set_stroke(tepi, 1.0)
        dayung.add(gagang, bilah)
    return VGroup(dayung, lambung, dalam, bangku)


def ayunkan(asli, benda, x, y, t, tinggi=tinggi_air, eps=0.15):
    """Letakkan `benda` di (x, y) di atas air pada saat `t`, mengangguk mengikuti riak.

    `asli` = salinan benda di titik asal yang TIDAK pernah diubah. Tiap frame
    benda dibangun ulang darinya (`become`), jadi rotasi tidak menumpuk.
    Pakai: `perahu.add_updater(lambda m: ilustrasi.ayunkan(asli, m, X, Y, scene.time))`.
    """
    z = tinggi(x, y, t)
    angguk = -np.arctan((tinggi(x + eps, y, t) - tinggi(x - eps, y, t)) / (2 * eps))
    oleng = np.arctan((tinggi(x, y + eps, t) - tinggi(x, y - eps, t)) / (2 * eps))
    baru = asli.copy()
    baru.rotate(angguk, axis=UP, about_point=ORIGIN)
    baru.rotate(oleng, axis=RIGHT, about_point=ORIGIN)
    baru.shift([x, y, z])
    benda.become(baru)
    return benda


def mobil(panjang=2.0, warna=AKSEN, warna_roda=TINTA):
    """Mobil sederhana: badan, kabin, empat roda. Alas roda di z = 0, depan +x."""
    p = panjang
    r = 0.12 * p
    badan = balok(p, 0.45 * p, 0.26 * p, warna).shift(OUT * r)
    kabin = balok(0.46 * p, 0.40 * p, 0.20 * p, warna).shift(OUT * (r + 0.26 * p) + LEFT * 0.08 * p)
    roda = Group()
    for sx in (-0.32, 0.32):
        for sy in (-0.24, 0.24):
            w = Cylinder(height=0.08 * p, radius=r, axis=UP).set_color(warna_roda)
            w.set_shading(*BAYANG)
            w.move_to([sx * p, sy * p, r])
            roda.add(w)
    return Group(badan, kabin, roda)


def orang(tinggi=1.7, warna=TINTA):
    """Orang batang bervolume: kepala, badan, dua lengan, dua kaki. Alas di z = 0.

    KAKI DIPERBAIKI 3 Sep 2026 (sesi Statistika, bukti `qc/uji-kaki*.png`).
    Sebelumnya jari-jari kaki 0,045 x tinggi dan keduanya digeser ke arah
    KEDALAMAN. Dua akibatnya, keduanya terlihat di 480p:
      1. silinder setipis itu pecah jadi belasan helai di jala ManimGL, jadi
         kaki terbaca seperti rumbai pel, bukan kaki;
      2. digeser ke kedalaman berarti dari kamera depan kedua kaki bertumpuk,
         padahal kaki orang berjajar kiri kanan.
    Diuji tiga tebal kali dua arah: 0,060 berjajar KE SAMPING yang bersih dan
    masih terbaca dua kaki. Lebar benda praktis tidak berubah (lengan di
    +-0,185 t tetap yang terlebar), jadi qc adegan lama tidak terpengaruh.
    """
    t = tinggi
    kepala = Sphere(radius=0.11 * t).set_color(warna).move_to([0, 0, t - 0.11 * t])
    badan = Cylinder(height=0.40 * t, radius=0.09 * t).set_color(warna).move_to([0, 0, 0.65 * t])
    bagian = [kepala, badan]
    for sx in (-0.06, 0.06):
        kaki = Cylinder(height=0.45 * t, radius=0.060 * t).set_color(warna).move_to([sx * t, 0, 0.225 * t])
        bagian.append(kaki)
    for sy in (-1, 1):
        lengan = Cylinder(height=0.36 * t, radius=0.035 * t).set_color(warna)
        lengan.rotate(sy * 15 * DEGREES, axis=RIGHT)
        lengan.move_to([0, sy * 0.15 * t, 0.66 * t])
        bagian.append(lengan)
    g = Group(*bagian)
    g.set_shading(*BAYANG)
    return g


class BatasSumbuSalah(ValueError):
    """Batas bawah sumbu tidak jatuh di garis petak."""


def _periksa_batas(nama: str, rentang) -> None:
    """Batas BAWAH sumbu wajib kelipatan langkahnya.

    KENAPA GERBANG INI ADA
    `NumberPlane` menaruh angka mulai dari batas bawah lalu melangkah satu
    langkah setiap kali. Kalau batas bawahnya bukan kelipatan langkahnya,
    SELURUH angka sumbu meleset dari garis petaknya, lalu dibulatkan saat
    ditampilkan sehingga muncul angka kembar. Itu benar-benar terjadi 7 Sep 2026
    pada dua video Turunan: batas -1,5 dengan langkah 1 menaruh angka di
    -1,5 -0,5 0,5 1,5 2,5 3,5 dan menampilkannya sebagai -2 -0 0 2 2 4. Angka 2
    muncul dua kali dan angka 1 tidak ada sama sekali, di video yang seluruh
    isinya mengukur kemiringan di x = 1. Semua gerbang otomatis meloloskannya,
    dan lembar kontak pertama pun melewatkannya karena yang diperiksa tindihan,
    bukan kebenaran angkanya.

    Yang diperiksa KELIPATAN LANGKAH, bukan "bilangan bulat": langkah 0,5
    dengan batas -1,5 tetap sah, sebab angkanya jatuh di -1,5 -1,0 -0,5 dan
    seterusnya, semuanya tepat di garis petak.
    """
    bawah, _atas, langkah = (float(rentang[0]), float(rentang[1]), float(rentang[2]))
    if langkah <= 0:
        raise BatasSumbuSalah(
            f"{nama}: langkah sumbu harus positif, yang dipakai {langkah:g}.")
    rasio = bawah / langkah
    if abs(rasio - round(rasio)) > 1e-9:
        dekat = round(rasio) * langkah
        raise BatasSumbuSalah(
            f"{nama}: batas bawah {bawah:g} bukan kelipatan langkah {langkah:g}, "
            f"jadi SEMUA angka sumbu akan meleset dari garis petaknya dan "
            f"dibulatkan saat ditampilkan (mis. -1,5 -0,5 0,5 tampil sebagai "
            f"-2 -0 0). Kelipatan terdekat: {dekat:g}. Pakai itu, atau kelipatan "
            f"{langkah:g} yang lain. Sesi Transformasi memakai `bidang_untuk` "
            f"yang membulatkan sendiri; contoh yang bisa ditiru.")


def bidang_bernomor(x_range=(-6.0, 6.0, 1.0), y_range=(-4.0, 4.0, 1.0),
                    warna=REDUP, ukuran_angka=26, z=0.0):
    """Bidang koordinat BERANGKA dengan skala x dan y terkunci sama.

    KENAPA ADA
    Untuk pelajaran yang panjang dan sudutnya harus akurat (vektor, grafik
    fungsi), gambar wajib bisa diperiksa siswa: segitiga 3-4-5 harus benar-benar
    terlihat 3-4-5, dan tiap petak harus punya angkanya. Video vektor gelombang
    pertama gagal justru di dua hal itu, dan ARYA menolaknya (2 Sep 2026).

    KENAPA `unit_size=1.0`, BUKAN `width`/`height`
    Menyetel lebar dan tinggi terpisah membuat satu satuan mendatar tidak sama
    dengan satu satuan tegak, dan sejak itu semua panjang di layar berbohong.
    `unit_size` mengunci keduanya ke angka yang sama.

    CATATAN PEMAKAIAN: bidang ini hanya benar kalau kamera TEGAK LURUS dari atas
    (`kamera.dunia_ke_peta`). Kamera yang dimiringkan mengembalikan persoalan
    yang sama lewat perspektif, betapapun benar bidangnya.

    TEPI BAWAHNYA ADALAH ANGKA SUMBU, bukan garis petak terbawah: angka itu
    menjulur sekitar 0,30 satuan lagi ke bawah (dan ke kiri). Menghitung posisi
    kamera dari garis petak membuat qc menolak "bidang masuk jalur subtitle"
    (temuan Vektor 3 Sep). Pakai `kamera.muat_datar(bidang)` atau
    `kamera.dunia_ke_peta_muat(frame, bidang)`: keduanya membaca kotak batas
    yang sebenarnya dan memilih pusat serta tinggi kamera yang muat.
    """
    _periksa_batas("x_range", x_range)
    _periksa_batas("y_range", y_range)

    # Tanpa sub-petak (`faded_line_ratio=1`): pada uji pertama sub-petak halus
    # membuat bidangnya ramai dan angkanya makin sulit dibaca. Satu petak satu
    # satuan sudah cukup untuk membaca vektor.
    bidang = NumberPlane(
        x_range=x_range, y_range=y_range, unit_size=1.0, faded_line_ratio=1,
        background_line_style=dict(stroke_color=warna, stroke_width=1.2, stroke_opacity=0.45),
        faded_line_style=dict(stroke_color=warna, stroke_width=0.5, stroke_opacity=0.0),
        axis_config=dict(stroke_color=warna, stroke_width=2.4),
    )
    # Angkanya diwarnai TINTA, bukan warna petak. Pada uji pertama angka
    # sewarna petak praktis tidak terbaca, padahal justru angka itu yang
    # membuat gambarnya bisa diperiksa siswa.
    angka = bidang.add_coordinate_labels(font_size=ukuran_angka, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    # Disimpan supaya adegan bisa memunculkan angkanya BELAKANGAN, saat
    # narator berkata "lengkap dengan angka pada kedua sumbunya". Dipakai
    # sejak pembuka 3D dipotong (STANDAR butir 2, 4 Sep 2026).
    bidang.angka = angka
    # Tanda untuk `qc.periksa_adegan`: panel HUD beralas boleh berdiri di
    # atas bidang ini. Benda dunia TANPA tanda ini tetap dilarang tertutup
    # panel, sebab menyembunyikan panah atau angka jauh lebih merusak
    # daripada menutupi garis petak.
    bidang.latar = True

    # WAJIB: NumberPlane menempatkan dirinya di TENGAH layar, bukan pada titik
    # asal koordinatnya. Untuk jangkauan yang tidak simetris, misalnya x dari -5
    # sampai 8, petak berlabel 0 jadi TIDAK berada di titik (0, 0) layar, dan
    # semua panah yang digambar memakai koordinat layar akan meleset dari
    # petaknya. Digeser di sini supaya koordinat bidang SAMA DENGAN koordinat
    # layar, sehingga adegan boleh menulis np.array([4, 3, 0]) apa adanya.
    bidang.shift(-bidang.c2p(0, 0))
    bidang.set_z(z)
    return bidang

def lembah_fungsi(f, dari, sampai, lebar=3.0, warna=REDUP,
                  resolusi=(48, 10), jala=(15, 5)):
    """Lembah memanjang yang penampangnya mengikuti sebuah fungsi z = f(x).

    Dipakai topik Grafik Fungsi supaya kurvanya punya BENDA yang diwakilinya:
    bola yang menggelinding di dasar lembah berbentuk x kuadrat memperlihatkan
    parabola sebagai sesuatu yang nyata, bukan garis di layar kosong.

    Berguna juga untuk topik lain yang butuh penampang: talang air, punggung
    bukit, lintasan skateboard, potongan jembatan.

    `f` menerima satu angka dan mengembalikan satu angka. Lembahnya membentang
    dari -lebar/2 sampai +lebar/2 pada sumbu y, jadi dari pandangan samping ia
    terbaca sebagai grafik. Jala tipisnya yang memberi badan pada permukaan;
    tanpa itu ia terlihat seperti tempelan warna, bukan benda (prinsip 4
    ILMU-3B1B).

    Dikembalikan sebagai Group(permukaan, jala) supaya keduanya bisa
    di-`Transform` bersama saat bentuk fungsinya berganti.
    """
    s = ParametricSurface(
        lambda u, v: np.array([u, v, f(u)]),
        u_range=(dari, sampai), v_range=(-lebar / 2, lebar / 2),
        resolution=resolusi,
    )
    s.set_color(warna, opacity=0.72)
    s.set_shading(*BAYANG)
    m = SurfaceMesh(s, resolution=jala)
    m.set_stroke(TINTA, width=1, opacity=0.16)
    return Group(s, m)

def penopang(lebar=0.9, tinggi=0.55, tebal=1.2, warna=AKSEN):
    """Tumpuan jungkat-jungkit: prisma segitiga, alas di z = 0, puncak sepanjang y.

    Ditambahkan sesi MATRA-STATISTIKA (2 Sep 2026) untuk video Tahap 5. Balok
    biasa tidak terbaca sebagai tumpuan: papan yang bertumpu pada kotak terlihat
    seperti papan di atas meja, bukan jungkat-jungkit. Puncaknya sengaja sepanjang
    sumbu y supaya papan berputar rapi terhadap sumbu itu.
    """
    a, h, b = lebar / 2, tinggi, tebal / 2

    def sisi(tanda):
        """Bidang miring: dari kaki (tanda*a, y, 0) naik ke puncak (0, y, h)."""
        return ParametricSurface(
            lambda u, v: np.array([tanda * a * (1 - u), v, h * u]),
            u_range=(0.0, 1.0), v_range=(-b, b), resolution=(2, 2),
        )

    def tutup(y):
        """Segitiga penutup di ujung y: lebarnya menyusut ke nol di puncak."""
        return ParametricSurface(
            lambda u, v: np.array([(2 * v - 1) * a * (1 - u), y, h * u]),
            u_range=(0.0, 1.0), v_range=(0.0, 1.0), resolution=(2, 2),
        )

    alas = ParametricSurface(
        lambda u, v: np.array([(2 * u - 1) * a, v, 0.0]),
        u_range=(0.0, 1.0), v_range=(-b, b), resolution=(2, 2),
    )
    g = Group(sisi(1), sisi(-1), tutup(-b), tutup(b), alas)
    g.set_color(warna)
    g.set_shading(*BAYANG)
    return g


def tumbuh_batang(m, **kw):
    """Batang tumbuh dari ALASNYA, untuk histogram dan diagram batang.

    `GrowFromEdge` bawaan ManimGL butuh argumen tepi dan tepinya diberikan di
    bidang xy, sedangkan batang adegan MATRA berdiri di sumbu z. Dipakai lewat
    `LaggedStartMap(GrowFromEdge, batang)` ia gagal sebab argumen tepinya tidak
    terisi. Yang ini menghitung alasnya sendiri, jadi bisa dipakai langsung:

        b.main(LaggedStartMap(ilustrasi.tumbuh_batang, hist, lag_ratio=0.12),
               run_time=3.0)

    Ditemukan sesi Statistika 3 Sep 2026, dinaikkan ke berkas bersama 4 Sep.
    """
    dasar = m.get_center() + np.array([0.0, 0.0, -m.get_depth() / 2])
    return GrowFromPoint(m, dasar, **kw)
