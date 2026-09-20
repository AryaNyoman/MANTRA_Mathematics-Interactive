'use client'
import { createContext, useContext } from 'react'

/** Yang dibagikan AsistenTanya ke tombol Jelaskan dan Tanya di dalam bacaan. */
export type NilaiKonteks = { bukaPanel: (kutipan: string) => void; aktif: boolean }

export const KonteksTanya = createContext<NilaiKonteks>({ bukaPanel: () => {}, aktif: false })
export const useTanya = () => useContext(KonteksTanya)
