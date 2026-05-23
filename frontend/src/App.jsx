import React, { useState } from 'react'
import Header from './components/Header.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import ResultPanel from './components/ResultPanel.jsx'
import CompareView from './components/CompareView.jsx'
import HistoryView from './components/HistoryView.jsx'
import EmptyState from './components/EmptyState.jsx'
import { analyzeCode } from './utils/api.js'

export default function App() {
  const [activeTab, setActiveTab] = useState('Analyze')
  const [code, setCode] = useState('')
  const [lang, setLang] = useState('python')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const data = await analyzeCode(code, lang)
      setResult(data)
      setHistory(prev => [{ result: data, code, lang, ts: Date.now() }, ...prev.slice(0, 19)])
    } catch (e) {
      setError(e.response?.data?.detail || 'Analysis failed. Is the backend running?')
    }
    setLoading(false)
  }

  const loadFromHistory = (item) => {
    setCode(item.code)
    setLang(item.lang)
    setResult(item.result)
    setActiveTab('Analyze')
  }

  return (
    <div style={{ display: 'grid', gridTemplateRows: '56px 1fr', height: '100vh' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Analyze' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', overflow: 'hidden' }}>
          <CodeEditor
            code={code} setCode={setCode}
            lang={lang} setLang={setLang}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
            {/* Output header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexShrink: 0
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Analysis
              </span>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: loading ? 'var(--amber)' : result ? 'var(--green)' : 'var(--text3)',
                animation: loading ? 'pulse 1s infinite' : 'none'
              }} />
            </div>

            {/* Error banner */}
            {error && (
              <div style={{
                padding: '10px 18px', background: '#2a0d0d', color: 'var(--red)',
                fontSize: 13, borderBottom: '1px solid var(--border)', flexShrink: 0
              }}>
                <i className="ti ti-alert-circle" /> {error}
              </div>
            )}

            {/* Loading shimmer */}
            {loading && (
              <div style={{ padding: '20px 18px', flex: 1 }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Analyzing algorithm...
                </div>
                {[80, 60, 90, 50, 100, 70, 80].map((w, i) => (
                  <div key={i} className="shimmer" style={{ height: 14, width: `${w}%`, marginBottom: 10 }} />
                ))}
              </div>
            )}

            {/* Result */}
            {!loading && result && (
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <ResultPanel result={result} />
              </div>
            )}

            {!loading && !result && !error && <EmptyState />}
          </div>
        </div>
      )}

      {activeTab === 'Compare' && (
        <div style={{ overflow: 'hidden' }}>
          <CompareView />
        </div>
      )}

      {activeTab === 'History' && (
        <div style={{ overflow: 'hidden' }}>
          <HistoryView history={history} onLoad={loadFromHistory} />
        </div>
      )}
    </div>
  )
}
