@echo off
echo ==============================
echo   Git Auto Pull Script
echo ==============================

REM Repo folder check
if not exist .git (
  echo Error: Ye folder git repo nahi hai!
  pause
  exit /b
)

echo Pulling latest code from GitHub...
git pull origin main

echo ==============================
echo   Pull Complete!
echo ==============================
pause
