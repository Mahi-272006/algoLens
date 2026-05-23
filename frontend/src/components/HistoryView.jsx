import React from 'react'

const TAG_COLORS = {
  Sorting: '#7c6af7', Searching: '#34d399', Graph: '#fbbf24',
  Tree: '#f472b6', 'Dynamic Programming': '#f87171', Recursion: '#a78bfa', Other: '#9990cc'
}

export default function HistoryView({ history, onLoad }) {
  if (!history.length) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, color: 'var(--text3)' }}>
      <i className="ti ti-history" style={{ fontSize: 40, opacity: 0.3 }} />
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text2)' }}>No history yet</div>
      <div style={{ fontSize: 13 }}>Analyzed algorithms will appear here</div>
    </div>
  )

  return (
    <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 14 }}>
        {history.length} algorithm{history.length !== 1 ? 's' : ''} analyzed
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {history.map((item, i) => (
          <div key={i} onClick={() => onLoad(item)}
            style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg2)', cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.result.algorithm_name}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{new Date(item.ts).toLocaleTimeString()}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
                color: TAG_COLORS[item.result.category] || 'var(--text2)', background: 'var(--bg4)'
              }}>{item.result.category}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-code)', color: 'var(--accent2)' }}>{item.result.time_complexity}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>· {item.lang}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
