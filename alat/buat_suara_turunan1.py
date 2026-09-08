"""Bangun narasi Turunan 1 dengan mesin WordBoundary yang dipakai Turunan 2.

Hanya TOPIK dan tujuan keluaran diganti; aset maupun pembuat Turunan 2 tetap.
"""
import asyncio
import buat_suara_turunan2 as mesin

mesin.TOPIK = 'turunan1-laju-rata-rata'
mesin.SUARA = mesin.AKAR / 'audio' / mesin.TOPIK

if __name__ == '__main__':
    asyncio.run(mesin.main())
