import React, { useState } from 'react'
import { EXAMPLES, TAG_COLORS } from '../utils/examples.js'

const LANGS = ['python', 'javascript', 'java', 'cpp']

export default function CodeEditor({ code, setCode, lang, setLang, onAnalyze, loading }) {
  const [panel, setPanel] = useState('editor')

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)',
      background: 'var(--bg2)', overflow: 'hidden', height: '100%'
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {['editor', 'examples'].map(t => (
          <button key={t} onClick={() => setPanel(t)}
            style={{
              flex: 1, padding: '10px 0', fontSize: 12, fontWeight: 600,
              textTransform: 'capitalize', cursor: 'pointer', border: 'none',
              fontFamily: 'var(--font-ui)', letterSpacing: 0.5,
              background: panel === t ? 'var(--bg3)' : 'transparent',
              color: panel === t ? 'var(--accent2)' : 'var(--text3)',
              borderBottom: panel === t ? '2px solid var(--accent)' : '2px solid transparent'
            }}>
            {t}
          </button>
        ))}
      </div>

      {panel === 'editor' ? (
        <>
          {/* Language selector */}
          <div style={{
            display: 'flex', gap: 6, padding: '10px 14px',
            borderBottom: '1px solid var(--border)', flexWrap: 'wrap', alignItems: 'center'
          }}>
            <span style={{ fontSize: 11, color: 'var(--text3)', marginRight: 4 }}>Lang:</span>
            {LANGS.map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding: '3px 10px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                  border: '1px solid', cursor: 'pointer', fontFamily: 'var(--font-ui)',
                  borderColor: lang === l ? 'var(--accent)' : 'var(--border2)',
                  background: lang === l ? 'var(--accent)' : 'transparent',
                  color: lang === l ? '#fff' : 'var(--text2)'
                }}>
                {l === 'cpp' ? 'C++' : l === 'javascript' ? 'JS' : l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              placeholder={`# Paste your ${lang} algorithm here...\n# e.g. bubble sort, binary search,\n# dijkstra, DFS/BFS, merge sort...`}
              style={{
                width: '100%', height: '100%', background: 'var(--bg)',
                color: '#c9c2ff', fontFamily: 'var(--font-code)', fontSize: 13,
                lineHeight: 1.7, border: 'none', outline: 'none',
                resize: 'none', padding: 16, tabSize: 2
              }}
            />
          </div>

          {/* Action bar */}
          <div style={{
            padding: '12px 14px', display: 'flex', gap: 8,
            borderTop: '1px solid var(--border)', background: 'var(--bg2)'
          }}>
            <button onClick={() => setCode('')}
              style={{
                padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border2)',
                background: 'transparent', color: 'var(--text2)', fontSize: 13,
                cursor: 'pointer', fontFamily: 'var(--font-ui)'
              }}>
              <i className="ti ti-trash" />
            </button>
            <button onClick={onAnalyze} disabled={loading || !code.trim()}
              style={{
                flex: 1, padding: 10, borderRadius: 8, border: 'none',
                background: loading ? '#4a3fa0' : 'var(--accent)', color: '#fff',
                fontWeight: 700, fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-ui)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 6, opacity: (!code.trim() && !loading) ? 0.4 : 1
              }}>
              <i className={`ti ${loading ? 'ti-loader-2' : 'ti-brain'}`}
                style={loading ? { animation: 'spin 1s linear infinite' } : {}} />
              {loading ? 'Analyzing...' : 'Analyze Code'}
            </button>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 10 }}>
            Click any example to load →
          </p>
          {EXAMPLES.map((ex, i) => (
            <div key={i} onClick={() => { setCode(ex.code); setLang(ex.lang); setPanel('editor') }}
              style={{
                padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg3)', cursor: 'pointer', marginBottom: 8,
                transition: 'all .2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg4)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg3)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                {ex.title}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: 'var(--bg4)', color: TAG_COLORS[ex.tag] || 'var(--text2)'
                }}>{ex.tag}</span>
                <span style={{
                  padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600,
                  background: 'var(--bg4)', color: 'var(--accent2)'
                }}>{ex.complexity}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
