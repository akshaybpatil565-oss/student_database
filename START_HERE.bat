@echo off
REM Start Deployment Process
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Student Database - Cloud Deployment                 ║
echo ║   Multi-User Enabled via Vercel + MongoDB             ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Choose your deployment method:
echo.
echo   1. AUTOMATED DEPLOYMENT (Recommended if npm works)
echo      Run: deploy.bat
echo      - Automates everything
echo      - Needs Vercel CLI
echo.
echo   2. MANUAL DEPLOYMENT (If auto deployment has issues)
echo      Run: DEPLOY_MANUAL.bat
echo      - Step-by-step guide
echo      - Uses Vercel web interface
echo      - Works with any system
echo.
echo   3. READ GUIDES
echo      - DEPLOY_NOW.md (Quick 5-minute guide)
echo      - README.md (Full documentation)
echo.
echo.
pause
