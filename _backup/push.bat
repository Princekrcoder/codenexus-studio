@echo off
echo ==============================
echo   Git Auto Push Script
echo ==============================

REM Git user config (ek baar set ho gaya to repeat nahi karega)
git config --global user.email "princekrcoder@gmail.com"
git config --global user.name "Princekrcoder"

REM Repo folder me ho ya nahi check
if not exist .git (
  echo Error: Ye folder git repo nahi hai!
  pause
  exit /b
)

REM Date Time for commit message
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set mydate=%%a-%%b-%%c-%%d
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set mytime=%%a-%%b

set msg=Auto push %mydate%_%mytime%

echo Adding files...
git add .

echo Committing...
git commit -m "%msg%"

echo Pushing to GitHub...
git push origin main

echo ==============================
echo   Push Complete!
echo ==============================
pause
