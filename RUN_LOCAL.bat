@echo off
REM Run Student Database Locally

echo.
echo ==========================================
echo Student Database - Local Development
echo ==========================================
echo.
echo Starting local server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
node test-server.js
