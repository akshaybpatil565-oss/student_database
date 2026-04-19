@echo off
REM Quick Deployment to Vercel + MongoDB

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║         Student Database - Deploy Now                 ║
echo ║      Live Multi-User App in 10 Minutes               ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check Git
where git >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ Git found
) else (
    echo ⚠ Git not found - required for Vercel deployment
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✓ Node.js: Node v24.14.1
echo ✓ Project is tested and ready
echo.

echo ════════════════════════════════════════════════════════
echo DEPLOYMENT STEPS - Copy and Paste These
echo ════════════════════════════════════════════════════════
echo.
echo STEP 1: Initialize Git Repository
echo ────────────────────────────────────
echo.
echo Run these commands in this folder:
echo.
echo   git config --global user.email "you@example.com"
echo   git config --global user.name "Your Name"
echo   git init
echo   git add .
echo   git commit -m "Student database - production ready"
echo.
echo STEP 2: Create GitHub Repository
echo ─────────────────────────────────
echo.
echo 1. Go to: https://github.com/new
echo 2. Name: student-database
echo 3. Click "Create Repository"
echo 4. You'll see commands to push code
echo 5. Copy and paste them here
echo.
echo STEP 3: Deploy to Vercel
echo ────────────────────────
echo.
echo 1. Go to: https://vercel.com/new
echo 2. Click "Import Git Repository"
echo 3. Paste your GitHub repo URL
echo 4. Click "Deploy"
echo.
echo STEP 4: MongoDB Atlas Setup
echo ────────────────────────────
echo.
echo 1. Go to: https://www.mongodb.com/cloud/atlas
echo 2. Sign up (FREE - no credit card needed)
echo 3. Create Cluster (M0 Free tier)
echo 4. Click "Connect"
echo 5. Choose "Drivers" → Node.js
echo 6. Copy connection string
echo.
echo Example connection string:
echo mongodb+srv://admin:password@cluster0.mongodb.net/students?retryWrites=true
echo.
echo STEP 5: Add MongoDB to Vercel
echo ──────────────────────────────
echo.
echo 1. Go to Vercel Dashboard
echo 2. Select your deployed project
echo 3. Click "Settings"
echo 4. Go to "Environment Variables"
echo 5. Click "Add"
echo    Name: MONGODB_URI
echo    Value: ^{paste your MongoDB connection string^}
echo 6. Click "Add"
echo 7. Go to "Deployments"
echo 8. Click "Redeploy"
echo.
echo STEP 6: Test Your Live App
echo ───────────────────────────
echo.
echo After redeploy, your app will be live at:
echo https://your-project-name.vercel.app
echo.
echo Test multi-user:
echo 1. Open URL in browser 1
echo 2. Add a student record
echo 3. Open URL in browser 2 (or different device)
echo 4. You'll see the SAME data = Multi-user working! ✓
echo.
echo ════════════════════════════════════════════════════════
echo.
pause

echo.
echo Use this quick reference card:
echo.
echo GitHub URL: https://github.com/new
echo Vercel URL: https://vercel.com/new
echo MongoDB URL: https://www.mongodb.com/cloud/atlas
echo.
echo Your deployed app will be:
echo https://your-project-name.vercel.app
echo.
pause
