'use client'

import GaleriNyata, { type KartuNyata } from '@/components/widget/GaleriNyata'

/**
 * Galeri Materi 13: tiga tempat transformasi geometri benar-benar dipakai.
 *
 * Sejak 18 Sep 2026 berfoto asli (Wikimedia Commons, lisensi bebas, catatan
 * di public/gambar/sumber.json), atas permintaan ARYA ("namanya juga
 * penerapan di dunia nyata, ya pakai foto yang nyata"), menggantikan
 * ilustrasi yang dihitung dari rumus transformasi. Pilihan ARYA: bab ini
 * foto saja. Mekanismenya (bentuk yang sama digeser, dicerminkan, diputar)
 * sudah dilatih siswa di kedua belas widget sebelumnya; di sini tugasnya
 * menunjukkan DI MANA hal itu terjadi.
 */
export const KARTU: KartuNyata[] = [
  {
    id: 'kain', gambar: 'transformasi/motif-kain.jpg', nomor: '01',
    judul: 'Motif berulang pada kain dan ubin',
    inti: 'Perajin tidak menggambar tiap motif satu per satu. Ia menggambar SATU, lalu mengulanginya dengan geseran tetap, dan mencerminkan baris yang berselang supaya polanya tidak terasa monoton. Motif batik parang memakai translasi miring, dan motif kawung memakai pencerminan pada dua garis sekaligus.',
    rumus: 'yang dipakai: translasi dan pencerminan',
  },
  {
    id: 'putar', gambar: 'transformasi/benda-berputar.jpg', nomor: '02',
    judul: 'Benda berputar di wahana, animasi, dan permainan',
    inti: 'Tiap gondola bianglala adalah bentuk yang SAMA, diputar terhadap satu pusat dengan sudut yang bertambah tetap. Program animasi dan permainan bekerja begitu: bentuk aslinya disimpan sekali, dan yang dihitung ulang enam puluh kali per detik hanya transformasinya.',
    rumus: 'yang dipakai: translasi lalu rotasi',
  },
  {
    id: 'robot', gambar: 'transformasi/lengan-robot.jpg', nomor: '03',
    judul: 'Lengan robot dan mesin bersendi',
    inti: 'Sendi pertama memutar seluruh lengan terhadap pangkalnya. Sendi kedua memutar ruas ujungnya terhadap sendi pertama, yang letaknya sudah ikut berpindah. Inilah komposisi transformasi berpusat berbeda dari Materi 11, dan urutannya tidak boleh dibalik: memutar sendi kedua dulu memberi posisi ujung yang berbeda.',
    rumus: 'yang dipakai: komposisi dua rotasi berbeda pusat',
  },
]

export default function DuniaNyataTransformasi() {
  return <GaleriNyata kartu={KARTU} />
}
