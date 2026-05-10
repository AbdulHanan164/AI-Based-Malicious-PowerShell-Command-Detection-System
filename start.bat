@echo off
title ThreatScanAI - Startup

echo.
echo  ===================================================
echo   ThreatScanAI - AI PowerShell Threat Detection
echo  ===================================================
echo.

REM ── Backend ──────────────────────────────────────────
echo [1/2] Starting FastAPI backend on http://localhost:8000 ...
start "ThreatScanAI Backend" cmd /k "cd /d "%~dp0backend" && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

REM Give the backend a moment to bind its port
timeout /t 2 /nobreak >nul

REM ── Frontend ─────────────────────────────────────────
echo [2/2] Starting React frontend on http://localhost:5173 ...
start "ThreatScanAI Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo  Both servers are starting in separate windows.
echo  Open http://localhost:5173 in your browser.
echo.
pause
