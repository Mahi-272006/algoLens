import React, { useState } from 'react'
import { compareAlgos } from '../utils/api.js'

const LANGS = ['python', 'javascript', 'java', 'cpp']

function EditorBox({ label, code, setCode, lang, setLang }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent2)' }}>{label}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '2px 8px', fontSize: 10, fontWeight: 600, borderRadius: 4,
              border: '1px solid', cursor: 'pointer', fontFamily: 'var(--font-ui)',
              borderColor: lang === l ? 'var(--accent)' : 'var(--border2)',
              background: lang === l ? 'var(--accent)' : 'transparent',
              color: lang === l ? '#fff' : 'var(--text2)'
            }}>{l === 'cpp' ? 'C++' : l === 'javascript' ? 'JS' : l.charAt(0).toUpperCase() + l.slice(1)}</button>
          ))}
        </div>
      </div>
      <textarea value={code} onChange={e => setCode(e.target.value)}
        placeholder={`Paste algorithm ${label.toLowerCase()}...`}
        spellCheck={false}
        style={{
          flex: 1, background: 'var(--bg)', color: '#c9c2ff',
          fontFamily: 'var(--font-code)', fontSize: 12, lineHeight: 1.7,
          border: 'none', outline: 'none', resize: 'none', padding: 14, minHeight: 220
        }} />
    </div>
  )
}

export default function CompareView() {
  const [code1, setCode1] = useState('')
  const [lang1, setLang1] = useState('python')
  const [code2, setCode2] = useState('')
  const [lang2, setLang2] = useState('python')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const compare = async () => {
    if (!code1.trim() || !code2.trim()) { setError('Please paste both algorithms'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await compareAlgos(code1, lang1, code2, lang2)
      setResult(data)
    } catch (e) {
      setError(e.response?.data?.detail || e.message)
    }
    setLoading(false)
  }

  const winnerBadge = (w) => ({
    algo1: { bg: '#1a1a3a', color: 'var(--accent2)', label: result?.algo1_name },
    algo2: { bg: '#1a3a1a', color: 'var(--green)', label: result?.algo2_name },
    tie: { bg: '#2a2a1a', color: 'var(--amber)', label: 'Tie' }
  }[w] || {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 20, gap: 16, overflowY: 'auto' }}>
      <div style={{ display: 'flex', gap: 16, minHeight: 280 }}>
        <EditorBox label="Algorithm 1" code={code1} setCode={setCode1} lang={lang1} setLang={setLang1} />
        <EditorBox label="Algorithm 2" code={code2} setCode={setCode2} lang={lang2} setLang={setLang2} />
      </div>

      {error && <div style={{ padding: '10px 14px', borderRadius: 8, background: '#2a0d0d', color: 'var(--red)', fontSize: 13, border: '1px solid var(--red)' }}>{error}</div>}

      <button onClick={compare} disabled={loading}
        style={{
          padding: '12px 0', borderRadius: 8, border: 'none',
          background: loading ? '#4a3fa0' : 'var(--accent)', color: '#fff',
          fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-ui)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
        <i className={`ti ${loading ? 'ti-loader-2' : 'ti-arrows-diff'}`}
          style={loading ? { animation: 'spin 1s linear infinite' } : {}} />
        {loading ? 'Comparing...' : 'Compare Algorithms'}
      </button>

      {result && (
        <div className="fade-in">
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Faster', w: result.winner_time },
              { label: 'Less Memory', w: result.winner_space },
              { label: 'Overall Better', w: result.winner_overall }
            ].map(({ label, w }) => {
              const b = winnerBadge(w)
              return (
                <div key={label} style={{ padding: '10px 14px', borderRadius: 8, background: b.bg, border: `1px solid ${b.color}44`, flex: 1, minWidth: 140 }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: b.color }}>{b.label}</div>
                </div>
              )
            })}
          </div>

          <div style={{ background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--bg3)', padding: '8px 14px', fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              <div>Aspect</div><div>{result.algo1_name}</div><div>{result.algo2_name}</div>
            </div>
            {result.comparison_points?.map((pt, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 14px', borderTop: '1px solid var(--border)', fontSize: 13 }}>
                <div style={{ fontWeight: 600, color: 'var(--text2)' }}>{pt.aspect}</div>
                <div style={{ color: pt.winner === 'algo1' ? 'var(--green)' : 'var(--text2)' }}>{pt.algo1}{pt.winner === 'algo1' && ' ✓'}</div>
                <div style={{ color: pt.winner === 'algo2' ? 'var(--green)' : 'var(--text2)' }}>{pt.algo2}{pt.winner === 'algo2' && ' ✓'}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: `Use ${result.algo1_name} when:`, text: result.when_to_use_algo1, color: 'var(--accent)' },
              { label: `Use ${result.algo2_name} when:`, text: result.when_to_use_algo2, color: 'var(--green)' }
            ].map(({ label, text, color }) => (
              <div key={label} style={{ padding: 14, borderRadius: 8, background: 'var(--bg2)', borderLeft: `3px solid ${color}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{text}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, borderRadius: 8, background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
            {result.summary}
          </div>
        </div>
      )}
    </div>
  )
}
