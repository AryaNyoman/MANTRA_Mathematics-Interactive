@echo off
REM Nyalakan MATRA-MASTER saja, di folder proyek utama.
REM SENGAJA dipisah dari lima sesi lain: kalau MASTER sudah terbuka di
REM jendela lain, dua sesi di folder yang sama akan saling menimpa berkas.
REM Pakai berkas ini hanya kalau tidak ada jendela MASTER yang hidup.
title Nyalakan MATRA-MASTER
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0alat\nyalakan-sesi.ps1" -Mode master
