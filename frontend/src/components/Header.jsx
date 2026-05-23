import React from 'react'

const s = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 20px', height: 56, background: 'var(--bg2)',
    borderBottom: '1px solid var(--border)', gap: 12, flexShrink: 0
  },
  logo: { fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text)' },
  logoSpan: { color: 'var(--accent2)' },
  badge: {
    fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
    background: 'linear-gradient(135deg,#3d2f9e,#5b3fc9)', color: 'var(--accent3)',
    letterSpacing: 1, textTransform: 'uppercase'
  },
  center: { display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'center' },
  sub: { fontSize: 12, color: 'var(--text3)' },
  model: { fontSize: 11, color: 'var(--text3)' }
}

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header style={s.header}>
      <div style={s.logo}>Algo<span style={s.logoSpan}>Lens</span></div>
      <div style={s.center}>
        <span style={s.badge}>AI Powered</span>
        <span style={s.sub}>Paste any algorithm. Watch it think.</span>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {['Analyze', 'Compare', 'History'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{
              padding: '5px 12px', borderRadius: 6, border: '1px solid',
              borderColor: activeTab === tab ? 'var(--accent)' : 'var(--border2)',
              background: activeTab === tab ? 'var(--accent)' : 'transparent',
              color: activeTab === tab ? '#fff' : 'var(--text2)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-ui)'
            }}>
            {tab}
          </button>
        ))}
      </div>
    </header>
  )
}
