import React from 'react'

export default function EmptyState() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: 16,
      color: 'var(--text3)', padding: 40
    }}>
      <i className="ti ti-code-dots" style={{ fontSize: 48, opacity: 0.3 }} />
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text2)' }}>Ready to decode</div>
      <div style={{ fontSize: 13, textAlign: 'center', lineHeight: 1.6, maxWidth: 280 }}>
        Paste any sorting, searching, graph, or DP algorithm — get a step-by-step breakdown with live visualization and a quiz.
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
        {['Sorting', 'Graphs', 'DP', 'Trees', 'Searching', 'Recursion'].map(tag => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600,
            background: 'var(--bg3)', color: 'var(--text2)', border: '1px solid var(--border2)'
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
