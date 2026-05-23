# 🔍 AlgoLens — AI-Powered Algorithm Explainer

> Paste any algorithm. Watch it think.

AlgoLens is a full-stack web app that uses Claude AI to instantly explain competitive programming algorithms with step-by-step breakdowns, live visualizations, complexity analysis, and auto-generated quizzes.

---

## ✨ Features

- **AI Analysis** — Paste any algorithm in Python, JS, Java, or C++ and get instant explanations
- **Step-by-step Breakdown** — Collapsible cards explaining each phase of the algorithm
- **Live Visualization** — Animated array bars with play/pause/step for sorting algorithms
- **Complexity Analysis** — Time & Space complexity with context notes
- **Quiz Mode** — Auto-generated MCQs to test your understanding
- **Algorithm Comparison** — Side-by-side comparison of two algorithms with winner scoring
- **History** — Session history of all analyzed algorithms
- **8 Preloaded Examples** — Bubble Sort, Dijkstra, BFS, Merge Sort, DP, and more

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite |
| Backend | FastAPI, Python 3.11+ |
| AI | Anthropic Claude (claude-sonnet-4) |
| Styling | Pure CSS with CSS Variables |
| Icons | Tabler Icons |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Anthropic API key (get one free at [console.anthropic.com](https://console.anthropic.com))

---

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd algolens
```

---

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Set your API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Run the backend
uvicorn main:app --reload --port 8000
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 📁 Project Structure

```
algolens/
├── backend/
│   ├── main.py              # FastAPI app, all routes
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Top nav with tab switching
│   │   │   ├── CodeEditor.jsx    # Code input + language selector + examples
│   │   │   ├── ResultPanel.jsx   # Analysis output panel
│   │   │   ├── Visualization.jsx # Array/search animated visualizer
│   │   │   ├── QuizPanel.jsx     # AI-generated MCQ quiz
│   │   │   ├── CompareView.jsx   # Side-by-side algorithm comparison
│   │   │   ├── HistoryView.jsx   # Session history browser
│   │   │   └── EmptyState.jsx    # Placeholder when no result
│   │   ├── utils/
│   │   │   ├── api.js            # Axios API calls
│   │   │   ├── examples.js       # Preloaded algorithm examples
│   │   │   └── vizUtils.js       # Visualization state generators
│   │   ├── App.jsx               # Root component, state management
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global CSS variables + animations
│   ├── index.html
│   ├── package.json
│   └── vite.config.js            # Vite + API proxy config
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/analyze` | Analyze an algorithm |
| POST | `/quiz` | Generate quiz questions |
| POST | `/compare` | Compare two algorithms |

---

## 🚢 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub and connect to vercel.com (free)
```

### Backend → Render
1. Push backend/ to GitHub
2. Create a new Web Service on render.com
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `ANTHROPIC_API_KEY=your_key`

Update `frontend/vite.config.js` proxy target to your Render URL for production.

---

## 💡 Resume Talking Points

- **"I built an LLM that writes step-by-step algorithm explanations with custom visualizations"**
- Implemented server-side AI prompt engineering with structured JSON output validation
- Built animated algorithm visualization engine from scratch (no libraries)
- Designed REST API with FastAPI, CORS, error handling, and input validation
- Used React component architecture with custom hooks for state management

---

## 🔮 Possible Extensions

- [ ] GitHub integration — analyze algorithms from any repo URL
- [ ] WebSocket streaming for real-time token-by-token output
- [ ] Graph/tree visualizations (BFS/DFS node traversal)
- [ ] User accounts + persistent history (Supabase)
- [ ] Shareable analysis URLs
- [ ] VS Code extension

---

Built with ❤️ using Claude AI
