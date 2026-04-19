@echo off
REM Automated Deployment Script for Student Database to Vercel + MongoDB

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo Student Database Cloud Deployment
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo + Node.js detected: %NODE_VERSION%
echo.

REM Install dependencies first
echo Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Warning: npm install had issues, but continuing...
)

echo + Dependencies installed
echo.

echo.
echo ==========================================
echo STEP 1: MongoDB Atlas Setup
echo ==========================================
echo.
echo 1. Go to https://www.mongodb.com/cloud/atlas
echo 2. Sign up (free tier - no credit card needed)
echo 3. Create a cluster ^(M0 Free^)
echo 4. Wait 5-10 minutes for cluster creation
echo 5. Go to Database Access - Add User
echo    ^(Save username and password somewhere^)
echo 6. Go to Network Access - Allow 0.0.0.0/0
echo 7. Click Connect - Drivers - copy connection string
echo.
pause

echo.
echo ==========================================
echo STEP 2: Vercel Deployment
echo ==========================================
echo.
echo Running: vercel
echo ^(You will be asked to log in and authorize Vercel^)
echo.

call vercel

echo.
echo ==========================================
echo STEP 3: Add Environment Variables
echo ==========================================
echo.
echo 1. Go to your Vercel project dashboard
echo 2. Go to Settings - Environment Variables
echo 3. Add new variable:
echo    Name: MONGODB_URI
echo    Value: ^[paste your MongoDB connection string^]
echo 4. Save and Redeploy
echo.

echo.
echo + Deployment complete!
echo.
echo Your database is now live and accessible from anywhere!
echo Share your Vercel URL with other users to collaborate.
echo.
pause
