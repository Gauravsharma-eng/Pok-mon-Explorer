@echo off
REM Quick Start Script for Pokémon Explorer (Windows)

echo 🚀 Setting up Pokémon Explorer...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo ✅ Node.js found: %NODE_VER%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VER=%%i
echo ✅ npm found: %NPM_VER%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

echo.
echo ✨ Setup complete!
echo.
echo To start the server, run:
echo   npm start
echo.
echo For development with auto-reload:
echo   npm install -g nodemon
echo   npm run dev
echo.
echo Then open: http://localhost:5000
echo.
pause
