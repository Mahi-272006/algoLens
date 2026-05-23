import React, { useState } from 'react'
import { generateQuiz } from '../utils/api.js'

export default function QuizPanel({ result }) {
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const fetchQuiz = async () => {
    setLoading(true)
    setAnswers({})
    setSubmitted(false)
    try {
      const data = await generateQuiz(result.algorithm_name, result.category, result.key_insight)
      setQuiz(data)
    } catch (e) {
      alert('Failed to generate quiz: ' + e.message)
    }
    setLoading(false)
  }

  const score = submitted
    ? quiz.questions.filter((q, i) => answers[i] === q.correct).length
    : null

  return (
    <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent2)' }}>
          <i className="ti ti-school" /> Quiz Mode
        </div>
        <button onClick={fetchQuiz} disabled={loading}
          style={{
            padding: '5px 12px', borderRadius: 6, border: '1px solid var(--accent)',
            background: 'transparent', color: 'var(--accent2)', fontSize: 12,
            fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-ui)'
          }}>
          {loading ? 'Generating...' : quiz ? 'New Quiz' : 'Generate Quiz'}
        </button>
      </div>

      {submitted && (
        <div style={{
          padding: '10px 14px', borderRadius: 8, marginBottom: 12,
          background: score >= 3 ? '#0d2a1e' : '#2a0d0d',
          border: `1px solid ${score >= 3 ? 'var(--green)' : 'var(--red)'}`,
          color: score >= 3 ? 'var(--green)' : 'var(--red)', fontWeight: 700
        }}>
          {score} / {quiz.questions.length} correct {score === quiz.questions.length ? '🎉 Perfect!' : score >= 3 ? '✓ Good job!' : '— Review the steps above'}
        </div>
      )}

      {quiz && quiz.questions.map((q, qi) => (
        <div key={qi} style={{
          marginBottom: 14, padding: '12px 14px', borderRadius: 8,
          background: 'var(--bg2)', border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
            {qi + 1}. {q.question}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {q.options.map((opt, oi) => {
              let bg = 'transparent', border = 'var(--border2)', color = 'var(--text2)'
              if (submitted) {
                if (oi === q.correct) { bg = '#0d2a1e'; border = 'var(--green)'; color = 'var(--green)' }
                else if (answers[qi] === oi && oi !== q.correct) { bg = '#2a0d0d'; border = 'var(--red)'; color = 'var(--red)' }
              } else if (answers[qi] === oi) {
                bg = '#1e1a3a'; border = 'var(--accent)'; color = 'var(--accent2)'
              }
              return (
                <button key={oi} onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                  style={{
                    padding: '7px 12px', borderRadius: 6, border: '1px solid', borderColor: border,
                    background: bg, color, fontSize: 12, cursor: submitted ? 'default' : 'pointer',
                    fontFamily: 'var(--font-ui)', textAlign: 'left'
                  }}>
                  {opt}
                </button>
              )
            })}
          </div>
          {submitted && (
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text2)', fontStyle: 'italic' }}>
              💡 {q.explanation}
            </div>
          )}
        </div>
      ))}

      {quiz && !submitted && (
        <button onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < quiz.questions.length}
          style={{
            width: '100%', padding: 10, borderRadius: 8, border: 'none',
            background: 'var(--accent)', color: '#fff', fontWeight: 700,
            fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-ui)',
            opacity: Object.keys(answers).length < quiz.questions.length ? 0.4 : 1
          }}>
          Submit Answers
        </button>
      )}
    </div>
  )
}
