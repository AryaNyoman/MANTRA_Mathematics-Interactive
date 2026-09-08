"""Suara Turunan 3; mesin WordBoundary bersama, keluaran khusus topik 3."""
import asyncio
import buat_suara_turunan2 as mesin

mesin.TOPIK = 'turunan3-fungsi-turunan'
mesin.SUARA = mesin.AKAR / 'audio' / mesin.TOPIK

if __name__ == '__main__':
    asyncio.run(mesin.main())
