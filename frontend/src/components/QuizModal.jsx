import React, { useState } from 'react'

export default function QuizModal({ quiz, onClose }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? quiz.questions.filter((q, i) => answers[i] === q.correct).length
    : 0

  const optStyle = (q, i, opt) => {
    const letter = opt[0]
    const chosen = answers[i] === letter
    const correct = q.correct === letter
    let bg = 'var(--bg3)', border = 'var(--border)', color = 'var(--text2)'
    if (submitted) {
      if (correct) { bg = '#0f3a1f'; border = 'var(--green)'; color = 'var(--green)' }
      else if (chosen && !correct) { bg = '#3a0f0f'; border = 'var(--red)'; color = 'var(--red)' }
    } else if (chosen) {
      bg = '#1e1a4a'; border = 'var(--accent)'; color = 'var(--accent2)'
    }
    return {
      padding: '8px 12px', borderRadius: 8, border: `1px solid ${border}`,
      background: bg, color, fontSize: 13, cursor: submitted ? 'default' : 'pointer',
      transition: 'all .2s', textAlign: 'left', width: '100%', fontFamily: 'var(--font-ui)',
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20,
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 16, width: '100%', maxWidth: 580,
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animation: 'fadeIn .25s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Quiz Yourself</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
              {quiz.questions.length} questions · Test your understanding
            </div>
          </div>
          {submitted && (
            <div style={{
              padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: 14,
              background: score === quiz.questions.length ? '#0f3a1f' : score > 0 ? '#3a2f0a' : '#3a0f0f',
              color: score === quiz.questions.length ? 'var(--green)' : score > 0 ? 'var(--amber)' : 'var(--red)',
              border: `1px solid ${score === quiz.questions.length ? 'var(--green)' : score > 0 ? 'var(--amber)' : 'var(--red)'}`,
            }}>
              {score} / {quiz.questions.length}
            </div>
          )}
          <button onClick={onClose} style={{
            padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border2)',
            background: 'transparent', color: 'var(--text2)', cursor: 'pointer', fontSize: 16,
          }}>
            <i className="ti ti-x" />
          </button>
        </div>

        {/* Questions */}
        <div style={{ overflowY: 'auto', padding: 20, flex: 1 }}>
          {quiz.questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10, lineHeight: 1.5 }}>
                <span style={{
                  display: 'inline-flex', width: 22, height: 22, borderRadius: 6,
                  background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700,
                  alignItems: 'center', justifyContent: 'center', marginRight: 8, flexShrink: 0,
                }}>{i + 1}</span>
                {q.question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 30 }}>
                {q.options.map((opt, oi) => (
                  <button key={oi} style={optStyle(q, i, opt)}
                    onClick={() => !submitted && setAnswers(a => ({ ...a, [i]: opt[0] }))}>
                    {opt}
                  </button>
                ))}
              </div>
              {submitted && q.explanation && (
                <div style={{
                  marginTop: 8, marginLeft: 30, padding: '8px 12px', borderRadius: 8,
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  fontSize: 12, color: 'var(--text2)', lineHeight: 1.6,
                }}>
                  <i className="ti ti-bulb" style={{ color: 'var(--amber)', marginRight: 6 }} />
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px', borderTop: '1px solid var(--border)',
          display: 'flex', gap: 8, justifyContent: 'flex-end',
        }}>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < quiz.questions.length}
              style={{
                padding: '9px 20px', borderRadius: 8, border: 'none',
                background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 13,
                cursor: Object.keys(answers).length < quiz.questions.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(answers).length < quiz.questions.length ? 0.4 : 1,
              }}>
              Submit Answers
            </button>
          ) : (
            <button onClick={() => { setAnswers({}); setSubmitted(false) }}
              style={{
                padding: '9px 20px', borderRadius: 8, border: '1px solid var(--border2)',
                background: 'transparent', color: 'var(--text2)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
