@echo off
title Deploy FleetTrack Pro to GitHub Pages
cls
echo ========================================================
echo   FleetTrack Pro - 1-Click GitHub Pages Deployer
echo ========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-github-api.ps1"
echo.
pause
