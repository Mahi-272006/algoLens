
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import json
import os
from dotenv import load_dotenv
 
load_dotenv()
 
app = FastAPI(title="AlgoLens API", version="1.0.0")
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"
 
 
def call_groq(prompt: str, max_tokens: int = 2000) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content
 
 
def parse_json(text: str) -> dict:
    clean = text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)
 
 
ANALYSIS_PROMPT = """You are an expert algorithm explainer for competitive programmers. Analyze this {lang} code and respond with ONLY a valid JSON object (no markdown, no backticks, no explanation outside JSON).
 
Code:
```{lang}
{code}
```
 
Return this exact JSON structure:
{{
  "algorithm_name": "string",
  "category": "string (Sorting|Searching|Graph|Tree|Dynamic Programming|Recursion|Other)",
  "one_liner": "string (one crisp sentence)",
  "explanation": "string (2-3 sentences explaining core logic)",
  "time_complexity": "string (e.g. O(n²))",
  "space_complexity": "string (e.g. O(1))",
  "time_note": "string",
  "space_note": "string",
  "steps": [
    {{
      "title": "string",
      "description": "string (1-2 sentences)",
      "key_line": "string (key code line)",
      "complexity_note": "string"
    }}
  ],
  "key_insight": "string",
  "common_mistakes": "string",
  "use_cases": "string (2-3 real-world uses)",
  "related_algorithms": ["string"],
  "viz_type": "string (array_sort|binary_search|tree|graph|dp_table|none)",
  "viz_data": "string (for array_sort: comma-separated nums e.g. 64,34,25,12,22,11,90. For binary_search: sorted:1,3,5,7,9 target:5)"
}}
 
Make steps 4-7 items. Be precise and educational. Return ONLY the JSON, nothing else."""
 
QUIZ_PROMPT = """You are a competitive programming instructor. Generate exactly 4 multiple-choice questions that test deep understanding.
 
Algorithm: {algorithm_name}
Category: {category}
Key insight: {key_insight}
 
Respond with ONLY valid JSON, nothing else:
{{
  "questions": [
    {{
      "question": "string",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 0,
      "explanation": "string"
    }}
  ]
}}"""
 
COMPARE_PROMPT = """Compare these two algorithms. Respond with ONLY valid JSON, nothing else:
 
Algorithm 1 ({lang1}):
{code1}
 
Algorithm 2 ({lang2}):
{code2}
 
{{
  "algo1_name": "string",
  "algo2_name": "string",
  "winner_time": "string (algo1|algo2|tie)",
  "winner_space": "string (algo1|algo2|tie)",
  "winner_overall": "string (algo1|algo2|tie)",
  "comparison_points": [
    {{
      "aspect": "string",
      "algo1": "string",
      "algo2": "string",
      "winner": "string (algo1|algo2|tie)"
    }}
  ],
  "when_to_use_algo1": "string",
  "when_to_use_algo2": "string",
  "summary": "string (2-3 sentences)"
}}"""
 
 
class AnalyzeRequest(BaseModel):
    code: str
    language: str = "python"
 
class QuizRequest(BaseModel):
    algorithm_name: str
    category: str
    key_insight: str
 
class CompareRequest(BaseModel):
    code1: str
    lang1: str = "python"
    code2: str
    lang2: str = "python"
 
 
@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL}
 
 
@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    if not req.code.strip():
        raise HTTPException(400, "Code cannot be empty")
    if len(req.code) > 5000:
        raise HTTPException(400, "Code too long (max 5000 chars)")
    try:
        prompt = ANALYSIS_PROMPT.format(lang=req.language, code=req.code)
        text = call_groq(prompt, max_tokens=2000)
        return parse_json(text)
    except json.JSONDecodeError:
        raise HTTPException(500, "Failed to parse AI response — try again")
    except Exception as e:
        raise HTTPException(502, f"AI error: {str(e)}")
 
 
@app.post("/quiz")
async def generate_quiz(req: QuizRequest):
    try:
        prompt = QUIZ_PROMPT.format(
            algorithm_name=req.algorithm_name,
            category=req.category,
            key_insight=req.key_insight,
        )
        text = call_groq(prompt, max_tokens=1200)
        return parse_json(text)
    except Exception as e:
        raise HTTPException(500, str(e))
 
 
@app.post("/compare")
async def compare(req: CompareRequest):
    try:
        prompt = COMPARE_PROMPT.format(
            lang1=req.lang1, code1=req.code1,
            lang2=req.lang2, code2=req.code2
        )
        text = call_groq(prompt, max_tokens=1500)
        return parse_json(text)
    except Exception as e:
        raise HTTPException(500, str(e))
