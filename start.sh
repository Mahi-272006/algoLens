#!/bin/bash
# AlgoLens - Quick start script

echo "🔍 Starting AlgoLens..."

# Start backend
cd backend
if [ ! -d "venv" ]; then
  echo "📦 Creating Python virtual environment..."
  python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
  echo "⚠️  No .env file found. Copy .env.example and add your API key:"
  echo "    cp backend/.env.example backend/.env"
  exit 1
fi

export $(cat .env | xargs)
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
echo "✅ Backend running at http://localhost:8000"

# Start frontend
cd ../frontend
if [ ! -d "node_modules" ]; then
  echo "📦 Installing npm packages..."
  npm install -q
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running at http://localhost:5173"
echo ""
echo "🚀 AlgoLens is ready! Open http://localhost:5173"
echo "   Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
