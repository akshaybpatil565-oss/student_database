@echo off
setlocal enabledelayedexpansion

set "ROOT=%~dp0"
set "ISS=%ROOT%installer.iss"
set "OUTPUT=%ROOT%StudentDatabaseInstaller.exe"

if exist "%OUTPUT%" del /f /q "%OUTPUT%"

where iscc >nul 2>&1
if %ERRORLEVEL%==0 (
  echo Found Inno Setup compiler. Building installer...
  iscc "%ISS%"
  if %ERRORLEVEL%==0 (
    echo Installer built successfully: %OUTPUT%
    pause
    exit /b 0
  ) else (
    echo Error: Inno Setup failed to build the installer.
    pause
    exit /b 1
  )
)

echo Inno Setup compiler not found.
echo Please install Inno Setup from https://jrsoftware.org/isinfo.php and rerun this batch file.
pause
exit /b 1
