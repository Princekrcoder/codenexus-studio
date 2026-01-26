@echo off
cd /d E:\codenexus-studio

:: Git identity (commit ke liye)
git config --global user.name "Prince Kumar"
git config --global user.email "princekrcoder@gmail.com"

:: Git process
git init
git add .
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/Princekrcoder/codenexus_studio.git
git push -u origin main

pause
