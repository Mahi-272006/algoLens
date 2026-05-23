import React, { useState } from 'react'
import Visualization from './Visualization.jsx'
import QuizPanel from './QuizPanel.jsx'

const SectionLabel = ({ icon, children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
    color: 'var(--accent2)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6
  }}>
    <i className={`ti ${icon}`} /> {children}
  </div>
)

const InfoCard = ({ label, value, note, color }) => (
  <div style={{ padding: 12, borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)' }}>
    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-code)', color: color || 'var(--accent2)' }}>{value}</div>
    <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>{note}</div>
  </div>
)

function StepCard({ step, index, active, onClick }) {
  return (
    <div onClick={onClick}
      style={{
        borderRadius: 8, border: '1px solid', cursor: 'pointer',
        borderColor: active ? 'var(--accent)' : 'var(--border)',
        background: active ? 'var(--bg3)' : 'var(--bg2)',
        overflow: 'hidden', transition: 'all .2s'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px' }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6, background: 'var(--accent)',
          color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>{index + 1}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flex: 1 }}>{step.title}</div>
        <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: 'var(--bg4)', color: 'var(--accent2)' }}>
          {step.complexity_note}
        </span>
      </div>
      {active && (
        <div style={{ padding: '0 12px 10px 46px' }}>
          <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{step.description}</div>
          {step.key_line && (
            <pre style={{
              fontFamily: 'var(--font-code)', fontSize: 11, background: 'var(--bg)',
              padding: '8px 10px', borderRadius: 6, marginTop: 6, color: '#c9c2ff',
              overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all'
            }}>{step.key_line}</pre>
          )}
        </div>
      )}
    </div>
  )
}

export default function ResultPanel({ result }) {
  const [activeStep, setActiveStep] = useState(null)

  if (!result) return null

  const catColors = {
    Sorting: 'var(--accent)', Searching: 'var(--green)', Graph: 'var(--amber)',
    Tree: 'var(--pink)', 'Dynamic Programming': 'var(--red)', Recursion: 'var(--accent2)', Other: 'var(--text2)'
  }
  const catColor = catColors[result.category] || 'var(--accent2)'

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{result.algorithm_name}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                background: 'var(--bg3)', color: catColor, border: `1px solid ${catColor}44`
              }}>{result.category}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)' }}>{result.one_liner}</div>
          </div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text2)' }}>
          {result.explanation}
        </div>
        {result.related_algorithms?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>Related:</span>
            {result.related_algorithms.map(a => (
              <span key={a} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'var(--bg3)', color: 'var(--text2)' }}>{a}</span>
            ))}
          </div>
        )}
      </div>

      {/* Complexity */}
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
        <SectionLabel icon="ti-clock">Complexity</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <InfoCard label="Time" value={result.time_complexity} note={result.time_note} />
          <InfoCard label="Space" value={result.space_complexity} note={result.space_note} />
        </div>
      </div>

      {/* Visualization */}
      <Visualization vizType={result.viz_type} vizData={result.viz_data} />

      {/* Steps */}
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
        <SectionLabel icon="ti-list-numbers">Step-by-step breakdown</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {result.steps?.map((step, i) => (
            <StepCard key={i} step={step} index={i}
              active={activeStep === i}
              onClick={() => setActiveStep(activeStep === i ? null : i)} />
          ))}
        </div>
      </div>

      {/* Key insight */}
      {result.key_insight && (
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
          <SectionLabel icon="ti-bulb">Key Insight</SectionLabel>
          <div style={{
            padding: 12, borderRadius: 8, background: 'var(--bg2)',
            borderLeft: '3px solid var(--accent)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.7
          }}>{result.key_insight}</div>
        </div>
      )}

      {/* Use cases */}
      {result.use_cases && (
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
          <SectionLabel icon="ti-world">Real-world Use Cases</SectionLabel>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{result.use_cases}</div>
        </div>
      )}

      {/* Common mistakes */}
      {result.common_mistakes && (
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
          <SectionLabel icon="ti-alert-triangle">Common Mistakes</SectionLabel>
          <div style={{
            padding: 12, borderRadius: 8, background: 'var(--bg2)',
            borderLeft: '3px solid var(--red)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.7
          }}>{result.common_mistakes}</div>
        </div>
      )}

      {/* Quiz */}
      <QuizPanel result={result} />
    </div>
  )
}
