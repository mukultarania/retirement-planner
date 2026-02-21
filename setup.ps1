# Retirement Planner - Initial setup (PowerShell)
# Run: .\setup.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "Retirement Planner - Initial setup" -ForegroundColor Cyan
Write-Host ""

# Backend
Write-Host "[1/4] Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "$root\backend"
npm install
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "      Created backend/.env from .env.example" -ForegroundColor Green
} else {
    Write-Host "      backend/.env already exists, skipping" -ForegroundColor Gray
}
Set-Location $root

# Frontend
Write-Host "[2/4] Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "$root\frontend"
npm install
if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "      Created frontend/.env.local from .env.example" -ForegroundColor Green
} else {
    Write-Host "      frontend/.env.local already exists, skipping" -ForegroundColor Gray
}
Set-Location $root

Write-Host ""
Write-Host "[3/4] Setup complete." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Edit backend/.env and frontend/.env.local if needed (e.g. PORT, API URL, Groq keys)"
Write-Host "  2. Start backend:  cd backend && npm run dev"
Write-Host "  3. Start frontend: cd frontend && npm run dev"
Write-Host ""
