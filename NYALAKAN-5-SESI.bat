@echo off
REM Nyalakan lima sesi paralel MATRA (vektor, grafik fungsi, statistika,
REM ruang 3D, desain UI/UX). Sesi yang sudah hidup dilewati, sesi lama
REM dilanjutkan bukan diulang dari nol. Perlu sekitar 40 detik.
title Nyalakan 5 sesi MATRA
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0alat\nyalakan-sesi.ps1" -Mode sesi
