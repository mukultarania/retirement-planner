#!/usr/bin/env bash
# Retirement Planner - Initial setup (Bash)
# Run: ./setup.sh  or  bash setup.sh

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Retirement Planner - Initial setup"
echo ""

# Backend
echo "[1/4] Installing backend dependencies..."
cd "$ROOT/backend"
npm install
if [ ! -f .env ]; then
  cp .env.example .env
  echo "      Created backend/.env from .env.example"
else
  echo "      backend/.env already exists, skipping"
fi
cd "$ROOT"

# Frontend
echo "[2/4] Installing frontend dependencies..."
cd "$ROOT/frontend"
npm install
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "      Created frontend/.env.local from .env.example"
else
  echo "      frontend/.env.local already exists, skipping"
fi
cd "$ROOT"

echo ""
echo "[3/4] Setup complete."
echo ""
echo "Next steps:"
echo "  1. Edit backend/.env and frontend/.env.local if needed (e.g. PORT, API URL, Groq keys)"
echo "  2. Start backend:  cd backend && npm run dev"
echo "  3. Start frontend: cd frontend && npm run dev"
echo ""
