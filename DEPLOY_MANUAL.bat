@echo off
REM Manual Vercel Deployment - No CLI Required

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Student Database - Manual Cloud Deploy
echo ==========================================
echo.
echo This guide will walk you through deploying without CLI.
echo.

echo.
echo STEP 1: Prepare Project Folder
echo ==========================================
echo This folder is ready for deployment. It contains:
echo - index.html (frontend)
echo - styles.css (styling)
echo - script.js (app logic)
echo - api/ folder (backend)
echo - package.json (dependencies)
echo.
echo All files are set up correctly!
echo.

echo STEP 2: Push to GitHub (Optional but Recommended)
echo ==========================================
echo.
echo Option A: Using GitHub Desktop
echo   1. Go to https://github.com/new
echo   2. Create new repository "student-database"
echo   3. Download GitHub Desktop: https://desktop.github.com
echo   4. Click [Add] in GitHub Desktop - Add Existing Repository
echo   5. Select this folder
echo   6. Click [Publish Repository]
echo.
echo Option B: Using Git Command Line
echo   cd /d "%~dp0"
echo   git init
echo   git add .
echo   git commit -m "Initial commit"
echo   git remote add origin https://github.com/YOUR-USERNAME/student-database.git
echo   git branch -M main
echo   git push -u origin main
echo.
echo.

echo STEP 3: Deploy to Vercel via Web Interface
echo ==========================================
echo.
echo 1. Go to https://vercel.com/new
echo 2. Click [Import Git Repository]
echo 3. Paste your GitHub repo URL
echo 4. Click [Import]
echo 5. Vercel auto-detects package.json
echo 6. Click [Deploy]
echo.
echo.

echo STEP 4: Connect MongoDB Database
echo ==========================================
echo.
echo 1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
echo 2. Sign up / Log in
echo 3. Create Cluster ^(M0 Free^)
echo 4. Create Database User ^(save credentials^)
echo 5. Allow Network Access: 0.0.0.0/0
echo 6. Click Connect - Drivers - Copy connection string
echo.
echo Connection string looks like:
echo    mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true
echo.
echo.

echo STEP 5: Add Environment Variable to Vercel
echo ==========================================
echo.
echo 1. Go to Vercel Dashboard: https://vercel.com/dashboard
echo 2. Click your deployed project
echo 3. Go to [Settings] - [Environment Variables]
echo 4. Click [Add]
echo    Name: MONGODB_URI
echo    Value: ^[Your MongoDB connection string from Step 4^]
echo 5. Click [Add]
echo 6. Go to [Deployments] and click [Redeploy]
echo.
echo.

echo STEP 6: Test Your Live App!
echo ==========================================
echo.
echo 1. Go to your Vercel project URL: https://your-app.vercel.app
echo 2. Fill out Add Student form
echo 3. Click "Add Student"
echo 4. Data saved to MongoDB!
echo.
echo Open URL in ANOTHER BROWSER/DEVICE:
echo   - You'll see the SAME data
echo   - Multi-user sync working!
echo.

pause
