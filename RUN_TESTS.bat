@echo off
REM Run Tests

echo.
echo ==========================================
echo Running Test Suite
echo ==========================================
echo.
echo Make sure test-server.js is running in another terminal!
echo.
echo Tests will validate:
echo - Student CRUD operations
echo - Search and lookup
echo - Multi-user support
echo - Data persistence
echo.

cd /d "%~dp0"
node test.js
pause
