import React, { useState } from 'react'
import { EXAMPLES, TAG_COLORS } from '../utils/examples'

const LANGS = ['python', 'javascript', 'java', 'cpp']
const LANG_LABELS = { python: 'Python', javascript: 'JS', java: 'Java', cpp: 'C++' }

export default function EditorPanel({ code, setCode, language, setLanguage, onAnalyze, loading }) {
  const [tab, setTab] = useState('editor')

  const tabStyle = (active) => ({
    flex: 1, padding: '10px 0', fontSize: 12, fontWeight: 600,
    textAlign: 'center', cursor: 'pointer', border: 'none',
    background: active ? 'var(--bg3)' : 'transparent',
    color: active ? 'var(--accent2)' : 'var(--text3)',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
    transition: 'all .2s',
  })

  const langBtnStyle = (active) => ({
    padding: '4px 10px', fontSize: 11, fontWeight: 600,
    borderRadius: 6, border: '1px solid',
    borderColor: active ? 'var(--accent)' : 'var(--border2)',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#fff' : 'var(--text2)',
    cursor: 'pointer', transition: 'all .2s',
  })

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid var(--border)',
      background: 'var(--bg2)', width: 420, flexShrink: 0, overflow: 'hidden',
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        <button style={tabStyle(tab === 'editor')} onClick={() => setTab('editor')}>Editor</button>
        <button style={tabStyle(tab === 'examples')} onClick={() => setTab('examples')}>
          Examples ({EXAMPLES.length})
        </button>
      </div>

      {tab === 'editor' ? (
        <>
          {/* Language selector */}
          <div style={{
            display: 'flex', gap: 6, padding: '10px 14px',
            borderBottom: '1px solid var(--border)', background: 'var(--bg2)',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 11, color: 'var(--text3)', marginRight: 4 }}>Lang:</span>
            {LANGS.map(l => (
              <button key={l} style={langBtnStyle(language === l)} onClick={() => setLanguage(l)}>
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>

          {/* Code input */}
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder={`# Paste your algorithm here...\n# e.g. bubble sort, binary search,\n# dijkstra, DFS/BFS, merge sort...\n\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr`}
            spellCheck={false}
            style={{
              flex: 1, width: '100%', background: 'var(--bg)',
              color: '#c9c2ff', fontFamily: 'var(--font-code)',
              fontSize: 13, lineHeight: 1.7, border: 'none',
              outline: 'none', resize: 'none', padding: 16,
              tabSize: 2,
            }}
          />

          {/* Action bar */}
          <div style={{
            padding: '12px 14px', display: 'flex', gap: 8,
            borderTop: '1px solid var(--border)', background: 'var(--bg2)',
          }}>
            <button
              onClick={() => setCode('')}
              style={{
                padding: '10px 14px', borderRadius: 8,
                border: '1px solid var(--border2)', background: 'transparent',
                color: 'var(--text2)', fontSize: 13, transition: 'all .2s',
              }}
              title="Clear"
            >
              <i className="ti ti-trash" />
            </button>
            <button
              onClick={onAnalyze}
              disabled={loading || !code.trim()}
              style={{
                flex: 1, padding: 10, borderRadius: 8, border: 'none',
                background: loading ? 'var(--bg4)' : 'var(--accent)',
                color: '#fff', fontWeight: 700, fontSize: 13,
                cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
                opacity: !code.trim() ? 0.4 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all .2s',
              }}
            >
              {loading ? (
                <>
                  <i className="ti ti-loader-2" style={{ animation: 'spin 1s linear infinite' }} />
                  Analyzing...
                </>
              ) : (
                <>
                  <i className="ti ti-brain" />
                  Analyze Code
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 10, letterSpacing: 0.5 }}>
            Click any example to load →
          </p>
          {EXAMPLES.map((ex, i) => (
            <div
              key={i}
              onClick={() => { setCode(ex.code); setLanguage(ex.lang); setTab('editor') }}
              style={{
                padding: '10px 12px', borderRadius: 8,
                border: '1px solid var(--border)', background: 'var(--bg3)',
                cursor: 'pointer', marginBottom: 8, transition: 'all .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'var(--bg4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg3)'
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                {ex.title}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: 'var(--bg4)', color: TAG_COLORS[ex.tag] || 'var(--text2)',
                }}>{ex.tag}</span>
                <span style={{
                  padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: 'var(--bg4)', color: 'var(--accent2)',
                }}>{ex.complexity}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
