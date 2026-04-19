@echo off
REM Push to GitHub quickly

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════
echo Push Code to GitHub + Redeploy on Vercel
echo ════════════════════════════════════════════════════════
echo.

REM Check git
git status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Git not initialized
    pause
    exit /b 1
)

echo Your code is committed and ready to push!
echo.
echo You need:
echo  1. GitHub username  (from https://github.com/settings/profile)
echo  2. GitHub token     (from https://github.com/settings/tokens)
echo  3. Repository name  (student-database)
echo.
set /p USERNAME="Enter GitHub username: "
set /p TOKEN="Enter GitHub token (from https://github.com/settings/tokens): "
set /p REPO="Enter repository name (default: student-database): "

if "!REPO!"=="" set REPO=student-database

echo.
echo Repository URL: https://github.com/!USERNAME!/!REPO!
echo.
echo Step 1: Create repository at https://github.com/new if not done
pause

echo.
echo Step 2: Pushing code to GitHub...
git remote add origin https://!USERNAME!:!TOKEN!@github.com/!USERNAME!/!REPO!.git 2>nul
git branch -M main >nul 2>&1
git push -u origin main 2>&1

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Code pushed successfully!
    echo.
    echo Step 3: Vercel will auto-deploy
    echo.
    echo Check here in 60 seconds:
    echo   https://vercel.com/dashboard
    echo.
    echo Your app will be ready at:
    echo   https://student-database...vercel.app
    echo.
) else (
    echo.
    echo ✗ Push failed. Check:
    echo   - Username is correct
    echo   - Token is correct (and has 'repo' scope)
    echo   - Repository name matches GitHub repo
    echo.
)

pause
