@echo off
setlocal

set "ROOT=%~dp0"
set "SED=%ROOT%studentdb_installer.sed"
set "OUTPUT=%ROOT%StudentDatabaseInstaller.exe"

if exist "%OUTPUT%" del /f /q "%OUTPUT%"

if not exist "%windir%\System32\iexpress.exe" (
  echo IExpress not found in %windir%\System32.
  echo Please run this script on a Windows machine with IExpress installed.
  pause
  exit /b 1
)

echo Building installer using IExpress...
iexpress.exe /N /Q /M "%SED%"

if exist "%OUTPUT%" (
  echo Installer built successfully: %OUTPUT%
  pause
  exit /b 0
)

echo Installer creation failed.
pause
exit /b 1
