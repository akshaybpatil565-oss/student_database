@echo off
REM Quick Push to GitHub with Token

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════
echo Push Code to GitHub and Deploy
echo ════════════════════════════════════════════════════════
echo.

set /p USERNAME="Enter your GitHub username: "

if "!USERNAME!"=="" (
    echo No username entered
    pause
    exit /b 1
)

set REPO=student-database
set /p TOKEN="Enter your GitHub Personal Access Token: "

cd /d "%~dp0"

echo.
echo Pushing to GitHub...
echo.

git remote add origin https://!USERNAME!:!TOKEN!@github.com/!USERNAME!/!REPO!.git 2>nul

git branch -M main >nul 2>&1

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ════════════════════════════════════════════════════════
    echo ✓ SUCCESS! Code pushed to GitHub
    echo ════════════════════════════════════════════════════════
    echo.
    echo Your repository:
    echo   https://github.com/!USERNAME!/!REPO!
    echo.
    echo Next: Wait 2-3 minutes for Vercel to auto-deploy
    echo.
    echo Check status at:
    echo   https://vercel.com/dashboard
    echo.
    echo When status = "Ready", your app will be live at:
    echo   https://student-database-XXXXX.vercel.app
    echo.
) else (
    echo.
    echo ════════════════════════════════════════════════════════
    echo ✗ PUSH FAILED
    echo ════════════════════════════════════════════════════════
    echo.
    echo Check:
    echo   1. GitHub username is correct
    echo   2. Token is valid
    echo   3. Token has 'repo' scope
    echo.
)

pause
